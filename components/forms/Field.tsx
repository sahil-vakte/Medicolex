"use client";

import type { ReactNode } from "react";

type Base = { name: string; label: string; error?: string; hint?: string; required?: boolean };

export function Text({ name, label, error, hint, required, type = "text", value, onChange, autoComplete, placeholder }: Base & {
  type?: string; value: string; onChange: (v: string) => void; autoComplete?: string; placeholder?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}{required && <span className="text-coral-deep"> *</span>}</label>
      <input
        id={id} name={name} type={type} value={value} onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete} placeholder={placeholder}
        aria-invalid={!!error} aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className={`field ${error ? "border-coral-deep" : ""}`}
      />
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-sm text-navy/60">{hint}</p>}
      {error && <p id={`${id}-err`} className="field-error">{error}</p>}
    </div>
  );
}

export function TextArea({ name, label, error, hint, required, value, onChange, rows = 4 }: Base & { value: string; onChange: (v: string) => void; rows?: number }) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}{required && <span className="text-coral-deep"> *</span>}</label>
      <textarea
        id={id} name={name} rows={rows} value={value} onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error} aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className={`field ${error ? "border-coral-deep" : ""}`}
      />
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-sm text-navy/60">{hint}</p>}
      {error && <p id={`${id}-err`} className="field-error">{error}</p>}
    </div>
  );
}

export function Select({ name, label, error, required, value, onChange, options }: Base & { value: string; onChange: (v: string) => void; options: string[] }) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}{required && <span className="text-coral-deep"> *</span>}</label>
      <select
        id={id} name={name} value={value} onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
        className={`field ${error ? "border-coral-deep" : ""}`}
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p id={`${id}-err`} className="field-error">{error}</p>}
    </div>
  );
}

export function Check({ name, error, checked, onChange, children }: { name: string; error?: string; checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer gap-3 text-[15px] leading-relaxed text-navy">
        <input id={id} name={name} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-5 w-5 flex-none rounded border-line accent-[#0B1F3A]" aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} />
        <span>{children}</span>
      </label>
      {error && <p id={`${id}-err`} className="field-error ml-8">{error}</p>}
    </div>
  );
}

export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
    </div>
  );
}
