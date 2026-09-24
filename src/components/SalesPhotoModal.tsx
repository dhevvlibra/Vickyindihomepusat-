import React, { useEffect } from 'react';
import { X, ShieldCheck, MessageCircle, Phone, ExternalLink, CheckCircle2 } from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { createWhatsAppConsultUrl } from '../utils/helpers';

interface SalesPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SalesPhotoModal: React.FC<SalesPhotoModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Foto Profil Sales Resmi"
    >
      <div 
        className="relative max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors shadow-md"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Photo Display */}
        <div className="relative bg-slate-900 aspect-4/5 sm:aspect-square w-full overflow-hidden group">
          <img
            src={SALES_AGENT_INFO.photoUrl}
            alt="Foto Resmi Mas Vicky - Sales IndiHome"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
          />
          {/* Subtle gradient vignette at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-xs flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Online Siap Melayani
            </span>
            <span className="text-[11px] text-slate-200 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
              ID Resmi: TELKOM-VK99
            </span>
          </div>
        </div>

        {/* Sales Credentials & Details */}
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 mb-1">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>TERVERIFIKASI RESMI TELKOM</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              {SALES_AGENT_INFO.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {SALES_AGENT_INFO.role}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-150">
            <div>
              <span className="text-slate-400 block text-[11px]">Layanan:</span>
              <span className="font-bold text-slate-800">Pasang Baru IndiHome</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Jam Kerja:</span>
              <span className="font-bold text-slate-800">07.30 - 22.00 WIB</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-1">
            <a
              href={createWhatsAppConsultUrl('Halo Mas Vicky, saya ingin tanya paket dan pasang baru')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors"
            >
              Tutup Pratinjau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
