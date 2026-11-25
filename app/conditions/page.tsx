import Link from "next/link";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { conditions } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shoulder & Elbow Conditions – Medico-Legal Reports",
  description: "Rotator cuff tears, dislocation, frozen shoulder, fractures, tennis elbow and more: shoulder and elbow conditions covered by our medico-legal reports.",
  path: "/conditions",
});

export default function ConditionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Conditions", href: "/conditions" }]}
        eyebrow="Conditions"
        title="Shoulder and elbow conditions we report on"
        intro="Each condition raises its own questions of diagnosis, causation and prognosis. These pages explain what our expert looks at."
      />
      {(["Shoulder", "Elbow"] as const).map((g, gi) => (
        <Section key={g} tone={gi ? "mist" : "white"}>
          <h2 className="text-3xl">{g}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {conditions.filter((c) => c.group === g).map((c) => (
              <Link key={c.slug} href={`/conditions/${c.slug}`} className="card group no-underline hover:border-teal/50">
                <h3 className="text-xl">{c.name}</h3>
                <p className="mt-2 leading-relaxed text-navy/70">{c.summary}</p>
                <span className="mt-4 inline-block font-semibold text-teal-deep">Read more →</span>
              </Link>
            ))}
          </div>
        </Section>
      ))}
      <CtaBand />
    </>
  );
}
