"use client";

import Link from "next/link";
import { useState } from "react";
import { enquirySchema, fieldErrors } from "@/lib/forms";
import { Check, Honeypot, Select, Text, TextArea } from "./Field";

type Kind = "contact" | "interest" | "panel";

const COPY: Record<Kind, { button: string; done: string; topicLabel?: string; topics?: string[]; messageLabel: string; orgLabel: string }> = {
  contact: {
    button: "Send message",
    done: "Thank you. Your message has been sent and we will be in touch shortly.",
    topicLabel: "What is it about?",
    topics: ["Fees and availability", "Suitability of a case", "An existing instruction", "Claimant appointment", "Something else"],
    messageLabel: "Message",
    orgLabel: "Firm or organisation",
  },
  interest: {
    button: "Register interest",
    done: "Thank you. We will let you know as soon as new specialties are available.",
    topicLabel: "Specialty of interest",
    topics: ["Hand & Wrist Surgery", "Orthopaedics & Spine", "Psychiatry & Psychology", "Pain Medicine", "Physiotherapy & Rehabilitation", "Care & Occupational Therapy", "Plastic Surgery", "GP & Emergency Medicine", "All specialties"],
    messageLabel: "Anything else? (optional)",
    orgLabel: "Firm",
  },
  panel: {
    button: "Send expression of interest",
    done: "Thank you. We will be in touch to discuss joining the panel.",
    topicLabel: "Your specialty",
    messageLabel: "Brief summary of your clinical and medico-legal experience",
    orgLabel: "Current post / hospital",
  },
};

export function EnquiryForm({ kind }: { kind: Kind }) {
  const c = COPY[kind];
  const [v, setV] = useState({ name: "", organisation: "", email: "", phone: "", topic: "", message: "", consent: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ s: "idle" | "sending" | "done" | "error"; m?: string }>({ s: "idle" });
  const set = (k: keyof typeof v) => (val: string) => setV((x) => ({ ...x, [k]: val }));

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const r = enquirySchema.safeParse({ ...v, kind });
    if (!r.success) { setErrors(fieldErrors(r.error)); return; }
    setErrors({});
    setStatus({ s: "sending" });
    const fd = new FormData();
    Object.entries({ ...v, kind }).forEach(([k, val]) => fd.set(k, val));
    fd.set("website", (ev.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) { if (data.fields) setErrors(data.fields); setStatus({ s: "error", m: data.error }); return; }
      setStatus({ s: "done" });
    } catch {
      setStatus({ s: "error", m: "We could not reach the server. Please try again." });
    }
  }

  if (status.s === "done") {
    return <div role="status" className="card text-lg font-semibold text-navy">{c.done}</div>;
  }

  return (
    <form onSubmit={submit} noValidate className="card relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 md:grid-cols-2">
        <Text name="name" label="Your name" required value={v.name} onChange={set("name")} error={errors.name} autoComplete="name" />
        <Text name="organisation" label={c.orgLabel} value={v.organisation} onChange={set("organisation")} error={errors.organisation} autoComplete="organization" />
        <Text name="email" label="Email" type="email" required value={v.email} onChange={set("email")} error={errors.email} autoComplete="email" />
        <Text name="phone" label="Phone" type="tel" value={v.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" />
      </div>
      {c.topics ? (
        <Select name="topic" label={c.topicLabel!} value={v.topic} onChange={set("topic")} error={errors.topic} options={c.topics} />
      ) : (
        <Text name="topic" label={c.topicLabel!} value={v.topic} onChange={set("topic")} error={errors.topic} />
      )}
      <TextArea name="message" label={c.messageLabel} value={v.message} onChange={set("message")} error={errors.message} rows={5} hint={kind === "contact" ? "Please do not include medical records here." : undefined} />
      <Check name="consent" checked={v.consent === "yes"} onChange={(x) => set("consent")(x ? "yes" : "")} error={errors.consent}>
        I agree to Medicolex using these details to respond, as described in the <Link href="/privacy" className="link" target="_blank">privacy notice</Link>.
      </Check>
      {status.s === "error" && <p role="alert" className="rounded-xl bg-coral-soft px-4 py-3 font-semibold text-coral-deep">{status.m ?? "Something went wrong."}</p>}
      <button type="submit" className="btn-primary" disabled={status.s === "sending"}>{status.s === "sending" ? "Sending…" : c.button}</button>
    </form>
  );
}
