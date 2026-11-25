import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Accessibility Statement", description: "Accessibility of the Medicolex website and clinics.", path: "/accessibility" });

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility statement" path="/accessibility" updated="25 November 2026">
      <p>We want everyone to be able to use this website and attend our clinics.</p>
      <h2>This website</h2>
      <p>The site is designed to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. It can be used with a keyboard, works with screen readers, supports zooming to 200% and uses colour combinations that meet contrast standards.</p>
      <h2>Clinics</h2>
      <p>Tell us about any access needs when the appointment is booked, including mobility, hearing, sight, or the need for an interpreter or chaperone, and we will make arrangements.</p>
      <h2>Feedback</h2>
      <p>If you find something on this website difficult to use, please <Link href="/contact">contact us</Link> and we will help and fix the problem.</p>
    </LegalPage>
  );
}
