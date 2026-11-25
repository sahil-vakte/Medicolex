import { InstructForm } from "@/components/forms/InstructForm";
import { Notice, PageHero, Section, TickList } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Instruct a Shoulder & Elbow Medico-Legal Expert Online",
  description: "Instruct Medicolex online: a secure five-step form for solicitors, with document upload, for shoulder and elbow medico-legal reports.",
  path: "/instruct",
});

const CLINICS: Record<string, string> = { leicester: "Leicester", derby: "Derby", rugby: "Rugby" };

export default async function InstructPage({ searchParams }: { searchParams: Promise<{ clinic?: string }> }) {
  const { clinic } = await searchParams;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Instruct an expert", href: "/instruct" }]}
        eyebrow="For solicitors"
        title="Instruct an expert"
        intro="A secure five-step form that takes about five minutes. We acknowledge every instruction with a case reference."
      />
      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <InstructForm defaultClinic={clinic ? CLINICS[clinic.toLowerCase()] : undefined} />
          <aside className="space-y-6">
            <div className="card">
              <h2 className="text-lg">Have these ready</h2>
              <div className="mt-4">
                <TickList items={["Your reference and fee earner details", "Claimant's name, date of birth and postcode", "Date and brief description of the incident", "Letter of instruction and signed consent (if available)"]} />
              </div>
            </div>
            <Notice>
              Documents are sent over an encrypted connection and handled in line with our <a href="/privacy" className="link">privacy notice</a>. If you prefer, submit the form without documents and we will send a secure upload link.
            </Notice>
          </aside>
        </div>
      </Section>
    </>
  );
}
