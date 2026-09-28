import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Phone, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  ChevronRight,
  UserCheck,
  Headphones
} from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { createWhatsAppConsultUrl } from '../utils/helpers';

interface FloatingWhatsAppProps {
  onOpenRegister: () => void;
  onOpenSalesPhoto?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenSalesPhoto }) => {
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [choiceModalOpen, setChoiceModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      setBubbleOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const phone1 = SALES_AGENT_INFO.whatsappNumber; // '6282115291198'
  const display1 = SALES_AGENT_INFO.whatsappDisplay; // '0821-1529-1198'
  const phone2 = SALES_AGENT_INFO.whatsappNumberSecondary || '6289681888682';
  const display2 = SALES_AGENT_INFO.whatsappDisplaySecondary || '0896-8188-8682';

  const waUrl1 = createWhatsAppConsultUrl('Konsultasi Pasang Baru (Kontak Utama)', phone1);
  const waUrl2 = createWhatsAppConsultUrl('Konsultasi Pasang Baru (Layanan 2)', phone2);

  return (
    <>
      {/* Backdrop overlay when choice modal is open */}
      {choiceModalOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 animate-smooth-backdrop"
          onClick={() => setChoiceModalOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Container (Bottom Right) */}
      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-5 z-50 flex flex-col items-end gap-2.5 pointer-events-auto">
        
        {/* TWO-NUMBER SELECTION MODAL POPOVER */}
        {choiceModalOpen && (
          <div 
            role="dialog"
            aria-modal="true"
            aria-label="Pilih Nomor WhatsApp Sales"
            className="w-[320px] sm:w-[360px] bg-white rounded-3xl shadow-2xl border-2 border-emerald-500/40 p-4 sm:p-5 text-slate-800 animate-smooth-pop mb-2"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-150">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                    Pilih Kontak WhatsApp
                  </h3>
                  <p className="text-[10px] text-emerald-600 font-semibold">
                    Sales Resmi IndiHome Telkom
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setChoiceModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 text-slate-500 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Tutup pilihan"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-600 mt-2.5 mb-3 leading-relaxed">
              Silakan pilih nomor tujuan untuk langsung terhubung dengan tim sales Mas Vicky:
            </p>

            {/* OPSI 1: NOMOR UTAMA */}
            <div className="space-y-2.5">
              <a
                href={waUrl1}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setChoiceModalOpen(false)}
                className="group block p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-2 border-emerald-500/60 shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="relative mt-0.5 shrink-0">
                      <img
                        src={SALES_AGENT_INFO.photoUrl}
                        alt="Mas Vicky"
                        className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-emerald-600 shadow-xs"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-black text-slate-900">
                          Mas Vicky
                        </span>
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-white font-extrabold text-[9px] uppercase tracking-wide">
                          Nomor Utama
                        </span>
                      </div>

                      <div className="text-xs font-mono font-bold text-emerald-800 mt-0.5">
                        {display1}
                      </div>

                      <p className="text-[10px] text-slate-600 mt-0.5 leading-tight">
                        Pendaftaran pasang baru, cek slot ODP, & promo resmi
                      </p>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xs">
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-emerald-700 font-bold">
                  <span>Chat ke Nomor 1 (Utama)</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* OPSI 2: NOMOR KEDUA (LAYANAN 2) */}
              <a
                href={waUrl2}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setChoiceModalOpen(false)}
                className="group block p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-300 shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-emerald-600/15 border border-emerald-500/30 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Headphones className="w-5 h-5 text-emerald-600" />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-black text-slate-900">
                          Tim Sales / Layanan 2
                        </span>
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-700 font-bold text-[9px] uppercase tracking-wide">
                          Nomor 2
                        </span>
                      </div>

                      <div className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                        {display2}
                      </div>

                      <p className="text-[10px] text-slate-600 mt-0.5 leading-tight">
                        Alternatif respon cepat konsultasi & informasi pendaftaran
                      </p>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xs">
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-700 font-bold">
                  <span>Chat ke Nomor 2 (Alternatif)</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>

            <div className="mt-3 pt-2 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Keduanya resmi terhubung dengan Mas Vicky IndiHome Pusat</span>
            </div>
          </div>
        )}

        {/* Sales Greeting Bubble (Can be toggled or dismissed) */}
        {bubbleOpen && !choiceModalOpen && (
          <div className="relative max-w-[270px] sm:max-w-xs bg-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-slate-200 text-slate-800 animate-smooth-pop">
            <button
              type="button"
              onClick={() => setBubbleOpen(false)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 flex items-center justify-center text-slate-500 transition-all cursor-pointer"
              aria-label="Tutup pesan"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={onOpenSalesPhoto}
                className="relative cursor-pointer focus:outline-hidden group active:scale-90 transition-transform duration-200"
                title="Klik untuk melihat foto profil Mas Vicky"
              >
                <img
                  src={SALES_AGENT_INFO.photoUrl}
                  alt="Mas Vicky"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover object-top ring-2 ring-red-600 shadow-xs group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-white"></span>
              </button>
              <div 
                onClick={onOpenSalesPhoto}
                className="cursor-pointer active:scale-95 transition-transform"
                title="Klik untuk melihat profil"
              >
                <p className="text-xs font-bold text-slate-900 hover:text-red-600 transition-colors">Mas Vicky</p>
                <p className="text-[10px] text-emerald-600 font-medium">Online • Sales Eksekutif</p>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-2.5">
              Butuh konsultasi paket atau cek slot ODP tiang? Silakan klik tombol untuk memilih kontak WhatsApp kami.
            </p>

            <button
              type="button"
              onClick={() => {
                setBubbleOpen(false);
                setChoiceModalOpen(true);
              }}
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Pilih Kontak WhatsApp</span>
            </button>
          </div>
        )}

        {/* Floating Action Button (Toggles the 2-Number Selection Menu) */}
        <button
          type="button"
          onClick={() => {
            setBubbleOpen(false);
            setChoiceModalOpen(!choiceModalOpen);
          }}
          className="group relative flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-700/30 hover:shadow-emerald-700/50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Pilih WhatsApp Sales Mas Vicky"
        >
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-300"></span>
          </span>
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          <span className="text-xs sm:text-sm">WhatsApp Sales</span>
          <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-emerald-800 text-[10px] font-black">
            2 Nomor
          </span>
        </button>

      </div>
    </>
  );
};
