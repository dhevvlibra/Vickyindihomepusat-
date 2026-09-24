import React from 'react';
import { Star, CheckCircle, Quote, MessageSquare, ThumbsUp } from 'lucide-react';
import { TESTIMONIALS } from '../data/packages';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimoni" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Kepuasan Pelanggan Nyata</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Apa Kata Mereka yang Sudah Pasang?
          </h2>

          <p className="text-slate-600 text-base">
            Lebih dari 2.400+ rumah dan tempat usaha telah terpasang dengan lancar melalui pendampingan Sales Resmi Vicky IndiHome Pusat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{t.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Details */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{t.name}</span>
                    {t.verified && (
                      <span title="Terverifikasi Pasang" className="inline-flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block">{t.city}</span>
                </div>

                <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                  {t.packageUsed}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout box */}
        <div className="mt-10 text-center text-xs text-slate-500">
          ⭐ Nilai rata-rata kepuasan <strong className="text-slate-800">4.9 / 5.0</strong> dari ulasan pelanggan aktif pasang baru IndiHome Telkom Indonesia.
        </div>

      </div>
    </section>
  );
};
