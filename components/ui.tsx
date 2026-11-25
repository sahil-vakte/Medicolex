import Link from "next/link";
import type { ReactNode } from "react";
import { absoluteUrl } from "@/lib/seo";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-sm ${light ? "text-white/70" : "text-navy/60"}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className={light ? "text-white" : "text-navy"}>{c.name}</span>
              ) : (
                <Link href={c.href} className="no-underline hover:underline">{c.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.href) })),
        }}
      />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-40 h-72 w-72 rounded-full bg-coral/10 blur-3xl" />
      <div className="container relative py-14 md:py-20">
        <Breadcrumbs items={crumbs} light />
        {eyebrow && <p className="eyebrow-light mt-8">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl text-white md:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
      <div className="accent-bar" />
    </section>
  );
}

export function Section({ children, className = "", tone = "white", id }: { children: ReactNode; className?: string; tone?: "white" | "mist" | "navy"; id?: string }) {
  const bg = tone === "mist" ? "bg-mist" : tone === "navy" ? "bg-navy text-white" : "bg-white";
  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className="container py-16 md:py-20">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, light = false, center = false }: { eyebrow?: string; title: string; intro?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={light ? "eyebrow-light" : "eyebrow"}>{eyebrow}</p>}
      <h2 className={`mt-3 text-3xl md:text-4xl ${light ? "text-white" : ""}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/75" : "text-navy/75"}`}>{intro}</p>}
    </div>
  );
}

export function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-5 w-5 flex-none ${className}`} aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#E6F8F7" />
      <path d="M6 10.5l2.5 2.5L14 7.5" fill="none" stroke="#007A74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TickList({ items, light = false }: { items: string[]; light?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className={`flex gap-3 leading-relaxed ${light ? "text-white/85" : "text-navy/85"}`}>
          <Tick className="mt-0.5" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({
  title = "Ready to instruct a shoulder and elbow expert?",
  body = "Send your instruction online in a few minutes, or ask for fees and availability first.",
}: { title?: string; body?: string }) {
  return (
    <section className="bg-white">
      <div className="container py-16">
        <div className="relative overflow-hidden rounded-2xl bg-navy px-8 py-12 text-white md:px-14">
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-coral/15 blur-2xl" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl text-white">{title}</h2>
              <p className="mt-3 text-white/75">{body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/instruct" className="btn-coral">Instruct an expert</Link>
              <Link href="/contact" className="btn-ghost-light">Request fees &amp; availability</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items, withSchema = true }: { items: { q: string; a: string }[]; withSchema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line rounded-2xl border border-line bg-white">
        {items.map((f) => (
          <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold text-navy">
              {f.q}
              <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-mist text-xl text-navy transition group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 max-w-prose leading-relaxed text-navy/80">{f.a}</p>
          </details>
        ))}
      </div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
    </>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose prose-lg max-w-prose prose-headings:font-extrabold prose-headings:text-navy prose-p:text-navy/85 prose-li:text-navy/85 prose-a:text-teal-deep prose-strong:text-navy">
      {children}
    </div>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-teal/30 bg-teal-soft px-5 py-4 text-[15px] leading-relaxed text-navy">{children}</div>;
}
