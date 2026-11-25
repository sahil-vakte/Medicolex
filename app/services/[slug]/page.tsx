import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, JsonLd, PageHero, Section, TickList } from "@/components/ui";
import { conditions, reportContents, services } from "@/lib/content";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHero crumbs={[{ name: "Services", href: "/services" }, { name: s.name, href: `/services/${s.slug}` }]} eyebrow="Service" title={s.name} intro={s.short}>
        <Link href="/instruct" className="btn-coral">Instruct an expert</Link>
        <Link href="/contact" className="btn-ghost-light">Ask a question</Link>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xl leading-relaxed text-navy/85">{s.intro}</p>
            <h2 className="mt-12 text-2xl">When to instruct</h2>
            <div className="mt-5"><TickList items={s.whenToUse} /></div>
            <h2 className="mt-12 text-2xl">What&apos;s included</h2>
            <div className="mt-5"><TickList items={s.includes} /></div>
          </div>
          <aside className="space-y-6">
            <div className="card">
              <h2 className="text-lg">Claim types</h2>
              <p className="mt-3 flex flex-wrap gap-2">
                {s.claimTypes.map((c) => <span key={c} className="rounded-full bg-mist px-3 py-1 text-sm font-semibold">{c}</span>)}
              </p>
            </div>
            <div className="card">
              <h2 className="text-lg">Clinics</h2>
              <ul className="mt-3 space-y-2">
                {["leicester", "derby", "rugby"].map((l) => (
                  <li key={l}><Link href={`/locations/${l}`} className="link capitalize">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-navy p-6 text-white">
              <h2 className="text-lg text-white">Fees</h2>
              <p className="mt-2 text-white/75">Clear, itemised fees with the expert fee, any records fee and VAT shown separately.</p>
              <Link href="/solicitors/fees-and-terms" className="mt-4 inline-block font-semibold text-coral no-underline hover:underline">Fees &amp; terms →</Link>
            </div>
          </aside>
        </div>
      </Section>

      {s.slug === "shoulder-elbow-medico-legal-reports" && (
        <>
          <Section tone="mist">
            <h2 className="text-3xl">What every report covers</h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {reportContents.map((r, i) => (
                <li key={r} className="flex gap-4 rounded-xl border border-line bg-white p-5">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-navy text-sm font-bold text-white">{i + 1}</span>
                  <span className="leading-relaxed">{r}</span>
                </li>
              ))}
            </ol>
          </Section>
          <Section>
            <h2 className="text-3xl">Conditions we report on</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {conditions.map((c) => (
                <Link key={c.slug} href={`/conditions/${c.slug}`} className="rounded-xl border border-line p-4 font-semibold text-navy no-underline hover:border-teal/60 hover:text-teal-deep">
                  {c.name}
                </Link>
              ))}
            </div>
          </Section>
        </>
      )}

      <Section tone={s.slug === "shoulder-elbow-medico-legal-reports" ? "mist" : "white"}>
        <h2 className="text-2xl">Related services</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <Link key={o.slug} href={`/services/${o.slug}`} className="card no-underline hover:border-teal/50">
              <h3 className="text-base">{o.name}</h3>
              <p className="mt-2 text-sm text-navy/70">{o.short}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          description: s.metaDescription,
          serviceType: "Medico-legal expert report",
          provider: { "@id": absoluteUrl("/#organization") },
          areaServed: ["Leicester", "Derby", "Rugby", "England", "Wales"],
          url: absoluteUrl(`/services/${s.slug}`),
          brand: site.name,
        }}
      />
    </>
  );
}
