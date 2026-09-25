import React from 'react';
import { Tag, Clock, Gift, Percent, Wifi, Sparkles } from 'lucide-react';

interface PromoBannerProps {
  onOpenRegister: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onOpenRegister }) => {
  return (
    <section id="promo" className="relative -mt-6 z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-4 sm:p-8 shadow-xl shadow-red-950/10 border border-red-500/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
          
          {/* Promo Header & Details */}
          <div className="lg:col-span-8 space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-300" />
              <span>Promo Spesial Pasang Baru Bulan Ini</span>
            </div>

            {/* Price Highlight: Coretan Rp 120.000 -> Rp 89.000 */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <span className="text-base sm:text-2xl line-through text-red-200/90 font-bold">
                Rp 120.000
              </span>
              <span className="text-2xl sm:text-5xl font-black text-yellow-300 tracking-tight drop-shadow-md">
                Rp 89.000
              </span>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-yellow-400 text-red-950 font-black text-[10px] sm:text-xs uppercase tracking-wide shadow-xs">
                HEMAT RP 31.000
              </span>
            </div>

            <h2 className="text-lg sm:text-2xl font-black tracking-tight leading-snug">
              Tarif Biaya Pasang Baru (PSB) Resmi Terhemat
            </h2>

            <p className="text-red-100 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Daftar online melalui Mas Vicky hari ini untuk mengunci tarif biaya pasang baru hanya Rp 89.000 (tarif normal Rp 120.000). Tagihan resmi Telkom tanpa biaya calo dan tanpa bayar tunai di awal.
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 sm:pt-2">
              <div className="bg-yellow-400 text-red-950 rounded-xl p-2 sm:p-2.5 text-center shadow-md ring-2 ring-yellow-300/50">
                <Percent className="w-3.5 h-3.5 text-red-900 mx-auto mb-0.5 sm:mb-1" />
                <p className="text-[9px] line-through text-red-800 font-semibold">Rp 120.000</p>
                <p className="text-[11px] sm:text-xs font-black text-red-950">PSB Rp 89.000</p>
                <p className="text-[9px] text-red-900 font-medium">Hemat Pasang</p>
              </div>

              <div className="bg-black/15 backdrop-blur-xs rounded-xl p-2 sm:p-2.5 border border-white/10 text-center">
                <Wifi className="w-3.5 h-3.5 text-yellow-300 mx-auto mb-0.5 sm:mb-1" />
                <p className="text-[11px] sm:text-xs font-bold">100% Fiber</p>
                <p className="text-[9px] text-red-100">Koneksi stabil</p>
              </div>

              <div className="bg-black/15 backdrop-blur-xs rounded-xl p-2 sm:p-2.5 border border-white/10 text-center">
                <Gift className="w-3.5 h-3.5 text-yellow-300 mx-auto mb-0.5 sm:mb-1" />
                <p className="text-[11px] sm:text-xs font-bold">Bonus OTT</p>
                <p className="text-[9px] text-red-100">Streaming komplit</p>
              </div>

              <div className="bg-black/15 backdrop-blur-xs rounded-xl p-2 sm:p-2.5 border border-white/10 text-center">
                <Clock className="w-3.5 h-3.5 text-yellow-300 mx-auto mb-0.5 sm:mb-1" />
                <p className="text-[11px] sm:text-xs font-bold">1x24 Jam</p>
                <p className="text-[9px] text-red-100">Prioritas teknisi</p>
              </div>
            </div>
          </div>

          {/* Action Box: Proportionate button */}
          <div className="lg:col-span-4 flex flex-col justify-center pt-1 lg:pt-0">
            <button
              type="button"
              onClick={() => onOpenRegister()}
              className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-white hover:bg-slate-100 text-red-600 font-black text-xs sm:text-sm text-center shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Klaim Promo Rp 89.000 Sekarang
            </button>
            <p className="text-center text-[10px] sm:text-[11px] text-red-200 mt-1.5">
              Slot promo terbatas untuk wilayah tercover
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
