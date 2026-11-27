import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Contact Us — EatHit Foods",
  description:
    "Get in touch with EatHit Foods for questions, feedback, and stockist or wholesale enquiries.",
};

const EMAIL = "hello@eathitfoods.com";
const INSTAGRAM_URL = "https://www.instagram.com/eathitfoods";
const WHOLESALE_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Wholesale")}`;

const LINK = "text-xl font-semibold text-brand-dark no-underline transition-colors hover:text-brand-red";

export default function ContactPage() {
  return (
    <main className="overflow-x-clip bg-parchment text-brand-dark">
      <div className="mx-auto grid max-w-[72rem] grid-cols-1 items-center gap-14 px-4 pb-28 pt-28 sm:px-8 sm:pt-32 md:grid-cols-2 md:gap-16 md:pb-36">
        <section>
          <h1 className="m-0 font-krisha text-[clamp(4.5rem,11vw,10rem)] font-normal uppercase leading-[0.82]">
            Say
            <br />
            <span className="text-brand-red">hello.</span>
          </h1>
          <p className="m-0 mt-7 max-w-[26rem] text-lg leading-relaxed text-[#6B5E52] sm:text-[19px]">
            Questions, feedback, or want EatHit in your store? Send us a note and we&apos;ll get back
            to you.
          </p>

          <ul className="m-0 mt-11 max-w-[30rem] list-none p-0">
            <li className="border-t border-brand-dark/15 py-[18px]">
              <span className="mb-1 block text-[13px] text-[#6B5E52]">Email</span>
              <a
                href={`mailto:${EMAIL}`}
                className="text-xl font-semibold text-brand-red underline decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-[#A82810]"
              >
                {EMAIL}
              </a>
            </li>
            <li className="border-t border-brand-dark/15 py-[18px]">
              <span className="mb-1 block text-[13px] text-[#6B5E52]">Instagram</span>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${LINK} inline-flex items-center gap-1`}>
                @eathitfoods
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li className="border-y border-brand-dark/15 py-[18px]">
              <span className="mb-1 block text-[13px] text-[#6B5E52]">Stores &amp; wholesale</span>
              <a href={WHOLESALE_MAILTO} className={LINK}>
                Email us with &ldquo;Wholesale&rdquo; in the subject
              </a>
            </li>
          </ul>
        </section>

        <div className="relative justify-self-center">
          <Image
            src="/images/products/masala-pouch.png"
            alt="Masala Khakhra pack"
            width={1145}
            height={1374}
            priority
            sizes="(min-width: 768px) 400px, 240px"
            className="block h-auto w-[240px] rotate-[5deg] drop-shadow-[0_30px_34px_rgba(25,18,13,0.25)] md:w-[min(400px,40vw)]"
          />
          <p className="absolute -bottom-3.5 -left-2.5 m-0 -rotate-6 font-[family-name:var(--font-caveat)] text-[1.7rem] font-bold text-[#D48B28] md:-left-8 md:text-[2rem]">
            we read every one
          </p>
        </div>
      </div>
    </main>
  );
}
