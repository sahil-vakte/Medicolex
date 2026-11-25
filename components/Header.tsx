"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const nav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Shoulder & elbow reports", href: "/services/shoulder-elbow-medico-legal-reports" },
      { label: "Personal injury", href: "/services/personal-injury-reports" },
      { label: "Clinical negligence", href: "/services/clinical-negligence-reports" },
      { label: "Records-only reviews", href: "/services/records-review" },
      { label: "Addenda, Part 35 & court", href: "/services/supplementary-reports" },
      { label: "Specialties coming soon", href: "/specialties" },
    ],
  },
  { label: "Conditions", href: "/conditions" },
  {
    label: "Locations",
    href: "/locations",
    children: [
      { label: "Leicester", href: "/locations/leicester" },
      { label: "Derby", href: "/locations/derby" },
      { label: "Rugby", href: "/locations/rugby" },
    ],
  },
  {
    label: "For solicitors",
    href: "/solicitors/how-to-instruct",
    children: [
      { label: "How to instruct", href: "/solicitors/how-to-instruct" },
      { label: "Fees & terms", href: "/solicitors/fees-and-terms" },
      { label: "Service standards", href: "/solicitors/service-standards" },
      { label: "CPR Part 35 & compliance", href: "/solicitors/compliance" },
      { label: "Litigants in person", href: "/litigants-in-person" },
      { label: "Information for claimants", href: "/claimants" },
    ],
  },
  { label: "About", href: "/about", children: [{ label: "About Medicolex", href: "/about" }, { label: "Our experts", href: "/about/our-experts" }, { label: "Join our panel", href: "/join-our-panel" }] },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

function Chevron() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
      <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("/").slice(0, 2).join("/")));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="container flex h-[76px] items-center justify-between gap-6">
        <Link href="/" className="flex-none" aria-label="Medicolex home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-horizontal-no-tagline.svg" alt="Medicolex" width={1295} height={340} className="h-12 w-auto md:h-[52px]" />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-semibold no-underline transition-colors hover:bg-mist ${isActive(item.href) ? "text-teal-deep" : "text-navy"}`}
                  aria-haspopup={item.children ? "true" : undefined}
                >
                  {item.label}
                  {item.children && <Chevron />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="w-64 rounded-xl border border-line bg-white p-2 shadow-card">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block rounded-lg px-3 py-2 text-[15px] text-navy no-underline hover:bg-mist">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/instruct" className="btn-primary hidden sm:inline-flex">Instruct an expert</Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-line xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[77px] overflow-y-auto bg-white xl:hidden">
          <nav aria-label="Mobile" className="container py-6">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.label} className="border-b border-line py-2">
                  <Link href={item.href} className="block py-2 text-lg font-bold text-navy no-underline">
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mb-2 ml-3 space-y-1">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block py-1.5 text-navy/75 no-underline">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Link href="/instruct" className="btn-primary mt-6 w-full">Instruct an expert</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
