import Link from "next/link";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { articles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights for Solicitors",
  description: "Practical guidance on shoulder and elbow medico-legal evidence: instructing experts, causation, the intermediate track and more.",
  path: "/insights",
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default function InsightsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", href: "/insights" }]}
        eyebrow="Insights"
        title="Practical guidance on upper-limb expert evidence"
        intro="Short, practical articles for fee earners and solicitors handling shoulder and elbow claims."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.slug} href={`/insights/${a.slug}`} className="card group flex flex-col no-underline hover:border-teal/50">
              <time dateTime={a.date} className="text-sm font-semibold text-teal-deep">{formatDate(a.date)}</time>
              <h2 className="mt-3 text-xl leading-snug">{a.title}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-navy/70">{a.summary}</p>
              <span className="mt-5 font-semibold text-teal-deep">Read article →</span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
