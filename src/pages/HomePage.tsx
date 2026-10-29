import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { PromoBanner } from '../components/PromoBanner';
import { InteractivePackageShowcase } from '../components/InteractivePackageShowcase';
import { BlogPreviewSection } from '../components/BlogPreviewSection';
import { Link, useRouter } from '../router/Router';
import { 
  Wifi, 
  Calculator, 
  MapPin, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Star, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  ArrowRight, 
  Sparkles,
  Zap
} from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';

interface HomePageProps {
  onOpenPromoHighlight: () => void;
  onOpenSalesPhoto: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenPromoHighlight,
  onOpenSalesPhoto,
}) => {
  const { navigate } = useRouter();

  const featureLinks = [
    {
      title: 'Katalog Paket Internet',
      subtitle: 'Paket 1P, 2P TV, 3P & Gamer 30 - 200 Mbps',
      icon: Wifi,
      to: '/paket',
      color: 'bg-red-500/10 text-red-600 border-red-500/20',
      badge: 'Lengkap',
    },
    {
      title: 'Cek Jangkauan Tiang ODP',
      subtitle: 'Cek ketersediaan port fiber di tiang rumah Anda',
      icon: MapPin,
      to: '/cek-area',
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      badge: '5-10 Mnt',
    },
    {
      title: 'Kalkulator Kecepatan',
      subtitle: 'Hitung kebutuhan Mbps berdasarkan gadget & aktivitas',
      icon: Calculator,
      to: '/kalkulator',
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      badge: 'Akurat',
    },
    {
      title: 'Promo Spesial & 148K',
      subtitle: 'Telkomsel One 148K Bebas PSB & Diskon 99K',
      icon: Flame,
      to: '/promo',
      color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      badge: 'HOT',
    },
    {
      title: 'Alur & Syarat Pasang',
      subtitle: 'SOP pemasangan 1x24 jam & syarat dokumen KTP',
      icon: Clock,
      to: '/alur-pasang',
      color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      badge: 'Resmi',
    },
    {
      title: 'Profil Sales Vicky',
      subtitle: 'ID resmi Sales Executive PT Telkom Indonesia',
      icon: ShieldCheck,
      to: '/tentang-vicky',
      color: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
      badge: 'Verified',
    },
    {
      title: 'Testimoni Pelanggan',
      subtitle: '1.240+ ulasan nyata pelanggan puas seluruh Indonesia',
      icon: Star,
      to: '/testimoni',
      color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      badge: '4.9 ★',
    },
    {
      title: 'Blog & Edukasi',
      subtitle: 'Panduan WiFi, tips anti lag & direktori kata kunci',
      icon: BookOpen,
      to: '/blog',
      color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
      badge: 'SEO Blog',
    },
    {
      title: 'Pusat Bantuan & FAQ',
      subtitle: 'Jawaban lengkap tagihan, biaya pasang & FUP',
      icon: HelpCircle,
      to: '/faq',
      color: 'bg-slate-500/10 text-slate-700 border-slate-500/20',
      badge: '24 Jam',
    },
    {
      title: 'Riwayat Registrasi',
      subtitle: 'Lihat status dan tanda bukti pendaftaran Anda',
      icon: FileText,
      to: '/riwayat',
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
      badge: 'Status',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Hero Section */}
      <HeroSection
        onSelectPackage={() => navigate('/paket')}
        onOpenRegister={() => navigate('/daftar')}
        onOpenPromoHighlight={onOpenPromoHighlight}
        onOpenCalculator={() => navigate('/kalkulator')}
      />

      {/* 2. Promo Flash Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PromoBanner 
          onOpenRegister={() => navigate('/daftar')} 
          onOpenPromoHighlight={onOpenPromoHighlight}
        />
      </div>

      {/* 3. DIRECTORY OF DEDICATED FEATURE PAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pusat Layanan Terintegrasi</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Jelajahi Semua Fitur & Halaman Resmi
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm">
            Setiap fitur memiliki halaman khusus tersendiri untuk memberikan kemudahan informasi terlengkap, transparan, dan mudah dibagikan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
          {featureLinks.map((feat) => {
            const Icon = feat.icon;
            return (
              <Link
                key={feat.to}
                to={feat.to}
                className="group p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-red-300 transition-all flex flex-col justify-between space-y-3 cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${feat.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {feat.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-red-600 group-hover:translate-x-0.5 transition-transform">
                  <span>Buka Halaman</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Interactive Package Showcase Section on Homepage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
              Paling Diminati Pelanggan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pilihan Paket Populer IndiHome
            </h2>
          </div>

          <Link
            to="/paket"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-600 hover:text-red-700"
          >
            <span>Lihat Semua Paket di Halaman Katalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <InteractivePackageShowcase
          onSelectPackage={(pkg) => navigate(`/daftar?paket=${pkg.id}`)}
          onOpenRegister={(pkgId) => navigate(pkgId ? `/daftar?paket=${pkgId}` : '/daftar')}
        />
      </section>

      {/* 5. SEO Blog Preview Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogPreviewSection onOpenBlog={(slug) => navigate(slug ? `/blog/${slug}` : '/blog')} />
      </div>

      {/* 6. Bottom Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-3xl bg-gradient-to-r from-red-600 via-red-600 to-rose-700 text-white p-6 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider inline-block">
              Siap Pasang WiFi Hari Ini
            </span>
            <h2 className="text-2xl sm:text-4xl font-black">
              Nikmati Internet Stabil & Promo Biaya Pasang 99K
            </h2>
            <p className="text-red-100 text-sm max-w-xl">
              Proses registrasi hanya 3 menit. Data Anda langsung diproses oleh Sales Resmi Vicky ke sistem Telkom tanpa calo.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/daftar"
              className="px-6 py-3.5 rounded-2xl bg-white text-red-600 font-black text-sm shadow-lg hover:bg-slate-100 transition-all active:scale-95"
            >
              Daftar Pasang Baru Sekarang
            </Link>
            <Link
              to="/cek-area"
              className="px-6 py-3.5 rounded-2xl bg-red-800/80 hover:bg-red-800 text-white font-bold text-sm border border-white/20 transition-all active:scale-95"
            >
              Cek Tiang ODP Dulu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
