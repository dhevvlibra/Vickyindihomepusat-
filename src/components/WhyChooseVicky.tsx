import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  HeartHandshake, 
  Headphones, 
  Award,
  ZoomIn
} from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';

interface WhyChooseVickyProps {
  onOpenSalesPhoto?: () => void;
}

export const WhyChooseVicky: React.FC<WhyChooseVickyProps> = ({ onOpenSalesPhoto }) => {
  const advantages = [
    {
      title: 'Pelayanan Cepat & Fast Response',
      desc: 'Mas Vicky siap melayani konsultasi pendaftaran dari jam 07.30 - 22.00 WIB setiap hari. Pertanyaan Anda dijawab dalam hitungan menit.',
      icon: Clock,
    },
    {
      title: 'Bantuan Pengawalan ODP Penuh',
      desc: 'Sering ditolak karena tiang ODP penuh? Mas Vicky akan langsung koordinasi dengan tim lapangan Telkom untuk solusi penarikan jalur atau penambahan slot.',
      icon: ShieldCheck,
    },
    {
      title: '100% Resmi & Bebas Biaya Calo',
      desc: 'Tidak ada biaya tersembunyi ataupun uang muka (DP) tunai. Seluruh biaya resmi ditagihkan melalui tagihan bulanan sah dari Telkom Indonesia.',
      icon: Award,
    },
    {
      title: 'Dukungan After-Sales Selamanya',
      desc: 'Bukan sekadar jualan lalu ditinggal. Simpan kontak Mas Vicky untuk kemudahan saat butuh bantuan gangguan teknis, relokasi, atau upgrade kecepatan.',
      icon: Headphones,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Agent Profile & Credential Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 shadow-xs overflow-hidden">
              
              <div className="flex items-center gap-3.5 sm:gap-4 mb-4 sm:mb-6">
                <button
                  type="button"
                  onClick={onOpenSalesPhoto}
                  className="relative group cursor-pointer focus:outline-hidden shrink-0 active:scale-90 transition-transform duration-200"
                  title="Klik untuk memperbesar foto sales resmi"
                  aria-label="Perbesar Foto Profil Sales Resmi"
                >
                  <img
                    src={SALES_AGENT_INFO.photoUrl}
                    alt={SALES_AGENT_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl object-cover object-top ring-2 ring-red-600 shadow-md shadow-red-500/20 group-hover:scale-105 group-hover:ring-red-500 transition-all"
                  />
                  <span className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[10px] font-bold backdrop-blur-2xs">
                    <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-md animate-bounce" />
                    <span>Perbesar</span>
                  </span>
                </button>
                <div>
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-red-600 uppercase tracking-wide">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Sales Executive</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    {SALES_AGENT_INFO.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Sales Resmi Telkom Regional</p>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-slate-150 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Jabatan:</span>
                  <span className="font-semibold text-slate-800">{SALES_AGENT_INFO.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Domain Resmi:</span>
                  <span className="font-mono font-bold text-red-600">{SALES_AGENT_INFO.domainName}.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Jam Layanan:</span>
                  <span className="font-medium text-slate-800">{SALES_AGENT_INFO.workingHours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Wilayah Jangkauan:</span>
                  <span className="font-medium text-slate-800">Seluruh Indonesia</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Rating Kepuasan:</span>
                  <span className="font-bold text-emerald-600">⭐ 4.9 / 5.0 (2.450+ Pelanggan)</span>
                </div>
              </div>

              <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs text-slate-600 font-medium">
                  Pelayanan personal, ramah, dan bebas biaya konsultasi.
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Why Choose Vicky */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Pelayanan Personal Terbaik</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Kenapa Lebih Nyaman Pasang Lewat Vicky IndiHome Pusat?
              </h2>
              <p className="text-slate-600 text-xs sm:text-base mt-2 leading-relaxed">
                Kami memahami kebutuhan Anda akan koneksi internet yang cepat tanpa ribet birokrasi. Bersama sales resmi, proses pengajuan Anda dikawal khusus dari awal hingga selesai.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {advantages.map((adv, idx) => {
                const Icon = adv.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-200 hover:shadow-xs transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1.5">{adv.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{adv.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
