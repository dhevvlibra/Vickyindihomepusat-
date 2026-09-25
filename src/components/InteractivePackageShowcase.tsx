import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Users, 
  Tv, 
  Gamepad2, 
  Wifi, 
  Layers,
  ChevronRight,
  Info,
  Flame,
  Smartphone,
  CheckCircle2,
  TrendingDown,
  Gift
} from 'lucide-react';
import { PACKAGES } from '../data/packages';
import { InternetPackage } from '../types';
import { formatRupiah } from '../utils/helpers';
import { StreamingBenefitBadges } from './StreamingBenefitBadges';

interface InteractivePackageShowcaseProps {
  onSelectPackage: (pkg: InternetPackage) => void;
  onOpenRegister: (packageId: string) => void;
}

export const InteractivePackageShowcase: React.FC<InteractivePackageShowcaseProps> = ({
  onSelectPackage,
  onOpenRegister,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePackageId, setActivePackageId] = useState<string>('stream-75');
  const [selectedQuotaFilter, setSelectedQuotaFilter] = useState<'all' | '30 GB' | '50 GB'>('all');
  const [showFullComparison, setShowFullComparison] = useState(false);

  // Telkomsel One quota selection map per tier speed:
  // tone-75 -> '30 GB' or '50 GB'
  // tone-100 -> '30 GB' or '50 GB'
  // tone-150 -> '30 GB' or '50 GB'
  const [selectedTierQuota, setSelectedTierQuota] = useState<Record<string, '30 GB' | '50 GB'>>({
    '75': '50 GB',   // default to 50 GB because user said "Mending yang 50gb wkwk selisih cuma 10rb"
    '100': '50 GB',
    '150': '50 GB',
  });

  const categories = [
    { id: 'all', name: 'Semua Kategori', icon: Layers, count: `${PACKAGES.length} Pilihan` },
    { id: 'internet-streaming', name: 'Internet Only + Streaming', icon: Wifi, count: `${PACKAGES.filter(p => p.category === 'internet-streaming').length} Kecepatan` },
    { id: 'telkomsel-one', name: 'Telkomsel One (WiFi + Kuota HP)', icon: Smartphone, count: `${PACKAGES.filter(p => p.category === 'telkomsel-one').length} Pilihan` },
    { id: 'gaming', name: 'Internet + Game', icon: Gamepad2, count: `${PACKAGES.filter(p => p.category === 'gaming').length} Pilihan` },
    { id: 'movie', name: 'Internet + Movie Complete', icon: Tv, count: `${PACKAGES.filter(p => p.category === 'movie').length} Pilihan` },
  ];

  // Helper to switch quota for a Telkomsel One tier
  const handleToggleTelkomselOneQuota = (speed: '20' | '75' | '100' | '150', quota: '30 GB' | '50 GB') => {
    setSelectedTierQuota(prev => ({ ...prev, [speed]: quota }));
    const targetPkgId = `tone-${speed}-${quota === '30 GB' ? '30gb' : '50gb'}`;
    const found = PACKAGES.find(p => p.id === targetPkgId);
    if (found) {
      setActivePackageId(targetPkgId);
    }
  };

  // Filter packages by Category and Quota
  const filteredPackages = PACKAGES.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    if (selectedCategory === 'telkomsel-one' || p.category === 'telkomsel-one') {
      if (selectedQuotaFilter !== 'all') {
        if (p.kuotaKeluarga !== selectedQuotaFilter) return false;
      }
    }
    return true;
  });

  // Current active package (for detail preview card)
  const activePackage = 
    PACKAGES.find((p) => p.id === activePackageId) || 
    filteredPackages[0] || 
    PACKAGES[0];

  const activeSavings = activePackage.priceNormal - activePackage.pricePromo;

  // Telkomsel One 30GB vs 50GB comparison helper
  const isTelkomselOneActive = activePackage.category === 'telkomsel-one';
  let tOneSpeed = '75';
  if (activePackage.id.includes('20')) tOneSpeed = '20';
  else if (activePackage.id.includes('100')) tOneSpeed = '100';
  else if (activePackage.id.includes('150')) tOneSpeed = '150';

  const pair30GB = PACKAGES.find(p => p.id === `tone-${tOneSpeed}-30gb`);
  const pair50GB = PACKAGES.find(p => p.id === `tone-${tOneSpeed}-50gb`);

  return (
    <section id="katalog-paket" className="py-14 sm:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold tracking-wide">
            <Flame className="w-4 h-4 text-red-600 animate-pulse" />
            <span>Katalog Resmi & Harga Asli (Tanpa Mark-up)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Pilih Paket Internet Sesuai Kebutuhan Anda
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Klik paket mana saja untuk melihat spesifikasi lengkap, kuota keluarga, bonus aplikasi, dan estimasi tarif bulanan.
          </p>
        </div>

        {/* 1. Category Filter Buttons (Horizontal track on mobile, wrapped on desktop) */}
        <div className="flex sm:flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 max-w-5xl mx-auto overflow-x-auto pb-2 px-1 sm:justify-center -mx-2 sm:mx-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const firstOfCat = PACKAGES.find((p) => cat.id === 'all' || p.category === cat.id);
                  if (firstOfCat) setActivePackageId(firstOfCat.id);
                }}
                className={`group inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-150 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/25 ring-2 ring-red-600 ring-offset-1'
                    : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-300 shadow-2xs'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-500 group-hover:text-red-600'}`} />
                <span className="whitespace-nowrap">{cat.name}</span>
                <span
                  className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 sm:py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-red-700 text-white'
                      : 'bg-slate-200 text-slate-600 group-hover:bg-red-50 group-hover:text-red-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Sub-Filter for Telkomsel One Quota (30 GB vs 50 GB) */}
        {(selectedCategory === 'telkomsel-one' || selectedCategory === 'all') && (
          <div className="mb-6 p-2.5 sm:p-3 rounded-2xl bg-white border border-blue-200 shadow-xs max-w-xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 pl-1 sm:pl-2">
              <Smartphone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Filter Kuota Telkomsel One:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedQuotaFilter('all')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  selectedQuotaFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedQuotaFilter('30 GB');
                  const pkg30 = PACKAGES.find(p => p.category === 'telkomsel-one' && p.kuotaKeluarga === '30 GB');
                  if (pkg30) setActivePackageId(pkg30.id);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  selectedQuotaFilter === '30 GB'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                }`}
              >
                📱 30 GB
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedQuotaFilter('50 GB');
                  const pkg50 = PACKAGES.find(p => p.category === 'telkomsel-one' && p.kuotaKeluarga === '50 GB');
                  if (pkg50) setActivePackageId(pkg50.id);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedQuotaFilter === '50 GB'
                    ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-200'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300'
                }`}
              >
                <span>📱 50 GB</span>
                <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1 rounded-sm uppercase">Cuan</span>
              </button>
            </div>
          </div>
        )}

        {/* INTERACTIVE STAGE: Master-Detail Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12">
          
          {/* Left Column: Package Cards */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-1 px-1">
              <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
                Daftar Paket ({filteredPackages.length} Pilihan)
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <span>Klik kartu untuk preview detail</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredPackages.map((pkg) => {
                const isSelected = activePackage.id === pkg.id;
                const isTOne = pkg.category === 'telkomsel-one';

                return (
                  <div
                    key={pkg.id}
                    onClick={() => setActivePackageId(pkg.id)}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all duration-150 relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-red-600 shadow-xl shadow-red-600/15 ring-3 ring-red-100 scale-[1.01]'
                        : 'bg-white border-slate-200 hover:border-red-300 hover:shadow-md'
                    }`}
                  >
                    {/* Selected Indicator Badge */}
                    {isSelected && (
                      <div className="absolute -top-3 left-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                        <span>Sedang Dilihat</span>
                      </div>
                    )}

                    <div>
                      {/* Category Label & Best Seller / Cuan Tag */}
                      <div className="flex items-center justify-between gap-1.5 mb-2 mt-1">
                        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                          {pkg.categoryLabel}
                        </span>
                        {pkg.badge && (
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            pkg.badge.includes('Cuan') || pkg.badge.includes('POPULER')
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {pkg.badge}
                          </span>
                        )}
                      </div>

                      {/* Package Name & Speed */}
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-base font-black text-slate-900 leading-tight">
                          {pkg.name}
                        </h4>
                        {pkg.upspeedMbps ? (
                          <div className="flex flex-col items-end shrink-0">
                            <div className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-xs sm:text-sm shadow-md shadow-amber-500/25 flex items-center gap-1 ring-1 ring-amber-400">
                              <Zap className="w-3.5 h-3.5 fill-white text-white" />
                              <span>{pkg.upspeedMbps} Mbps</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                              Dasar: <span className="line-through">{pkg.speedLabel}</span>
                            </span>
                          </div>
                        ) : (
                          <div className="px-2 py-1 rounded-lg bg-slate-100 text-slate-900 font-black text-xs shrink-0 flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span>{pkg.speedLabel}</span>
                          </div>
                        )}
                      </div>

                      {/* Telkomsel One Interactive Quota Switcher directly on card */}
                      {isTOne && (
                        <div className="mt-3 p-2 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-bold text-blue-900">
                            <span className="flex items-center gap-1">
                              <Smartphone className="w-3 h-3 text-blue-600" />
                              Kuota HP Keluarga:
                            </span>
                            <span className="text-blue-700 font-extrabold">{pkg.kuotaKeluarga}</span>
                          </div>
                          
                          {pkg.id.includes('20') ? (
                            <div className="py-1 px-2 text-[11px] font-bold text-blue-800 bg-blue-100/70 rounded-lg text-center">
                              Termasuk Kuota Bersama 30 GB (Rp 148.000)
                            </div>
                          ) : (
                            /* 30GB vs 50GB quick toggle */
                            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const speedKey = pkg.id.includes('75') ? '75' : pkg.id.includes('100') ? '100' : '150';
                                  handleToggleTelkomselOneQuota(speedKey as any, '30 GB');
                                }}
                                className={`py-1 px-1.5 text-[11px] font-extrabold rounded-lg transition-all text-center cursor-pointer ${
                                  pkg.kuotaKeluarga === '30 GB'
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-white text-slate-700 hover:bg-blue-100 border border-slate-200'
                                }`}
                              >
                                30 GB
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const speedKey = pkg.id.includes('75') ? '75' : pkg.id.includes('100') ? '100' : '150';
                                  handleToggleTelkomselOneQuota(speedKey as any, '50 GB');
                                }}
                                className={`py-1 px-1.5 text-[11px] font-extrabold rounded-lg transition-all text-center cursor-pointer relative ${
                                  pkg.kuotaKeluarga === '50 GB'
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                                }`}
                              >
                                <span>50 GB</span>
                                <span className="ml-1 text-[9px] text-amber-300 font-black">+10rb</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Prominent Upspeed Callout Banner */}
                      {pkg.upspeedMbps && (
                        <div className="mt-3 p-2.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-2 border-amber-400/70 shadow-xs flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow-xs shrink-0">
                              <Zap className="w-4 h-4 fill-white" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5 leading-none">
                                <span className="text-xs sm:text-sm font-black text-amber-950">
                                  ⚡ {pkg.upspeedMbps} Mbps
                                </span>
                                <span className="text-[10px] text-slate-400 line-through font-medium">
                                  ({pkg.speedLabel})
                                </span>
                              </div>
                              <span className="text-[10px] text-amber-800 font-bold block mt-0.5">
                                Ekstra Lonjakan {pkg.upspeedDuration}
                              </span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider shadow-xs shrink-0">
                            UPSPEED
                          </span>
                        </div>
                      )}

                      {/* Real Streaming Logos on Card */}
                      {pkg.ottBonus && pkg.ottBonus.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">
                            {pkg.category === 'gaming' ? 'Benefit Game:' : 'Streaming Termasuk:'}
                          </span>
                          <StreamingBenefitBadges apps={pkg.ottBonus} size="sm" variant="light" showLabel={true} />
                        </div>
                      )}
                    </div>

                    {/* Bottom Price & Select CTA */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 font-semibold block leading-none">Tarif Promo:</span>
                        <div className="text-lg font-black text-red-600 mt-0.5">
                          {formatRupiah(pkg.pricePromo)}
                          <span className="text-[10px] font-medium text-slate-400">/bln</span>
                        </div>
                        <span className="text-[10px] text-amber-700 font-bold block mt-0.5">
                          *belum PPN 11%
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePackageId(pkg.id);
                          onOpenRegister(pkg.id);
                        }}
                        className={`text-xs font-black px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                          isSelected
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-slate-900 text-white hover:bg-red-600'
                        }`}
                      >
                        <span>Pilih & Daftar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Package Showcase Box */}
          <div className="lg:col-span-5">
            <div className="sticky top-20 rounded-3xl bg-slate-900 text-white p-6 sm:p-7 border border-slate-800 shadow-2xl space-y-5">
              
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Preview Paket Terpilih</span>
                </div>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Stok Port Ready
                </span>
              </div>

              {/* Title & Speed Display */}
              <div>
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest block mb-1">
                  {activePackage.categoryLabel}
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {activePackage.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {activePackage.bestFor}
                </p>
              </div>

              {/* SPECIAL TELKOMSEL ONE QUOTA SELECTOR & COMPARISON BOX */}
              {isTelkomselOneActive && (
                tOneSpeed === '20' ? (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/80 via-slate-850 to-slate-900 border-2 border-blue-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-blue-400" />
                        <span>Kuota Nomor HP Keluarga:</span>
                      </span>
                      <span className="text-[10px] bg-emerald-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
                        Paling Hemat
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-600/30 border border-blue-400 ring-2 ring-blue-400/50 shadow-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-300 block">Kuota Bersama Keluarga 30 GB</span>
                          <span className="text-[10px] text-blue-200 mt-0.5 block">Untuk nomor Telkomsel keluarga sebulan penuh</span>
                        </div>
                        <span className="text-base font-black text-white">
                          Rp 148.000<span className="text-[10px] text-slate-400 font-normal">/bln</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-tight">
                      💡 <em>Kuota ini bisa dibagikan langsung ke beberapa nomor Telkomsel anggota keluarga dalam 1 tagihan bersama.</em>
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/80 via-slate-850 to-slate-900 border-2 border-blue-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-blue-400" />
                        <span>Pilihan Kuota Nomor HP Keluarga:</span>
                      </span>
                      <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
                        Beda Cuma 10rb!
                      </span>
                    </div>

                    {/* Clear Visual Comparison Buttons between 30GB and 50GB */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                      {/* 30 GB Option */}
                      <button
                        type="button"
                        onClick={() => handleToggleTelkomselOneQuota(tOneSpeed as any, '30 GB')}
                        className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                          activePackage.kuotaKeluarga === '30 GB'
                            ? 'bg-blue-600/30 border-blue-400 ring-2 ring-blue-400/50 shadow-md'
                            : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        {activePackage.kuotaKeluarga === '30 GB' && (
                          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-400" />
                        )}
                        <span className="text-xs font-bold text-slate-300 block">Kuota 30 GB</span>
                        <span className="text-sm sm:text-base font-black text-white block mt-0.5">
                          {pair30GB ? formatRupiah(pair30GB.pricePromo) : 'Rp 280.000'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">/bulan (belum PPN)</span>
                      </button>

                      {/* 50 GB Option (Recommended / Cuan) */}
                      <button
                        type="button"
                        onClick={() => handleToggleTelkomselOneQuota(tOneSpeed as any, '50 GB')}
                        className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                          activePackage.kuotaKeluarga === '50 GB'
                            ? 'bg-emerald-600/30 border-emerald-400 ring-2 ring-emerald-400/50 shadow-md'
                            : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        <div className="absolute -top-2 right-2 px-1.5 py-0.2 bg-amber-400 text-slate-950 font-black text-[9px] rounded-sm uppercase tracking-wide">
                          Rekomendasi
                        </div>
                        <span className="text-xs font-bold text-emerald-300 block">Kuota 50 GB (+20 GB!)</span>
                        <span className="text-sm sm:text-base font-black text-white block mt-0.5">
                          {pair50GB ? formatRupiah(pair50GB.pricePromo) : 'Rp 290.000'}
                        </span>
                        <span className="text-[10px] text-emerald-300 font-bold">
                          Selisih Cuma Rp 10.000/bln
                        </span>
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-tight">
                      💡 <em>Kuota ini bisa dibagikan langsung ke beberapa nomor Telkomsel anggota keluarga dalam 1 tagihan bersama.</em>
                    </p>
                  </div>
                )
              )}

              {/* Metric Highlights Box: Upspeed as Hero Metric */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/60 via-slate-800 to-slate-800 border-2 border-amber-500/60 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
                    {activePackage.upspeedMbps ? 'Upspeed Aktif' : 'Fiber Speed'}
                  </div>
                  <span className="text-[11px] text-amber-300 font-bold block mb-0.5">
                    {activePackage.upspeedMbps ? 'Kecepatan Lonjakan' : 'Kecepatan Internet'}
                  </span>
                  <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-black text-amber-400">
                    <Zap className="w-6 h-6 text-amber-400 fill-amber-400 shrink-0" />
                    <span>{activePackage.upspeedMbps ? `${activePackage.upspeedMbps} Mbps` : activePackage.speedLabel}</span>
                  </div>
                  {activePackage.upspeedMbps ? (
                    <div className="mt-1 text-[10px] text-slate-300 flex items-center justify-between">
                      <span>Tarif dasar: <span className="line-through">{activePackage.speedLabel}</span></span>
                      <span className="font-bold text-amber-300">{activePackage.upspeedDuration}</span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-emerald-400 font-semibold">100% Fiber Optic Murni</span>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Kapasitas Perangkat</span>
                  <div className="flex items-center gap-1.5 text-xl font-black text-white">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span>{activePackage.speed >= 150 ? '10 - 15+ HP' : activePackage.speed >= 100 ? '6 - 10 HP' : '4 - 8 HP'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{activePackage.deviceCount}</span>
                </div>
              </div>

              {/* Upspeed Promotion Banner */}
              {activePackage.upspeedMbps && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 border-2 border-amber-400/50 text-amber-200 text-xs flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-sm">
                      <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
                    </div>
                    <div>
                      <span className="font-extrabold text-white text-xs block">
                        Ekstra Lonjakan Kecepatan {activePackage.upspeedMbps} Mbps!
                      </span>
                      <span className="text-[11px] text-amber-300">
                        Internet jauh lebih kencang tanpa biaya tambahan selama {activePackage.upspeedDuration}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Price & Savings Box */}
              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Tarif Promo Bulanan
                    </span>
                    <div className="text-3xl font-black text-red-500">
                      {formatRupiah(activePackage.pricePromo)}
                      <span className="text-xs font-normal text-slate-400"> / bulan</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through block">
                      Normal {formatRupiah(activePackage.priceNormal)}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-md inline-block">
                      Hemat {formatRupiah(activeSavings)}/bln
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700/80 text-[11px] text-amber-300/90 flex items-center justify-between font-bold">
                  <span>*Ketentuan Pajak Resmi:</span>
                  <span>Harga Belum Termasuk PPN 11%</span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Benefit & Fasilitas Paket:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activePackage.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* OTT / Game Bonuses */}
              {activePackage.ottBonus && activePackage.ottBonus.length > 0 && (
                <div className="pt-3 border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
                    {activePackage.category === 'gaming' ? 'Benefit & Server Game Prioritas:' : 'Logo Layanan Streaming Termasuk:'}
                  </span>
                  <StreamingBenefitBadges apps={activePackage.ottBonus} size="md" variant="dark" showLabel={true} />
                </div>
              )}

              {/* Single Clear Next Step Button: Go to Step 1 Review then Form */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectPackage(activePackage);
                    onOpenRegister(activePackage.id);
                  }}
                  className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lanjut Registrasi Paket Ini</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Anda akan masuk ke konfirmasi rincian paket sebelum mengisi formulir pemasangan.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Optional Collapsible: Full Comparison Table */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowFullComparison(!showFullComparison)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <Info className="w-4 h-4 text-slate-500" />
            <span>{showFullComparison ? 'Sembunyikan Tabel Perbandingan Semua Paket' : 'Lihat Tabel Perbandingan Semua Paket'}</span>
          </button>
        </div>

        {showFullComparison && (
          <div className="mt-6 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in duration-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Nama Paket</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Kecepatan & Upspeed</th>
                    <th className="p-4">Kuota HP / Benefit Tambahan</th>
                    <th className="p-4">Tarif Bulanan (Belum PPN)</th>
                    <th className="p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PACKAGES.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">
                        {p.name}
                        {p.isPopular && (
                          <span className="ml-2 text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                            Populer
                          </span>
                        )}
                      </td>
                      <td className="p-4">{p.categoryLabel}</td>
                      <td className="p-4">
                        {p.upspeedMbps ? (
                          <div>
                            <div className="flex items-center gap-1 text-amber-600 font-black text-base sm:text-lg">
                              <Zap className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
                              <span>{p.upspeedMbps} Mbps</span>
                              <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 ml-1">
                                UPSPEED
                              </span>
                            </div>
                            <span className="block text-[11px] text-slate-400 font-medium mt-0.5">
                              Dasar: <span className="line-through">{p.speedLabel}</span> ({p.upspeedDuration})
                            </span>
                          </div>
                        ) : (
                          <span className="font-extrabold text-red-600">{p.speedLabel}</span>
                        )}
                      </td>
                      <td className="p-4">
                        {p.kuotaKeluarga ? (
                          <div className="space-y-1.5">
                            <span className="font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md inline-block">
                              📱 Kuota HP: {p.kuotaKeluarga}
                            </span>
                            {p.ottBonus && p.ottBonus.length > 0 && (
                              <StreamingBenefitBadges apps={p.ottBonus} size="sm" variant="light" showLabel={false} />
                            )}
                          </div>
                        ) : p.ottBonus && p.ottBonus.length > 0 ? (
                          <StreamingBenefitBadges apps={p.ottBonus} size="sm" variant="light" showLabel={true} />
                        ) : (
                          <span className="text-slate-500">{p.deviceCount}</span>
                        )}
                      </td>
                      <td className="p-4 font-black text-slate-900">
                        {formatRupiah(p.pricePromo)}/bln
                        <span className="block text-[10px] text-amber-700 font-semibold">*belum PPN</span>
                      </td>
                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => {
                            setActivePackageId(p.id);
                            onOpenRegister(p.id);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors cursor-pointer"
                        >
                          Pilih Paket
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
