import Link from "next/link";
import { CtaBand, PageHero, Section, TickList } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Service Standards",
  description: "Our service standards for medico-legal reports: appointments, turnaround, communication and quality.",
  path: "/solicitors/service-standards",
});

export default function StandardsPage() {
  const { appointmentWithinDays: a, reportWithinDaysOfExam: r, feeQuoteWithinHours: q } = site.standards;
  const stats = [
    a && { n: `${a}`, unit: "working days", label: "to offer an appointment" },
    r && { n: `${r}`, unit: "working days", label: "from examination to report" },
    q && { n: `${q}`, unit: "working hours", label: "to confirm fees" },
  ].filter(Boolean) as { n: string; unit: string; label: string }[];

  return (
    <>
      <PageHero
        crumbs={[{ name: "For solicitors", href: "/solicitors/how-to-instruct" }, { name: "Service standards", href: "/solicitors/service-standards" }]}
        eyebrow="For solicitors"
        title="Our service standards"
        intro="What you can expect from us on every instruction."
      />
      {stats.length > 0 && (
        <Section tone="mist">
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="card text-center">
                <p className="text-5xl font-extrabold text-navy">{s.n}</p>
                <p className="mt-1 font-semibold text-teal-deep">{s.unit}</p>
                <p className="mt-2 text-navy/70">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl">Communication</h2>
            <div className="mt-5">
              <TickList items={["Acknowledgement with a case reference when we receive your instruction", "One named contact for every case", "Updates when records arrive, the appointment is booked and the report is issued", "Prompt warning of anything that could delay the report"]} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl">Quality</h2>
            <div className="mt-5">
              <TickList items={["Reports written and signed personally by the expert", "CPR Part 35 and Practice Direction 35 compliance on every report", "Intermediate track format on request", "Factual accuracy checks before issue"]} />
            </div>
          </div>
        </div>
        <p className="mt-12 text-navy/75">
          Not happy with something? See our <Link href="/complaints" className="link">complaints procedure</Link>.
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
