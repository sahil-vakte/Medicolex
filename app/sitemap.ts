import type { MetadataRoute } from "next";
import { articles, conditions, locations, services } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths: [string, number][] = [
    ["/", 1], ["/services", 0.9], ["/conditions", 0.8], ["/locations", 0.8], ["/instruct", 0.9],
    ["/solicitors/how-to-instruct", 0.8], ["/solicitors/fees-and-terms", 0.7], ["/solicitors/service-standards", 0.6], ["/solicitors/compliance", 0.7],
    ["/claimants", 0.6], ["/litigants-in-person", 0.5], ["/about", 0.6], ["/about/our-experts", 0.8], ["/specialties", 0.6],
    ["/join-our-panel", 0.4], ["/insights", 0.6], ["/contact", 0.7],
    ["/privacy", 0.2], ["/cookies", 0.2], ["/terms", 0.2], ["/complaints", 0.2], ["/accessibility", 0.2],
  ];
  return [
    ...staticPaths.map(([p, priority]) => ({ url: absoluteUrl(p), lastModified: now, priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: now, priority: 0.9 })),
    ...conditions.map((c) => ({ url: absoluteUrl(`/conditions/${c.slug}`), lastModified: now, priority: 0.7 })),
    ...locations.map((l) => ({ url: absoluteUrl(`/locations/${l.slug}`), lastModified: now, priority: 0.9 })),
    ...articles.map((a) => ({ url: absoluteUrl(`/insights/${a.slug}`), lastModified: new Date(a.date), priority: 0.5 })),
  ];
}
