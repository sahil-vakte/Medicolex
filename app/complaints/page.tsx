import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Complaints Procedure", description: "How to raise a complaint with Medicolex and how we handle it.", path: "/complaints" });

export default function ComplaintsPage() {
  return (
    <LegalPage title="Complaints procedure" path="/complaints" updated="25 November 2026">
      <p>We want every instructing party and claimant to receive a professional, courteous service. If something has gone wrong, please tell us so we can put it right.</p>
      <h2>How to complain</h2>
      <p>Contact us through our <Link href="/contact">contact page</Link>, giving your name, the case reference if you have one, and a summary of the problem.</p>
      <h2>What happens next</h2>
      <ol>
        <li>We acknowledge your complaint promptly.</li>
        <li>A senior member of the team investigates and may contact you for more information.</li>
        <li>We send you a written response explaining what we found and any action we will take.</li>
      </ol>
      <h2>Complaints about the content of a report</h2>
      <p>An expert&apos;s opinion is given independently to the court. If you disagree with an opinion, the proper route is usually for the instructing party to put written questions to the expert under CPR 35.6. We will still look at any concern about the conduct of the examination or our service.</p>
      <h2>If you are still unhappy</h2>
      <p>Concerns about a doctor&apos;s fitness to practise can be raised with the General Medical Council. Concerns about how we use personal information can be raised with the Information Commissioner&apos;s Office.</p>
    </LegalPage>
  );
}
