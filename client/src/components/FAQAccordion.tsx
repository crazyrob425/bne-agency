/**
 * SEO FAQ Accordion Component
 * Implements FAQPage structured data for rich snippets
 * Uses existing Radix UI Accordion
 */

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <div className="w-full space-y-4">
      <Accordion.Root type="multiple" className="space-y-3">
        {faqs.map((faq, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="border border-slate-800 rounded-xl bg-slate-900/50 overflow-hidden"
          >
            <Accordion.Trigger className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-slate-200 hover:bg-slate-800/50 transition-colors">
              <span className="pr-4">{faq.question}</span>
              <ChevronDown className="h-4 w-4 text-slate-500 transition-transform duration-200 data-[state=open]:rotate-180" />
            </Accordion.Trigger>
            <Accordion.Content className="overflow-hidden px-5 pb-4 text-sm text-slate-400">
              {faq.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}

// Export FAQ data for services page
export const SERVICE_FAQS: FAQItem[] = [
  {
    question: "What is 2257 compliance and why do I need it?",
    answer: "18 U.S.C. § 2257 is a federal record-keeping law requiring documentation of performer age and consent for explicit content. Non-compliance carries felony charges with up to 5 years per violation. BNE's Compliance Vault handles LLC formation, record systems, and quarterly audits.",
  },
  {
    question: "How do I choose the right niche for my content?",
    answer: "Use our Niche Matcher to find where your authentic interests overlap with high-commercial-demand micro-niches. We analyze your personality, physical attributes, and preferences against real platform data to identify your highest-earning potential markets.",
  },
  {
    question: "What platforms should I use for my niche?",
    answer: "Platform selection depends on your niche, content type, and audience demographics. We provide custom multi-platform strategies with setup, optimization, and ongoing management across OnlyFans, Fansly, LoyalFans, and social channels.",
  },
  {
    question: "How much can I expect to earn as a creator?",
    answer: "Earnings vary dramatically by niche, content quality, and consistency. Our top creators earn $50K+ monthly. We provide transparent revenue projections during onboarding based on your chosen niche and our proprietary ranking algorithm.",
  },
  {
    question: "Do I need an LLC for adult content creation?",
    answer: "Yes. An LLC provides legal separation, protects personal assets, enables 2257 compliance, and creates a professional business structure. BNE recommends Wyoming or New Mexico for maximum privacy protection.",
  },
];