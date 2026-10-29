import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CoverageCheck } from '../components/CoverageCheck';
import { Link, useRouter } from '../router/Router';
import { 
  MapPin, 
  Radio, 
  ShieldCheck, 
  Zap, 
  HelpCircle, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { createWhatsAppConsultUrl } from '../utils/helpers';

export const CoveragePage: React.FC = () => {
  const { navigate } = useRouter();

  const handleOpenRegister = () => {
    navigate('/daftar');
  };

  const waCheckUrl = createWhatsAppConsultUrl({
    source: 'Halaman Dedicated Cek Jangkauan ODP',
    note: 'Halo Mas Vicky, saya ingin bantuan cek ketersediaan tiang ODP fiber IndiHome di alamat rumah saya.',
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Cek Jangkauan Tiang ODP' }]} />

        {/* Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-red-950 text-white p-6 sm:p-10 mb-10 overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-red-400" />
              <span>Sistem Pengecekan Jaringan Fiber Optik Telkom</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Cek Jangkauan & Ketersediaan Port <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300">Tiang ODP IndiHome</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Sebelum melakukan pemasangan baru, pastikan tiang ODP (Optical Distribution Point) Telkom terdekat dari rumah Anda memiliki port kosong. Tim Sales Resmi Mas Vicky akan mengecek langsung ke database sistem jaringan Telkom dalam waktu 5-10 menit.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                100% Gratis Tanpa Biaya
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <Zap className="w-4 h-4 text-amber-400" />
                Respon Cepat 5-10 Menit
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                Akses Database Resmi Telkom
              </span>
            </div>
          </div>
        </div>

        {/* Main Coverage Check Component */}
        <div className="mb-12">
          <CoverageCheck onOpenRegister={handleOpenRegister} />
        </div>

        {/* Educational Guide: What is an ODP and How to Spot It? */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm mb-12 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-red-600" />
              <span>Panduan Edukasi Lapangan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Apa Itu Tiang ODP dan Mengapa Sangat Penting?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              ODP (*Optical Distribution Point*) adalah kotak terminal fiber optik yang terpasang di tiang listrik atau tiang khusus Telkom di pinggir jalan depan rumah Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-black">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Bentuk Fisik ODP</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Kotak plastik tebal berwarna putih atau abu-abu bertuliskan Telkom Indonesia / Fiber Optic, terpasang pada ketinggian sekitar 3 - 5 meter di tiang.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-black">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Kapasitas Port Terbatas</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Setiap kotak ODP umumnya hanya memiliki 8 sampai 16 port pelanggan. Jika semua port sudah terisi oleh tetangga, statusnya menjadi *ODP Full* dan perlu pengajuan penambahan port.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-black">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Jarak Maksimal Kabel</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Jarak ideal dari tiang ODP ke modem rumah adalah di bawah 200 meter demi menjaga nilai redaman cahaya optik (di bawah -24 dBm) agar internet stabil tanpa lag.
              </p>
            </div>
          </div>

          {/* Quick Direct WhatsApp Support Callout */}
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-emerald-950">
                  Punya Foto Tiang ODP atau Mau Shareloc Langsung?
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Kirimkan pin point Google Maps lokasi rumah Anda ke WhatsApp Mas Vicky ({SALES_AGENT_INFO.whatsappDisplay}) untuk verifikasi koordinat instan.
                </p>
              </div>
            </div>

            <a
              href={waCheckUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95 shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Kirim Shareloc via WA</span>
            </a>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Sudah yakin area Anda tercover?</span>
            <span className="text-base font-bold text-slate-900">Lanjut pilih paket internet atau isi formulir pendaftaran:</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/paket"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <span>Lihat Katalog Paket</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/daftar"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all inline-flex items-center gap-1.5 active:scale-95"
            >
              <span>Daftar Pasang Baru</span>
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
