import React, { useState, useMemo } from 'react';
import { 
  Wifi, 
  Tv, 
  Phone, 
  Gamepad2, 
  Check, 
  Sparkles, 
  MessageCircle, 
  Users, 
  Zap, 
  Layers, 
  ArrowRight,
  HelpCircle,
  Tag
} from 'lucide-react';
import { PACKAGES, SALES_AGENT_INFO } from '../data/packages';
import { InternetPackage } from '../types';
import { formatRupiah, createWhatsAppRegistrationUrl } from '../utils/helpers';
import { StreamingBenefitBadges } from './StreamingBenefitBadges';

interface PackageCatalogProps {
  onSelectPackage: (pkg: InternetPackage) => void;
  onOpenRegister: (packageId: string) => void;
}

export const PackageCatalog: React.FC<PackageCatalogProps> = ({
  onSelectPackage,
  onOpenRegister,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSpeed, setSelectedSpeed] = useState<number | 'all'>('all');

  const categories = [
    { id: 'all', name: 'Semua Paket', icon: Layers },
    { id: 'internet-streaming', name: 'Internet Streaming', icon: Wifi },
    { id: 'telkomsel-one', name: 'Telkomsel One (WiFi + HP)', icon: Sparkles },
    { id: 'gaming', name: 'Paket Gamer', icon: Gamepad2 },
    { id: 'movie', name: 'Paket Movie (Bioskop)', icon: Tv },
  ];

  const speeds = [
    { label: 'Semua Speed', value: 'all' },
    { label: '75 Mbps', value: 75 },
    { label: '100 Mbps', value: 100 },
    { label: '150 Mbps', value: 150 },
    { label: '200 Mbps', value: 200 },
  ];

  const filteredPackages = useMemo(() => {
    return PACKAGES.filter((pkg) => {
      const matchCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
      const matchSpeed = selectedSpeed === 'all' || pkg.speed === selectedSpeed;
      return matchCategory && matchSpeed;
    });
  }, [selectedCategory, selectedSpeed]);

  return (
    <section id="katalog-paket" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>Katalog Resmi IndiHome by Telkomsel</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pilihan Paket Internet Rumah & Kantor
          </h2>

          <p className="text-slate-600 text-base">
            Pilih kecepatan dan layanan yang sesuai dengan kebutuhan Anda. Semua paket menggunakan teknologi 100% serat optik berkualitas tinggi dengan harga promo spesial dari Sales Resmi <strong className="text-slate-900">Vicky</strong>.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 mb-6 gap-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-600'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Speed Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          <span className="text-xs font-medium text-slate-500 mr-2">Filter Kecepatan:</span>
          {speeds.map((sp) => {
            const isActive = selectedSpeed === sp.value;
            return (
              <button
                key={String(sp.value)}
                type="button"
                onClick={() => setSelectedSpeed(sp.value as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300/70'
                }`}
              >
                {sp.label}
              </button>
            );
          })}
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPackages.map((pkg) => {
            const isBestSeller = pkg.isPopular;
            const savings = pkg.priceNormal - pkg.pricePromo;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl bg-white border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isBestSeller
                    ? 'border-red-500 ring-2 ring-red-500/20 shadow-lg shadow-red-500/5'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                {/* Floating Top Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                        isBestSeller
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
                          : 'bg-slate-900 text-white'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                {/* Card Header */}
                <div className="p-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center justify-between gap-2 mb-2 pt-2">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                      {pkg.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      <Users className="w-3 h-3" />
                      {pkg.deviceCount}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 leading-snug mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{pkg.description}</p>

                  {/* Speed Gauge & Price */}
                  <div className="mt-4 pt-4 border-t border-dashed border-slate-200 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-2xl">
                        <Zap className="w-5 h-5 text-red-600 fill-red-600" />
                        <span>{pkg.speedLabel}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">100% Fiber Optic</span>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black text-red-600">
                        {formatRupiah(pkg.pricePromo)}
                      </div>
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-xs text-slate-400 line-through">
                          {formatRupiah(pkg.priceNormal)}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                          Hemat {formatRupiah(savings)}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">/ bulan (belum termasuk PPN)</span>
                    </div>
                  </div>
                </div>

                {/* Card Body / Features */}
                <div className="p-6 pt-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Fasilitas & Keuntungan:
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Bonus OTT badges if available with real logos */}
                    {pkg.ottBonus && pkg.ottBonus.length > 0 && (
                      <div className="pt-2">
                        <p className="text-[11px] font-bold text-slate-700 mb-1.5">
                          {pkg.category === 'gaming' ? 'Benefit Game:' : 'Layanan Streaming Termasuk:'}
                        </p>
                        <StreamingBenefitBadges apps={pkg.ottBonus} size="sm" variant="light" showLabel={true} />
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <button
                      type="button"
                      onClick={() => onOpenRegister(pkg.id)}
                      className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-extrabold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <span>Daftar Paket Ini</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={createWhatsAppRegistrationUrl({ packageName: pkg.name }, pkg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tanya Paket via WhatsApp Vicky</span>
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state fallback */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">Paket Tidak Ditemukan</h3>
            <p className="text-sm text-slate-500 mb-4">
              Tidak ada paket dengan filter kategori atau kecepatan yang dipilih.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSpeed('all');
              }}
              className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Note about official Telkom policy */}
        <div className="mt-12 p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Catatan Transparan:</strong> Biaya langganan bulanan belum termasuk PPN 11%. Promo biaya pasang baru (PSB) diskon s/d 70% akan ditagihkan pada tagihan bulan pertama resmi dari Telkom (tidak bayar tunai ke sales/teknisi di awal).
          </p>
        </div>

      </div>
    </section>
  );
};
