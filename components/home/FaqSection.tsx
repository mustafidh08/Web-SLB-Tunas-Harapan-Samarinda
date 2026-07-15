"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { dataFAQs } from "@/content/data/faqs";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [faqTerbuka, setFaqTerbuka] = useState<Record<string, boolean>>({
    "faq-1": true, // Default buka FAQ pertama
  });

  const toggleFAQ = (id: string) => {
    setFaqTerbuka((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Hanya tampilkan 5 FAQ paling penting di Beranda
  const faqTerpilih = dataFAQs.filter((faq) => 
    ["faq-1", "faq-2", "faq-3", "faq-4", "faq-6"].includes(faq.id)
  );

  return (
    <section className="section-py bg-gray-50 border-t border-gray-200" aria-label="Pertanyaan Umum">
      <div className="container-custom max-w-3xl">
        <SectionTitle 
          label="Tanya Jawab" 
          title="Pertanyaan yang Sering Diajukan"
          subtitle="Jawaban singkat dari beberapa hal penting yang paling sering ditanyakan oleh calon orang tua murid baru."
        />

        <div className="space-y-4 mt-10" role="list">
          {faqTerpilih.map((faq) => {
            const terbuka = !!faqTerbuka[faq.id];
            return (
              <div 
                key={faq.id}
                className="bg-white border border-gray-150 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-sm"
                role="listitem"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none"
                  aria-expanded={terbuka}
                  aria-controls={`content-${faq.id}`}
                  id={`btn-${faq.id}`}
                >
                  <div className="flex gap-3 items-center text-[var(--color-text-dark)]">
                    <HelpCircle 
                      size={18} 
                      className={`flex-shrink-0 transition-colors ${terbuka ? "text-[var(--color-primary)]" : "text-[var(--color-text-light)]"}`} 
                    />
                    <span className="font-bold text-sm sm:text-base leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                      {faq.pertanyaan}
                    </span>
                  </div>
                  <div className="flex-shrink-0 text-[var(--color-text-mid)]">
                    {terbuka ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <div
                  id={`content-${faq.id}`}
                  className={`transition-all duration-300 ease-in-out ${terbuka ? "max-h-[500px] border-t border-gray-150 py-4 px-5 bg-white opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
                  role="region"
                  aria-labelledby={`btn-${faq.id}`}
                >
                  <p className="text-sm sm:text-base text-[var(--color-text-mid)] leading-relaxed">
                    {faq.jawaban}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
