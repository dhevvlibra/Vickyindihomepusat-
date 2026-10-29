import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FaqSection } from '../components/FaqSection';
import { Link, useRouter } from '../router/Router';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  ShieldCheck, 
  FileQuestion, 
  PhoneCall, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { createWhatsAppConsultUrl } from '../utils/helpers';

export const FaqPage: React.FC = () => {
  const { navigate } = useRouter();

  const waFaqUrl = createWhatsAppConsultUrl({
    source: 'Halaman Pusat Bantuan & FAQ',
    note: 'Halo Mas Vicky, saya punya pertanyaan seputar paket IndiHome yang ingin saya tanyakan.',
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Pusat Bantuan & FAQ' }]} />

        {/* Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-red-950 text-white p-6 sm:p-10 mb-10 overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-red-400" />
              <span>Pusat Informasi & Jawaban Pertanyaan Resmi</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Tanya Jawab Seputar <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300">IndiHome & Telkomsel One</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Temukan jawaban transparan mengenai biaya pasang baru, perbedaan layanan 1P/2P/3P, sistem FUP kuota, panduan teknisi, hingga cara bayar tagihan resmi tanpa risiko penipuan.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Informasi Terverifikasi Telkom
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <MessageCircle className="w-4 h-4 text-amber-400" />
                Bantuan Langsung Sales Vicky via WA
              </span>
            </div>
          </div>
        </div>

        {/* FAQ Section Component */}
        <div className="mb-12">
          <FaqSection />
        </div>

        {/* If question not answered */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Pertanyaan Anda Belum Terjawab di Atas?
            </h3>
            <p className="text-slate-600 text-sm max-w-xl">
              Jangan ragu untuk langsung berkonsultasi gratis dengan Sales Resmi Mas Vicky. Kami siap membantu menjawab semua keraguan Anda seputar paket dan jaringan.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={waFaqUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tanya Mas Vicky via WA</span>
            </a>
            <Link
              to="/daftar"
              className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Lanjut Formulir Pasang
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
