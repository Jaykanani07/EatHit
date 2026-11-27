"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Cookie consent popup. The visitor's choice is saved in a first-party      */
/*  cookie for 12 months; the popup reopens via openCookieSettings().         */
/* -------------------------------------------------------------------------- */

export const CONSENT_COOKIE = "eathit_cookie_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 12 months
const OPEN_EVENT = "eathit:cookie-settings";

export type CookieConsentChoice = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export function readCookieConsent(): CookieConsentChoice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split("=").slice(1).join("=")));
  } catch {
    return null;
  }
}

function saveCookieConsent(choice: Omit<CookieConsentChoice, "necessary" | "updatedAt">) {
  const value: CookieConsentChoice = {
    necessary: true,
    ...choice,
    updatedAt: new Date().toISOString(),
  };
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax`;
}

/** Reopen the popup from anywhere (e.g. the Cookie Policy page). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/** Button for pages (e.g. the Cookie Policy) that reopens the popup. */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Change cookie settings
    </button>
  );
}

const CATEGORIES = [
  {
    key: "analytics",
    label: "Analytics",
    desc: "Help us understand how visitors use the site so we can improve it.",
  },
  {
    key: "marketing",
    label: "Marketing",
    desc: "Used to show relevant content and measure our campaigns.",
  },
] as const;

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [customising, setCustomising] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });
  const titleId = useId();

  useEffect(() => {
    if (readCookieConsent()) return;
    // Small delay so the popup doesn't compete with the hero's first paint
    const t = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const reopen = () => {
      const existing = readCookieConsent();
      if (existing) setPrefs({ analytics: existing.analytics, marketing: existing.marketing });
      setCustomising(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = (choice: { analytics: boolean; marketing: boolean }) => {
    saveCookieConsent(choice);
    setPrefs(choice);
    setOpen(false);
    setCustomising(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed inset-x-3 bottom-3 z-[100] animate-fadeIn sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[26rem] motion-reduce:animate-none"
    >
      <div className="relative border-[3px] border-brand-dark bg-[#F2F0E6] text-[#2B1810] shadow-[6px_6px_0_0_#19120D]">
        <div className="flex items-center justify-between border-b-[6px] border-brand-dark px-5 pb-2 pt-3">
          <h2
            id={titleId}
            className="m-0 font-[family-name:var(--font-bebas)] text-xl font-normal leading-none tracking-[0.12em] text-brand-dark"
          >
            We use cookies
          </h2>
          <button
            type="button"
            onClick={() => decide({ analytics: false, marketing: false })}
            className="-mr-1 rounded-full p-1 text-brand-dark transition-colors hover:text-brand-red"
            aria-label="Close and accept essential cookies only"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 pb-5 pt-4">
          <p className="m-0 text-sm leading-relaxed text-[#2B1810]/80">
            We use cookies to keep the site working, remember your preferences and
            understand how it&apos;s used. You can accept all cookies or choose which
            ones to allow. Read our{" "}
            <Link
              href="/cookies"
              className="font-bold text-brand-red underline underline-offset-4 hover:text-[#A82810]"
            >
              Cookie Policy
            </Link>
            .
          </p>

          {customising && (
            <ul className="m-0 mt-4 list-none border-t-[1.5px] border-brand-dark p-0">
              <li className="flex items-start justify-between gap-4 border-b border-brand-dark/20 py-3">
                <div>
                  <p className="m-0 text-sm font-semibold text-brand-dark">Essential</p>
                  <p className="m-0 mt-0.5 text-[13px] leading-snug text-brand-dark/65">
                    Needed for the site to work. Always on.
                  </p>
                </div>
                <span className="shrink-0 pt-0.5 font-[family-name:var(--font-bebas)] text-sm tracking-[0.08em] text-brand-dark/60">
                  ALWAYS ON
                </span>
              </li>
              {CATEGORIES.map((cat) => {
                const inputId = `${titleId}-${cat.key}`;
                return (
                  <li
                    key={cat.key}
                    className="flex items-start justify-between gap-4 border-b border-brand-dark/20 py-3 last:border-b-[3px] last:border-brand-dark"
                  >
                    <label htmlFor={inputId} className="cursor-pointer">
                      <span className="block text-sm font-semibold text-brand-dark">{cat.label}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-brand-dark/65">
                        {cat.desc}
                      </span>
                    </label>
                    <input
                      id={inputId}
                      type="checkbox"
                      checked={prefs[cat.key]}
                      onChange={(e) => setPrefs((p) => ({ ...p, [cat.key]: e.target.checked }))}
                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#C33130]"
                    />
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => decide({ analytics: true, marketing: true })}
              className="rounded-full bg-brand-red px-5 py-2.5 font-[family-name:var(--font-bebas)] text-base tracking-wider text-white transition-colors hover:bg-[#A82810]"
            >
              Accept all
            </button>
            {customising ? (
              <button
                type="button"
                onClick={() => decide(prefs)}
                className="rounded-full border-2 border-brand-dark px-5 py-2 font-[family-name:var(--font-bebas)] text-base tracking-wider text-brand-dark transition-colors hover:bg-brand-dark hover:text-[#F2F0E6]"
              >
                Save choices
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => decide({ analytics: false, marketing: false })}
                  className="rounded-full border-2 border-brand-dark px-5 py-2 font-[family-name:var(--font-bebas)] text-base tracking-wider text-brand-dark transition-colors hover:bg-brand-dark hover:text-[#F2F0E6]"
                >
                  Essential only
                </button>
                <button
                  type="button"
                  onClick={() => setCustomising(true)}
                  className="px-2 py-2 text-sm font-semibold text-brand-dark underline underline-offset-4 transition-colors hover:text-brand-red"
                >
                  Customise
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
