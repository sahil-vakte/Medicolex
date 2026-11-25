import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, JsonLd, Notice, PageHero, Section } from "@/components/ui";
import { articles } from "@/lib/content";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.summary, path: `/insights/${a.slug}` });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== a.slug);
  return (
    <>
      <PageHero crumbs={[{ name: "Insights", href: "/insights" }, { name: a.title, href: `/insights/${a.slug}` }]} eyebrow={formatDate(a.date)} title={a.title} intro={a.summary} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <article className="max-w-prose">
            {a.body.map((b, i) => (
              <div key={i} className={i ? "mt-8" : ""}>
                {b.h && <h2 className="text-2xl">{b.h}</h2>}
                <p className={`${b.h ? "mt-3" : ""} text-lg leading-relaxed text-navy/85`}>{b.p}</p>
              </div>
            ))}
            <div className="mt-10"><Notice>This article is general information for legal professionals and is not legal or medical advice.</Notice></div>
          </article>
          <aside className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-teal-deep">More insights</h2>
            {more.map((m) => (
              <Link key={m.slug} href={`/insights/${m.slug}`} className="card block font-semibold text-navy no-underline hover:border-teal/50">{m.title}</Link>
            ))}
          </aside>
        </div>
      </Section>
      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.summary,
          datePublished: a.date,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@id": absoluteUrl("/#organization") },
          mainEntityOfPage: absoluteUrl(`/insights/${a.slug}`),
          image: absoluteUrl("/og-image.png"),
        }}
      />
    </>
  );
}
