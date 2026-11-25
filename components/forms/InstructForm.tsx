"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { fieldErrors, instructSteps, UPLOAD } from "@/lib/forms";
import { Check, Honeypot, Select, Text, TextArea } from "./Field";

type Values = Record<string, string>;
const STEPS = [
  { key: "firm", title: "Your firm" },
  { key: "claimant", title: "Claimant" },
  { key: "claim", title: "The claim" },
  { key: "report", title: "Report needed" },
  { key: "terms", title: "Documents & confirm" },
] as const;

const initial: Values = {
  firmName: "", sraNumber: "", feeEarner: "", email: "", phone: "", reference: "", instructingFor: "",
  claimantName: "", claimantDob: "", claimantPostcode: "", claimantPhone: "", preferredClinic: "", interpreter: "", accessNeeds: "",
  claimType: "", incidentDate: "", bodyPart: "", track: "", mechanism: "", deadlines: "",
  reportType: "", urgency: "", questions: "",
  consentConfirmed: "", termsAccepted: "",
};

function fmtSize(b: number) { return b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.ceil(b / 1024)} KB`; }

export function InstructForm({ defaultClinic }: { defaultClinic?: string }) {
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Values>(() => ({ ...initial, preferredClinic: defaultClinic ?? "" }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<{ state: "idle" | "sending" | "done" | "error"; message?: string; reference?: string }>({ state: "idle" });
  const topRef = useRef<HTMLDivElement>(null);

  const set = (k: string) => (val: string) => setV((s) => ({ ...s, [k]: val }));
  const e = (k: string) => errors[k];

  function validate(i: number) {
    const schema = instructSteps[STEPS[i].key];
    const r = schema.safeParse(v);
    if (r.success) { setErrors({}); return true; }
    setErrors(fieldErrors(r.error));
    requestAnimationFrame(() => {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
    });
    return false;
  }

  function go(to: number) {
    if (to > step && !validate(step)) return;
    setStep(to);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    for (const f of Array.from(list)) {
      if (!UPLOAD.types.includes(f.type)) { setFileError(`${f.name}: only PDF, Word, JPG and PNG files are accepted.`); continue; }
      if (f.size > UPLOAD.maxFileBytes) { setFileError(`${f.name} is larger than 15 MB.`); continue; }
      next.push(f);
    }
    if (next.length > UPLOAD.maxFiles) { setFileError(`Upload up to ${UPLOAD.maxFiles} files. Send the rest after we acknowledge your instruction.`); return; }
    if (next.reduce((a, f) => a + f.size, 0) > UPLOAD.maxTotalBytes) { setFileError("Total upload is over 40 MB. Send the rest after we acknowledge your instruction."); return; }
    setFileError("");
    setFiles(next);
  }

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!validate(step)) return;
    setStatus({ state: "sending" });
    const fd = new FormData();
    for (const [k, val] of Object.entries(v)) fd.set(k, val);
    fd.set("website", (ev.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "");
    files.forEach((f) => fd.append("documents", f, f.name));
    try {
      const res = await fetch("/api/instruct", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.fields) {
          setErrors(data.fields);
          const idx = STEPS.findIndex((s) => Object.keys(data.fields).some((f) => f in instructSteps[s.key].shape));
          if (idx >= 0) setStep(idx);
        }
        setStatus({ state: "error", message: data.error ?? "Something went wrong. Please try again." });
        return;
      }
      setStatus({ state: "done", reference: data.reference });
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch {
      setStatus({ state: "error", message: "We could not reach the server. Please check your connection and try again." });
    }
  }

  if (status.state === "done") {
    return (
      <div ref={topRef} className="card text-center" role="status">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-soft text-2xl text-teal-deep">✓</div>
        <h2 className="mt-5 text-2xl">Instruction received</h2>
        <p className="mt-3 text-navy/80">Your reference is <strong className="font-extrabold">{status.reference}</strong>. We will confirm terms and next steps by email, including a secure link for any further records.</p>
        <Link href="/" className="btn-outline mt-6">Back to home</Link>
      </div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-28">
      <ol className="mb-8 grid grid-cols-5 gap-2" aria-label="Form progress">
        {STEPS.map((s, i) => (
          <li key={s.key} className="text-center">
            <span className={`block h-1.5 rounded-full ${i <= step ? (i === step ? "bg-coral" : "bg-teal") : "bg-line"}`} />
            <span className={`mt-2 hidden text-xs font-semibold sm:block ${i === step ? "text-navy" : "text-navy/50"}`} aria-current={i === step ? "step" : undefined}>
              {i + 1}. {s.title}
            </span>
          </li>
        ))}
      </ol>

      <form onSubmit={submit} noValidate className="card relative space-y-6">
        <Honeypot />
        <h2 className="text-2xl">Step {step + 1} of {STEPS.length}: {STEPS[step].title}</h2>

        {step === 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            <Text name="firmName" label="Firm name" required value={v.firmName} onChange={set("firmName")} error={e("firmName")} autoComplete="organization" />
            <Text name="sraNumber" label="SRA number" value={v.sraNumber} onChange={set("sraNumber")} error={e("sraNumber")} />
            <Text name="feeEarner" label="Fee earner" required value={v.feeEarner} onChange={set("feeEarner")} error={e("feeEarner")} autoComplete="name" />
            <Text name="reference" label="Your reference" required value={v.reference} onChange={set("reference")} error={e("reference")} />
            <Text name="email" label="Email" type="email" required value={v.email} onChange={set("email")} error={e("email")} autoComplete="email" />
            <Text name="phone" label="Phone" type="tel" required value={v.phone} onChange={set("phone")} error={e("phone")} autoComplete="tel" />
            <div className="md:col-span-2">
              <Select name="instructingFor" label="You act for" required value={v.instructingFor} onChange={set("instructingFor")} error={e("instructingFor")} options={["Claimant", "Defendant", "Joint (SJE)"]} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-5 md:grid-cols-2">
            <Text name="claimantName" label="Claimant full name" required value={v.claimantName} onChange={set("claimantName")} error={e("claimantName")} />
            <Text name="claimantDob" label="Date of birth" type="date" required value={v.claimantDob} onChange={set("claimantDob")} error={e("claimantDob")} />
            <Text name="claimantPostcode" label="Claimant postcode" required value={v.claimantPostcode} onChange={set("claimantPostcode")} error={e("claimantPostcode")} hint="Used to suggest the nearest clinic." />
            <Text name="claimantPhone" label="Claimant phone (for booking)" type="tel" value={v.claimantPhone} onChange={set("claimantPhone")} error={e("claimantPhone")} />
            <Select name="preferredClinic" label="Preferred clinic" required value={v.preferredClinic} onChange={set("preferredClinic")} error={e("preferredClinic")} options={["Leicester", "Derby", "Rugby", "No preference"]} />
            <Text name="interpreter" label="Interpreter needed? (language)" value={v.interpreter} onChange={set("interpreter")} error={e("interpreter")} />
            <div className="md:col-span-2">
              <TextArea name="accessNeeds" label="Accessibility or chaperone needs" rows={3} value={v.accessNeeds} onChange={set("accessNeeds")} error={e("accessNeeds")} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-5 md:grid-cols-2">
            <Select name="claimType" label="Claim type" required value={v.claimType} onChange={set("claimType")} error={e("claimType")} options={["Road traffic", "Employer liability", "Public liability", "Clinical negligence", "Sports injury", "Other"]} />
            <Text name="incidentDate" label="Date of incident" type="date" required value={v.incidentDate} onChange={set("incidentDate")} error={e("incidentDate")} />
            <Select name="bodyPart" label="Injured area" required value={v.bodyPart} onChange={set("bodyPart")} error={e("bodyPart")} options={["Shoulder", "Elbow", "Shoulder and elbow"]} />
            <Select name="track" label="Track" required value={v.track} onChange={set("track")} error={e("track")} options={["Not yet allocated", "Small claims", "Fast track", "Intermediate track", "Multi-track"]} />
            <div className="md:col-span-2">
              <TextArea name="mechanism" label="Brief description of the incident and injuries" required value={v.mechanism} onChange={set("mechanism")} error={e("mechanism")} />
            </div>
            <div className="md:col-span-2">
              <Text name="deadlines" label="Court deadlines or limitation date" value={v.deadlines} onChange={set("deadlines")} error={e("deadlines")} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-5 md:grid-cols-2">
            <Select name="reportType" label="Report required" required value={v.reportType} onChange={set("reportType")} error={e("reportType")} options={["Condition and prognosis", "Addendum / follow-up", "Records-only review", "Breach of duty and causation", "Part 35 questions", "Joint statement", "Other"]} />
            <Select name="urgency" label="Urgency" required value={v.urgency} onChange={set("urgency")} error={e("urgency")} options={["Standard", "Urgent – court deadline"]} />
            <div className="md:col-span-2">
              <TextArea name="questions" label="Specific questions for the expert" rows={5} value={v.questions} onChange={set("questions")} error={e("questions")} hint="Or attach your letter of instruction in the next step." />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="f-documents" className="field-label">Upload documents (optional)</label>
              <p className="mb-3 text-sm text-navy/65">Letter of instruction, consent form, records or imaging reports. PDF, Word, JPG or PNG, up to 15 MB each and 40 MB in total. You can send more after we acknowledge.</p>
              <input id="f-documents" type="file" multiple accept={UPLOAD.accept} onChange={(ev) => { addFiles(ev.target.files); ev.target.value = ""; }} className="block w-full rounded-xl border border-dashed border-navy/30 bg-mist p-4 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-navy file:px-4 file:py-2 file:font-semibold file:text-white" />
              {fileError && <p className="field-error">{fileError}</p>}
              {files.length > 0 && (
                <ul className="mt-3 divide-y divide-line rounded-xl border border-line">
                  {files.map((f, i) => (
                    <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                      <span className="truncate">{f.name} <span className="text-navy/50">({fmtSize(f.size)})</span></span>
                      <button type="button" className="font-semibold text-coral-deep hover:underline" onClick={() => setFiles(files.filter((_, j) => j !== i))}>Remove</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Check name="consentConfirmed" checked={v.consentConfirmed === "yes"} onChange={(c) => set("consentConfirmed")(c ? "yes" : "")} error={e("consentConfirmed")}>
              I confirm the claimant has consented to the release of their medical records and to the expert examination and report.
            </Check>
            <Check name="termsAccepted" checked={v.termsAccepted === "yes"} onChange={(c) => set("termsAccepted")(c ? "yes" : "")} error={e("termsAccepted")}>
              I accept the <Link href="/solicitors/fees-and-terms" className="link" target="_blank">fees and terms</Link> and have read the <Link href="/privacy" className="link" target="_blank">privacy notice</Link>.
            </Check>
          </div>
        )}

        {status.state === "error" && <p role="alert" className="rounded-xl bg-coral-soft px-4 py-3 font-semibold text-coral-deep">{status.message}</p>}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <button type="button" className="btn-outline" onClick={() => go(step - 1)} disabled={step === 0} aria-disabled={step === 0} style={{ visibility: step === 0 ? "hidden" : "visible" }}>
            ← Back
          </button>
          {step < STEPS.length - 1 ? (
            <button type="button" className="btn-primary" onClick={() => go(step + 1)}>Continue →</button>
          ) : (
            <button type="submit" className="btn-coral" disabled={status.state === "sending"}>
              {status.state === "sending" ? "Sending…" : "Submit instruction"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
