import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  ZoomIn, 
  MessageCircle, 
  ChevronRight,
  Sparkles,
  ArrowRight,
  Flame,
  Home,
  Wifi,
  MapPin,
  Calculator,
  Clock,
  Star,
  BookOpen,
  HelpCircle,
  Users
} from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { 
  createWhatsAppConsultUrl, 
  trackMetaPixel, 
  trackGoogleAdsContactConversion 
} from '../utils/helpers';
import { useRouter, Link } from '../router/Router';

interface NavbarProps {
  onOpenRegister?: (packageId?: string) => void;
  onOpenMyRegistrations?: () => void;
  onOpenSalesPhoto?: () => void;
  onOpenPromoHighlight?: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenMyRegistrations,
  onOpenSalesPhoto,
  onOpenPromoHighlight,
  savedCount,
}) => {
  const { pathname, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  // Desktop primary navigation links
  const desktopNavLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Katalog Paket', path: '/paket' },
    { name: 'Cek Area ODP', path: '/cek-area' },
    { name: 'Kalkulator Speed', path: '/kalkulator' },
    { name: 'Promo 148K', path: '/promo' },
    { name: 'Alur Pasang', path: '/alur-pasang' },
    { name: 'Blog & Edukasi', path: '/blog' },
  ];

  // Mobile drawer comprehensive menu (all dedicated feature pages)
  const mobileNavLinks = [
    { name: 'Beranda', path: '/', icon: Home, badge: 'Home' },
    { name: 'Katalog Paket Internet', path: '/paket', icon: Wifi, badge: '1P/2P/3P' },
    { name: 'Cek Jangkauan ODP', path: '/cek-area', icon: MapPin, badge: 'Cek Tiang' },
    { name: 'Kalkulator Kecepatan', path: '/kalkulator', icon: Calculator, badge: 'Rekomendasi' },
    { name: 'Promo Spesial & 148K', path: '/promo', icon: Flame, badge: 'Bebas PSB' },
    { name: 'Alur & Syarat Pasang', path: '/alur-pasang', icon: Clock, badge: '1x24 Jam' },
    { name: 'Profil Sales Vicky', path: '/tentang-vicky', icon: ShieldCheck, badge: 'Resmi' },
    { name: 'Testimoni Pelanggan', path: '/testimoni', icon: Star, badge: '4.9 ★' },
    { name: 'Blog Edukasi & SEO', path: '/blog', icon: BookOpen, badge: 'Panduan' },
    { name: 'Pusat Bantuan & FAQ', path: '/faq', icon: HelpCircle, badge: 'Tanya Jawab' },
    { name: 'Riwayat Registrasi', path: '/riwayat', icon: FileText, badge: 'Status' },
  ];

  // Prevent background scrolling when mobile overlay is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const triggerClickFeedback = (id: string) => {
    setClickedItem(id);
    setTimeout(() => {
      setClickedItem((prev) => (prev === id ? null : prev));
    }, 380);
  };

  const handleNavClick = (path: string) => {
    triggerClickFeedback(path);
    setMobileMenuOpen(false);
    navigate(path);
  };

  const isCurrentActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-all">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-red-600 via-red-600 to-rose-700 text-white text-xs py-1.5 px-3 sm:px-4 font-medium select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => {
                navigate('/promo');
                onOpenPromoHighlight?.();
              }}
              className="inline-flex items-center gap-1.5 hover:opacity-95 cursor-pointer group text-left min-w-0 flex-1"
              title="Buka Halaman Promo Spesial 148K"
            >
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-yellow-400 text-red-950 uppercase tracking-wide shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Flame className="w-3 h-3 fill-red-950 text-red-950" />
                Promo 148K
              </span>
              <span className="truncate block min-w-0 text-[11px] sm:text-xs">
                WiFi + 30GB Cuma <strong className="text-yellow-300 font-extrabold underline decoration-yellow-400/60">Rp 148.000/bln</strong> • <span className="text-emerald-300 font-extrabold">GRATIS PSB (Rp 0!)</span>
              </span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-red-100 shrink-0">
            <Link
              to="/promo"
              className="hover:text-yellow-300 transition-colors font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Halaman Promo</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
            <div className="flex items-center gap-1.5 border-l border-red-500/50 pl-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Mas Vicky Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2">
          {/* Logo / Brand with Sales Photo */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => {
                triggerClickFeedback('sales-photo-thumb');
                onOpenSalesPhoto?.();
              }}
              className="relative group cursor-pointer focus:outline-hidden shrink-0"
              title="Lihat profil & legalitas Mas Vicky"
              aria-label="Lihat profil Mas Vicky"
            >
              <img
                src={SALES_AGENT_INFO.photoUrl}
                alt={SALES_AGENT_INFO.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover object-top ring-2 ring-red-600 ring-offset-2 ring-offset-white group-hover:scale-105 transition-all shadow-xs"
              />
              <span className="absolute inset-0 rounded-full bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <ZoomIn className="w-4 h-4 drop-shadow-md" />
              </span>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-600/20"></span>
            </button>

            <Link
              to="/"
              onClick={() => {
                triggerClickFeedback('brand-logo');
                setMobileMenuOpen(false);
              }}
              className={`flex flex-col text-left group cursor-pointer focus:outline-hidden transition-all duration-200 active:scale-95 min-w-0 ${
                clickedItem === 'brand-logo' ? 'animate-nav-click' : ''
              }`}
            >
              <div className="flex items-center gap-1">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-red-600 transition-colors truncate">
                  vicky<span className="text-red-600">indihome</span>pusat
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-500 truncate">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">Sales Resmi IndiHome Telkom</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/70 rounded-full border border-slate-200/60 shadow-2xs">
            {desktopNavLinks.map((link) => {
              const isActive = isCurrentActive(link.path);
              const isClicked = clickedItem === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => triggerClickFeedback(link.path)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer focus:outline-hidden active:scale-90 ${
                    isClicked ? 'animate-nav-click' : ''
                  } ${
                    isActive
                      ? 'bg-white text-red-600 shadow-xs font-extrabold'
                      : 'text-slate-600 hover:text-red-600 hover:bg-white/60'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-red-600 rounded-full animate-in fade-in zoom-in-50 duration-200" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              to="/riwayat"
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-90 rounded-xl transition-all border border-slate-200 cursor-pointer ${
                pathname === '/riwayat' ? 'bg-red-50 text-red-600 border-red-200 font-bold' : ''
              }`}
              title="Lihat Riwayat & Status Pendaftaran"
            >
              <FileText className="w-4 h-4 text-red-600" />
              <span>{savedCount > 0 ? `Status (${savedCount})` : 'Cek Status'}</span>
            </Link>

            <Link
              to="/daftar"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs shadow-md shadow-red-600/20 active:scale-92 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Daftar Sekarang</span>
            </Link>
          </div>

          {/* Mobile Menu Animated Hamburger / Close Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/riwayat"
              className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl active:scale-85 transition-transform"
              title="Status Pendaftaran"
              aria-label="Status Pendaftaran"
            >
              <FileText className="w-4.5 h-4.5" />
            </Link>

            <button
              type="button"
              onClick={() => {
                triggerClickFeedback('menu-toggle');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className={`p-2 text-slate-700 hover:text-red-600 hover:bg-slate-100 rounded-xl active:scale-80 transition-all cursor-pointer ${
                clickedItem === 'menu-toggle' ? 'animate-nav-click' : ''
              }`}
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1 bg-red-600' : '-translate-y-1'
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-200 ease-in-out ${
                    mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-1 bg-red-600' : 'translate-y-1'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[96px] sm:top-[104px] bg-slate-950/45 backdrop-blur-xs z-40 lg:hidden animate-smooth-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="absolute top-full left-0 right-0 z-50 lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl px-4 pt-3 pb-6 space-y-3 animate-nav-dropdown max-h-[calc(100vh-110px)] overflow-y-auto">
            {/* Sales Contact Mini Card */}
            <div className="p-3 bg-red-50/80 rounded-2xl border border-red-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSalesPhoto?.();
                }}
                className="flex items-center gap-2.5 text-left cursor-pointer group active:scale-95 transition-transform min-w-0 flex-1"
                title="Klik untuk melihat foto profil resmi"
              >
                <div className="relative shrink-0">
                  <img
                    src={SALES_AGENT_INFO.photoUrl}
                    alt="Mas Vicky"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-red-600 shadow-xs"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1 ring-white"></span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1 truncate">
                    <span>Mas Vicky</span>
                    <ZoomIn className="w-3 h-3 text-red-500 shrink-0" />
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">Sales Resmi • ID Verified</p>
                </div>
              </button>

              <a
                href={createWhatsAppConsultUrl('Tanya Paket')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackMetaPixel('Contact', { content_name: 'Navbar Mobile Chat WA' });
                  trackGoogleAdsContactConversion({ event_label: 'Navbar Mobile Chat WA' });
                }}
                className="inline-flex items-center gap-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-90 transition-all px-3 py-1.5 rounded-xl shadow-xs shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat WA</span>
              </a>
            </div>

            {/* All dedicated feature pages menu */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-2 block">
                Menu Halaman Fitur:
              </span>

              <div className="grid grid-cols-1 gap-1">
                {mobileNavLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = isCurrentActive(link.path);
                  return (
                    <button
                      key={link.path}
                      type="button"
                      onClick={() => handleNavClick(link.path)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer text-left active:scale-[0.98] ${
                        isActive
                          ? 'bg-red-50 text-red-600 font-extrabold shadow-2xs border border-red-200/70'
                          : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-red-600' : 'text-slate-400'}`} />
                        <span>{link.name}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {link.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/daftar"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 text-center text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-95 transition-all rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Buka Formulir Pendaftaran Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
