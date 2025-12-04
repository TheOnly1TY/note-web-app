"use client";

import { Minus, Plus } from "lucide-react";
import SectionHeading from "../_ui/SectionHeading";
import FAQData from "@/public/data/FAQ.json";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section
      id="faq"
      className="max-w-350 mx-auto px-6 md:px-12 my-15 md:my-20 lg:my-25 scroll-mt-24"
    >
      <SectionHeading
        tag="FAQ's"
        heading="Common Questions With Clear Answers"
        description="Here are answers to the most common questions about our note-taking app."
      />
      <div className="flex flex-col gap-5 max-w-200 mx-auto mt-10 md:mt-12 lg:mt-14">
        {FAQData.map((item: FAQItem, index) => (
          <div
            key={item.question}
            className={`grid ${
              openIndex === index ? "divide-y divide-neutral-200" : ""
            } bg-white rounded-2xl shadow-[0px_1px_20px_rgba(0,0,0,0.05)] transistion-all duration-300 ease`}
            onClick={() =>
              setOpenIndex((prev) => (prev === index ? null : index))
            }
          >
            <div className="flex justify-between items-center gap-2.5 p-4 cursor-pointer">
              <h3 className="text-lg leading-[1.4] font-semibold text-neutral-950">
                {item.question}
              </h3>
              <div
                className={`transition-transform duration-300 ease ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              ></div>
              {openIndex === index ? <Minus /> : <Plus />}
            </div>
            <div
              className={`grid overflow-hidden ${
                openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              } transition-[grid-template-rows] duration-400 ease`}
            >
              <div className="overflow-hidden">
                <p className="text-base leading-[1.4] text-neutral-600 p-4">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
