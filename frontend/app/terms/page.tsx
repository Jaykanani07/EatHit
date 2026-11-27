import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions — EatHit Foods",
  description: "Terms and Conditions governing the use of the EatHit Foods website.",
};

const LAST_UPDATED = "27 November 2026";

const SECTIONS = [
  {
    heading: "1. Acceptance of terms",
    body: [
      "These Terms and Conditions (\"Terms\") govern your access to and use of the EatHit Foods website (the \"Website\"), operated by EatHit Foods Inc. (\"EatHit\", \"we\", \"us\" or \"our\").",
      "By accessing or using the Website, you confirm that you have read, understood and agree to be bound by these Terms and by our Cookie Policy. If you do not agree, you must not use the Website.",
    ],
  },
  {
    heading: "2. Use of the website",
    body: [
      "You may use the Website for lawful, personal and non-commercial purposes only. You agree not to:",
      "(a) use the Website in any way that breaches applicable laws or regulations; (b) attempt to gain unauthorised access to the Website, its servers or any connected systems; (c) introduce viruses, malware or other harmful material; (d) copy, scrape or harvest content or data from the Website by automated means; or (e) use the Website in a way that could damage, disable or impair it.",
      "We may suspend, withdraw or restrict access to all or part of the Website at any time without notice.",
    ],
  },
  {
    heading: "3. Product information",
    body: [
      "We make reasonable efforts to ensure that product names, images, flavours and descriptions on the Website are accurate. However, packaging, recipes and ingredients may change, and colours and images on screen may differ from the actual product.",
      "Product information on the Website is provided for general information only. Always read the label on the pack for the most current ingredients, allergen and nutritional information before consuming any product. If you have a food allergy or dietary requirement, please check the packaging carefully.",
      "Availability of products at retailers is determined by those retailers, and we do not guarantee that any product will be in stock at a given store.",
    ],
  },
  {
    heading: "4. Intellectual property",
    body: [
      "All content on the Website, including the EatHit name and logo, trademarks, pack designs, photographs, illustrations, text, graphics and software, is owned by or licensed to EatHit Foods Inc. and is protected by copyright, trademark and other intellectual property laws.",
      "You may view and print pages from the Website for your personal use. You must not reproduce, distribute, modify, publicly display or otherwise use any content for commercial purposes without our prior written consent.",
    ],
  },
  {
    heading: "5. Third-party links",
    body: [
      "The Website may contain links to third-party websites and services, including social media platforms such as Instagram. These links are provided for convenience only. We have no control over, and accept no responsibility for, the content, policies or practices of any third-party website, and your use of them is at your own risk.",
    ],
  },
  {
    heading: "6. Communications",
    body: [
      "If you contact us by email or through any other channel, you agree that we may use the information you provide to respond to your enquiry. Please do not send us confidential or sensitive information.",
    ],
  },
  {
    heading: "7. Disclaimer of warranties",
    body: [
      "The Website and its content are provided on an \"as is\" and \"as available\" basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including warranties of accuracy, completeness, merchantability, fitness for a particular purpose and non-infringement. We do not warrant that the Website will be uninterrupted, secure or free from errors or viruses.",
    ],
  },
  {
    heading: "8. Limitation of liability",
    body: [
      "To the fullest extent permitted by law, EatHit Foods Inc., its directors, employees and partners shall not be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of profits, data or goodwill, arising out of or in connection with your use of, or inability to use, the Website.",
      "Nothing in these Terms excludes or limits any liability that cannot be excluded or limited under applicable law.",
    ],
  },
  {
    heading: "9. Indemnity",
    body: [
      "You agree to indemnify and hold harmless EatHit Foods Inc. from any claims, losses, liabilities and expenses (including reasonable legal fees) arising from your breach of these Terms or your misuse of the Website.",
    ],
  },
  {
    heading: "10. Privacy and cookies",
    body: [
      "Our use of cookies and similar technologies is described in our Cookie Policy, which forms part of these Terms.",
    ],
  },
  {
    heading: "11. Governing law",
    body: [
      "These Terms are governed by the laws of the jurisdiction in which EatHit Foods Inc. is registered, and any disputes arising from them shall be subject to the exclusive jurisdiction of the courts of that jurisdiction.",
    ],
  },
  {
    heading: "12. Changes to these terms",
    body: [
      "We may revise these Terms at any time by updating this page. The \"Last updated\" date at the top shows when they were last changed. Your continued use of the Website after any change means you accept the revised Terms.",
    ],
  },
  {
    heading: "13. Severability",
    body: [
      "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F2F0E6] text-[#2B1810] pt-28 sm:pt-36 pb-20 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#C33130]/10 text-[#C33130] flex items-center justify-center mx-auto border border-[#C33130]/20 shadow-xs">
            <FileText className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C33130]/10 border border-[#C33130]/25 text-[#C33130] text-xs font-black tracking-widest uppercase font-[family-name:var(--font-bebas)]">
            LAST UPDATED {LAST_UPDATED.toUpperCase()}
          </div>

          <h1 className="font-['Krisha',var(--font-bebas),Impact,sans-serif] text-4xl sm:text-6xl text-[#19120D] uppercase tracking-tight leading-none">
            TERMS &amp; CONDITIONS
          </h1>
        </div>

        <div className="mt-12 sm:mt-16 space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide uppercase text-[#19120D] border-b-2 border-[#19120D] pb-2 mb-4">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base sm:text-lg text-[#2B1810]/75 font-[family-name:var(--font-jakarta)] leading-relaxed"
                >
                  {paragraph}
                </p>
                ))}
              </div>
            </section>
          ))}

          <section>
            <h2 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide uppercase text-[#19120D] border-b-2 border-[#19120D] pb-2 mb-4">
              14. Contact us
            </h2>
            <p className="text-base sm:text-lg text-[#2B1810]/75 font-[family-name:var(--font-jakarta)] leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
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
