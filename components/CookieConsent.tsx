"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const KEY = "mlx-cookie-consent"; // "accepted" | "rejected"
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function read(): string | null {
  try { return window.localStorage.getItem(KEY); } catch { return null; }
}
function write(v: string) {
  try { window.localStorage.setItem(KEY, v); } catch { /* storage unavailable */ }
}

/** Analytics cookies are OFF until the visitor accepts. If no GA ID is set, no banner is shown at all. */
export function CookieConsent() {
  const [choice, setChoice] = useState<string | null>("pending");

  useEffect(() => {
    setChoice(read());
    const reopen = () => setChoice(null);
    window.addEventListener("mlx:cookie-settings", reopen);
    return () => window.removeEventListener("mlx:cookie-settings", reopen);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      {choice === "accepted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {choice === null && (
        <div role="dialog" aria-live="polite" aria-label="Cookie preferences" className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-2xl border border-line bg-white p-6 shadow-card">
          <p className="text-[15px] leading-relaxed text-navy">
            We use essential cookies to run this site. With your permission we would also like to use analytics cookies to understand how the site is used. See our{" "}
            <Link href="/cookies" className="link">cookie policy</Link>.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={() => { write("accepted"); setChoice("accepted"); }}>Accept analytics</button>
            <button type="button" className="btn-outline" onClick={() => { write("rejected"); setChoice("rejected"); }}>Reject analytics</button>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button type="button" className="link" onClick={() => window.dispatchEvent(new Event("mlx:cookie-settings"))}>
      Change cookie settings
    </button>
  );
}
