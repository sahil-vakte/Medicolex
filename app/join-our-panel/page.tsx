import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero, Section, TickList } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Join Our Medico-Legal Expert Panel",
  description: "Consultants and clinicians in the East Midlands and Warwickshire: join the Medicolex medico-legal expert panel.",
  path: "/join-our-panel",
});

export default function PanelPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", href: "/about" }, { name: "Join our panel", href: "/join-our-panel" }]}
        eyebrow="For clinicians"
        title="Join our expert panel"
        intro="We are building a multi-specialty panel of consultants and clinicians who see claimants at our Leicester, Derby and Rugby clinics."
      />
      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl">What we offer</h2>
              <div className="mt-4"><TickList items={["Booked clinics close to where you work", "Instruction, records and admin handled for you", "Report templates aligned to CPR Part 35", "Clear, prompt payment terms"]} /></div>
            </div>
            <div>
              <h2 className="text-2xl">What we look for</h2>
              <div className="mt-4"><TickList items={["GMC specialist registration and current practice in your field", "Medico-legal training, or willingness to complete it", "Professional indemnity covering medico-legal work", "Commitment to independent, well-reasoned, timely reports"]} /></div>
            </div>
          </div>
          <EnquiryForm kind="panel" />
        </div>
      </Section>
    </>
  );
}
