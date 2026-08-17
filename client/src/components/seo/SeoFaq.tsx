/**
 * SeoFaq — accessible FAQ accordion with built-in FAQPage JSON-LD schema.
 *
 * Usage:
 * <SeoFaq items={[
 *   { question: "What is X?", answer: "X is..." },
 *   ...
 * ]} />
 */

import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";

interface FaqItem {
  question: string;
  answer: string;
}

export default function SeoFaq({
  items,
  className = "",
}: {
  items: FaqItem[];
  className?: string;
}) {
  return (
    <div className={`my-10 ${className}`}>
      <h2 className="mb-6 text-2xl font-bold text-slate-100">
        Frequently Asked Questions
      </h2>
      <Accordion.Root
        type="single"
        collapsible
        className="space-y-3"
      >
        {items.map((item, i) => (
          <Accordion.Item
            key={i}
            value={`faq-${i}`}
            className="rounded-xl border border-slate-700 bg-slate-900/60 overflow-hidden"
          >
            <Accordion.Trigger className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-slate-200 hover:text-white transition-colors">
              {item.question}
              <span className="ml-4 text-xs text-slate-500">+</span>
            </Accordion.Trigger>
            <Accordion.Content className="px-5 pb-4 text-sm leading-relaxed text-slate-300">
              {item.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
