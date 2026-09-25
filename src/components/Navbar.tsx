import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  ZoomIn, 
  MessageCircle, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { createWhatsAppConsultUrl } from '../utils/helpers';

interface NavbarProps {
  onOpenRegister: (packageId?: string) => void;
  onOpenMyRegistrations: () => void;
  onOpenSalesPhoto?: () => void;
  onNavigateHome?: () => void;
  onNavigate?: (targetId: string) => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenMyRegistrations,
  onOpenSalesPhoto,
  onNavigateHome,
  onNavigate,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('#katalog-paket');
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  const navLinks = [
    { name: 'Katalog Paket', href: '#katalog-paket' },
    { name: 'Kalkulator Speed', href: '#kalkulator' },
    { name: 'Cek Jangkauan ODP', href: '#cek-jangkauan' },
    { name: 'Alur Pasang', href: '#cara-pasang' },
    { name: 'FAQ', href: '#faq' },
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

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    triggerClickFeedback(href);
    setActiveLink(href);
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(href);
    } else {
      const cleanId = href.replace('#', '');
      const el = document.getElementById(cleanId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerClickFeedback('brand-logo');
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-all">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-red-600 via-red-600 to-rose-700 text-white text-xs py-1.5 px-4 font-medium select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white text-red-600 uppercase tracking-wide shadow-xs">
              Flash Promo
            </span>
            <span className="truncate">
              Promo Biaya Pasang Baru Rp 89.000{' '}
              <span className="line-through opacity-75">Rp 120.000</span> (Hemat Rp 31.000)
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-red-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Mas Vicky Online • Fast Response</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo / Brand with Sales Photo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                triggerClickFeedback('sales-photo');
                onOpenSalesPhoto?.();
              }}
              className={`relative group cursor-pointer focus:outline-hidden transition-transform duration-200 active:scale-85 ${
                clickedItem === 'sales-photo' ? 'animate-nav-click' : ''
              }`}
              title="Klik untuk melihat foto profil resmi Mas Vicky"
              aria-label="Lihat Foto Profil Sales Resmi"
            >
              <img
                src={SALES_AGENT_INFO.photoUrl}
                alt="Mas Vicky Sales Resmi IndiHome"
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-2xl object-cover object-top ring-2 ring-red-600 shadow-md shadow-red-600/20 group-hover:scale-105 group-hover:ring-red-500 transition-all"
              />
              <span className="absolute inset-0 rounded-2xl bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                <ZoomIn className="w-4 h-4 drop-shadow-md" />
              </span>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-600/20"></span>
            </button>

            <button
              type="button"
              onClick={handleLogoClick}
              className={`flex flex-col text-left group cursor-pointer focus:outline-hidden transition-all duration-200 active:scale-95 ${
                clickedItem === 'brand-logo' ? 'animate-nav-click' : ''
              }`}
            >
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-red-600 transition-colors">
                  vicky<span className="text-red-600">indihome</span>pusat
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Sales Resmi IndiHome Telkom</span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links with Dynamic Click & Active Animation */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100/70 rounded-full border border-slate-200/60 shadow-2xs">
            {navLinks.map((link) => {
              const isSelected = activeLink === link.href;
              const isClicked = clickedItem === link.href;
              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer focus:outline-hidden active:scale-90 ${
                    isClicked ? 'animate-nav-click' : ''
                  } ${
                    isSelected
                      ? 'bg-white text-red-600 shadow-xs font-extrabold'
                      : 'text-slate-600 hover:text-red-600 hover:bg-white/60'
                  }`}
                >
                  <span>{link.name}</span>
                  {isSelected && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-red-600 rounded-full animate-in fade-in zoom-in-50 duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs: Clean & focused */}
          <div className="hidden sm:flex items-center gap-3">
            {savedCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  triggerClickFeedback('status-btn');
                  onOpenMyRegistrations();
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-90 rounded-xl transition-all border border-slate-200 cursor-pointer ${
                  clickedItem === 'status-btn' ? 'animate-nav-click' : ''
                }`}
                title="Lihat Pendaftaran Saya"
              >
                <FileText className="w-4 h-4 text-red-600" />
                <span>Status ({savedCount})</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                triggerClickFeedback('nav-register-btn');
                onOpenRegister();
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs shadow-md shadow-red-600/20 active:scale-92 transition-all cursor-pointer ${
                clickedItem === 'nav-register-btn' ? 'animate-nav-click' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Daftar Sekarang</span>
            </button>
          </div>

          {/* Mobile Menu Animated Hamburger / Close Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {savedCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  triggerClickFeedback('status-mobile');
                  onOpenMyRegistrations();
                }}
                className={`p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl active:scale-85 transition-transform ${
                  clickedItem === 'status-mobile' ? 'animate-nav-click' : ''
                }`}
                title="Status Pendaftaran"
                aria-label="Status Pendaftaran"
              >
                <FileText className="w-4.5 h-4.5" />
              </button>
            )}

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

      {/* 
        CRITICAL: Mobile Drawer Overlay
        Positioned ABSOLUTE (top-full), so opening/closing this menu 
        NEVER pushes the page content down! 
      */}
      {mobileMenuOpen && (
        <>
          {/* Darkened backdrop overlay - click to close smoothly */}
          <div
            className="fixed inset-0 top-[96px] sm:top-[104px] bg-slate-950/45 backdrop-blur-xs z-40 lg:hidden animate-smooth-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Floating dropdown overlay card */}
          <div className="absolute top-full left-0 right-0 z-50 lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl px-4 pt-3 pb-5 space-y-3 animate-nav-dropdown max-h-[calc(100vh-110px)] overflow-y-auto">
            {/* Sales Contact Mini Card */}
            <div className="p-3 bg-red-50/80 rounded-2xl border border-red-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  triggerClickFeedback('sales-photo-mobile');
                  setMobileMenuOpen(false);
                  onOpenSalesPhoto?.();
                }}
                className="flex items-center gap-2.5 text-left cursor-pointer group active:scale-95 transition-transform"
                title="Klik untuk melihat foto profil resmi"
              >
                <div className="relative">
                  <img
                    src={SALES_AGENT_INFO.photoUrl}
                    alt="Mas Vicky"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-red-600 shadow-xs group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1 ring-white"></span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    Mas Vicky <ZoomIn className="w-3 h-3 text-red-500" />
                  </p>
                  <p className="text-[11px] text-slate-500">Sales Resmi • Cek Foto & ID</p>
                </div>
              </button>

              <a
                href={createWhatsAppConsultUrl('Tanya Paket')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerClickFeedback('chat-wa-mobile')}
                className="inline-flex items-center gap-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-90 transition-all px-3 py-1.5 rounded-xl shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat WA</span>
              </a>
            </div>

            {/* Nav links with interactive tap animations */}
            <div className="flex flex-col space-y-1 pt-1">
              {navLinks.map((link, idx) => {
                const isSelected = activeLink === link.href;
                const isClicked = clickedItem === link.href;
                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{ animationDelay: `${idx * 40}ms` }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer text-left active:scale-[0.97] ${
                      isClicked ? 'animate-nav-click' : ''
                    } ${
                      isSelected
                        ? 'bg-red-50 text-red-600 font-extrabold shadow-2xs border border-red-200/70'
                        : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          isSelected ? 'bg-red-600 scale-125' : 'bg-slate-300'
                        }`}
                      />
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isSelected ? 'text-red-600 translate-x-1' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              {savedCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    triggerClickFeedback('mobile-my-regs');
                    setMobileMenuOpen(false);
                    onOpenMyRegistrations();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all rounded-xl cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-red-600" />
                  <span>Status Pendaftaran Saya ({savedCount})</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  triggerClickFeedback('mobile-form-register');
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3 px-4 text-center text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-95 transition-all rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Buka Formulir Pendaftaran Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
