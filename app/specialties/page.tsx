import Link from "next/link";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero, Section } from "@/components/ui";
import { specialtiesComingSoon } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Medico-Legal Specialties – Now and Coming Soon",
  description: "Shoulder and elbow medico-legal reports now, with further specialties coming soon to our Leicester, Derby and Rugby clinics. Register your interest.",
  path: "/specialties",
});

export default function SpecialtiesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Specialties", href: "/specialties" }]}
        eyebrow="Specialties"
        title="One local service, more specialties on the way"
        intro="We started with shoulder and elbow surgery. Further specialties are coming to the same Leicester, Derby and Rugby clinics, so you can instruct several experts in one place."
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/services/shoulder-elbow-medico-legal-reports" className="flex flex-col justify-between rounded-2xl bg-navy p-6 text-white no-underline">
            <div>
              <span className="rounded-full bg-teal px-3 py-1 text-xs font-bold text-navy">Available now</span>
              <h2 className="mt-4 text-xl text-white">Shoulder &amp; Elbow Surgery</h2>
              <p className="mt-2 text-white/75">Rotator cuff, instability, fractures, tennis elbow and post-surgical outcomes.</p>
            </div>
            <span className="mt-5 font-semibold text-coral">View service →</span>
          </Link>
          {specialtiesComingSoon.map((s) => (
            <div key={s.name} className="card">
              <span className="rounded-full bg-coral-soft px-3 py-1 text-xs font-bold text-coral-deep">Coming soon</span>
              <h2 className="mt-4 text-xl">{s.name}</h2>
              <p className="mt-2 text-navy/70">{s.line}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-3xl">Be the first to know</h2>
            <p className="mt-4 text-lg leading-relaxed text-navy/75">Tell us which specialties you instruct most often. We will let you know when they launch, and your feedback helps us decide what to add first.</p>
            <p className="mt-6 text-navy/75">Are you a consultant interested in joining? <Link href="/join-our-panel" className="link">Join our expert panel</Link>.</p>
          </div>
          <EnquiryForm kind="interest" />
        </div>
      </Section>
    </>
  );
}
