import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Sliders, 
  Smartphone, 
  Tv, 
  Gamepad2, 
  Check, 
  ArrowRight, 
  Zap, 
  Sparkles, 
  MessageCircle, 
  Info,
  HelpCircle,
  Laptop,
  Video,
  Eye,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { PACKAGES, SALES_AGENT_INFO } from '../data/packages';
import { InternetPackage } from '../types';
import { formatRupiah, createWhatsAppCustomUrl } from '../utils/helpers';
import { StreamingBenefitBadges } from './StreamingBenefitBadges';

interface SpeedCalculatorPageProps {
  onBackToHome: () => void;
  onOpenRegister: (packageId: string) => void;
}

export const SpeedCalculatorPage: React.FC<SpeedCalculatorPageProps> = ({
  onBackToHome,
  onOpenRegister,
}) => {
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
        reason = 'Telkomsel One 20 Mbps + Kuota HP Keluarga 30 GB hanya Rp 148.000/bln. GRATIS Biaya Pasang Baru (PSB Rp 0), pilihan paling hemat untuk keluarga!';
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
  const is148k = recommendation.pkg.id.includes('20');

  const waConsultUrl = createWhatsAppCustomUrl(
    `Halo Mas Vicky! Saya baru saja menggunakan Kalkulator Speed di website. Hasil hitung saya:\n• Jumlah Perangkat: ${deviceCount} perangkat\n• Estimasi Kebutuhan Bandwidth: ~${recommendation.bandwidthScore} Mbps\n• Rekomendasi Paket: *${recommendation.pkg.name}* (${formatRupiah(recommendation.pkg.pricePromo)}/bln)\n\nMohon info ketersediaan jaringan di alamat saya dan bantuan pendaftarannya ya mas. Terima kasih!`
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-red-400" />
              <span>Kembali ke Beranda</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <span className="cursor-pointer hover:text-white" onClick={onBackToHome}>Beranda</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-white font-semibold">Kalkulator Speed</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Kalkulator Resmi:</span>
            <strong className="text-white font-semibold">Mas Vicky IndiHome</strong>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5 text-red-400" />
            <span>Kalkulator Kebutuhan Kecepatan Internet</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Hitung Kebutuhan Speed Internet Anda
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            Geser jumlah perangkat aktif dan pilih aktivitas harian di rumah Anda. Sistem pintar kami akan langsung menghitung estimasi bandwidth serta mencocokkan paket paling pas dan hemat!
          </p>
        </div>

        {/* Main 2-Column Calculator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT: Controls Panel */}
          <div className="lg:col-span-7 bg-slate-850 border border-slate-750 rounded-3xl p-6 sm:p-8 space-y-7 shadow-xl">
            
            {/* 1. Device Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-red-400" />
                  <span>Jumlah Perangkat Terhubung:</span>
                </label>
                <span className="text-base font-extrabold text-white px-3.5 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-300">
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
                className="w-full h-3 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-red-500 border border-slate-700"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1 Perangkat (Personal)</span>
                <span>7-8 Perangkat (Keluarga)</span>
                <span>15+ Perangkat (Besar/Kantor)</span>
              </div>
            </div>

            {/* 2. Usage Activity Toggles */}
            <div className="space-y-3 pt-2 border-t border-slate-750">
              <label className="text-sm font-bold text-white block">
                Pilih Aktivitas Harian yang Dilakukan di Rumah:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {/* 4K Streaming */}
                <button
                  type="button"
                  onClick={() => setHasStreaming4k(!hasStreaming4k)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer active:scale-95 ${
                    hasStreaming4k
                      ? 'bg-red-950/50 border-red-500 text-white font-bold ring-1 ring-red-500/50'
                      : 'bg-slate-900 border-slate-750 text-slate-300 hover:border-slate-650'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Tv className={`w-4 h-4 ${hasStreaming4k ? 'text-red-400' : 'text-slate-400'}`} />
                    <span className="text-xs">Streaming 4K / Netflix / YouTube HD</span>
                  </div>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs shrink-0 ${hasStreaming4k ? 'bg-red-600 text-white' : 'border border-slate-700'}`}>
                    {hasStreaming4k && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>

                {/* WFH & Zoom */}
                <button
                  type="button"
                  onClick={() => setHasWfh(!hasWfh)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer active:scale-95 ${
                    hasWfh
                      ? 'bg-red-950/50 border-red-500 text-white font-bold ring-1 ring-red-500/50'
                      : 'bg-slate-900 border-slate-750 text-slate-300 hover:border-slate-650'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Laptop className={`w-4 h-4 ${hasWfh ? 'text-red-400' : 'text-slate-400'}`} />
                    <span className="text-xs">WFH & Video Call Zoom / Meet</span>
                  </div>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs shrink-0 ${hasWfh ? 'bg-red-600 text-white' : 'border border-slate-700'}`}>
                    {hasWfh && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>

                {/* Gaming */}
                <button
                  type="button"
                  onClick={() => setHasGaming(!hasGaming)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer active:scale-95 ${
                    hasGaming
                      ? 'bg-red-950/50 border-red-500 text-white font-bold ring-1 ring-red-500/50'
                      : 'bg-slate-900 border-slate-750 text-slate-300 hover:border-slate-650'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Gamepad2 className={`w-4 h-4 ${hasGaming ? 'text-red-400' : 'text-slate-400'}`} />
                    <span className="text-xs">Gaming Online (Ping Rendah Anti-Lag)</span>
                  </div>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs shrink-0 ${hasGaming ? 'bg-red-600 text-white' : 'border border-slate-700'}`}>
                    {hasGaming && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>

                {/* CCTV */}
                <button
                  type="button"
                  onClick={() => setHasCctv(!hasCctv)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer active:scale-95 ${
                    hasCctv
                      ? 'bg-red-950/50 border-red-500 text-white font-bold ring-1 ring-red-500/50'
                      : 'bg-slate-900 border-slate-750 text-slate-300 hover:border-slate-650'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Eye className={`w-4 h-4 ${hasCctv ? 'text-red-400' : 'text-slate-400'}`} />
                    <span className="text-xs">CCTV Online & Smart Home 24 Jam</span>
                  </div>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs shrink-0 ${hasCctv ? 'bg-red-600 text-white' : 'border border-slate-700'}`}>
                    {hasCctv && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              </div>
            </div>

            {/* 3. Special Feature Addons */}
            <div className="space-y-3 pt-2 border-t border-slate-750">
              <label className="text-sm font-bold text-white block">
                Kebutuhan Khusus Tambahan:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {/* Telkomsel One Quota */}
                <button
                  type="button"
                  onClick={() => setWantsKuotaKeluarga(!wantsKuotaKeluarga)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer active:scale-95 ${
                    wantsKuotaKeluarga
                      ? 'bg-blue-950/50 border-blue-500 text-white font-bold ring-1 ring-blue-500/50'
                      : 'bg-slate-900 border-slate-750 text-slate-300 hover:border-slate-650'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Smartphone className={`w-4 h-4 ${wantsKuotaKeluarga ? 'text-blue-400' : 'text-slate-400'}`} />
                    <div>
                      <span className="text-xs block">Mau Kuota Bersama HP Keluarga</span>
                      <span className="text-[10px] text-blue-300 font-semibold">Telkomsel One (Mulai 148K)</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs shrink-0 ${wantsKuotaKeluarga ? 'bg-blue-600 text-white' : 'border border-slate-700'}`}>
                    {wantsKuotaKeluarga && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>

                {/* TV Box Complete */}
                <button
                  type="button"
                  onClick={() => setNeedsTvBox(!needsTvBox)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer active:scale-95 ${
                    needsTvBox
                      ? 'bg-purple-950/50 border-purple-500 text-white font-bold ring-1 ring-purple-500/50'
                      : 'bg-slate-900 border-slate-750 text-slate-300 hover:border-slate-650'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Tv className={`w-4 h-4 ${needsTvBox ? 'text-purple-400' : 'text-slate-400'}`} />
                    <div>
                      <span className="text-xs block">Mau Paket Movie TV Lengkap</span>
                      <span className="text-[10px] text-purple-300 font-semibold">Netflix, Vidio, Disney+, Prime</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs shrink-0 ${needsTvBox ? 'bg-purple-600 text-white' : 'border border-slate-700'}`}>
                    {needsTvBox && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              </div>
            </div>

            {/* Estimated Bandwidth Meter */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-750 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Estimasi Beban Bandwidth:</span>
                <span className="text-lg font-black text-white">
                  ± {recommendation.bandwidthScore} Mbps
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-400 uppercase font-black tracking-wider block">
                  Status Jaringan
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  100% Fiber Optic Murni
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: Recommended Package Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-850 to-slate-900 border-2 border-red-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Top Glow Accent */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between gap-2 border-b border-slate-750 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Rekomendasi Paling Tepat</span>
              </div>

              {is148k && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase shadow-xs">
                  GRATIS PSB (Rp 0)
                </span>
              )}
            </div>

            {/* Package Identity */}
            <div>
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-wide">
                {recommendation.pkg.categoryLabel}
              </span>
              <h3 className="text-2xl font-black text-white mt-0.5 leading-snug">
                {recommendation.pkg.name}
              </h3>
            </div>

            {/* Speed & Upspeed Badge */}
            {recommendation.pkg.upspeedMbps ? (
              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-amber-300 uppercase block">Kecepatan Promo Lonjakan:</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-amber-400">⚡ {recommendation.pkg.upspeedMbps} Mbps</span>
                    <span className="text-xs text-slate-400 line-through">({recommendation.pkg.speedLabel})</span>
                  </div>
                </div>
                <span className="text-[10px] text-amber-200 font-bold px-2 py-1 rounded-md bg-amber-500/20 border border-amber-500/30">
                  {recommendation.pkg.upspeedDuration}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-750">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Kecepatan Fiber Optik:</span>
                  <span className="text-xl font-black text-white">{recommendation.pkg.speedLabel}</span>
                </div>
              </div>
            )}

            {/* Pricing Box */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-750">
              <span className="text-[11px] text-slate-400 block">Tarif Promo Bulanan Resmi:</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-red-500">
                  {formatRupiah(recommendation.pkg.pricePromo)}
                </span>
                <span className="text-xs text-slate-400 font-medium">/bulan*</span>
              </div>
              <p className="text-[10px] text-amber-300 mt-1">
                *Belum termasuk PPN 11%. Tagihan resmi Telkom tanpa mark-up.
              </p>
            </div>

            {/* Reason Why This Is Recommended */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-1">
              <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-red-400" />
                Alasan Rekomendasi:
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {recommendation.reason}
              </p>
            </div>

            {/* Streaming Bonuses */}
            {recommendation.pkg.ottBonus && recommendation.pkg.ottBonus.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-slate-750">
                <span className="text-xs font-bold text-slate-300 block">
                  Bonus Aplikasi Streaming Termasuk:
                </span>
                <StreamingBenefitBadges apps={recommendation.pkg.ottBonus} size="sm" variant="dark" showLabel={true} />
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => onOpenRegister(recommendation.pkg.id)}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 active:scale-95 text-white font-black text-xs sm:text-sm text-center shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Zap className="w-4 h-4 text-yellow-300" />
                <span>Daftar Paket Rekomendasi Ini</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <a
                href={waConsultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-xs text-center shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Konsultasi Hasil via WA Mas Vicky</span>
              </a>
            </div>

          </div>

        </div>

        {/* Educational Bandwidth Guide */}
        <div className="mt-8 bg-slate-850 border border-slate-750 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-red-400" />
            <span>Panduan Kebutuhan Kecepatan (Bandwidth) Per Aktivitas:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-white block mb-0.5">🌐 Browsing & Sosmed</strong>
              <span className="text-[11px] text-slate-400">Cukup 2 - 5 Mbps per orang untuk Instagram, TikTok, dan WhatsApp lancar.</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-white block mb-0.5">🎬 Streaming 4K Ultra HD</strong>
              <span className="text-[11px] text-slate-400">Memerlukan minimal 25 Mbps stabil per Smart TV agar bebas buffering.</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-white block mb-0.5">🎮 Gaming Online Kompetitif</strong>
              <span className="text-[11px] text-slate-400">Butuh latensi (ping) rendah & anti packet-loss. Paket Game 75 Mbps ada jalur prioritas.</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-white block mb-0.5">💼 WFH & Zoom / Google Meet</strong>
              <span className="text-[11px] text-slate-400">Butuh 10 - 20 Mbps dengan upload simetris agar video jernih tanpa delay.</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-white block mb-0.5">📹 CCTV Cloud 24 Jam</strong>
              <span className="text-[11px] text-slate-400">Setiap 1 kamera IP membutuhkan upload stabil 3 - 5 Mbps terus-menerus.</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-white block mb-0.5">📱 Kuota Bersama HP Keluarga</strong>
              <span className="text-[11px] text-slate-400">Pilih Telkomsel One (mulai 148K) untuk tagihan hemat WiFi + Kuota sekeluarga.</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/30">
              <strong className="text-amber-300 block mb-0.5">📡 EZnet Wireless 20 Mbps (103rb)</strong>
              <span className="text-[11px] text-slate-400">Pilihan super hemat internet nirkabel Rp 103rb/bln, khusus untuk area tertentu.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
