import React, { useState } from 'react';
import { MapPin, MessageCircle, Sparkles, Send, ShieldCheck, Zap } from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { createWhatsAppCoverageUrl } from '../utils/helpers';

interface CoverageCheckProps {
  onOpenRegister?: () => void;
}

export const CoverageCheck: React.FC<CoverageCheckProps> = () => {
  const [addressInput, setAddressInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpenWhatsApp = (addressToUse: string) => {
    const trimmed = addressToUse.trim();
    if (!trimmed) {
      setErrorMessage('Silakan ketik alamat detail lokasi Anda terlebih dahulu.');
      return;
    }
    setErrorMessage('');
    const waUrl = createWhatsAppCoverageUrl(trimmed);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleOpenWhatsApp(addressInput);
  };

  return (
    <section id="cek-jangkauan" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 sm:space-y-3 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Pengecekan Jaringan Fiber Optik</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Cek Ketersediaan Jaringan di Lokasi Anda
          </h2>

          <p className="text-slate-600 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed px-2">
            Pastikan ketersediaan port tiang ODP di alamat Anda. Masukkan alamat detail Anda di bawah ini dan klik <strong className="text-slate-800">Cek Area</strong> untuk langsung terhubung ke WhatsApp Mas Vicky (Sales Resmi Telkom: {SALES_AGENT_INFO.whatsappDisplay}).
          </p>
        </div>

        {/* Interactive Search Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5 flex flex-wrap items-center justify-between gap-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Masukkan Alamat Detail Anda:</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-normal text-slate-500">
                  (Nama Jalan, RT/RW, Kel/Kec, Patokan, dll)
                </span>
              </label>

              <textarea
                rows={3}
                required
                value={addressInput}
                onChange={(e) => {
                  setAddressInput(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Contoh: Jl. Mawar No. 14, RT 03/05, Kel. Sukamaju, Kec. Cilodong, Kota Depok (Patokan dekat Masjid Al-Ikhlas / Shareloc Google Maps)"
                className="w-full p-3 sm:p-4 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none shadow-2xs leading-relaxed"
              />

              {errorMessage && (
                <p className="mt-1.5 text-xs text-red-600 font-semibold flex items-center gap-1">
                  <span>⚠️</span>
                  <span>{errorMessage}</span>
                </p>
              )}
            </div>

            {/* Main Action Button: Cek Area -> WhatsApp */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white shrink-0" />
                <span>Cek Area ke WhatsApp</span>
                <span className="hidden sm:inline">({SALES_AGENT_INFO.whatsappDisplay})</span>
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200 shrink-0" />
              </button>
            </div>
          </form>

          {/* Value Badges */}
          <div className="pt-3 sm:pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200/60">
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-[11px] sm:text-xs">Respon Cepat 5-10 Menit</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-[11px] sm:text-xs">Cek Tiang ODP Resmi Telkom</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200/60">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="text-[11px] sm:text-xs">100% Gratis Tanpa Biaya</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
