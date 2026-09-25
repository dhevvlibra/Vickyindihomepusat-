import React, { useState, useEffect } from 'react';
import { 
  X, 
  Flame, 
  Sparkles, 
  Wifi, 
  Smartphone, 
  Tv, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Percent,
  Clock,
  Layers,
  ChevronRight,
  Zap
} from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { STREAMING_LOGOS } from '../data/streamingLogos';
import { createWhatsAppCustomUrl } from '../utils/helpers';

interface PromoHighlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimPromo: (packageId: string) => void;
  onViewAllPackages: () => void;
}

export const PromoHighlightModal: React.FC<PromoHighlightModalProps> = ({
  isOpen,
  onClose,
  onClaimPromo,
  onViewAllPackages,
}) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Close with Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dontShowAgain]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDismiss = () => {
    if (dontShowAgain) {
      try {
        sessionStorage.setItem('vicky_promo_148k_dismissed', 'true');
      } catch {
        // ignore storage errors
      }
    }
    onClose();
  };

  const handleClaim = () => {
    // 148k package ID in PACKAGES_DATA is 'tone-20-30gb'
    onClaimPromo('tone-20-30gb');
    onClose();
  };

  const handleViewCatalog = () => {
    onClose();
    onViewAllPackages();
  };

  const streamingApps = [
    { name: 'Vision+', key: 'Vision+' },
    { name: 'Prime Video', key: 'Prime Video' },
    { name: 'Viu', key: 'Viu' },
    { name: 'MAXstream', key: 'MaxStream' },
  ];

  const waPromoUrl = createWhatsAppCustomUrl(
    'Halo Mas Vicky! Saya tertarik dengan PROMO HIGHLIGHT Telkomsel One 148K (WiFi 20 Mbps Unlimited + Kuota HP Keluarga 30 GB seharga Rp 148.000/bln yang GRATIS BIAYA PASANG / PSB Rp 0). Mohon cek jangkauan jaringan dan bantu pendaftaran pasang baru di alamat saya.'
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity duration-300 animate-smooth-backdrop"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-dialog-title"
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl shadow-red-950/40 border border-red-500/30 overflow-hidden z-10 my-auto animate-smooth-pop max-h-[92vh] flex flex-col"
      >
        {/* Top Gradient Header */}
        <div className="relative bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-5 sm:p-6 overflow-hidden shrink-0">
          {/* Background decorative glow & circles */}
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-black/25 rounded-full blur-xl pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Tutup Promo"
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-black/25 hover:bg-black/45 active:scale-90 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-2.5 pr-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-red-950 font-black text-[11px] sm:text-xs tracking-wider uppercase shadow-md animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-red-950 text-red-950" />
              <span>Promo Highlight Terbaru</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-[10px] sm:text-[11px]">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span>Paling Hemat & Paling Laris</span>
            </span>
          </div>

          {/* Header Title */}
          <h2 id="promo-dialog-title" className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
            Telkomsel One Dynamic <span className="text-yellow-300">148 Ribu!</span>
          </h2>
          <p className="text-xs sm:text-sm text-red-100 font-medium mt-1 leading-snug">
            WiFi Rumah Fiber Cepat + Bonus Kuota HP Keluarga 30 GB dalam 1 Tagihan.
          </p>

          {/* Big Price Callout Box */}
          <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-slate-950/40 border border-white/20 backdrop-blur-md flex items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-red-200 line-through font-semibold">
                  Rp 240.000
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase">
                  Hemat 40%
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl sm:text-4xl font-black text-yellow-300 tracking-tight drop-shadow-sm">
                  Rp 148.000
                </span>
                <span className="text-xs sm:text-sm text-red-100 font-semibold">
                  /bulan*
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-red-200 mt-0.5">
                *Tarif resmi Telkom (belum PPN 11%). Cuma ~Rp 4.900/hari!
              </p>
            </div>

            {/* Quick mini perk */}
            <div className="hidden sm:block text-right border-l border-white/20 pl-4 shrink-0">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-yellow-300">Biaya Pasang (PSB)</span>
              <div className="flex items-baseline justify-end gap-1.5 mt-0.5">
                <span className="text-xs text-red-300 line-through">Rp 120.000</span>
                <span className="text-lg sm:text-xl font-black text-yellow-300">Rp 0 (GRATIS)</span>
              </div>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wide">
                BEBAS BIAYA PASANG!
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-slate-800">
          {/* Main 4 Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {/* 1. WiFi Rumah */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-red-50/80 border border-red-200/80 flex items-start gap-3 hover:border-red-300 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>WiFi 20 Mbps Unlimited</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-red-100 text-red-700">100% Fiber</span>
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">
                  Koneksi internet serat optik stabil, lancar untuk browsing, tugas, zoom, dan streaming.
                </p>
              </div>
            </div>

            {/* 2. Kuota HP Keluarga */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 hover:border-amber-300 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>Bonus Kuota HP 30 GB</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">Keluarga</span>
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">
                  Kuota bersama tiap bulan untuk nomor Telkomsel prabayar/pascabayar sekeluarga.
                </p>
              </div>
            </div>

            {/* 3. Streaming Apps */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:border-slate-300 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-yellow-400 flex items-center justify-center shrink-0 shadow-xs">
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                  Bonus 4 Langganan OTT
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">
                  Vision+, Prime Video, Viu, & MAXstream langsung aktif tanpa biaya tambahan.
                </p>
              </div>
            </div>

            {/* 4. Bebas Biaya Pasang (PSB Rp 0) */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-300 flex items-start gap-3 hover:border-emerald-400 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>GRATIS Biaya Pasang (PSB Rp 0)</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-600 text-white">BEBAS PSB</span>
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">
                  Khusus paket 148K sama sekali tidak ada biaya pasang (hemat Rp 120.000) & tanpa DP Rp 0 di awal!
                </p>
              </div>
            </div>
          </div>

          {/* Streaming Logos Display */}
          <div className="p-3 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
              <span className="text-xs font-bold text-slate-200">
                Termasuk Akses Hiburan Premium:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {streamingApps.map((app) => {
                const info = STREAMING_LOGOS[app.key];
                return (
                  <div
                    key={app.name}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs text-[11px] font-bold text-white shadow-xs"
                  >
                    {info?.logoUrl ? (
                      <img
                        src={info.logoUrl}
                        alt={app.name}
                        className="w-4 h-4 rounded-xs object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ) : null}
                    <span>{app.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile PSB promo banner callout */}
          <div className="sm:hidden p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between text-xs">
            <span className="text-emerald-950 font-bold">Biaya Pasang Baru (PSB):</span>
            <div className="flex items-center gap-1.5">
              <span className="line-through text-slate-400 text-[10px]">Rp 120.000</span>
              <span className="font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Rp 0 (GRATIS!)</span>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer Action Buttons */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-2.5 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Primary Action: Claim 148k Promo */}
            <button
              type="button"
              onClick={handleClaim}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white font-black text-xs sm:text-sm text-center shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>Daftar Paket 148K Sekarang</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            {/* WhatsApp Consultation */}
            <a
              href={waPromoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                try {
                  sessionStorage.setItem('vicky_promo_148k_dismissed', 'true');
                } catch {
                  // ignore
                }
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-xs sm:text-sm text-center shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Tanya Mas Vicky via WA</span>
            </a>
          </div>

          {/* Secondary Links & Dismiss */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-xs text-slate-500">
            <label className="flex items-center gap-2 cursor-pointer select-none text-[11px] text-slate-600 hover:text-slate-800">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span>Jangan tampilkan lagi pop-up ini</span>
            </label>

            <button
              type="button"
              onClick={handleViewCatalog}
              className="text-red-600 hover:text-red-700 font-bold text-[11px] inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Lihat semua paket katalog lainnya</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Floating Trigger Pill for quick access when modal is closed
interface PromoFloatingTriggerProps {
  onOpen: () => void;
}

export const PromoFloatingTrigger: React.FC<PromoFloatingTriggerProps> = ({ onOpen }) => {
  return (
    <div className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-30 animate-smooth-pop">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Buka Promo Highlight Paket 148K"
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-red-950/25 border-2 border-yellow-400 hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        {/* Pulsing beacon glow */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-yellow-400 border border-red-700"></span>
        </span>

        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-yellow-400 text-red-950 flex items-center justify-center shrink-0 shadow-xs">
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-red-950 text-red-950 animate-bounce" />
        </div>

        <div className="text-left pr-1">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-yellow-300">
              HOT PROMO
            </span>
            <span className="text-[10px] text-emerald-300 font-bold">• GRATIS PSB</span>
          </div>
          <div className="text-xs sm:text-sm font-black text-white leading-tight mt-0.5">
            WiFi + 30GB Cuma <span className="text-yellow-300">Rp 148rb</span> (PSB Rp 0)
          </div>
        </div>

        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};
