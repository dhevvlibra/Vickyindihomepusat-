import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { WhyChooseVicky } from '../components/WhyChooseVicky';
import { Link, useRouter } from '../router/Router';
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Headphones
} from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { createWhatsAppConsultUrl } from '../utils/helpers';

interface AboutSalesPageProps {
  onOpenSalesPhoto?: () => void;
}

export const AboutSalesPage: React.FC<AboutSalesPageProps> = ({ onOpenSalesPhoto }) => {
  const { navigate } = useRouter();

  const waUrl = createWhatsAppConsultUrl({
    source: 'Halaman Profil & Legalitas Sales Vicky',
    note: 'Halo Mas Vicky, saya ingin konsultasi pendaftaran pasang baru IndiHome dengan Anda.',
  });

  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Profil & Legalitas Sales Resmi' }]} />

        {/* Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-red-950 text-white p-6 sm:p-10 mb-10 overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mitra Resmi Terverifikasi PT Telkom Indonesia</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Profil & Kredensial <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300">Sales Executive Vicky</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Selamat datang! Saya Vicky, Sales Executive resmi layanan IndiHome by Telkomsel. Komitmen saya adalah memberikan transparansi tarif 100% tanpa biaya siluman, rekomendasi paket paling hemat sesuai kebutuhan, dan pengawalan proses instalasi hingga WiFi Anda online dengan prima.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <Award className="w-4 h-4 text-amber-400" />
                Terdaftar di Database Sales Telkom
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Melayani Seluruh Indonesia
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200">
                <Headphones className="w-4 h-4 text-rose-400" />
                Layanan Purna Jual & Bantuan Kendala
              </span>
            </div>
          </div>
        </div>

        {/* Why Choose Vicky Component */}
        <div className="mb-12">
          <WhyChooseVicky onOpenSalesPhoto={onOpenSalesPhoto} />
        </div>

        {/* Coverage Areas & Commitment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Cakupan Wilayah Pemasangan Nasional
                </h3>
                <p className="text-xs text-slate-500">
                  Koneksi terintegrasi dengan Witel (Wilayah Telekomunikasi) seluruh Indonesia
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Meskipun berpusat di Jabodetabek, kami dapat memproses registrasi pasang baru untuk seluruh kota, kabupaten, dan pelosok Nusantara yang telah tercover jaringan fiber optik Telkom:
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 pt-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                📍 Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                📍 Jawa Barat, Jawa Tengah & DIY Yogyakarta
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                📍 Jawa Timur, Bali & Nusa Tenggara
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                📍 Sumatera, Kalimantan, Sulawesi & Papua
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  5 Janji Pelayanan Mas Vicky
                </h3>
                <p className="text-xs text-slate-500">
                  Komitmen pelayanan profesional tanpa kompromi
                </p>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span><strong>Anti Mark-Up:</strong> Tarif sesuai brosur resmi Telkom Indonesia.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span><strong>Anti Titip Bayar:</strong> Pembayaran 100% pasca-pasang resmi.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span><strong>Cepat & Responsif:</strong> Cek jangkauan ODP dalam 5-10 menit.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span><strong>Privasi Terjamin:</strong> Data KTP Anda aman untuk input sistem saja.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span><strong>Bantuan After-Sales:</strong> Siap membantu jika ada gangguan teknis.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black">
              Ingin Bertanya Langsung dengan Mas Vicky?
            </h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Hubungi WhatsApp resmi {SALES_AGENT_INFO.whatsappDisplay} untuk respon instan setiap hari pukul 08:00 - 22:00 WIB.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp Mas Vicky</span>
            </a>
            <Link
              to="/daftar"
              className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Daftar Pasang Baru Sekarang
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
