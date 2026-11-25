import Link from "next/link";
import { Mark } from "@/components/Mark";
import { CtaBand, PageHero, Section, TickList } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Medicolex",
  description: "Medicolex is the independent medico-legal reporting service of Aranath Medicolegal Limited, providing consultant-led reports from clinics in Leicester, Derby and Rugby.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", href: "/about" }]}
        eyebrow="About us"
        title="Specialist expert evidence, close to home"
        intro="Medicolex was set up to give solicitors in the Midlands a specialist alternative to national agencies: a named consultant, local clinics and clear terms."
      />
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-navy/85">
            <p>
              Medicolex is the medico-legal reporting service of {site.company.legalName}. We provide independent, consultant-led expert reports for personal injury and clinical negligence claims, starting with shoulder and elbow injuries.
            </p>
            <p>
              Claimants are seen in person at our clinics in Leicester, Derby and Rugby. Solicitors deal directly with our team, and every report is written and signed by the expert who examined the claimant.
            </p>
            <p>
              Our name brings together medicine and law, and our mark shows them in balance: the cross of medicine holding the scales of justice. That balance is the heart of independent expert evidence.
            </p>
          </div>
          <div className="rounded-[2rem] bg-mist p-10">
            <Mark uid="about" className="mx-auto w-full max-w-[260px]" />
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["Independent", "Our duty is to the court. We accept instructions from claimants, defendants and jointly, and our opinions follow the evidence."],
            ["Specialist", "Experts report only within their own area of everyday practice, starting with shoulder and elbow surgery."],
            ["Local and reliable", "Clinics in Leicester, Derby and Rugby, one named contact and published service standards."],
          ].map(([t, b]) => (
            <div key={t} className="card">
              <h2 className="text-xl">{t}</h2>
              <p className="mt-2 leading-relaxed text-navy/75">{b}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl">Company information</h2>
            <dl className="mt-4 space-y-2 text-navy/85">
              <div><dt className="inline font-semibold">Legal name: </dt><dd className="inline">{site.company.legalName}</dd></div>
              <div><dt className="inline font-semibold">Company number: </dt><dd className="inline">{site.company.number}, registered in {site.company.registeredIn}</dd></div>
              <div><dt className="inline font-semibold">Registered office: </dt><dd className="inline">{site.company.registeredOffice}</dd></div>
              {site.company.icoNumber && <div><dt className="inline font-semibold">ICO registration: </dt><dd className="inline">{site.company.icoNumber}</dd></div>}
              {site.company.vatNumber && <div><dt className="inline font-semibold">VAT number: </dt><dd className="inline">{site.company.vatNumber}</dd></div>}
            </dl>
          </div>
          <div>
            <h2 className="text-2xl">Find out more</h2>
            <div className="mt-4"><TickList items={["Meet our expert", "Read our compliance commitments", "See the specialties coming soon"]} /></div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/about/our-experts" className="btn-primary">Our experts</Link>
              <Link href="/solicitors/compliance" className="btn-outline">Compliance</Link>
            </div>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
