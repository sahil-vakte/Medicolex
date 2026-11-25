import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ title: "Privacy Notice", description: "How Medicolex collects, uses and protects personal and medical information.", path: "/privacy" });

export default function PrivacyPage() {
  const c = site.company;
  return (
    <LegalPage title="Privacy notice" path="/privacy" updated="25 November 2026">
      <p>
        This notice explains how {c.legalName} (trading as {site.name}) uses personal information. We are the data controller for the information described here.
        {c.icoNumber && <> We are registered with the Information Commissioner&apos;s Office under registration number {c.icoNumber}.</>}
      </p>
      <h2>Who we are</h2>
      <p>{c.legalName}, company number {c.number}, registered office {c.registeredOffice}.{site.contact.email && <> Contact: {site.contact.email}.</>}</p>

      <h2>Information we hold</h2>
      <ul>
        <li><strong>Claimants:</strong> name, date of birth, contact details, details of the incident and injuries, medical records, examination findings and the expert report.</li>
        <li><strong>Instructing parties:</strong> names, firm details, contact details and case references.</li>
        <li><strong>Website visitors:</strong> information you submit through our forms and, only if you agree, analytics data.</li>
      </ul>

      <h2>Why we use it and our lawful basis</h2>
      <p>
        We use claimants&apos; information to prepare independent medico-legal reports for legal claims. Our lawful basis is legitimate interests, and for health information the condition that processing is necessary for the establishment, exercise or defence of legal claims (UK GDPR Article 9(2)(f)). We use instructing parties&apos; information to perform our contract with them. We use enquiry information to respond to you.
      </p>

      <h2>Who we share it with</h2>
      <p>
        Reports and related correspondence go to the instructing party and, through them, to other parties to the claim and the court. We use carefully selected service providers (for example secure hosting, email and document storage) under written contracts. We do not sell personal information.
      </p>

      <h2>How we protect it</h2>
      <p>
        Records are received by secure upload or encrypted email, held on UK-based systems with restricted access, and protected by encryption in transit and at rest.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep case information for as long as the claim is active and for a limited period afterwards to deal with questions, appeals or complaints, after which it is securely deleted. Our retention schedule is available on request.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask for access to your information, and in some cases ask us to correct, erase or restrict it, or object to our use of it. Some rights are limited where information is needed for legal claims. To make a request, contact us using the details above.
      </p>

      <h2>Complaints</h2>
      <p>
        If you are unhappy with how we use your information, please contact us first. You can also complain to the Information Commissioner&apos;s Office at ico.org.uk.
      </p>
    </LegalPage>
  );
}
