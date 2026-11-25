import Link from "next/link";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { services, specialtiesComingSoon } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Medico-Legal Reporting Services",
  description: "Shoulder and elbow medico-legal reports for personal injury and clinical negligence: condition and prognosis, records reviews, addenda, Part 35 answers and court attendance.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services" }]}
        eyebrow="Services"
        title="Medico-legal reports for every stage of the claim"
        intro="Consultant shoulder and elbow evidence for claimants, defendants and single joint instructions, from first report to trial."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card group no-underline hover:border-teal/50">
              <h2 className="text-2xl">{s.name}</h2>
              <p className="mt-3 leading-relaxed text-navy/75">{s.short}</p>
              <p className="mt-4 flex flex-wrap gap-2">
                {s.claimTypes.map((c) => (
                  <span key={c} className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-navy/80">{c}</span>
                ))}
              </p>
              <span className="mt-5 inline-block font-semibold text-teal-deep">Learn more →</span>
            </Link>
          ))}
        </div>
      </Section>
      <Section tone="mist">
        <h2 className="text-3xl">Specialties coming soon</h2>
        <p className="mt-3 max-w-2xl text-lg text-navy/75">We are adding further specialties at the same Leicester, Derby and Rugby clinics.</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {specialtiesComingSoon.map((s) => (
            <li key={s.name} className="rounded-xl border border-line bg-white p-4">
              <p className="font-bold">{s.name}</p>
              <p className="mt-1 text-sm text-navy/65">{s.line}</p>
            </li>
          ))}
        </ul>
        <Link href="/specialties" className="btn-outline mt-8">Register your interest</Link>
      </Section>
      <CtaBand />
    </>
  );
}
