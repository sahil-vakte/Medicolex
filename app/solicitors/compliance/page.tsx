import Link from "next/link";
import { CtaBand, PageHero, Section, TickList } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "CPR Part 35 Compliance & Data Protection",
  description: "How Medicolex reports comply with CPR Part 35 and Practice Direction 35, and how we protect claimants' medical data.",
  path: "/solicitors/compliance",
});

export default function CompliancePage() {
  const c = site.company;
  return (
    <>
      <PageHero
        crumbs={[{ name: "For solicitors", href: "/solicitors/how-to-instruct" }, { name: "CPR Part 35 & compliance", href: "/solicitors/compliance" }]}
        eyebrow="Compliance"
        title="CPR Part 35, independence and data protection"
        intro="Expert evidence is only useful if the court can rely on it. These are the commitments behind every Medicolex report."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl">Our duty is to the court</h2>
            <p className="mt-4 leading-relaxed text-navy/80">
              Under CPR Part 35, an expert&apos;s overriding duty is to help the court on matters within their expertise. That duty overrides any obligation to the person who instructs or pays them. Our experts give independent, objective opinions and do not act as advocates for either party.
            </p>
            <h3 className="mt-8 text-lg">Every report:</h3>
            <div className="mt-4">
              <TickList
                items={[
                  "Is addressed to the court",
                  "Sets out the expert's qualifications and the material instructions",
                  "Identifies the documents and literature relied on",
                  "Explains the range of opinion where it exists, and the reasons for the expert's own",
                  "Ends with a statement of compliance and a statement of truth",
                ]}
              />
            </div>
            <p className="mt-6 text-navy/75">
              We also answer written questions under CPR 35.6 and take part in experts&apos; discussions and joint statements as directed.
            </p>
          </div>
          <div>
            <h2 className="text-2xl">Professional standards</h2>
            <div className="mt-4">
              <TickList
                items={[
                  "Experts are registered with the General Medical Council and follow its guidance on providing expert evidence",
                  "Experts report within their own area of practice",
                  `Professional indemnity cover for medico-legal work${c.indemnityInsurer ? ` (${c.indemnityInsurer})` : ""}`,
                  "Conflict-of-interest check on every instruction",
                  "Instructions accepted from claimants, defendants and as single joint expert",
                ]}
              />
            </div>
            <h2 className="mt-12 text-2xl">Protecting medical data</h2>
            <div className="mt-4">
              <TickList
                items={[
                  `Registered with the Information Commissioner's Office${c.icoNumber ? ` (registration ${c.icoNumber})` : ""}`,
                  "Records received by secure upload or encrypted email only",
                  "Stored on UK-based systems with restricted, role-based access",
                  "Retained only as long as needed, then securely deleted",
                  "Processed in line with UK GDPR and the Data Protection Act 2018",
                ]}
              />
            </div>
            <p className="mt-6 text-navy/75">Read our <Link href="/privacy" className="link">privacy notice</Link>.</p>
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <h2 className="text-2xl">MedCo and the whiplash reforms</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-navy/80">
          Initial fixed-cost medical reports in road traffic soft-tissue and whiplash claims must be obtained from a MedCo-accredited expert selected through the MedCo portal.{" "}
          {site.medcoAccredited
            ? "Our expert is MedCo accredited and can be selected through the portal."
            : "Medicolex provides consultant shoulder and elbow reports where specialist opinion is needed, including further reports and claims outside the whiplash rules."}
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
