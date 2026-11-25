import { CookieSettingsButton } from "@/components/CookieConsent";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Cookie Policy", description: "How the Medicolex website uses cookies.", path: "/cookies" });

export default function CookiesPage() {
  const analytics = !!process.env.NEXT_PUBLIC_GA_ID;
  return (
    <LegalPage title="Cookie policy" path="/cookies" updated="25 November 2026">
      <p>Cookies are small files stored on your device when you visit a website.</p>
      <h2>Essential</h2>
      <p>We store your cookie choice in your browser so we do not ask again. This is necessary for the site to work and does not track you.</p>
      <h2>Analytics</h2>
      {analytics ? (
        <>
          <p>With your permission we use Google Analytics to understand how visitors use the site, for example which pages are most useful. These cookies are not set unless you choose &quot;Accept analytics&quot;.</p>
          <p><CookieSettingsButton /></p>
        </>
      ) : (
        <p>We do not currently use analytics or advertising cookies.</p>
      )}
    </LegalPage>
  );
}
