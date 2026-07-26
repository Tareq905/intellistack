"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/types";
import { cn } from "@/lib/utils";

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white dark:divide-ink-800 dark:border-ink-800 dark:bg-ink-900">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-medium text-ink-900 dark:text-ink-50">{item.question}</span>
              <ChevronDown
                className={cn("h-5 w-5 flex-shrink-0 text-ink-400 transition-transform", isOpen && "rotate-180")}
              />
            </button>
            {isOpen && <p className="px-6 pb-5 leading-relaxed text-ink-600 dark:text-ink-300">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
