import Link from "next/link";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { locations } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Medico-Legal Clinics in Leicester, Derby and Rugby",
  description: "In-person shoulder and elbow medico-legal examinations at clinics in Leicester, Derby and Rugby, covering the East Midlands and Warwickshire.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Locations", href: "/locations" }]}
        eyebrow="Clinics"
        title="Examinations in Leicester, Derby and Rugby"
        intro="Claimants are seen in person at the clinic nearest to them. Solicitors anywhere in England and Wales can instruct us."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {locations.map((l) => (
            <Link key={l.slug} href={`/locations/${l.slug}`} className="card group no-underline hover:border-teal/50">
              <p className="eyebrow">{l.county}</p>
              <h2 className="mt-2 text-3xl">{l.town}</h2>
              <p className="mt-3 leading-relaxed text-navy/75">{l.intro}</p>
              <p className="mt-4 text-sm text-navy/60">Covers: {l.catchment.join(", ")}</p>
              <span className="mt-5 inline-block font-semibold text-teal-deep">Clinic details →</span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
