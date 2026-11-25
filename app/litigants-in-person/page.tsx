import Link from "next/link";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Notice, PageHero, Section, TickList } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Medical Reports for Litigants in Person",
  description: "Representing yourself in a shoulder or elbow injury claim? How to obtain an independent medico-legal report, what it costs and what we need.",
  path: "/litigants-in-person",
});

export default function LipPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Litigants in person", href: "/litigants-in-person" }]}
        eyebrow="Representing yourself"
        title="Medical reports for litigants in person"
        intro="If you are bringing or defending a claim without a solicitor, you can still instruct an independent shoulder and elbow expert."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl">What you need to know</h2>
            <div className="mt-4">
              <TickList
                items={[
                  "In most cases you will need the court's permission to rely on expert evidence (CPR 35.4).",
                  "The expert's duty is to the court, not to you, even though you pay the fee.",
                  "We will need your full GP records and any hospital records. You can request these from your GP surgery and hospital with a subject access request, which is normally free.",
                  "Fees are confirmed in writing before any work begins and are payable in advance.",
                ]}
              />
            </div>
            <h2 className="mt-10 text-2xl">Claims through the Official Injury Claim portal</h2>
            <p className="mt-4 leading-relaxed text-navy/80">
              If you were injured in a road traffic accident and are using the Official Injury Claim service, your first medical report must come from a MedCo-accredited expert arranged through the portal. Contact us if a specialist shoulder or elbow opinion is later needed.
            </p>
            <div className="mt-8">
              <Notice>We cannot give legal advice. If you are unsure about the process, Citizens Advice can point you to free help.</Notice>
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-2xl">Ask us about your case</h2>
            <EnquiryForm kind="contact" />
            <p className="mt-4 text-sm text-navy/60">Please do not upload or send medical records until we have confirmed we can help. See our <Link className="link" href="/privacy">privacy notice</Link>.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
