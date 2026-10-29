import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InteractivePackageShowcase } from '../components/InteractivePackageShowcase';
import { PackageCatalog } from '../components/PackageCatalog';
import { useRouter, Link } from '../router/Router';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { createWhatsAppConsultUrl } from '../utils/helpers';

export const PackagesPage: React.FC = () => {
  const { navigate } = useRouter();

  const handleSelectPackage = (packageId: string) => {
    navigate(`/daftar?paket=${packageId}`);
  };

  const waUrl = createWhatsAppConsultUrl({
    source: 'Halaman Katalog Paket Lengkap',
    note: 'Halo Mas Vicky, saya ingin konsultasi memilih paket IndiHome yang paling sesuai dengan kebutuhan saya.',
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Katalog Paket Internet' }]} />

        {/* Page Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-red-950 text-white p-6 sm:p-10 mb-10 overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Daftar Harga & Paket Resmi 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Katalog Lengkap Paket Internet <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300">IndiHome Telkomsel</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Pilihan lengkap paket internet WiFi 100% serat optik mulai dari 30 Mbps hingga 200 Mbps. Nikmati promo diskon biaya pasang Rp 99.000, paket bundling Telkomsel One hemat Rp 148.000, dan bonus streaming resmi.
            </p>

            {/* Quick Feature Badges */}
            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Tarif Resmi Tanpa Mark-up
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <Zap className="w-4 h-4 text-amber-400" />
                Gratis Modem WiFi Dual-Band
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <Sparkles className="w-4 h-4 text-rose-400" />
                Promo Lonjakan Kecepatan (Upspeed)
              </span>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                to="/kalkulator"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm shadow-md hover:bg-slate-100 transition-all active:scale-95"
              >
                <span>Bingung Pilih? Coba Kalkulator Speed</span>
                <ArrowRight className="w-4 h-4 text-red-600" />
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Gratis via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* 1. Interactive Master-Detail Showcase with Upspeed visualizer */}
        <div className="mb-12">
          <InteractivePackageShowcase
            onSelectPackage={(pkg) => handleSelectPackage(pkg.id)}
            onOpenRegister={handleSelectPackage}
          />
        </div>

        {/* 2. Full Package Catalog Grid with Filters */}
        <div className="mb-12">
          <PackageCatalog
            onSelectPackage={(pkg) => handleSelectPackage(pkg.id)}
            onOpenRegister={handleSelectPackage}
          />
        </div>

        {/* Bottom Fast Action Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black">
              Sudah Menemukan Paket yang Cocok?
            </h2>
            <p className="text-red-100 text-sm max-w-xl">
              Daftarkan sekarang juga untuk mendapatkan slot jadwal teknisi tercepat 1x24 jam dan jaminan promo biaya pasang diskon Rp 99.000.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/daftar"
              className="px-6 py-3.5 rounded-2xl bg-white text-red-600 font-black text-sm shadow-lg hover:bg-slate-100 transition-all active:scale-95"
            >
              Isi Formulir Pasang Baru
            </Link>
            <Link
              to="/cek-area"
              className="px-6 py-3.5 rounded-2xl bg-red-800/80 hover:bg-red-800 text-white font-bold text-sm border border-white/20 transition-all active:scale-95"
            >
              Cek Tiang ODP Dulu
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
