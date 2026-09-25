import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Check, 
  ChevronRight, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  HelpCircle, 
  MessageCircle, 
  FileCheck,
  AlertTriangle,
  Send
} from 'lucide-react';
import { PACKAGES, INDONESIAN_CITIES, SALES_AGENT_INFO } from '../data/packages';
import { CustomerRegistration, InternetPackage } from '../types';
import { 
  formatRupiah, 
  generateRegistrationId, 
  createWhatsAppRegistrationUrl, 
  saveRegistration 
} from '../utils/helpers';
import { StreamingBenefitBadges } from './StreamingBenefitBadges';

interface RegistrationPageProps {
  initialPackageId?: string;
  onBackToHome: () => void;
  onSuccess: (registration: CustomerRegistration) => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({
  initialPackageId,
  onBackToHome,
  onSuccess,
}) => {
  // Current step: 'review' (Pastikan Informasi Paket) or 'form' (Isi Formulir Pasang Baru)
  const [step, setStep] = useState<'review' | 'form'>('review');

  const [selectedPkgId, setSelectedPkgId] = useState<string>(
    initialPackageId || 'stream-75'
  );

  // Form states
  const [fullName, setFullName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('Jakarta Selatan');
  const [fullAddress, setFullAddress] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);

  // Sync when initialPackageId changes
  useEffect(() => {
    if (initialPackageId) {
      setSelectedPkgId(initialPackageId);
    }
  }, [initialPackageId]);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const currentPkg = PACKAGES.find((p) => p.id === selectedPkgId) || PACKAGES[0];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Nama lengkap wajib diisi sesuai KTP';
    if (!whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else if (whatsapp.length < 9) {
      newErrors.whatsapp = 'Nomor WhatsApp tidak valid (minimal 9 digit)';
    }
    if (!fullAddress.trim()) newErrors.fullAddress = 'Alamat lengkap pemasangan wajib diisi';
    if (!agreeTerms) newErrors.agreeTerms = 'Anda harus menyetujui syarat pendaftaran';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildRegistrationObject = (): CustomerRegistration => {
    const quotaInfo = currentPkg.kuotaKeluarga ? ` + Kuota HP ${currentPkg.kuotaKeluarga}` : '';
    const upspeedInfo = currentPkg.upspeedMbps ? ` (Upspeed ${currentPkg.upspeedMbps} Mbps ${currentPkg.upspeedDuration})` : '';

    return {
      id: generateRegistrationId(),
      fullName: fullName.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim() || undefined,
      packageId: currentPkg.id,
      packageName: `${currentPkg.name}${quotaInfo}${upspeedInfo}`,
      speed: currentPkg.speed,
      pricePromo: currentPkg.pricePromo,
      city,
      fullAddress: fullAddress.trim(),
      landmark: landmark.trim() || 'Sesuai titik koordinat / alamat',
      installationDate: 'Ditentukan setelah registrasi & verifikasi',
      installationTimeSlot: 'Sesuai konfirmasi teknisi',
      notes: notes.trim() || undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
  };

  // Submit via WhatsApp langsung
  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const reg = buildRegistrationObject();
    saveRegistration(reg);

    const waUrl = createWhatsAppRegistrationUrl(reg, currentPkg);
    window.open(waUrl, '_blank');
    onSuccess(reg);
  };

  // Submit via Sistem Online Langsung
  const handleSubmitOnline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const reg = buildRegistrationObject();
    saveRegistration(reg);
    onSuccess(reg);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <button
            type="button"
            onClick={() => {
              if (step === 'form') {
                setStep('review');
              } else {
                onBackToHome();
              }
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-red-400" />
            <span>{step === 'form' ? 'Kembali ke Rincian Paket' : 'Kembali ke Beranda'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Pendaftaran Resmi:</span>
            <strong className="text-white font-semibold">Mas Vicky</strong>
          </div>
        </div>

        {/* Multi-step Breadcrumbs / Stepper */}
        <div className="bg-slate-800/80 rounded-2xl p-2.5 sm:p-4 border border-slate-700/80 backdrop-blur-md">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {/* Step 1 Indicator */}
            <div 
              onClick={() => setStep('review')}
              className={`flex items-center gap-2 cursor-pointer shrink-0 ${
                step === 'review' ? 'text-red-400 font-bold' : 'text-slate-400 font-medium'
              }`}
            >
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${
                step === 'review' ? 'bg-red-600 text-white' : 'bg-emerald-500 text-slate-950'
              }`}>
                {step === 'form' ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
              </div>
              <span className="text-xs sm:text-sm">
                <span className="hidden sm:inline">1. Pastikan Paket</span>
                <span className="sm:hidden">1. Paket</span>
              </span>
            </div>

            {/* Step Divider */}
            <div className={`flex-1 h-0.5 mx-2 sm:mx-6 min-w-[16px] ${step === 'form' ? 'bg-emerald-500' : 'bg-slate-700'}`} />

            {/* Step 2 Indicator */}
            <div 
              onClick={() => {
                // Allowed to switch directly if already on form
                if (step === 'review') setStep('form');
              }}
              className={`flex items-center gap-2 cursor-pointer shrink-0 ${
                step === 'form' ? 'text-red-400 font-bold' : 'text-slate-400 font-medium'
              }`}
            >
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${
                step === 'form' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}>
                2
              </div>
              <span className="text-xs sm:text-sm">
                <span className="hidden sm:inline">2. Formulir Pasang</span>
                <span className="sm:hidden">2. Form</span>
              </span>
            </div>
          </div>
        </div>

        {/* STEP 1: REVIEW & PASTIKAN INFORMASI PAKET */}
        {step === 'review' && (
          <div className="space-y-6">
            
            {/* Main Package Review Card */}
            <div className="bg-slate-850 rounded-3xl border border-slate-750 shadow-2xl overflow-hidden">
              
              {/* Header with Category & Selection Switcher */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-red-950/60 via-slate-850 to-slate-850 border-b border-slate-750 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Langkah 1: Konfirmasi Spesifikasi & Tarif</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {currentPkg.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Kategori: <strong className="text-white">{currentPkg.categoryLabel}</strong> • {currentPkg.bestFor}
                  </p>
                </div>

                {/* Change Package Dropdown */}
                <div className="shrink-0 bg-slate-900/90 p-2 rounded-2xl border border-slate-700">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">
                    Ganti Pilihan Paket:
                  </label>
                  <select
                    value={selectedPkgId}
                    onChange={(e) => setSelectedPkgId(e.target.value)}
                    className="py-2 px-3 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  >
                    <optgroup label="--- Internet + Streaming ---">
                      {PACKAGES.filter((p) => p.category === 'internet-streaming').map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} ({formatRupiah(pkg.pricePromo)}/bln)
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="--- Telkomsel One (WiFi + Kuota HP) ---">
                      {PACKAGES.filter((p) => p.category === 'telkomsel-one').map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} ({formatRupiah(pkg.pricePromo)}/bln)
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="--- Paket Khusus (Gamer & Movie) ---">
                      {PACKAGES.filter((p) => p.category === 'gaming' || p.category === 'movie').map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} ({formatRupiah(pkg.pricePromo)}/bln)
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Price & Primary Perks Highlight Grid */}
              <div className="p-6 sm:p-8 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Price Box */}
                  <div className="md:col-span-6 bg-slate-900 rounded-2xl p-6 border border-slate-750 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                        Tarif Berlangganan Promo
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-red-500">
                          {formatRupiah(currentPkg.pricePromo)}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-400 font-medium">/ bulan</span>
                      </div>
                      
                      {/* Normal price strikethrough & PPN warning badge */}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-slate-500 line-through">
                          Harga normal {formatRupiah(currentPkg.priceNormal)}/bln
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Hemat {formatRupiah(currentPkg.priceNormal - currentPkg.pricePromo)}/bln
                        </span>
                      </div>
                    </div>

                    {/* Critical PPN 11% info banner */}
                    <div className="mt-5 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                      <div>
                        <strong className="block font-bold">Penting: Tarif Belum Termasuk PPN 11%</strong>
                        <span className="text-[11px] text-amber-200/90">
                          Sesuai ketentuan pajak resmi, tagihan bulanan akan dikenakan PPN 11% (± {formatRupiah(Math.round(currentPkg.pricePromo * 0.11))}).
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Speed & Special Bonuses Box */}
                  <div className="md:col-span-6 bg-slate-900 rounded-2xl p-6 border border-slate-750 space-y-4">
                    <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
                      Spesifikasi & Kecepatan Jaringan
                    </span>

                    {currentPkg.upspeedMbps ? (
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/50 via-slate-800 to-slate-800 border-2 border-amber-500/60 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-amber-300 font-extrabold flex items-center gap-1.5 uppercase tracking-wider">
                            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
                            Kecepatan Promo (Upspeed):
                          </span>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 shadow-xs">
                            PROMO AKTIF
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl sm:text-4xl font-black text-amber-400">
                            {currentPkg.upspeedMbps} Mbps
                          </span>
                          <span className="text-xs text-slate-400 font-semibold line-through">
                            Normal: {currentPkg.speedLabel}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          Kecepatan melonjak hingga <strong>{currentPkg.upspeedMbps} Mbps</strong> selama <strong>{currentPkg.upspeedDuration}</strong> tanpa biaya tambahan.
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                          <Zap className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs text-slate-400">Kecepatan Standar:</span>
                          <div className="text-2xl font-black text-white">{currentPkg.speedLabel}</div>
                        </div>
                      </div>
                    )}

                    {/* Kuota Keluarga badge if Telkomsel One with clear 30GB vs 50GB toggle */}
                    {currentPkg.category === 'telkomsel-one' && (
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/70 to-slate-900 border-2 border-blue-500/50 text-xs space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-blue-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                            <span>Pilihan Kuota Nomor HP Keluarga:</span>
                          </span>
                          <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-md uppercase">
                            Beda Cuma 10rb!
                          </span>
                        </div>

                        {/* Interactive Toggle for 30GB vs 50GB */}
                        <div className="grid grid-cols-2 gap-2">
                          {(() => {
                            let speed = '75';
                            if (currentPkg.id.includes('100')) speed = '100';
                            if (currentPkg.id.includes('150')) speed = '150';
                            const pkg30Id = `tone-${speed}-30gb`;
                            const pkg50Id = `tone-${speed}-50gb`;
                            const pkg30 = PACKAGES.find(p => p.id === pkg30Id);
                            const pkg50 = PACKAGES.find(p => p.id === pkg50Id);

                            return (
                              <>
                                <button
                                  type="button"
                                  onClick={() => setSelectedPkgId(pkg30Id)}
                                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                    currentPkg.kuotaKeluarga === '30 GB'
                                      ? 'bg-blue-600/40 border-blue-400 ring-2 ring-blue-400/60'
                                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                                  }`}
                                >
                                  <span className="text-xs font-bold text-slate-200 block">📱 Kuota 30 GB</span>
                                  <span className="text-sm font-black text-white block mt-0.5">
                                    {pkg30 ? formatRupiah(pkg30.pricePromo) : 'Rp 280.000'}
                                  </span>
                                  <span className="text-[10px] text-slate-400">/bln belum PPN</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setSelectedPkgId(pkg50Id)}
                                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                                    currentPkg.kuotaKeluarga === '50 GB'
                                      ? 'bg-emerald-600/40 border-emerald-400 ring-2 ring-emerald-400/60'
                                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                                  }`}
                                >
                                  <div className="absolute -top-2 right-2 px-1.5 py-0.2 bg-amber-400 text-slate-950 font-black text-[9px] rounded-sm uppercase">
                                    Paling Cuan
                                  </div>
                                  <span className="text-xs font-bold text-emerald-300 block">📱 Kuota 50 GB (+20GB)</span>
                                  <span className="text-sm font-black text-white block mt-0.5">
                                    {pkg50 ? formatRupiah(pkg50.pricePromo) : 'Rp 290.000'}
                                  </span>
                                  <span className="text-[10px] text-emerald-300 font-bold">Selisih cuma 10rb!</span>
                                </button>
                              </>
                            );
                          })()}
                        </div>

                        <p className="text-[11px] text-slate-300">
                          Bisa dibagikan ke beberapa nomor Telkomsel prabayar/pascabayar sekeluarga dalam satu tagihan.
                        </p>
                      </div>
                    )}
                  </div>

                </div>

                {/* Features & Facilities Checklist */}
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-750 space-y-4">
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Fasilitas Resmi Termasuk dalam Paket Ini:</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {currentPkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Streaming OTT apps if any with real logos */}
                  {currentPkg.ottBonus && currentPkg.ottBonus.length > 0 && (
                    <div className="pt-4 border-t border-slate-800">
                      <span className="text-xs font-bold text-slate-300 block mb-2.5">
                        Logo Layanan Streaming Resmi Termasuk:
                      </span>
                      <StreamingBenefitBadges apps={currentPkg.ottBonus} size="lg" variant="dark" showLabel={true} />
                    </div>
                  )}

                  {/* Recommendation notice */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Rekomendasi Kapasitas: <strong className="text-slate-200">{currentPkg.deviceCount}</strong></span>
                    <span className="text-emerald-400 font-semibold">100% Fiber Optic Unlimited</span>
                  </div>
                </div>

                {/* Next Button: Proceed to Form */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={onBackToHome}
                    className="w-full sm:w-auto px-4 py-2.5 sm:py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors cursor-pointer"
                  >
                    Pilih Paket Lainnya
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-600 via-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Lanjut ke Formulir Pasang</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* STEP 2: FORMULIR PENDAFTARAN PASANG BARU */}
        {step === 'form' && (
          <div className="bg-slate-850 rounded-3xl border border-slate-750 shadow-2xl overflow-hidden">
            
            {/* Header Form */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-red-950/70 via-slate-850 to-slate-850 border-b border-slate-750">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Langkah 2: Lengkapi Data Pemasangan</span>
                </div>
                
                <button
                  type="button"
                  onClick={() => setStep('review')}
                  className="text-xs text-red-400 hover:text-red-300 underline font-semibold"
                >
                  Ubah / Cek Paket Kembali
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Formulir Pasang Baru IndiHome
              </h2>
              
              {/* Summary of chosen package */}
              <div className="mt-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-750 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] text-slate-400 block">Paket yang dipilih:</span>
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{currentPkg.name}</span>
                    {currentPkg.kuotaKeluarga && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        📱 Kuota HP: {currentPkg.kuotaKeluarga}
                      </span>
                    )}
                  </span>
                  {currentPkg.upspeedMbps && (
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-xs font-black text-amber-400 bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-amber-400" />
                        ⚡ {currentPkg.upspeedMbps} Mbps ({currentPkg.upspeedDuration})
                      </span>
                      <span className="text-[11px] text-slate-400 line-through">
                        {currentPkg.speedLabel}
                      </span>
                    </div>
                  )}
                  {currentPkg.ottBonus && currentPkg.ottBonus.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-800">
                      <StreamingBenefitBadges apps={currentPkg.ottBonus} size="sm" variant="dark" showLabel={true} />
                    </div>
                  )}
                </div>
                <div className="sm:text-right">
                  <span className="text-base font-extrabold text-red-400">
                    {formatRupiah(currentPkg.pricePromo)}/bln
                  </span>
                  <span className="text-[10px] text-amber-300 font-bold block">*Belum termasuk PPN 11%</span>
                </div>
              </div>
            </div>

            {/* Form inputs */}
            <form onSubmit={handleSendWhatsApp} className="p-6 sm:p-8 space-y-6">
              
              {/* Section 1: Customer Identity */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-750">
                  <User className="w-3.5 h-3.5 text-red-400" />
                  <span>1. Identitas Calon Pelanggan (Sesuai KTP)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Nama Lengkap Sesuai KTP <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Budi Santoso"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2.5 bg-slate-900 border rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-red-500 focus:outline-hidden ${
                          errors.fullName ? 'border-red-500' : 'border-slate-700'
                        }`}
                      />
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {errors.fullName && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Nomor WhatsApp Aktif <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2.5 bg-slate-900 border rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-red-500 focus:outline-hidden ${
                          errors.whatsapp ? 'border-red-500' : 'border-slate-700'
                        }`}
                      />
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Untuk konfirmasi status registrasi & koordinasi teknisi
                    </span>
                    {errors.whatsapp && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.whatsapp}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Alamat Email Aktif <span className="text-slate-400 font-normal">(Opsional untuk E-Bill tagihan)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Contoh: budi.santoso@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                      />
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Installation Address */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-750">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>2. Lokasi & Alamat Pemasangan Fiber Optik</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Kota / Wilayah Pemasangan <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                    >
                      {INDONESIAN_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Patokan Lokasi Terdekat <span className="text-slate-400 font-normal">(Opsional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Dekat Masjid Al-Hidayah / Blok B No. 4"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Alamat Lengkap (Jalan, RT/RW, No. Rumah, Kelurahan, Kecamatan) <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Contoh: Jl. Margonda Raya No. 45 RT 02 / RW 05, Kel. Pondok Cina, Kec. Beji (Patokan pagar rumah warna putih)"
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      className={`w-full py-2.5 px-3 bg-slate-900 border rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-red-500 focus:outline-hidden ${
                        errors.fullAddress ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    {errors.fullAddress && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.fullAddress}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Notes & Procedure Notice */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-750">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  <span>3. Catatan Tambahan & Prosedur Jadwal Pasang</span>
                </h4>

                {/* Important procedure notice */}
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed space-y-1">
                    <strong className="text-amber-300 block font-bold">Prosedur Pemilihan Jadwal Kedatangan Teknisi:</strong>
                    <p className="text-[11px] text-amber-200/90">
                      Jadwal pemasangan akan Anda tentukan <strong>setelah formulir ini terkirim dan data/foto identitas terunggah</strong> untuk verifikasi sistem resmi Telkom. Teknisi tidak akan datang mendadak tanpa konfirmasi kesiapan Anda terlebih dahulu.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Catatan Tambahan untuk Sales Mas Vicky <span className="text-slate-400 font-normal">(Opsional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Butuh kabel ekstra / rumah masuk gang / tolong hubungi nomor telepon jika WA tidak merespon"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Terms & Agreement Checkbox */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-750 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded-sm border-slate-700 bg-slate-950 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed">
                    Saya menyatakan data yang diisi adalah benar untuk pengajuan pemasangan baru IndiHome by Telkomsel dan memahami bahwa <strong>pembayaran tagihan resmi hanya dilakukan setelah internet aktif terpasang</strong>.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-[11px] text-red-400 pl-7">{errors.agreeTerms}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span>Kirim Formulir via WhatsApp Sales</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitOnline}
                  className="w-full sm:w-auto py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 shrink-0" />
                  <span>Daftar via Web Saja</span>
                </button>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400">
                  🔒 Seluruh data terjamin kerahasiaannya dan diproses resmi oleh mitra sales terverifikasi.
                </span>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
