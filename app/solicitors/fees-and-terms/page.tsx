import Link from "next/link";
import { CtaBand, Notice, PageHero, Section, TickList } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Fees & Terms for Medico-Legal Reports",
  description: "Transparent, itemised fees for shoulder and elbow medico-legal reports, with clear payment, cancellation and court attendance terms.",
  path: "/solicitors/fees-and-terms",
});

const feeItems = [
  ["Condition and prognosis report", "Fixed fee agreed at instruction, by complexity and records volume"],
  ["Records-only review", "Estimate given before work starts"],
  ["Clinical negligence (breach and causation)", "Estimate given before work starts"],
  ["Addendum report, CPR 35.6 answers, joint statement", "Hourly rate, estimate on request"],
  ["Court attendance", "Half-day and full-day rates"],
  ["Fixed-cost RTA further reports (CPR 45)", "At the fixed recoverable amount set by the rules"],
];

export default function FeesPage() {
  const q = site.standards.feeQuoteWithinHours;
  return (
    <>
      <PageHero
        crumbs={[{ name: "For solicitors", href: "/solicitors/how-to-instruct" }, { name: "Fees & terms", href: "/solicitors/fees-and-terms" }]}
        eyebrow="For solicitors"
        title="Fees and terms"
        intro="Clear, itemised fees that are easy to recover, agreed in writing before any work starts."
      >
        <Link href="/contact" className="btn-coral">Request a fee quote</Link>
      </PageHero>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl">How our fees work</h2>
            <p className="mt-4 text-lg leading-relaxed text-navy/80">
              Every instruction receives a written fee confirmation{q ? ` within ${q} working hours` : ""}. Invoices show the expert fee, any records or administration fee, and VAT on separate lines, so costs are straightforward to recover on assessment.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-line">
              <table className="w-full text-left">
                <caption className="sr-only">Fee structure by type of work</caption>
                <thead className="bg-mist text-sm uppercase tracking-wider text-navy/70">
                  <tr><th className="px-5 py-3">Work</th><th className="px-5 py-3">How it is charged</th></tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {feeItems.map(([a, b]) => (
                    <tr key={a}><td className="px-5 py-4 font-semibold">{a}</td><td className="px-5 py-4 text-navy/75">{b}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h2 className="mt-12 text-2xl">Key terms</h2>
            <div className="mt-5">
              <TickList
                items={[
                  "Payment terms are agreed at instruction, including deferred terms for claimant firms where agreed",
                  "VAT is charged where applicable",
                  "Late cancellation and non-attendance charges apply; your client's appointment letter states the notice period",
                  "Court attendance fees apply on a half-day and full-day basis, with cancellation terms for listed hearings",
                  "The expert's duty is to the court, whoever pays the fee",
                ]}
              />
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl bg-navy p-6 text-white">
              <h2 className="text-xl text-white">Need a quote?</h2>
              <p className="mt-2 text-white/75">Tell us the claim type, track, injuries and approximate records volume.</p>
              <Link href="/contact" className="btn-coral mt-5">Request a quote</Link>
            </div>
            <Notice>
              Full terms of business are sent with every fee confirmation and are available on request. See also our <Link href="/terms" className="link">website terms</Link>.
            </Notice>
          </aside>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
