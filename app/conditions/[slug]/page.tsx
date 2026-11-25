import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, Notice, PageHero, Section, TickList } from "@/components/ui";
import { conditions } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = conditions.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.name} – Medico-Legal Expert Report`,
    description: `Independent medico-legal reports on ${c.name.toLowerCase()}: diagnosis, causation and prognosis from a consultant shoulder and elbow expert in Leicester, Derby and Rugby.`,
    path: `/conditions/${c.slug}`,
  });
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params;
  const c = conditions.find((x) => x.slug === slug);
  if (!c) notFound();
  const related = conditions.filter((x) => x.group === c.group && x.slug !== c.slug).slice(0, 4);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Conditions", href: "/conditions" }, { name: c.name, href: `/conditions/${c.slug}` }]}
        eyebrow={`${c.group} · Medico-legal reports`}
        title={c.name}
        intro={c.summary}
      >
        <Link href="/instruct" className="btn-coral">Instruct an expert</Link>
      </PageHero>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl">About this injury</h2>
            <p className="mt-4 text-lg leading-relaxed text-navy/85">{c.whatItIs}</p>
            <h2 className="mt-12 text-2xl">How our expert assesses it</h2>
            <div className="mt-5"><TickList items={c.assessment} /></div>
            <h2 className="mt-12 text-2xl">Causation questions we address</h2>
            <div className="mt-5"><TickList items={c.causation} /></div>
            <h2 className="mt-12 text-2xl">Prognosis themes</h2>
            <div className="mt-5"><TickList items={c.prognosis} /></div>
            <div className="mt-12">
              <Notice>
                This page is general information for legal professionals. It is not medical advice, and every report is based on the individual claimant&apos;s history, examination and records.
              </Notice>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="card">
              <h2 className="text-lg">Typical claim types</h2>
              <p className="mt-3 flex flex-wrap gap-2">
                {c.claimTypes.map((t) => <span key={t} className="rounded-full bg-mist px-3 py-1 text-sm font-semibold">{t}</span>)}
              </p>
            </div>
            <div className="card">
              <h2 className="text-lg">Related conditions</h2>
              <ul className="mt-3 space-y-2">
                {related.map((r) => <li key={r.slug}><Link href={`/conditions/${r.slug}`} className="link">{r.name}</Link></li>)}
              </ul>
            </div>
            <div className="card">
              <h2 className="text-lg">Helpful records to send</h2>
              <TickList items={["Full GP records", "A&E and fracture clinic notes", "Imaging reports (and images if available)", "Operation notes and physiotherapy records"]} />
            </div>
          </aside>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
