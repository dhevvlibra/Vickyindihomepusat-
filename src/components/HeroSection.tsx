import React, { useEffect, useState, useRef } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  Activity, 
  ArrowDown, 
  PhoneCall, 
  CheckCircle2,
  Wifi
} from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';

const HERO_BG_IMAGE = 'https://cdn.phototourl.com/member/2026-09-24-f023d285-c35f-451e-931a-604f3e2a7dfd.jpg';

interface HeroSectionProps {
  onSelectPackage: (packageId: string) => void;
  onOpenRegister: (packageId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRegister,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // 3D Parallax Calculation based on scroll position & mouse perspective
  const translateY = Math.min(scrollY * 0.35, 260);
  const scale = 1.08 + Math.min(scrollY * 0.0003, 0.12);
  const rotateX = -mouseOffset.y * 7 + (scrollY > 0 ? Math.min(scrollY * 0.015, 6) : 0);
  const rotateY = mouseOffset.x * 9;

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-slate-950 text-white pt-14 pb-20 lg:pt-24 lg:pb-28 border-b border-slate-800 [perspective:1200px]"
      style={{
        backgroundImage: `url(${HERO_BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Visual Background Layer with Parallax */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none will-change-transform transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformOrigin: 'center center',
        }}
      >
        <img
          src={HERO_BG_IMAGE}
          alt="IndiHome by Telkomsel Fiber Optic"
          className="w-full h-[125%] -top-[12%] absolute object-cover object-center filter brightness-100 contrast-105"
          referrerPolicy="no-referrer"
        />
        {/* Subtle, balanced overlay so the photo is clearly visible while text is crisp */}
        <div className="absolute inset-0 bg-slate-950/45 backdrop-brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Sales Partner Authority Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 backdrop-blur-md shadow-lg shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>Mitra Sales Resmi IndiHome by Telkomsel:</span>
            <strong className="text-white font-semibold">Mas Vicky</strong>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.2] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            Internet Rumah Serat Optik <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-rose-400">100% Cepat</span> Tanpa Antre
          </h1>

          {/* Sub-headline */}
          <p className="text-slate-100 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] px-2">
            Portal pendaftaran pasang baru IndiHome by Telkomsel resmi. Nikmati jaringan fiber berkecepatan tinggi dengan garansi pengawalan teknisi langsung ke rumah Anda.
          </p>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-xl mx-auto pt-1 sm:pt-2">
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-900/85 border border-red-500/30 text-center backdrop-blur-md shadow-lg">
              <span className="block text-[9px] sm:text-[11px] line-through text-slate-400 font-medium">
                Rp 120.000
              </span>
              <span className="block text-red-400 font-extrabold text-xs sm:text-base -mt-0.5">
                Rp 89.000
              </span>
              <span className="text-[9px] sm:text-[11px] text-slate-300 font-medium block">
                Biaya Pasang
              </span>
            </div>
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-900/85 border border-slate-800 text-center backdrop-blur-md shadow-lg">
              <span className="block text-emerald-400 font-extrabold text-xs sm:text-base">100% Fiber</span>
              <span className="text-[9px] sm:text-[11px] text-slate-400">Optik Unlimited</span>
            </div>
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-900/85 border border-slate-800 text-center backdrop-blur-md shadow-lg">
              <span className="block text-white font-extrabold text-xs sm:text-base">1x24 Jam</span>
              <span className="text-[9px] sm:text-[11px] text-slate-400">Teknisi Tiba</span>
            </div>
          </div>

          {/* Single Clean Primary Action Group */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-md sm:max-w-none mx-auto">
            <a
              href="#katalog-paket"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Lihat Pilihan Paket</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => onOpenRegister()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>Daftar Pasang Baru</span>
            </button>

            <a
              href="#kalkulator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-900/90 hover:bg-slate-850 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-750 transition-colors backdrop-blur-md"
            >
              <Activity className="w-3.5 h-3.5 text-red-400" />
              <span>Hitung Speed</span>
            </a>
          </div>

          {/* Guarantee Badges */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 text-[11px] sm:text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Pendaftaran Resmi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Tanpa DP (Rp 0)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>2.450+ Terpasang</span>
            </div>
          </div>

        </div>
      </div>

      {/* Down Navigation Indicator */}
      <div className="max-w-7xl mx-auto px-4 mt-12 flex justify-center">
        <a
          href="#katalog-paket"
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <span>Eksplorasi Katalog & Kalkulator Kebutuhan</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-red-500" />
        </a>
      </div>
    </section>
  );
};
