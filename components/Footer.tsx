import Link from "next/link";
import { legalLine, site } from "@/lib/site";
import { locations, services } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white">
      <div className="accent-bar" />
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-horizontal-on-navy.svg" alt="Medicolex – Independent Medico-Legal Experts" width={1295} height={340} className="-ml-3 h-20 w-auto" />
          <p className="mt-4 max-w-sm leading-relaxed text-white/70">
            Consultant-led, CPR Part 35-compliant medico-legal reports for solicitors, with in-person examinations in Leicester, Derby and Rugby.
          </p>
          <div className="mt-6 space-y-1 text-white/85">
            {site.contact.phone && (
              <p>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="font-semibold text-white no-underline hover:underline">{site.contact.phone}</a>
              </p>
            )}
            {site.contact.email && (
              <p>
                <a href={`mailto:${site.contact.email}`} className="font-semibold text-white no-underline hover:underline">{site.contact.email}</a>
              </p>
            )}
            <p className="text-white/60">{site.contact.hours}</p>
          </div>
        </div>

        <FooterCol title="Services" links={services.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))} />
        <FooterCol
          title="Solicitors"
          links={[
            { label: "Instruct an expert", href: "/instruct" },
            { label: "How to instruct", href: "/solicitors/how-to-instruct" },
            { label: "Fees & terms", href: "/solicitors/fees-and-terms" },
            { label: "Service standards", href: "/solicitors/service-standards" },
            { label: "CPR Part 35 & compliance", href: "/solicitors/compliance" },
            { label: "Claimant information", href: "/claimants" },
          ]}
        />
        <FooterCol
          title="Clinics"
          links={[
            ...locations.map((l) => ({ label: l.town, href: `/locations/${l.slug}` })),
            { label: "About Medicolex", href: "/about" },
            { label: "Insights", href: "/insights" },
            { label: "Contact", href: "/contact" },
          ]}
        />
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-4 py-8 text-sm text-white/60 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-3xl leading-relaxed">
            © {year} {site.company.legalName}. {legalLine}
            {site.company.icoNumber && <> ICO registration {site.company.icoNumber}.</>}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              ["Privacy", "/privacy"],
              ["Cookies", "/cookies"],
              ["Terms", "/terms"],
              ["Complaints", "/complaints"],
              ["Accessibility", "/accessibility"],
            ].map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="text-white/70 no-underline hover:text-white hover:underline">{l}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-teal">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-white/80 no-underline hover:text-white hover:underline">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
