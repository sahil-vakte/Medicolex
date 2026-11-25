import Link from "next/link";
import { Faq, Notice, PageHero, Section, TickList } from "@/components/ui";
import { locations } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Information for Claimants – Your Medical Appointment",
  description: "What to expect at your independent medical examination with Medicolex in Leicester, Derby or Rugby: what to bring, how long it takes and your privacy.",
  path: "/claimants",
});

const faqs = [
  { q: "Is the doctor treating me?", a: "No. The doctor is an independent expert asked by your solicitor to assess your injury for your claim. They will not provide treatment, but you should continue to see your own GP or specialist as normal." },
  { q: "Can I bring someone with me?", a: "Yes. You are welcome to bring a friend or relative. You can also ask for a chaperone during the examination." },
  { q: "What if I need an interpreter?", a: "Tell your solicitor or us when booking and we will arrange a professional interpreter. Please do not rely on a family member to interpret." },
  { q: "What if I cannot attend?", a: "Contact us or your solicitor as early as possible so we can rebook. Missed appointments without notice can cause delays to your claim and may incur a charge." },
  { q: "Will I see the report?", a: "The report is sent to your solicitor, who will normally share it with you and check the facts in it with you." },
];

export default function ClaimantsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Information for claimants", href: "/claimants" }]}
        eyebrow="For claimants"
        title="Your medical appointment"
        intro="Your solicitor has asked an independent doctor to assess your injury. Here is what to expect, so you can arrive prepared."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl">What happens at the appointment</h2>
            <p className="mt-4 leading-relaxed text-navy/80">
              The doctor will ask how the accident happened, how your injury has affected you and what treatment you have had. They will then examine the injured area, for example by checking how far your shoulder or elbow moves and how strong it is. The appointment usually takes 30 to 45 minutes.
            </p>
            <p className="mt-4 leading-relaxed text-navy/80">
              The doctor is independent. Their duty is to give an honest, objective opinion to the court, whichever side has instructed them.
            </p>
            <h2 className="mt-10 text-2xl">Please bring</h2>
            <div className="mt-4"><TickList items={["Photo ID, such as a passport or driving licence", "Your appointment letter", "A list of your current medicines", "Any scans, hospital letters or photos of the injury you have", "Glasses or hearing aids if you use them"]} /></div>
          </div>
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl">Where you will be seen</h2>
              <p className="mt-2 text-navy/75">Your appointment letter gives the full address, directions and parking information.</p>
              <ul className="mt-4 space-y-2">{locations.map((l) => <li key={l.slug}><Link href={`/locations/${l.slug}`} className="link">{l.town} clinic</Link></li>)}</ul>
            </div>
            <div className="card">
              <h2 className="text-xl">Accessibility</h2>
              <p className="mt-2 text-navy/75">Tell us in advance about mobility needs, hearing or sight impairment, or anything else that would help, and we will make arrangements.</p>
            </div>
            <Notice>Your medical information is confidential and handled securely. Read our <Link href="/privacy" className="link">privacy notice</Link>.</Notice>
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <h2 className="text-3xl">Common questions</h2>
        <div className="mt-8 max-w-3xl"><Faq items={faqs} /></div>
      </Section>
    </>
  );
}
