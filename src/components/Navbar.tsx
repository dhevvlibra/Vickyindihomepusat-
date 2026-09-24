import React, { useState } from 'react';
import { Wifi, Phone, MessageCircle, Menu, X, ShieldCheck, CheckCircle2, FileText, ZoomIn } from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { createWhatsAppConsultUrl } from '../utils/helpers';

interface NavbarProps {
  onOpenRegister: (packageId?: string) => void;
  onOpenMyRegistrations: () => void;
  onOpenSalesPhoto?: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenMyRegistrations,
  onOpenSalesPhoto,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Katalog Paket', href: '#katalog-paket' },
    { name: 'Kalkulator Speed', href: '#kalkulator' },
    { name: 'Cek Jangkauan ODP', href: '#cek-jangkauan' },
    { name: 'Alur Pasang', href: '#cara-pasang' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-red-600 via-red-600 to-rose-700 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white text-red-600 uppercase tracking-wide">
              Flash Promo
            </span>
            <span className="truncate">Diskon Biaya Pasang Baru s/d 70% + Ekstra Upspeed Promo</span>
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
              onClick={onOpenSalesPhoto}
              className="relative group cursor-pointer focus:outline-hidden"
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
            <a href="#" className="flex flex-col group">
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-red-600 transition-colors">
                  vicky<span className="text-red-600">indihome</span>pusat
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sales Resmi IndiHome Telkom</span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-red-600 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs: Clean & focused */}
          <div className="hidden sm:flex items-center gap-3">
            {savedCount > 0 && (
              <button
                type="button"
                onClick={onOpenMyRegistrations}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
                title="Lihat Pendaftaran Saya"
              >
                <FileText className="w-4 h-4 text-red-600" />
                <span>Status ({savedCount})</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-red-600 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3">
          <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onOpenSalesPhoto}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
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
                <p className="text-[11px] text-slate-500">Sales Resmi • Klik Cek Foto</p>
              </div>
            </button>
            <a
              href={createWhatsAppConsultUrl('Tanya Paket')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-white bg-emerald-600 px-2.5 py-1.5 rounded-lg"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat WA</span>
            </a>
          </div>

          <div className="flex flex-col space-y-1 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-red-600 hover:bg-slate-50 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {savedCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyRegistrations();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
              >
                <FileText className="w-4 h-4 text-red-600" />
                <span>Status Pendaftaran Saya ({savedCount})</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3 text-center text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md"
            >
              Buka Formulir Pendaftaran Online
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
