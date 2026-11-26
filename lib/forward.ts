import "server-only";

import { crmConfigured, sendToCrm } from "./avrix-crm";

/**
 * Delivers form submissions to the business.
 *
 * Two destinations, either or both:
 * 1. FORM_WEBHOOK_URL (HTTPS): the full submission including documents, as multipart/form-data with an
 *    `x-medicolex-secret` header. This is where medical records go; it must store them encrypted, in the UK,
 *    with restricted access and a retention policy.
 * 2. The Avrix CRM hub (AVRIX_CRM_URL / AVRIX_CRM_KEY / AVRIX_CRM_SECRET): a minimal lead record so the
 *    instruction appears in the shared CRM pipeline. No documents, dates of birth, postcodes or injury
 *    descriptions are sent there — only what is needed to manage the enquiry, plus file names.
 *
 * A submission succeeds when at least one configured destination accepts it.
 * Development (nothing set): only the reference and non-personal metadata are logged.
 */
export async function forwardSubmission(kind: string, reference: string, fields: Record<string, string>, files: File[] = []) {
  const url = process.env.FORM_WEBHOOK_URL;
  if (!url && !crmConfigured()) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Form delivery is not configured");
    }
    console.info(`[forms] ${kind} ${reference} received: ${Object.keys(fields).length} fields, ${files.length} files (no FORM_WEBHOOK_URL or AVRIX_CRM_URL set; not forwarded)`);
    return { delivered: false };
  }
  const results = await Promise.allSettled([
    url ? postWebhook(url, kind, reference, fields, files) : Promise.resolve(null),
    crmConfigured() ? sendToCrm(crmLead(kind, reference, fields, files)) : Promise.resolve(null),
  ]);
  const [hook, crm] = results;
  if (hook.status === "rejected") console.error(`[forms] ${reference} webhook failed: ${(hook.reason as Error).message}`);
  if (crm.status === "rejected") console.error(`[forms] ${reference} CRM failed: ${(crm.reason as Error).message}`);
  // The webhook carries the documents, so when it is configured it must succeed.
  if (url && hook.status === "rejected") throw new Error("Webhook delivery failed");
  if (!url && crm.status === "rejected") throw new Error("CRM delivery failed");
  return { delivered: true };
}

async function postWebhook(url: string, kind: string, reference: string, fields: Record<string, string>, files: File[]) {
  if (!url.startsWith("https://")) throw new Error("FORM_WEBHOOK_URL must use HTTPS");
  const body = new FormData();
  body.set("kind", kind);
  body.set("reference", reference);
  body.set("submittedAt", new Date().toISOString());
  for (const [k, v] of Object.entries(fields)) body.set(k, v);
  for (const f of files) body.append("documents", f, f.name);
  const res = await fetch(url, {
    method: "POST",
    body,
    headers: { "x-medicolex-secret": process.env.FORM_WEBHOOK_SECRET ?? "" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return true;
}

/** Minimal CRM record: who to deal with and what the case is, nothing clinical. */
function crmLead(kind: string, reference: string, f: Record<string, string>, files: File[]) {
  if (kind === "instruction") {
    return {
      externalId: reference,
      name: f.feeEarner || f.firmName,
      email: f.email, phone: f.phone, businessName: f.firmName,
      service: f.reportType, source: "website_form", stage: "New instruction",
      priority: (f.urgency?.startsWith("Urgent") ? "high" : "normal") as "high" | "normal",
      customFields: {
        reference, type: "Instruction", solicitorReference: f.reference, sraNumber: f.sraNumber || undefined, instructingFor: f.instructingFor,
        claimant: f.claimantName, clinic: f.preferredClinic, claimType: f.claimType, injuredArea: f.bodyPart, track: f.track,
        reportType: f.reportType, urgency: f.urgency,
      },
      attachments: files.map((x) => ({ name: x.name, size: x.size, type: x.type })),
    };
  }
  const label = kind === "panel" ? "Join our panel" : kind === "interest" ? "Register interest" : "Contact";
  return {
    externalId: reference,
    name: f.name, email: f.email, phone: f.phone || undefined, businessName: f.organisation || undefined,
    service: f.topic || label, message: f.message || undefined, source: "website_form",
    customFields: { reference, type: label },
  };
}

export function makeReference(prefix: string) {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(3)), (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  return `${prefix}-${ymd}-${rand}`;
}

/** Very small in-memory rate limiter (per server instance). Use a shared store if you scale out. */
const hits = new Map<string, number[]>();
export function rateLimited(key: string, max = 8, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  return list.length > max;
}
