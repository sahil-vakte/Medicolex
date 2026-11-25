import type { Metadata } from "next";
import { site } from "./site";

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_GB",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${site.name} – ${site.tagline}` }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: ["/og-image.png"] },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": ["Organization", "MedicalBusiness"],
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  legalName: site.company.legalName,
  url: site.url,
  logo: absoluteUrl("/brand/logo-horizontal.svg"),
  image: absoluteUrl("/og-image.png"),
  description: site.description,
  slogan: site.tagline,
  areaServed: ["Leicestershire", "Derbyshire", "Warwickshire", "Nottinghamshire", "Northamptonshire", "England", "Wales"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "18 Tynedale Close",
    addressLocality: "Oadby",
    addressRegion: "Leicestershire",
    postalCode: "LE2 4TS",
    addressCountry: "GB",
  },
  ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
  ...(site.contact.email ? { email: site.contact.email } : {}),
  identifier: { "@type": "PropertyValue", propertyID: "Companies House", value: site.company.number },
});
