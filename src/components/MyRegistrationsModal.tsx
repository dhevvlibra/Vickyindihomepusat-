import React from 'react';
import { X, FileText, CheckCircle2, Clock, MessageCircle, ExternalLink, Trash2 } from 'lucide-react';
import { CustomerRegistration } from '../types';
import { formatRupiah, createWhatsAppRegistrationUrl } from '../utils/helpers';
import { PACKAGES } from '../data/packages';

interface MyRegistrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: CustomerRegistration[];
  onClear: () => void;
  onSelectReceipt: (reg: CustomerRegistration) => void;
}

export const MyRegistrationsModal: React.FC<MyRegistrationsModalProps> = ({
  isOpen,
  onClose,
  registrations,
  onClear,
  onSelectReceipt,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-smooth-backdrop">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 transform animate-smooth-pop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="registrations-title"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 id="registrations-title" className="text-base sm:text-lg font-bold">
                Riwayat Pendaftaran Anda
              </h3>
              <p className="text-xs text-slate-400">
                Data tersimpan di perangkat ini untuk pelacakan status
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          {registrations.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              Belum ada data pendaftaran yang tersimpan di perangkat ini.
            </div>
          ) : (
            <div className="space-y-3">
              {registrations.map((reg) => {
                const pkg = PACKAGES.find((p) => p.id === reg.packageId);
                const waUrl = createWhatsAppRegistrationUrl(reg, pkg);

                return (
                  <div
                    key={reg.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-red-600">
                        {reg.id}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" />
                        <span>Menunggu Teknisi</span>
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{reg.packageName}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Pemohon: <strong>{reg.fullName}</strong> ({reg.whatsapp})
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Alamat: {reg.fullAddress}, {reg.city}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                      <span className="font-bold text-slate-900">
                        {formatRupiah(reg.pricePromo)}/bln
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectReceipt(reg);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 rounded-lg text-slate-700"
                        >
                          Lihat Bukti
                        </button>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg inline-flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Hubungi Vicky</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {registrations.length > 0 && (
            <div className="pt-2 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={onClear}
                className="text-slate-400 hover:text-red-600 inline-flex items-center gap-1 text-[11px]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Riwayat di Perangkat</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold"
              >
                Tutup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
