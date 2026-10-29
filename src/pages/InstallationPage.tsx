import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InstallationSteps } from '../components/InstallationSteps';
import { Link, useRouter } from '../router/Router';
import { 
  Clock, 
  FileCheck, 
  ShieldAlert, 
  ShieldCheck, 
  Wrench, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  PhoneCall 
} from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { createWhatsAppConsultUrl } from '../utils/helpers';

export const InstallationPage: React.FC = () => {
  const { navigate } = useRouter();

  const waUrl = createWhatsAppConsultUrl({
    source: 'Halaman Alur Pasang & Syarat Dokumen',
    note: 'Halo Mas Vicky, saya ingin tanya syarat pasang baru IndiHome dan jadwal teknisi terdekat.',
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Alur & Syarat Pemasangan 1x24 Jam' }]} />

        {/* Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-red-950 text-white p-6 sm:p-10 mb-10 overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              <span>SOP Pemasangan Resmi PT Telkom Indonesia</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Syarat & Alur Pemasangan <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300">IndiHome 1x24 Jam</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Proses pendaftaran cepat, transparan, dan tanpa antre. Berkas diverifikasi langsung oleh Sales Resmi Mas Vicky dan teknisi resmi Telkom akan datang ke lokasi Anda sesuai jadwal janji temu.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                Cukup Foto e-KTP & Shareloc
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <Wrench className="w-4 h-4 text-amber-400" />
                Teknisi Resmi Berseragam & ID Card
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                Bayar Resmi Pasca-Pasang
              </span>
            </div>
          </div>
        </div>

        {/* 4 Steps Component */}
        <div className="mb-12">
          <InstallationSteps onOpenRegister={() => navigate('/daftar')} />
        </div>

        {/* Requirements & Documents Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Dokumen Persyaratan Pasang Baru
                </h3>
                <p className="text-xs text-slate-500">
                  Disiapkan saat pengisian formulir online atau dikirim ke WhatsApp
                </p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black shrink-0">1</span>
                <div>
                  <strong className="block text-slate-900">Foto e-KTP Asli</strong>
                  <span className="text-slate-500 text-xs">Foto KTP jelas, tidak buram, dan tidak terpotong (KTP WNI yang masih berlaku).</span>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black shrink-0">2</span>
                <div>
                  <strong className="block text-slate-900">Alamat Lengkap & Shareloc</strong>
                  <span className="text-slate-500 text-xs">Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, serta patokan lokasi / pin Google Maps.</span>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black shrink-0">3</span>
                <div>
                  <strong className="block text-slate-900">Nomor HP Aktif & Email</strong>
                  <span className="text-slate-500 text-xs">Nomor WhatsApp utama untuk koordinasi teknisi dan email untuk penerimaan e-bill tagihan resmi.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Security & Anti-Fraud Notice */}
          <div className="bg-amber-50 rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-amber-950">
                  Peringatan Keamanan & Anti-Penipuan
                </h3>
                <p className="text-xs text-amber-800">
                  Waspada terhadap oknum yang meminta titip uang tunai
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-amber-900 leading-relaxed">
              <p className="p-3.5 rounded-2xl bg-white/80 border border-amber-200">
                ⛔ <strong>DILARANG MEMBAYAR TUNAI</strong> ke teknisi yang datang memasang kabel atau perangkat di rumah Anda.
              </p>
              <p className="p-3.5 rounded-2xl bg-white/80 border border-amber-200">
                ✅ Seluruh biaya pasang baru (PSB Rp 99.000 atau Rp 0 untuk paket 148K) akan tercantum secara sah pada <strong>tagihan bulan pertama</strong>.
              </p>
              <p className="p-3.5 rounded-2xl bg-white/80 border border-amber-200">
                💳 Pembayaran resmi hanya dilakukan melalui transfer Virtual Account Telkom, aplikasi MyTelkomsel / MyIndiHome, ATM, Indomaret, Alfamart, atau gerai resmi Plasa Telkom.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black">
              Siap Melakukan Pemasangan WiFi di Rumah?
            </h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Isi formulir online sekarang dalam 3 menit, berkas Anda akan langsung diproses ke sistem Telkom hari ini juga.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/daftar"
              className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-95"
            >
              Mulai Pendaftaran Online
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat Mas Vicky via WA</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
