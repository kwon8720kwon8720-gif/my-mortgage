"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-slate-200 rounded-lg overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-medium text-slate-900 pr-4">
                {item.question}
              </span>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-slate-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-slate-600 flex-shrink-0" />
              )}
            </button>
            {isOpen && (
              <div className="px-4 pb-3 pt-0">
                <p className="text-slate-600 text-sm">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

