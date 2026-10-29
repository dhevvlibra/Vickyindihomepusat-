import React, { useState } from 'react';
import { 
  ArrowRight, 
  Zap, 
  Tv, 
  Gamepad2, 
  Wifi, 
  Layers,
  Info,
  Flame,
  Smartphone,
  Cable
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
  // tone-200 -> '30 GB' or '50 GB'
  // tone-300 -> '30 GB' or '50 GB'
  const [selectedTierQuota, setSelectedTierQuota] = useState<Record<string, '30 GB' | '50 GB'>>({
    '75': '50 GB',   // default to 50 GB because user said "Mending yang 50gb wkwk selisih cuma 10rb"
    '100': '50 GB',
    '150': '50 GB',
    '200': '50 GB',
    '300': '50 GB',
  });

  const categories = [
    { id: 'all', name: 'Semua Kategori', icon: Layers, count: `${PACKAGES.length} Pilihan` },
    { id: 'internet-streaming', name: 'Internet Only + Streaming', icon: Wifi, count: `${PACKAGES.filter(p => p.category === 'internet-streaming').length} Kecepatan` },
    { id: 'telkomsel-one', name: 'Telkomsel One (WiFi + Kuota HP)', icon: Smartphone, count: `${PACKAGES.filter(p => p.category === 'telkomsel-one').length} Pilihan` },
    { id: 'eznet', name: 'EZnet Promo Terbatas', icon: Cable, count: `${PACKAGES.filter(p => p.category === 'eznet').length} Pilihan` },
    { id: 'gaming', name: 'Internet + Game', icon: Gamepad2, count: `${PACKAGES.filter(p => p.category === 'gaming').length} Pilihan` },
    { id: 'movie', name: 'Internet + Movie Complete', icon: Tv, count: `${PACKAGES.filter(p => p.category === 'movie').length} Pilihan` },
  ];

  // Helper to switch quota for a Telkomsel One tier
  const handleToggleTelkomselOneQuota = (speed: '20' | '75' | '100' | '150' | '200' | '300', quota: '30 GB' | '50 GB') => {
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

  return (
    <section id="katalog-paket" className="py-10 sm:py-16 bg-transparent">
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

        {/* Full-width Responsive Package Catalog */}
        <div className="space-y-4 mb-12">
          
          <div className="w-full space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 px-1">
              <span className="text-xs sm:text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span>Daftar Paket Internet ({filteredPackages.length} Pilihan)</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Pilih paket untuk pendaftaran cepat & slot teknisi 1x24 jam
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredPackages.map((pkg) => {
                const isTOne = pkg.category === 'telkomsel-one';

                return (
                  <div
                    key={pkg.id}
                    onClick={() => {
                      onSelectPackage(pkg);
                      onOpenRegister(pkg.id);
                    }}
                    className="group cursor-pointer rounded-2xl p-4 sm:p-5 border border-slate-200/90 bg-white/95 backdrop-blur-sm hover:border-red-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 relative flex flex-col justify-between"
                  >
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
                      <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                            {pkg.name}
                          </h4>
                        </div>
                        {pkg.upspeedMbps ? (
                          <div className="flex flex-col items-end shrink-0">
                            <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-xs sm:text-sm shadow-md shadow-amber-500/25 flex items-center gap-1 ring-1 ring-amber-400">
                              <Zap className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-white text-white" />
                              <span>{pkg.upspeedMbps} Mbps</span>
                            </div>
                            <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5">
                              Dasar: <span className="line-through">{pkg.speedLabel}</span>
                            </span>
                          </div>
                        ) : (
                          <div className="px-2 py-0.5 sm:py-1 rounded-lg bg-slate-100 text-slate-900 font-black text-xs shrink-0 flex items-center gap-1">
                            <Zap className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-500 fill-amber-500" />
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
                            <div className="py-1.5 px-2 text-[11px] font-bold text-blue-900 bg-blue-100/90 rounded-lg flex items-center justify-between">
                              <span>Kuota 30 GB (Rp 148.000)</span>
                              <span className="text-[9px] bg-emerald-600 text-white font-black px-1.5 py-0.5 rounded shadow-xs">
                                GRATIS PSB (Rp 0)
                              </span>
                            </div>
                          ) : (
                            /* 30GB vs 50GB quick toggle */
                            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const speedKey = pkg.id.includes('300') ? '300' : pkg.id.includes('200') ? '200' : pkg.id.includes('150') ? '150' : pkg.id.includes('100') ? '100' : '75';
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
                                  const speedKey = pkg.id.includes('300') ? '300' : pkg.id.includes('200') ? '200' : pkg.id.includes('150') ? '150' : pkg.id.includes('100') ? '100' : '75';
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

                      {/* EZnet Promo Terbatas Specific Callout */}
                      {pkg.category === 'eznet' && (
                        <div className="mt-3 p-2 bg-amber-50 border border-amber-200/90 rounded-xl space-y-1">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900">
                            <Cable className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>Khusus Area Tertentu (Jaringan Kabel)</span>
                          </div>
                          <p className="text-[10px] text-amber-700 leading-tight">
                            Internet rumah kabel 20 Mbps super hemat. S&K jangkauan berlaku.
                          </p>
                        </div>
                      )}

                      {/* Prominent Upspeed Callout Banner */}
                      {pkg.upspeedMbps && (
                        <div className="mt-3 p-2 sm:p-2.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-2 border-amber-400/70 shadow-xs flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow-xs shrink-0">
                              <Zap className="w-3.5 h-3.5 fill-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 leading-none flex-wrap">
                                <span className="text-xs sm:text-sm font-black text-amber-950">
                                  ⚡ {pkg.upspeedMbps} Mbps
                                </span>
                                <span className="text-[9px] sm:text-[10px] text-slate-400 line-through font-medium">
                                  ({pkg.speedLabel})
                                </span>
                              </div>
                              <span className="text-[9px] sm:text-[10px] text-amber-800 font-bold block mt-0.5 truncate">
                                Ekstra Lonjakan {pkg.upspeedDuration}
                              </span>
                            </div>
                          </div>
                          <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-500 text-white text-[8px] sm:text-[9px] font-black uppercase tracking-wider shadow-xs shrink-0">
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
                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-end justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-slate-500 font-semibold block leading-none">Tarif Promo:</span>
                        <div className="text-xl font-black text-red-600 mt-0.5">
                          {formatRupiah(pkg.pricePromo)}
                          <span className="text-[11px] font-medium text-slate-400">/bln</span>
                        </div>
                        <span className="text-[10px] text-amber-700 font-bold block mt-0.5">
                          *belum PPN 11%
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPackage(pkg);
                          onOpenRegister(pkg.id);
                        }}
                        className="text-xs font-black px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md bg-red-600 hover:bg-red-700 text-white active:scale-95 cursor-pointer shrink-0"
                      >
                        <span>Daftar Sekarang</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
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
