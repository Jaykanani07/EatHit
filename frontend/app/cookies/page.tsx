import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";
import { CONSENT_COOKIE, CookieSettingsButton } from "../components/CookieConsent";

export const metadata = {
  title: "Cookie Policy — EatHit Foods",
  description: "How EatHit Foods uses cookies and similar technologies on this website.",
};

const LAST_UPDATED = "27 November 2026";

const BODY = "text-base sm:text-lg text-[#2B1810]/75 font-[family-name:var(--font-jakarta)] leading-relaxed";
const H2 =
  "font-[family-name:var(--font-bebas)] text-2xl tracking-wide uppercase text-[#19120D] border-b-2 border-[#19120D] pb-2 mb-4";

const SECTIONS = [
  {
    heading: "1. What are cookies?",
    body: [
      "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, and to provide information to the owners of the site.",
      "We also use the term \"cookies\" in this policy to cover similar technologies, such as local storage and pixels.",
    ],
  },
  {
    heading: "2. How we use cookies",
    body: [
      "EatHit Foods Inc. (\"EatHit\", \"we\", \"us\") uses cookies on this website to make it work properly, to remember your preferences, to understand how visitors use the site, and to improve your experience.",
      "When you first visit the website, we show a cookie banner that lets you accept all cookies, accept only essential cookies, or choose which categories to allow. Non-essential cookies are only set if you agree to them.",
    ],
  },
  {
    heading: "3. Types of cookies we use",
    body: [
      "Strictly necessary cookies — required for the website to function and to remember your cookie choices. These cannot be switched off.",
      "Analytics cookies — help us understand how visitors interact with the website, such as which pages are visited most often, so we can improve it. The information collected is aggregated.",
      "Marketing cookies — used to measure the effectiveness of our campaigns and to show content that is more relevant to you, including on third-party platforms.",
    ],
  },
];

const COOKIE_TABLE = [
  {
    name: CONSENT_COOKIE,
    category: "Strictly necessary",
    purpose: "Stores your cookie preferences so we don't ask you again on every visit.",
    duration: "12 months",
  },
  {
    name: "Analytics cookies",
    category: "Analytics",
    purpose: "Measure visits and how pages are used. Set only if you accept analytics cookies.",
    duration: "Up to 24 months",
  },
  {
    name: "Marketing cookies",
    category: "Marketing",
    purpose: "Measure campaigns and personalise content. Set only if you accept marketing cookies.",
    duration: "Up to 12 months",
  },
];

const MORE_SECTIONS = [
  {
    heading: "5. Third-party services",
    body: [
      "Some content on our website is delivered by third parties. For example, fonts are served by Google Fonts, and links to our Instagram page take you to a site operated by Meta. These providers may collect information such as your IP address in line with their own privacy and cookie policies, which we do not control.",
    ],
  },
  {
    heading: "6. Managing cookies",
    body: [
      "You can change your cookie preferences at any time using the button below or by clearing cookies for this site in your browser. Most browsers also let you block or delete cookies through their settings. Please note that blocking strictly necessary cookies may affect how the website works.",
    ],
  },
  {
    heading: "7. Changes to this policy",
    body: [
      "We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for legal or operational reasons. The \"Last updated\" date at the top shows when it was last changed.",
    ],
  },
];

function Sections({ items }: { items: { heading: string; body: string[] }[] }) {
  return (
    <>
      {items.map((section) => (
        <section key={section.heading}>
          <h2 className={H2}>{section.heading}</h2>
          <div className="space-y-4">
            {section.body.map((paragraph) => (
              <p key={paragraph} className={BODY}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#F2F0E6] text-[#2B1810] pt-28 sm:pt-36 pb-20 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#C33130]/10 text-[#C33130] flex items-center justify-center mx-auto border border-[#C33130]/20 shadow-xs">
            <Cookie className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C33130]/10 border border-[#C33130]/25 text-[#C33130] text-xs font-black tracking-widest uppercase font-[family-name:var(--font-bebas)]">
            LAST UPDATED {LAST_UPDATED.toUpperCase()}
          </div>

          <h1 className="font-['Krisha',var(--font-bebas),Impact,sans-serif] text-4xl sm:text-6xl text-[#19120D] uppercase tracking-tight leading-none">
            COOKIE POLICY
          </h1>
        </div>

        <div className="mt-12 sm:mt-16 space-y-10">
          <Sections items={SECTIONS} />

          <section>
            <h2 className={H2}>4. Cookies on this website</h2>
            <div className="overflow-x-auto border-[3px] border-[#19120D]">
              <table className="w-full min-w-[34rem] border-collapse text-left text-sm sm:text-base font-[family-name:var(--font-jakarta)]">
                <thead>
                  <tr className="border-b-[5px] border-[#19120D]">
                    {["Cookie", "Category", "Purpose", "Duration"].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-4 py-3 font-[family-name:var(--font-bebas)] text-base font-normal tracking-[0.12em] text-[#19120D]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COOKIE_TABLE.map((row) => (
                    <tr key={row.name} className="border-b border-[#19120D]/20 last:border-b-0 align-top">
                      <td className="px-4 py-3 font-semibold text-[#19120D] break-all">{row.name}</td>
                      <td className="px-4 py-3 text-[#2B1810]/75">{row.category}</td>
                      <td className="px-4 py-3 text-[#2B1810]/75">{row.purpose}</td>
                      <td className="px-4 py-3 text-[#2B1810]/75 whitespace-nowrap">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <Sections items={MORE_SECTIONS} />

          <div>
            <CookieSettingsButton className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#19120D] text-[#19120D] hover:bg-[#19120D] hover:text-[#F2F0E6] text-sm font-bold uppercase tracking-wider transition-colors font-[family-name:var(--font-bebas)]" />
          </div>

          <section>
            <h2 className={H2}>8. Contact us</h2>
            <p className={BODY}>
              If you have any questions about our use of cookies, please contact us at{" "}
              <a
                href="mailto:hello@eathitfoods.com"
                className="font-bold text-[#C33130] underline underline-offset-4 hover:text-[#A82810]"
              >
                hello@eathitfoods.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="pt-14 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C33130] hover:bg-[#A82810] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors font-[family-name:var(--font-bebas)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
