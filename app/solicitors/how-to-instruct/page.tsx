import Link from "next/link";
import { CtaBand, Notice, PageHero, Section, SectionHeading, TickList } from "@/components/ui";
import { processSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "How to Instruct a Shoulder & Elbow Medico-Legal Expert",
  description: "How to instruct Medicolex: what to send, timescales, consent and records, for shoulder and elbow medico-legal reports in Leicester, Derby and Rugby.",
  path: "/solicitors/how-to-instruct",
});

export default function HowToInstructPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "For solicitors", href: "/solicitors/how-to-instruct" }, { name: "How to instruct", href: "/solicitors/how-to-instruct" }]}
        eyebrow="For solicitors"
        title="How to instruct us"
        intro="A complete instruction is the fastest route to a robust report. Here is what to send and what happens next."
      >
        <Link href="/instruct" className="btn-coral">Instruct online</Link>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="The process" title="Four steps from instruction to report" />
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={s.title} className="card">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-lg font-extrabold text-white">{i + 1}</span>
              <h3 className="mt-5 text-lg">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-navy/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">What to send</h2>
            <div className="mt-6">
              <TickList
                items={[
                  "Letter of instruction setting out the claim type, track and the questions to be answered",
                  "Claimant's signed consent to the release of records and the report",
                  "Full GP records (not a summary), especially pre-accident entries",
                  "Hospital, A&E and fracture clinic records, operation notes",
                  "Imaging reports, and the images themselves where available",
                  "Witness statement or accident account, if available",
                  "Any court directions, deadlines or limitation dates",
                ]}
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl">Questions worth asking</h2>
            <div className="mt-6">
              <TickList
                items={[
                  "What is the diagnosis?",
                  "Was the injury caused by the index event?",
                  "Is there an acceleration or exacerbation of a pre-existing condition, and for how long?",
                  "What is the prognosis, and is surgery likely?",
                  "What treatment is recommended, and at what likely cost?",
                  "What is the effect on work, domestic tasks and leisure?",
                ]}
              />
            </div>
            <div className="mt-8">
              <Notice>
                <strong>Intermediate track?</strong> Tell us in your instruction and we will keep the report within the 20-page limit unless the court orders otherwise.
              </Notice>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="card">
            <h2 className="text-xl">Instruct online</h2>
            <p className="mt-2 text-navy/75">Our secure form takes a few minutes and lets you upload documents.</p>
            <Link href="/instruct" className="btn-primary mt-5">Start an instruction</Link>
          </div>
          <div className="card">
            <h2 className="text-xl">Instruct by email</h2>
            {site.contact.instructionsEmail || site.contact.email ? (
              <p className="mt-2 text-navy/75">
                Send your instruction to{" "}
                <a className="link" href={`mailto:${site.contact.instructionsEmail ?? site.contact.email}`}>{site.contact.instructionsEmail ?? site.contact.email}</a>. Please send medical records by secure or encrypted email only.
              </p>
            ) : (
              <p className="mt-2 text-navy/75">Please use our online form, or contact us and we will send a secure upload link for records.</p>
            )}
          </div>
          <div className="card">
            <h2 className="text-xl">Questions first?</h2>
            <p className="mt-2 text-navy/75">Ask about suitability, fees or availability before you instruct.</p>
            <Link href="/contact" className="btn-outline mt-5">Contact us</Link>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
