import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { createWhatsAppConsultUrl } from '../utils/helpers';

interface FloatingWhatsAppProps {
  onOpenRegister: () => void;
  onOpenSalesPhoto?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenRegister, onOpenSalesPhoto }) => {
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* Sales Greeting Bubble (Can be toggled) */}
      {bubbleOpen && (
        <div className="relative max-w-xs bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            type="button"
            onClick={() => setBubbleOpen(false)}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
            aria-label="Tutup pesan"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <button
              type="button"
              onClick={onOpenSalesPhoto}
              className="relative cursor-pointer focus:outline-hidden group"
              title="Klik untuk melihat foto profil Mas Vicky"
            >
              <img
                src={SALES_AGENT_INFO.photoUrl}
                alt="Mas Vicky"
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover object-top ring-2 ring-red-600 shadow-xs group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white"></span>
            </button>
            <div 
              onClick={onOpenSalesPhoto}
              className="cursor-pointer"
              title="Klik untuk melihat profil"
            >
              <p className="text-xs font-bold text-slate-900 hover:text-red-600 transition-colors">Mas Vicky</p>
              <p className="text-[10px] text-emerald-600 font-medium">Online • Sales Eksekutif</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Butuh konsultasi paket atau cek slot ODP tiang? Silakan kirim pesan ke WhatsApp saya.
          </p>

          <a
            href={createWhatsAppConsultUrl('Halo Mas Vicky, saya ingin konsultasi pasang baru')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat WhatsApp</span>
          </a>
        </div>
      )}

      {/* Floating Action WhatsApp Icon */}
      <a
        href={createWhatsAppConsultUrl('Tanya Promo Pasang Baru')}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-700/30 hover:shadow-emerald-700/50 transition-all hover:scale-105 active:scale-95"
        aria-label="Chat WhatsApp Sales Vicky"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
        </span>
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="hidden sm:inline">WhatsApp Sales Vicky</span>
      </a>

    </div>
  );
};
