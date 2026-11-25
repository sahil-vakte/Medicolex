import Link from "next/link";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero, Section } from "@/components/ui";
import { locations } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { legalLine, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact Medicolex about shoulder and elbow medico-legal reports, fees and availability in Leicester, Derby and Rugby.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", href: "/contact" }]}
        eyebrow="Contact"
        title="Talk to us"
        intro="Ask about fees, availability or whether a case is suitable. To instruct straight away, use our online instruction form."
      >
        <Link href="/instruct" className="btn-coral">Instruct an expert</Link>
      </PageHero>
      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <EnquiryForm kind="contact" />
          <aside className="space-y-6">
            <div className="card">
              <h2 className="text-lg">Get in touch</h2>
              <dl className="mt-4 space-y-3 text-navy/85">
                {site.contact.phone && (
                  <div><dt className="text-sm font-semibold text-navy/60">Phone</dt><dd><a className="link" href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a></dd></div>
                )}
                {site.contact.email && (
                  <div><dt className="text-sm font-semibold text-navy/60">Email</dt><dd><a className="link" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></dd></div>
                )}
                <div><dt className="text-sm font-semibold text-navy/60">Office hours</dt><dd>{site.contact.hours}</dd></div>
                <div><dt className="text-sm font-semibold text-navy/60">Registered office</dt><dd>{site.company.registeredOffice}</dd></div>
              </dl>
            </div>
            <div className="card">
              <h2 className="text-lg">Clinics</h2>
              <ul className="mt-3 space-y-2">
                {locations.map((l) => <li key={l.slug}><Link className="link" href={`/locations/${l.slug}`}>{l.town}, {l.county}</Link></li>)}
              </ul>
              <p className="mt-4 text-sm text-navy/60">The registered office is not a clinic. Claimants receive the venue address with their appointment.</p>
            </div>
            <p className="text-sm leading-relaxed text-navy/60">{legalLine}</p>
          </aside>
        </div>
      </Section>
    </>
  );
}
