import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link, useRouter } from '../router/Router';
import { 
  FileText, 
  Trash2, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';
import { CustomerRegistration } from '../types';
import { getSavedRegistrations, formatRupiah, createWhatsAppRegistrationUrl } from '../utils/helpers';
import { SALES_AGENT_INFO } from '../data/packages';

interface HistoryPageProps {
  onSelectReceipt: (registration: CustomerRegistration) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onSelectReceipt }) => {
  const { navigate } = useRouter();
  const [registrations, setRegistrations] = useState<CustomerRegistration[]>([]);

  useEffect(() => {
    setRegistrations(getSavedRegistrations());
  }, []);

  const handleClear = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus seluruh riwayat pendaftaran dari perangkat ini?')) {
      localStorage.removeItem('vicky_indihome_registrations');
      setRegistrations([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Riwayat Pendaftaran' }]} />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Database Pendaftaran Lokal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Riwayat Registrasi Pasang Baru Anda
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Data pendaftaran yang tersimpan di browser perangkat Anda untuk kemudahan cek status dan tanda bukti resmi.
            </p>
          </div>

          {registrations.length > 0 && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 text-xs font-bold transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
            >
              <Trash2 className="w-4 h-4" />
              <span>Hapus Riwayat</span>
            </button>
          )}
        </div>

        {/* List of Registrations */}
        {registrations.length > 0 ? (
          <div className="space-y-4">
            {registrations.map((reg) => {
              const waFollowUpUrl = `https://wa.me/${SALES_AGENT_INFO.whatsappNumber}?text=${encodeURIComponent(
                `Halo Mas Vicky, saya ingin cek status pemasangan nomor registrasi ${reg.id} atas nama ${reg.fullName} (${reg.packageName}).`
              )}`;

              return (
                <div
                  key={reg.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                          No. Registrasi:
                        </span>
                        <span className="font-mono text-sm sm:text-base font-extrabold text-slate-900">
                          {reg.id}
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{reg.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block mb-0.5">Nama Pemohon:</span>
                      <strong className="text-slate-800 text-sm block">{reg.fullName}</strong>
                      <span className="text-slate-500">{reg.whatsapp}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block mb-0.5">Paket yang Dipilih:</span>
                      <strong className="text-red-600 text-sm block">{reg.packageName}</strong>
                      <span className="text-slate-600 font-semibold">{formatRupiah(reg.pricePromo)}/bln</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block mb-0.5">Tanggal Pendaftaran:</span>
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{new Date(reg.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{reg.fullAddress}</span>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2.5 items-center justify-end">
                    <button
                      onClick={() => onSelectReceipt(reg)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Lihat Bukti Digital</span>
                    </button>

                    <a
                      href={waFollowUpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Follow Up Status ke WA</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Belum Ada Riwayat Pendaftaran
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
              Saat Anda mengisi formulir pendaftaran online di website ini, bukti tanda terima dan nomor registrasi resmi akan otomatis tersimpan di sini.
            </p>
            <div className="pt-2">
              <Link
                to="/daftar"
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all inline-flex items-center gap-2 active:scale-95"
              >
                <span>Daftar Pasang Baru Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
