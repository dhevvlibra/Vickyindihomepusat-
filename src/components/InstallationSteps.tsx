import React from 'react';
import { 
  ClipboardCheck, 
  MapPin, 
  Wrench, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  FileText,
  Phone,
  Clock,
  Sparkles
} from 'lucide-react';

interface InstallationStepsProps {
  onOpenRegister: () => void;
}

export const InstallationSteps: React.FC<InstallationStepsProps> = ({ onOpenRegister }) => {
  const steps = [
    {
      num: '01',
      title: 'Pilih Paket & Isi Data',
      desc: 'Tentukan kecepatan internet yang diinginkan dan lengkapi alamat pemasangan melalui formulir resmi online.',
      time: '± 2 Menit',
      icon: ClipboardCheck,
    },
    {
      num: '02',
      title: 'Verifikasi Slot ODP',
      desc: 'Sales Resmi Vicky memvalidasi titik tiang ODP terdekat dan mengonfirmasi ketersediaan port fiber optik.',
      time: '10 - 15 Menit',
      icon: MapPin,
    },
    {
      num: '03',
      title: 'Pemasangan oleh Teknisi',
      desc: 'Teknisi bersertifikasi resmi Telkom datang ke rumah untuk penarikan kabel fiber optik dan instalasi perangkat.',
      time: '1x24 Jam Kerja',
      icon: Wrench,
    },
    {
      num: '04',
      title: 'Internet Langsung Aktif',
      desc: 'Perangkat diaktivasi langsung di tempat, uji kecepatan (speedtest), dan internet siap dinikmati seluruh keluarga.',
      time: 'Siap Pakai',
      icon: CheckCircle2,
    },
  ];

  const requirements = [
    {
      label: 'Foto e-KTP Asli',
      desc: 'Untuk verifikasi identitas pemilik langganan resmi Telkom.',
      icon: FileText,
    },
    {
      label: 'Nomor WhatsApp Aktif',
      desc: 'Untuk notifikasi janji kedatangan teknisi & tagihan bulanan.',
      icon: Phone,
    },
    {
      label: 'Alamat Pemasangan Jelas',
      desc: 'Disertai patokan atau titik lokasi Google Maps untuk teknisi.',
      icon: MapPin,
    },
    {
      label: 'Tanpa Uang Muka (DP)',
      desc: 'Tidak ada biaya tunai kepada siapapun di awal. 100% aman.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="cara-pasang" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Alur Praktis Tanpa Ribet</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            4 Langkah Mudah Pasang Baru IndiHome
          </h2>

          <p className="text-slate-600 text-base">
            Proses transparan dan dikawal langsung oleh Sales Resmi <strong className="text-slate-900">Vicky</strong> dari verifikasi hingga kabel menyala di rumah Anda.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-red-200 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-red-600 font-mono">
                      {step.num}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                      {step.time}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-red-100/70 text-red-600 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 text-[11px] font-semibold text-slate-400">
                  Langkah {idx + 1} dari 4
                </div>
              </div>
            );
          })}
        </div>

        {/* Required Documents Box */}
        <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-8">
          <div className="pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Dokumen & Persyaratan Pasang Baru</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Cukup Siapkan 4 Hal Sederhana Ini:
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {requirements.map((req, idx) => {
              const Icon = req.icon;
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-red-400 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">{req.label}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{req.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
