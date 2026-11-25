import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, JsonLd, Notice, PageHero, Section, TickList } from "@/components/ui";
import { locations } from "@/lib/content";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const l = locations.find((x) => x.slug === slug);
  if (!l) return {};
  return pageMetadata({
    title: `Shoulder & Elbow Medico-Legal Expert in ${l.town}`,
    description: `Consultant shoulder and elbow medico-legal examinations in ${l.town}, ${l.county}. CPR Part 35-compliant reports for solicitors, covering ${l.catchment.slice(1, 4).join(", ")} and nearby.`,
    path: `/locations/${l.slug}`,
  });
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const l = locations.find((x) => x.slug === slug);
  if (!l) notFound();

  return (
    <>
      <PageHero
        crumbs={[{ name: "Locations", href: "/locations" }, { name: l.town, href: `/locations/${l.slug}` }]}
        eyebrow={`${l.county} clinic`}
        title={`Shoulder and elbow medico-legal expert in ${l.town}`}
        intro={l.intro}
      >
        <Link href={`/instruct?clinic=${l.slug}`} className="btn-coral">Instruct for {l.town}</Link>
        <Link href="/contact" className="btn-ghost-light">Check availability</Link>
      </PageHero>
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="card">
            <h2 className="text-2xl">Clinic venue</h2>
            {l.venue ? (
              <div className="mt-4 space-y-2 text-navy/85">
                <p className="font-semibold">{l.venue.name}</p>
                <p>{l.venue.address}, {l.venue.postcode}</p>
                <p><span className="font-semibold">Parking:</span> {l.venue.parking}</p>
                <p><span className="font-semibold">Access:</span> {l.venue.access}</p>
                {l.venue.mapUrl && <a href={l.venue.mapUrl} className="link" target="_blank" rel="noopener noreferrer">View on map</a>}
              </div>
            ) : (
              <div className="mt-4">
                <Notice>The full venue address is confirmed in your client&apos;s appointment letter, together with directions, parking and accessibility information.</Notice>
              </div>
            )}
            <h3 className="mt-8 text-lg">Getting there</h3>
            <div className="mt-3"><TickList items={l.travel} /></div>
          </div>
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl">Areas we cover from {l.town}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {l.catchment.map((c) => <li key={c} className="rounded-full bg-mist px-3 py-1.5 text-sm font-semibold">{c}</li>)}
              </ul>
            </div>
            <div className="card">
              <h2 className="text-2xl">Local courts</h2>
              <p className="mt-2 text-navy/75">Civil claims from this area are commonly heard at:</p>
              <div className="mt-4"><TickList items={l.courts} /></div>
            </div>
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <h2 className="text-3xl">What we offer in {l.town}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Condition and prognosis reports", "/services/shoulder-elbow-medico-legal-reports"],
            ["Clinical negligence reports", "/services/clinical-negligence-reports"],
            ["Addenda, Part 35 answers and court", "/services/supplementary-reports"],
          ].map(([t, h]) => (
            <Link key={h} href={h} className="card font-semibold text-navy no-underline hover:border-teal/50">{t} →</Link>
          ))}
        </div>
      </Section>
      <CtaBand title={`Instructing for a claimant near ${l.town}?`} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: `${site.name} ${l.town} clinic`,
          parentOrganization: { "@id": absoluteUrl("/#organization") },
          url: absoluteUrl(`/locations/${l.slug}`),
          medicalSpecialty: "Musculoskeletal",
          areaServed: l.catchment,
          ...(l.venue
            ? { address: { "@type": "PostalAddress", streetAddress: l.venue.address, postalCode: l.venue.postcode, addressLocality: l.town, addressCountry: "GB" } }
            : { address: { "@type": "PostalAddress", addressLocality: l.town, addressRegion: l.county, addressCountry: "GB" } }),
        }}
      />
    </>
  );
}
