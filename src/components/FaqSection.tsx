import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/packages';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            FAQ Seputar Pasang Baru IndiHome
          </h2>

          <p className="text-slate-600 text-base">
            Informasi lengkap dan transparan mengenai syarat, alur pemasangan, serta pembayaran tagihan resmi.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left bg-slate-50/60 hover:bg-slate-100/80 flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-2 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-150 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
