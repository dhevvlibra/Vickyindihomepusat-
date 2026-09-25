import React, { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  Copy, 
  Check, 
  MessageCircle, 
  FileText, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { CustomerRegistration } from '../types';
import { formatRupiah, createWhatsAppRegistrationUrl } from '../utils/helpers';
import { SALES_AGENT_INFO, PACKAGES } from '../data/packages';

interface RegistrationReceiptModalProps {
  registration: CustomerRegistration | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationReceiptModal: React.FC<RegistrationReceiptModalProps> = ({
  registration,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !registration) return null;

  const pkg = PACKAGES.find((p) => p.id === registration.packageId);

  const copyToClipboard = () => {
    const text = `Konfirmasi Pendaftaran IndiHome\nNama: ${registration.fullName}\nPaket: ${registration.packageName} (${formatRupiah(registration.pricePromo)}/bln belum PPN)\nAlamat: ${registration.fullAddress}, ${registration.city}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waUrl = createWhatsAppRegistrationUrl(registration, pkg);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-smooth-backdrop">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 transform animate-smooth-pop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-title"
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 relative text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-md">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <h3 id="receipt-title" className="text-xl sm:text-2xl font-black">
            Pendaftaran Berhasil Terkirim!
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Data Anda telah masuk ke sistem sales resmi <strong>vickyindihomepusat</strong>.
          </p>
        </div>

        {/* Receipt Body */}
        <div className="p-6 space-y-5">
          
          {/* Status Box */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-emerald-900">Status:</span>
              <span className="text-emerald-700 font-semibold">Menunggu Verifikasi & Cek ODP</span>
            </div>
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Data</span>
                </>
              )}
            </button>
          </div>

          {/* Details Table */}
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-400">Nama Pelanggan:</span>
              <span className="font-bold text-slate-900">{registration.fullName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-400">Nomor WhatsApp:</span>
              <span className="font-semibold text-slate-900">{registration.whatsapp}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-400">Paket Terpilih:</span>
              <span className="font-bold text-red-600">{registration.packageName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-400">Tarif Promo Bulanan:</span>
              <div className="text-right">
                <span className="font-bold text-slate-900 block">{formatRupiah(registration.pricePromo)}/bln</span>
                <span className="text-[10px] text-amber-700 font-bold block">*Belum termasuk PPN 11%</span>
              </div>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-400">Jadwal Pemasangan:</span>
              <span className="font-medium text-slate-700 text-right">Dipilih setelah upload data KTP</span>
            </div>
            <div className="py-1.5 border-b border-slate-100">
              <span className="text-slate-400 block mb-0.5">Alamat Pemasangan:</span>
              <span className="font-medium text-slate-900 block leading-relaxed">
                {registration.fullAddress}, {registration.city}
              </span>
            </div>
          </div>

          {/* Next Steps Notification */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-blue-900">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Langkah Selanjutnya:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-blue-900 text-[11px] leading-relaxed">
              <li>Mas Vicky akan mengecek slot tiang ODP terdekat dalam waktu 10-15 menit.</li>
              <li>Teknisi resmi Telkom akan menghubungi Anda untuk konfirmasi jam kedatangan.</li>
              <li>Siapkan foto e-KTP asli saat teknisi tiba untuk aktivasi perangkat ONT.</li>
            </ol>
          </div>

          {/* Action Button: WhatsApp Direct */}
          <div className="space-y-2 pt-1">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Kirim Konfirmasi Langsung ke WhatsApp Mas Vicky</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Selesai & Tutup
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
