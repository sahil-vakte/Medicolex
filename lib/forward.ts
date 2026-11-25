import "server-only";

/**
 * Delivers form submissions to the business.
 *
 * Production: set FORM_WEBHOOK_URL (HTTPS) to your CRM or automation endpoint.
 * The payload is sent as multipart/form-data with an `x-medicolex-secret` header.
 * Medical records are special category data: the receiving system must store them
 * encrypted, in the UK, with restricted access and a retention policy.
 *
 * Development (no webhook set): only the reference and non-personal metadata are
 * logged. Personal data is never written to logs.
 */
export async function forwardSubmission(kind: string, reference: string, fields: Record<string, string>, files: File[] = []) {
  const url = process.env.FORM_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Form delivery is not configured");
    }
    console.info(`[forms] ${kind} ${reference} received: ${Object.keys(fields).length} fields, ${files.length} files (no FORM_WEBHOOK_URL set; not forwarded)`);
    return { delivered: false };
  }
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
  return { delivered: true };
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
