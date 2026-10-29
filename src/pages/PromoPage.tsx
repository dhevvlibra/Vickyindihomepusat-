import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link, useRouter } from '../router/Router';
import { 
  Flame, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Smartphone, 
  Zap, 
  Tv, 
  Clock, 
  ShieldCheck, 
  MessageCircle 
} from 'lucide-react';
import { PACKAGES, SALES_AGENT_INFO } from '../data/packages';
import { formatRupiah, createWhatsAppRegistrationUrl, createWhatsAppConsultUrl } from '../utils/helpers';
import { StreamingBenefitBadges } from '../components/StreamingBenefitBadges';

export const PromoPage: React.FC = () => {
  const { navigate } = useRouter();

  const pkg148k = PACKAGES.find((p) => p.id === 'telkomsel-one-148k') || PACKAGES[0];
  const pkg50mbps = PACKAGES.find((p) => p.id === 'indihome-50mbps-1p') || PACKAGES[1];

  const handleClaim = (packageId: string) => {
    navigate(`/daftar?paket=${packageId}`);
  };

  const waPromoUrl = createWhatsAppConsultUrl({
    source: 'Halaman Promo Spesial 2026',
    note: 'Halo Mas Vicky, saya ingin klaim promo IndiHome / Telkomsel One terbaru. Mohon info kuotanya ya.',
  });

  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Promo Spesial & Diskon PSB' }]} />

        {/* Hero Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-red-950 via-slate-900 to-slate-950 text-white p-6 sm:p-12 mb-12 overflow-hidden shadow-2xl border border-red-900/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
              <Flame className="w-4 h-4 fill-white" />
              <span>Promo Resmi IndiHome & Telkomsel One 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Kumpulan Promo <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">Paling Hemat & Gratis Biaya Pasang</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Dapatkan diskon biaya instalasi (PSB) dari Rp 250.000 menjadi Rp 99.000, paket bundling revolusioner Telkomsel One mulai Rp 148.000 bebas biaya pasang, dan bonus lonjakan kecepatan (Upspeed) gratis 3 bulan!
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={waPromoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Promo ke Mas Vicky</span>
              </a>

              <Link
                to="/paket"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs sm:text-sm transition-all"
              >
                <span>Lihat Semua Paket Reguler</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* PROMO SPOTLIGHT 1: TELKOMSEL ONE 148K BEBAS BIAYA PASANG */}
        <div className="mb-14 bg-gradient-to-br from-red-600 via-rose-600 to-red-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>HOT PROMO: GRATIS BIAYA PASANG (RP 0)</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black leading-tight">
                Paket Telkomsel One Hemat 148K: Gabungan WiFi Fiber + Kuota HP Keluarga
              </h2>

              <p className="text-sm sm:text-base text-red-100 leading-relaxed">
                Solusi terlengkap dan paling hemat di Indonesia! Dalam 1 tagihan murah, Anda mendapatkan internet rumah fiber cepat ditambah kuota bersama untuk seluruh anggota keluarga di HP.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold">
                    Gratis Biaya Pasang Baru (PSB Rp 0) - Hemat Rp 250.000
                  </span>
                </div>

                <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex items-start gap-2.5">
                  <Smartphone className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold">
                    Kuota Bersama 15 GB untuk hingga 4 nomor HP keluarga
                  </span>
                </div>

                <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex items-start gap-2.5">
                  <Zap className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold">
                    Nelpon & SMS Sepuasnya ke sesama Telkomsel & IndiHome
                  </span>
                </div>

                <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold">
                    Gratis Modem WiFi Dual-Band resmi dari Telkom
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  Harga Promo Resmi
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                  Paling Laris
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block">Tarif Langganan Bulanan:</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black text-red-600">Rp 148.000</span>
                  <span className="text-xs text-slate-500 font-medium">/bulan*</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  *Belum termasuk PPN 11%. Tagihan resmi langsung ke PT Telkom Indonesia.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => handleClaim(pkg148k.id)}
                  className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Klaim Promo Paket 148K Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={createWhatsAppRegistrationUrl({ packageName: 'Telkomsel One 148K Promo Gratis PSB' }, pkg148k)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Tanya Promo 148K via WhatsApp Mas Vicky</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* PROMO GRID: DISKON PSB, UPSPEED, BONUS OTT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {/* Promo Card 1: Diskon Biaya Pasang Rp 99.000 */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                Diskon 60% PSB
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Biaya Pasang Baru Hanya Rp 99.000
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hemat Rp 151.000 dari biaya normal Rp 250.000. Biaya pasang tidak dibayar tunai ke teknisi, melainkan ditagihkan secara resmi pada tagihan bulan pertama setelah internet Anda aktif.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                to="/daftar"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <span>Daftar dengan Diskon PSB</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Promo Card 2: Upspeed Lonjakan Kecepatan */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Bonus Kecepatan Lebih Cepat
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Upspeed Promo Hingga 100 Mbps
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pilih paket 30 Mbps, Anda dapat lonjakan kecepatan hingga 50 Mbps selama 3 bulan pertama. Pilih paket 50 Mbps, nikmati 100 Mbps dengan biaya paket awal tanpa kenaikan tarif!
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                to="/paket"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <span>Lihat Paket Ber-Upspeed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Promo Card 3: Bonus OTT & Movie TV */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Tv className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block">
                Hiburan Bioskop Rumah
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Aplikasi Streaming Premium Termasuk
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                Paket 2P dan 3P Movie sudah termasuk akses aplikasi streaming resmi favorit keluarga tanpa perlu langganan terpisah.
              </p>
              <StreamingBenefitBadges apps={['disney', 'netflix', 'vidio', 'prime']} size="sm" variant="light" showLabel={true} />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                to="/paket"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <span>Lihat Pilihan Paket TV</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
