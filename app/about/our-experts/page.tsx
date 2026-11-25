import Link from "next/link";
import { Mark } from "@/components/Mark";
import { CtaBand, JsonLd, PageHero, Section, TickList } from "@/components/ui";
import { locations } from "@/lib/content";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { experts } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Our Medico-Legal Experts",
  description: "Meet the consultant shoulder and elbow surgeon behind Medicolex medico-legal reports in Leicester, Derby and Rugby.",
  path: "/about/our-experts",
});

export default function ExpertsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", href: "/about" }, { name: "Our experts", href: "/about/our-experts" }]}
        eyebrow="Our experts"
        title="The consultant behind every report"
        intro="Every Medicolex report is written and signed by the expert who examined the claimant."
      />
      {experts.map((x, i) => {
        const facts = [
          x.medicoLegal.yearsExperience && `${x.medicoLegal.yearsExperience} years of medico-legal practice`,
          x.medicoLegal.reportsPerYear && `Around ${x.medicoLegal.reportsPerYear} reports a year`,
          x.medicoLegal.claimantDefendantSplit && `Instructions: ${x.medicoLegal.claimantDefendantSplit}`,
          x.medicoLegal.courtAttendances && x.medicoLegal.courtAttendances,
          ...x.medicoLegal.training,
        ].filter(Boolean) as string[];
        return (
          <Section key={x.slug} tone={i % 2 ? "mist" : "white"}>
            <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
              <div>
                <div className="overflow-hidden rounded-2xl bg-mist">
                  {x.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={x.photo} alt={x.name ?? x.title} className="aspect-[4/5] w-full object-cover" />
                  ) : (
                    <div className="grid aspect-[4/5] place-items-center p-12">
                      <Mark uid={`expert-${x.slug}`} variant="navy" className="w-3/4 opacity-20" />
                    </div>
                  )}
                </div>
                {x.cvPdf && <a href={x.cvPdf} className="btn-outline mt-4 w-full" download>Download medico-legal CV</a>}
              </div>
              <div>
                <p className="eyebrow">{x.specialty}</p>
                <h2 className="mt-2 text-3xl md:text-4xl">{x.name ?? x.title}</h2>
                {x.name && <p className="mt-1 text-lg text-navy/70">{x.title}</p>}
                {x.gmcNumber && <p className="mt-3 text-sm font-semibold text-navy/70">GMC number {x.gmcNumber}</p>}
                {x.bio && <p className="mt-6 text-lg leading-relaxed text-navy/85">{x.bio}</p>}
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg">Medico-legal interests</h3>
                    <div className="mt-3"><TickList items={x.interests} /></div>
                  </div>
                  {facts.length > 0 && (
                    <div>
                      <h3 className="text-lg">Medico-legal experience</h3>
                      <div className="mt-3"><TickList items={facts} /></div>
                    </div>
                  )}
                  {x.qualifications.length > 0 && (
                    <div>
                      <h3 className="text-lg">Qualifications</h3>
                      <div className="mt-3"><TickList items={x.qualifications} /></div>
                    </div>
                  )}
                  {(x.posts.length > 0 || x.memberships.length > 0) && (
                    <div>
                      <h3 className="text-lg">Posts and memberships</h3>
                      <div className="mt-3"><TickList items={[...x.posts, ...x.memberships]} /></div>
                    </div>
                  )}
                </div>
                <p className="mt-8 text-navy/75">
                  Sees claimants in{" "}
                  {x.clinics.map((c, j) => {
                    const l = locations.find((y) => y.slug === c)!;
                    return (
                      <span key={c}>
                        <Link href={`/locations/${c}`} className="link">{l.town}</Link>
                        {j < x.clinics.length - 2 ? ", " : j === x.clinics.length - 2 ? " and " : "."}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
            {x.name && (
              <JsonLd
                data={{
                  "@context": "https://schema.org",
                  "@type": "Physician",
                  name: x.name,
                  medicalSpecialty: "Musculoskeletal",
                  description: `${x.title}, ${x.specialty}`,
                  memberOf: { "@id": absoluteUrl("/#organization") },
                  url: absoluteUrl("/about/our-experts"),
                }}
              />
            )}
          </Section>
        );
      })}
      <CtaBand />
    </>
  );
}
