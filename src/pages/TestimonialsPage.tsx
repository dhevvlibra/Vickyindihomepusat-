import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { Link, useRouter } from '../router/Router';
import { 
  Star, 
  ShieldCheck, 
  ThumbsUp, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Users 
} from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { createWhatsAppConsultUrl } from '../utils/helpers';

export const TestimonialsPage: React.FC = () => {
  const { navigate } = useRouter();

  const waUrl = createWhatsAppConsultUrl({
    source: 'Halaman Testimoni & Review Pelanggan',
    note: 'Halo Mas Vicky, saya membaca ulasan pelanggan Anda dan ingin mendaftar pasang baru IndiHome.',
  });

  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Testimoni & Ulasan Pelanggan' }]} />

        {/* Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-red-950 text-white p-6 sm:p-10 mb-10 overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>1,240+ Pelanggan Terpasang & Puas di Seluruh Indonesia</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Testimoni Asli Pemasangan <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300">WiFi IndiHome & Telkomsel One</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Baca pengalaman nyata para pemilik rumah, mahasiswa kos, gamer, dan pemilik usaha UMKM yang telah mempercayakan pemasangan internet mereka bersama Sales Resmi Mas Vicky.
            </p>

            {/* Metric Highlights */}
            <div className="pt-2 flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-2xl border border-white/15">
                <span className="text-amber-400 text-base font-black">4.9 / 5.0</span>
                <div className="flex text-amber-400">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
                <span className="text-slate-300">Rating Kepuasan</span>
              </div>

              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-2xl border border-white/15">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-200">100% Ulasan Nyata Pelanggan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-12">
          <TestimonialsSection />
        </div>

        {/* CTA Strip */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-red-950 text-white p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black">
              Ingin WiFi Cepat & Pelayanan Tanpa Ribet?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Daftarkan rumah Anda sekarang juga. Nikmati promo diskon biaya pasang Rp 99.000 atau paket 148K gratis biaya pasang.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/daftar"
              className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-95"
            >
              Daftar Pasang Sekarang
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat Mas Vicky</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
