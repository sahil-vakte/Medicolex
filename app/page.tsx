import Link from "next/link";
import { Mark } from "@/components/Mark";
import { CtaBand, Faq, Section, SectionHeading, Tick, TickList } from "@/components/ui";
import { conditions, homeFaqs, locations, processSteps, services, specialtiesComingSoon } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = {
  ...pageMetadata({
    title: "Shoulder & Elbow Medico-Legal Experts – Leicester, Derby, Rugby",
    description: site.description,
    path: "/",
  }),
  title: { absolute: `${site.name} | Shoulder & Elbow Medico-Legal Experts – Leicester, Derby, Rugby` },
};

const usps = [
  {
    title: "Sub-specialist expertise",
    body: "Reports written by a consultant orthopaedic surgeon who treats shoulder and elbow conditions in everyday practice.",
    colour: "bg-teal",
  },
  {
    title: "Seen locally",
    body: "Your client is examined in person at our Leicester, Derby or Rugby clinic, so less travel and fewer missed appointments.",
    colour: "bg-coral",
  },
  {
    title: "Clear terms, one contact",
    body: "Transparent, itemised fees, published service standards and one named case contact from instruction to court.",
    colour: "bg-navy",
  },
];

function turnaroundLine() {
  const { appointmentWithinDays: a, reportWithinDaysOfExam: r } = site.standards;
  if (a && r) return `Appointment offered within ${a} working days. Report within ${r} working days of examination.`;
  return "Prompt appointments at local clinics, with progress updates at every stage.";
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-coral/10 blur-3xl" />
        <div className="container relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow-light">Independent medico-legal experts</p>
            <h1 className="mt-4 text-[2.15rem] leading-[1.1] text-white sm:text-5xl lg:text-[3.6rem]">
              Consultant shoulder and elbow medico-legal reports,{" "}
              <span className="text-teal">seen locally.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Independent, CPR Part 35-compliant expert evidence for personal injury and clinical negligence claims, with in-person examinations in Leicester, Derby and Rugby.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/instruct" className="btn-coral">Instruct an expert</Link>
              <Link href="/contact" className="btn-ghost-light">Request fees &amp; availability</Link>
            </div>
            <ul className="mt-10 grid gap-3 text-[15px] text-white/80 sm:grid-cols-2">
              {["CPR Part 35 & PD35 compliant", "Claimant, defendant & SJE", "Leicester · Derby · Rugby clinics", "Intermediate track reports"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto hidden w-full max-w-md md:block">
            <div className="absolute inset-0 -rotate-3 rounded-[2rem] bg-white/5" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 backdrop-blur">
              <Mark uid="hero" className="mx-auto w-full max-w-[300px]" holes="#FFFFFF" title="Medicolex mark: medicine and law in balance" />
              <p className="mt-8 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Medicine and law, in balance</p>
            </div>
          </div>
        </div>
        <div className="accent-bar" />
      </section>

      {/* USPs */}
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {usps.map((u) => (
            <div key={u.title} className="card">
              <span className={`block h-1.5 w-12 rounded-full ${u.colour}`} />
              <h2 className="mt-5 text-xl">{u.title}</h2>
              <p className="mt-2 leading-relaxed text-navy/75">{u.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section tone="mist">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Reports we provide" title="Expert evidence for every stage of the claim" intro="From the first condition and prognosis report to joint statements and trial." />
          <Link href="/services" className="btn-outline self-start md:self-auto">All services</Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card group no-underline transition hover:-translate-y-0.5 hover:border-teal/50">
              <h3 className="text-lg">{s.name}</h3>
              <p className="mt-2 leading-relaxed text-navy/70">{s.short}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-semibold text-teal-deep">
                Learn more <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
          <Link href="/specialties" className="group flex flex-col justify-between rounded-2xl bg-navy p-6 text-white no-underline">
            <div>
              <p className="eyebrow-light">Coming soon</p>
              <h3 className="mt-2 text-lg text-white">More specialties, same local clinics</h3>
              <p className="mt-2 leading-relaxed text-white/70">Hand and wrist, spine, psychiatry, pain medicine and more.</p>
            </div>
            <span className="mt-4 font-semibold text-coral">Register your interest →</span>
          </Link>
        </div>
      </Section>

      {/* CONDITIONS */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Conditions"
            title="Shoulder and elbow injuries we report on"
            intro="Structural injuries, fractures, soft-tissue injuries and post-surgical outcomes, including disputed causation and acceleration."
          />
          <div className="grid gap-x-8 sm:grid-cols-2">
            {(["Shoulder", "Elbow"] as const).map((g) => (
              <div key={g}>
                <h3 className="border-b border-line pb-3 text-sm font-bold uppercase tracking-[0.14em] text-teal-deep">{g}</h3>
                <ul className="mt-2">
                  {conditions.filter((c) => c.group === g).map((c) => (
                    <li key={c.slug}>
                      <Link href={`/conditions/${c.slug}`} className="flex items-center justify-between border-b border-line py-3 font-semibold text-navy no-underline hover:text-teal-deep">
                        {c.name} <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section tone="navy">
        <SectionHeading light eyebrow="How it works" title="From instruction to court, in four steps" intro={turnaroundLine()} />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-coral text-lg font-extrabold text-navy">{i + 1}</span>
              <h3 className="mt-5 text-lg text-white">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-white/70">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Link href="/solicitors/how-to-instruct" className="btn-ghost-light">How to instruct us</Link>
        </div>
      </Section>

      {/* LOCATIONS */}
      <Section>
        <SectionHeading eyebrow="Clinics" title="Examinations in Leicester, Derby and Rugby" intro="Three clinics across the East Midlands and Warwickshire, so most claimants are seen close to home. Instructions are accepted from solicitors anywhere in England and Wales." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {locations.map((l) => (
            <Link key={l.slug} href={`/locations/${l.slug}`} className="card group no-underline hover:border-teal/50">
              <p className="eyebrow">{l.county}</p>
              <h3 className="mt-2 text-2xl">{l.town}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-navy/70">Serving {l.catchment.slice(1, 5).join(", ")} and surrounding areas.</p>
              <span className="mt-4 inline-block font-semibold text-teal-deep">Clinic details →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* COMPLIANCE */}
      <Section tone="mist">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Compliance you can check"
            title="Independent evidence, built to withstand scrutiny"
            intro="Every report is addressed to the court, states the range of opinion and ends with a statement of compliance and a statement of truth."
          />
          <div className="card">
            <TickList
              items={[
                "Compliant with CPR Part 35 and Practice Direction 35",
                "Expert registered with the General Medical Council",
                "Professional indemnity cover for medico-legal work",
                "Registered with the Information Commissioner's Office",
                "Secure document handling and deletion when the case closes",
                "Instructions accepted from claimants, defendants and jointly",
              ]}
            />
            <Link href="/solicitors/compliance" className="link mt-6 inline-block">Our compliance commitments</Link>
          </div>
        </div>
      </Section>

      {/* COMING SOON */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Growing with you" title="More specialties coming to the same clinics" intro="We are building a multi-specialty panel so you can instruct several experts in one place. Register your interest to be told first." />
          <div className="grid gap-3 sm:grid-cols-2">
            {specialtiesComingSoon.slice(0, 6).map((s) => (
              <div key={s.name} className="flex items-start justify-between gap-3 rounded-xl border border-line p-4">
                <div>
                  <h3 className="text-base">{s.name}</h3>
                  <p className="mt-1 text-sm text-navy/65">{s.line}</p>
                </div>
                <span className="flex-none rounded-full bg-coral-soft px-2.5 py-1 text-xs font-bold text-coral-deep">Soon</span>
              </div>
            ))}
            <Link href="/specialties" className="btn-outline sm:col-span-2">See all planned specialties</Link>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="mist">
        <SectionHeading center eyebrow="FAQs" title="Questions solicitors ask us" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Faq items={homeFaqs} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
