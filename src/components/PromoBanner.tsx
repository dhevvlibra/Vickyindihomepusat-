import React from 'react';
import { Tag, Clock, Gift, Percent, Wifi, Sparkles } from 'lucide-react';

interface PromoBannerProps {
  onOpenRegister: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onOpenRegister }) => {
  return (
    <section id="promo" className="relative -mt-6 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-6 sm:p-8 shadow-xl shadow-red-950/10 border border-red-500/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Promo Header & Details */}
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Promo Pemasangan Baru Spesial Bulan Ini</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              Diskon Pasang Baru 70% + Ekstra Upspeed Promo
            </h2>

            <p className="text-red-100 text-sm leading-relaxed max-w-2xl">
              Daftar online sekarang untuk mengunci tarif promo langganan termurah dan prioritas survei teknisi lapangan.
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="bg-black/15 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-center">
                <Percent className="w-4 h-4 text-yellow-300 mx-auto mb-1" />
                <p className="text-xs font-bold">Diskon PSB 70%</p>
                <p className="text-[10px] text-red-150">Hemat biaya pasang</p>
              </div>

              <div className="bg-black/15 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-center">
                <Wifi className="w-4 h-4 text-yellow-300 mx-auto mb-1" />
                <p className="text-xs font-bold">100% Fiber Optic</p>
                <p className="text-[10px] text-red-150">Koneksi stabil & cepat</p>
              </div>

              <div className="bg-black/15 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-center">
                <Gift className="w-4 h-4 text-yellow-300 mx-auto mb-1" />
                <p className="text-xs font-bold">Bonus Streaming</p>
                <p className="text-[10px] text-red-150">Aplikasi OTT lengkap</p>
              </div>

              <div className="bg-black/15 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-center">
                <Clock className="w-4 h-4 text-yellow-300 mx-auto mb-1" />
                <p className="text-xs font-bold">Pasang 1x24 Jam</p>
                <p className="text-[10px] text-red-150">Prioritas teknisi</p>
              </div>
            </div>
          </div>

          {/* Action Box: Single clean button */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <button
              type="button"
              onClick={() => onOpenRegister()}
              className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-slate-100 text-red-600 font-black text-sm sm:text-base text-center shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Klaim Promo Ini Sekarang
            </button>
            <p className="text-center text-[11px] text-red-200 mt-2">
              Slot promo terbatas untuk wilayah tercover
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
