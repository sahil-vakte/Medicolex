import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { legalLine } from "@/lib/site";

export const metadata = pageMetadata({ title: "Website Terms of Use", description: "Terms of use for the Medicolex website.", path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage title="Website terms of use" path="/terms" updated="25 November 2026">
      <p>{legalLine}</p>
      <h2>Using this website</h2>
      <p>This website provides general information about our medico-legal reporting services for legal professionals and the public. It is not legal or medical advice, and you should not rely on it as such.</p>
      <h2>Instructions and fees</h2>
      <p>Instructions are accepted on our terms of business, which are confirmed in writing with every fee confirmation. Those terms, not this page, govern each instruction.</p>
      <h2>Intellectual property</h2>
      <p>The Medicolex name, logo and website content belong to Aranath Medicolegal Limited. You may not reproduce them without permission, except for normal personal or professional reference.</p>
      <h2>Liability</h2>
      <p>We work to keep this website accurate and available, but we do not guarantee it. Nothing in these terms limits liability that cannot be limited by law.</p>
      <h2>Law</h2>
      <p>These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction.</p>
    </LegalPage>
  );
}
