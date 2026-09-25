import React, { useState } from 'react';
import { 
  Zap, 
  Tv, 
  Gamepad2, 
  Check, 
  ArrowRight, 
  Smartphone, 
  Sliders,
  Sparkles,
  Layers,
  Laptop
} from 'lucide-react';
import { PACKAGES } from '../data/packages';
import { InternetPackage } from '../types';
import { formatRupiah } from '../utils/helpers';
import { StreamingBenefitBadges } from './StreamingBenefitBadges';

interface SpeedCalculatorProps {
  onOpenRegister: (packageId: string) => void;
}

export const SpeedCalculator: React.FC<SpeedCalculatorProps> = ({ onOpenRegister }) => {
  const [deviceCount, setDeviceCount] = useState<number>(4);
  const [hasStreaming4k, setHasStreaming4k] = useState<boolean>(true);
  const [hasGaming, setHasGaming] = useState<boolean>(false);
  const [hasWfh, setHasWfh] = useState<boolean>(true);
  const [hasCctv, setHasCctv] = useState<boolean>(false);
  const [wantsKuotaKeluarga, setWantsKuotaKeluarga] = useState<boolean>(false);
  const [needsTvBox, setNeedsTvBox] = useState<boolean>(false);

  // Compute calculated recommended package based on realistic usage points
  const calculateRecommendation = (): { pkg: InternetPackage; reason: string; bandwidthScore: number } => {
    let score = deviceCount * 8; // base Mbps per device
    if (hasStreaming4k) score += 25;
    if (hasGaming) score += 25;
    if (hasWfh) score += 15;
    if (hasCctv) score += 15;
    if (wantsKuotaKeluarga) score += 15;

    let matchedPkg: InternetPackage | undefined;
    let reason = 'Cocok untuk kebutuhan harian, streaming standar HD, dan medsos keluarga kecil.';

    // 1. If user specifically wants Kuota Bersama HP Keluarga (Telkomsel One Dynamic)
    if (wantsKuotaKeluarga) {
      if (score >= 90) {
        matchedPkg = PACKAGES.find((p) => p.id === 'tone-150-50gb');
        reason = 'Telkomsel One 150 Mbps (Upspeed ke 300 Mbps) + Kuota HP Keluarga 50 GB untuk performa maksimal seisi rumah.';
      } else if (score >= 65) {
        matchedPkg = PACKAGES.find((p) => p.id === 'tone-100-50gb');
        reason = 'Telkomsel One 100 Mbps (Upspeed ke 200 Mbps) + Kuota HP 50 GB. Sangat hemat, satu tagihan internet rumah + HP!';
      } else if (score >= 40) {
        matchedPkg = PACKAGES.find((p) => p.id === 'tone-75-50gb');
        reason = 'Telkomsel One 75 Mbps (Upspeed ke 150 Mbps) + Kuota HP 50 GB. Paling cuan, selisih 10rb langsung dapet kuota keluarga!';
      } else {
        matchedPkg = PACKAGES.find((p) => p.id === 'tone-20-30gb');
        reason = 'Telkomsel One 20 Mbps + Kuota HP Keluarga 30 GB hanya Rp 148.000/bln. Paling hemat untuk kebutuhan internet rumah ringan dan kuota HP sekeluarga!';
      }
    }
    // 2. If user specifically needs Movie / Smart TV Bioskop
    else if (needsTvBox) {
      matchedPkg = PACKAGES.find((p) => p.id === 'movie-75');
      reason = 'Paket Internet + Movie Complete 75 Mbps (Upspeed ke 200 Mbps) sudah komplit langganan Netflix, Vidio, Disney+, Prime Video & Vision+ langsung aktif di TV.';
    } 
    // 3. If user specifically emphasizes online gaming
    else if (hasGaming && score < 70) {
      matchedPkg = PACKAGES.find((p) => p.id === 'game-75');
      reason = 'Paket Internet + Game 75 Mbps (Upspeed ke 200 Mbps) dilengkapi jalur prioritas routing server game rendah latensi (anti-lag) dan benefit GameQoo, MLBB, Free Fire dll.';
    }
    // 4. Ultra high bandwidth demand (>= 110 points) -> 300 Mbps up to 500 Mbps Rp 500k
    else if (score >= 110) {
      matchedPkg = PACKAGES.find((p) => p.id === 'stream-300');
      reason = 'Paket performa tertinggi 300 Mbps (Upspeed lonjak ke 500 Mbps) seharga Rp 500.000/bln untuk kebutuhan ultra profesional, content creator, heavy multitasking, dan smart home besar.';
    }
    // 5. Very high bandwidth demand (90 - 109 points) -> 200 Mbps up to 500 Mbps Rp 350k
    else if (score >= 90) {
      matchedPkg = PACKAGES.find((p) => p.id === 'stream-200');
      reason = 'Kapasitas monster 200 Mbps (Upspeed promo ke 500 Mbps selama 1 tahun) seharga Rp 350.000/bln untuk puluhan perangkat aktif tanpa hambatan.';
    }
    // 6. High demand (70 - 89 points) -> 150 Mbps up to 500 Mbps Rp 300k
    else if (score >= 70) {
      matchedPkg = PACKAGES.find((p) => p.id === 'stream-150');
      reason = 'Paket super kencang 150 Mbps (Upspeed promo lonjak ke 500 Mbps 3 bulan) seharga Rp 300.000/bln dengan benefit streaming komplit Vision+, Prime Video, Viu & MaxStream.';
    }
    // 7. Medium demand (50 - 69 points) -> 100 Mbps up to 300 Mbps Rp 270k
    else if (score >= 50) {
      matchedPkg = PACKAGES.find((p) => p.id === 'stream-100');
      reason = 'Kecepatan 100 Mbps (Upspeed promo ke 300 Mbps selama 6 bulan) seharga Rp 270.000/bln, sangat ideal untuk streaming 4K simultan dan kerja multitasking.';
    }
    // 8. Basic & Medium demand (< 50 points) -> 75 Mbps up to 200 Mbps Rp 240k
    else {
      matchedPkg = PACKAGES.find((p) => p.id === 'stream-75');
      reason = 'Pilihan paling favorit 75 Mbps (Upspeed promo ke 200 Mbps selama 3 bulan) seharga Rp 240.000/bln, lancar streaming, kerja & sekolah online.';
    }

    if (!matchedPkg) {
      matchedPkg = PACKAGES[1] || PACKAGES[0];
    }

    return { pkg: matchedPkg, reason, bandwidthScore: score };
  };

  const recommendation = calculateRecommendation();

  return (
    <section id="kalkulator" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            <span>Kalkulator Kebutuhan Bandwidth</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Cari Tahu Kecepatan Internet yang Tepat
          </h2>

          <p className="text-slate-600 text-base">
            Geser jumlah gadget dan centang aktivitas harian di rumah Anda untuk mendapatkan rekomendasi paket yang paling efisien tanpa boros kuota/kecepatan.
          </p>
        </div>

        {/* Two-Column Interactive Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-7 shadow-xs">
            
            {/* 1. Device Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-red-600" />
                  <span>Jumlah Perangkat Terhubung (HP, Laptop, Smart TV, CCTV):</span>
                </label>
                <span className="text-base font-extrabold text-red-600 px-3 py-0.5 rounded-full bg-red-100">
                  {deviceCount} Perangkat
                </span>
              </div>

              <input
                type="range"
                min={1}
                max={15}
                step={1}
                value={deviceCount}
                onChange={(e) => setDeviceCount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>1 Perangkat (Personal)</span>
                <span>7 Perangkat (Keluarga Sedang)</span>
                <span>15+ Perangkat (Ramai / Kantor)</span>
              </div>
            </div>

            {/* 2. Usage Activity Toggles */}
            <div className="space-y-2.5">
              <label className="text-sm font-bold text-slate-900 block">
                Aktivitas Harian yang Sering Dilakukan:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setHasStreaming4k(!hasStreaming4k)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    hasStreaming4k
                      ? 'bg-red-50 border-red-300 text-red-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs">Streaming 4K / Netflix / YouTube HD</span>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs ${hasStreaming4k ? 'bg-red-600 text-white' : 'border border-slate-300'}`}>
                    {hasStreaming4k && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setHasWfh(!hasWfh)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    hasWfh
                      ? 'bg-red-50 border-red-300 text-red-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs">WFH & Video Call Zoom / Meet</span>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs ${hasWfh ? 'bg-red-600 text-white' : 'border border-slate-300'}`}>
                    {hasWfh && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setHasGaming(!hasGaming)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    hasGaming
                      ? 'bg-red-50 border-red-300 text-red-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs">Game Online (Valorant, ML, PUBG)</span>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs ${hasGaming ? 'bg-red-600 text-white' : 'border border-slate-300'}`}>
                    {hasGaming && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setHasCctv(!hasCctv)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    hasCctv
                      ? 'bg-red-50 border-red-300 text-red-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs">Kamera CCTV Cloud Aktif 24 Jam</span>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs ${hasCctv ? 'bg-red-600 text-white' : 'border border-slate-300'}`}>
                    {hasCctv && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              </div>
            </div>

            {/* 3. Addon Toggles */}
            <div className="pt-2 space-y-3">
              <label className="text-sm font-bold text-slate-900 block">
                Kebutuhan Tambahan Spesifik:
              </label>

              {/* Telkomsel One Kuota Keluarga Toggle */}
              <button
                type="button"
                onClick={() => setWantsKuotaKeluarga(!wantsKuotaKeluarga)}
                className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left flex items-start sm:items-center justify-between gap-2.5 transition-all cursor-pointer ${
                  wantsKuotaKeluarga
                    ? 'bg-red-50 border-red-300 text-red-950'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
                  <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 sm:mt-0 ${wantsKuotaKeluarga ? 'text-red-600' : 'text-slate-400'}`} />
                  <div>
                    <span className="block text-xs sm:text-sm font-bold">Gabung Kuota Bersama HP Keluarga (Telkomsel One)</span>
                    <span className="block text-[10px] sm:text-[11px] text-slate-500">
                      Internet WiFi rumah + Kuota 30-50 GB sekeluarga dalam 1 tagihan hemat
                    </span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-lg shrink-0 flex items-center justify-center text-xs ${wantsKuotaKeluarga ? 'bg-red-600 text-white' : 'border border-slate-300'}`}>
                  {wantsKuotaKeluarga && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>

              {/* Movie & Bioskop Toggle */}
              <button
                type="button"
                onClick={() => setNeedsTvBox(!needsTvBox)}
                className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left flex items-start sm:items-center justify-between gap-2.5 transition-all cursor-pointer ${
                  needsTvBox
                    ? 'bg-red-50 border-red-300 text-red-950'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
                  <Tv className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 sm:mt-0 ${needsTvBox ? 'text-red-600' : 'text-slate-400'}`} />
                  <div>
                    <span className="block text-xs sm:text-sm font-bold">Paket Movie Lengkap (Bioskop di Rumah)</span>
                    <span className="block text-[10px] sm:text-[11px] text-slate-500 mb-1.5">
                      Termasuk akun resmi tayangan streaming komplit:
                    </span>
                    <StreamingBenefitBadges apps={['Netflix', 'Disney+', 'Vidio', 'Prime Video', 'Vision+']} size="sm" variant="light" showLabel={true} />
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-lg shrink-0 flex items-center justify-center text-xs ${needsTvBox ? 'bg-red-600 text-white' : 'border border-slate-300'}`}>
                  {needsTvBox && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            </div>

          </div>

          {/* Result Card: Crisp and focused */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-red-400" />
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                    Hasil Analisa Kebutuhan
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {recommendation.bandwidthScore} Poin Bandwidth
                </span>
              </div>

              {/* Speed Target */}
              <div>
                {recommendation.pkg.upspeedMbps ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1 uppercase tracking-wider">
                        <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
                        Kecepatan Promo (Upspeed):
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
                        EXTRA SPEED
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 text-3xl sm:text-4xl font-black text-amber-400">
                      <span>{recommendation.pkg.upspeedMbps} Mbps</span>
                      <span className="text-xs text-slate-400 font-normal line-through">
                        (Dasar: {recommendation.pkg.speedLabel})
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-200">
                      ⚡ Kecepatan ekstra aktif selama <strong>{recommendation.pkg.upspeedDuration}</strong>!
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-3xl font-black text-white">
                    <Zap className="w-7 h-7 text-amber-400 fill-amber-400" />
                    <span>{recommendation.pkg.speedLabel}</span>
                  </div>
                )}
                <h3 className="text-xl font-extrabold text-slate-100 mt-2">
                  {recommendation.pkg.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {recommendation.reason}
                </p>
              </div>

              {/* Price Details */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-300">Biaya Langganan Promo:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-red-400">
                      {formatRupiah(recommendation.pkg.pricePromo)}
                    </span>
                    <span className="text-xs text-slate-400 block line-through">
                      {formatRupiah(recommendation.pkg.priceNormal)}/bln
                    </span>
                  </div>
                </div>

                {recommendation.pkg.upspeedMbps && (
                  <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
                    <span>⚡ Upspeed Promo:</span>
                    <span className="font-extrabold">{recommendation.pkg.upspeedMbps} Mbps ({recommendation.pkg.upspeedDuration})</span>
                  </div>
                )}

                {recommendation.pkg.kuotaKeluarga && (
                  <div className="px-2.5 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center justify-between">
                    <span>📱 Kuota HP Keluarga:</span>
                    <span className="font-extrabold">{recommendation.pkg.kuotaKeluarga} / bulan</span>
                  </div>
                )}

                {/* Streaming Logos in Speed Calculator */}
                {recommendation.pkg.ottBonus && recommendation.pkg.ottBonus.length > 0 && (
                  <div className="pt-2 border-t border-slate-700/80">
                    <span className="text-[11px] font-bold text-slate-300 block mb-2">
                      Layanan Streaming Termasuk:
                    </span>
                    <StreamingBenefitBadges apps={recommendation.pkg.ottBonus} size="sm" variant="dark" showLabel={true} />
                  </div>
                )}

                <div className="pt-2 border-t border-slate-700 text-[11px] text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Kapasitas Rekomendasi:</span>
                    <span className="font-semibold text-white">{recommendation.pkg.deviceCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jaringan Internet:</span>
                    <span className="font-semibold text-emerald-400">100% Fiber Optic Unlimited</span>
                  </div>
                </div>
              </div>

              {/* Single Clear Action */}
              <button
                type="button"
                onClick={() => onOpenRegister(recommendation.pkg.id)}
                className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Pilih Paket {recommendation.pkg.speedLabel} Ini</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
