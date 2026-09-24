import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageCircle, 
  CheckCircle2, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { PACKAGES, INDONESIAN_CITIES } from '../data/packages';
import { CustomerRegistration, InternetPackage } from '../types';
import { 
  formatRupiah, 
  generateRegistrationId, 
  createWhatsAppRegistrationUrl, 
  saveRegistration 
} from '../utils/helpers';
import { StreamingBenefitBadges } from './StreamingBenefitBadges';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
  onSuccess: (registration: CustomerRegistration) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialPackageId,
  onSuccess,
}) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>(
    initialPackageId || 'stream-75'
  );
  const [fullName, setFullName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('Jakarta Selatan');
  const [fullAddress, setFullAddress] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  // Preferensi waktu dihapus: jadwal dipilih setelah registrasi & verifikasi data
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialPackageId) {
      setSelectedPkgId(initialPackageId);
    }
  }, [initialPackageId]);

  if (!isOpen) return null;

  const currentPkg = PACKAGES.find((p) => p.id === selectedPkgId) || PACKAGES[0];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Nama lengkap wajib diisi sesuai KTP';
    if (!whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else if (whatsapp.length < 9) {
      newErrors.whatsapp = 'Nomor WhatsApp tidak valid';
    }
    if (!fullAddress.trim()) newErrors.fullAddress = 'Alamat pemasangan wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildRegistrationObject = (): CustomerRegistration => {
    return {
      id: generateRegistrationId(),
      fullName: fullName.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim() || undefined,
      packageId: currentPkg.id,
      packageName: currentPkg.name,
      speed: currentPkg.speed,
      pricePromo: currentPkg.pricePromo,
      city,
      fullAddress: fullAddress.trim(),
      landmark: landmark.trim() || 'Sesuai alamat',
      installationDate: 'Ditentukan setelah registrasi & verifikasi',
      installationTimeSlot: 'Sesuai konfirmasi teknisi',
      notes: notes.trim() || undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
  };

  // Option 1: Send via WhatsApp immediately
  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const reg = buildRegistrationObject();
    saveRegistration(reg);

    const waUrl = createWhatsAppRegistrationUrl(reg, currentPkg);
    window.open(waUrl, '_blank');
    onSuccess(reg);
  };

  // Option 2: Submit directly online
  const handleSubmitOnline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const reg = buildRegistrationObject();
    saveRegistration(reg);
    onSuccess(reg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-600 to-rose-700 text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-red-200 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Formulir Pendaftaran Resmi IndiHome</span>
          </div>

          <h3 id="modal-title" className="text-xl sm:text-2xl font-extrabold text-white">
            Formulir Pasang Baru IndiHome
          </h3>
          <p className="text-xs sm:text-sm text-red-150 mt-1">
            Sales Penanggung Jawab: <strong>Mas Vicky</strong>. Tanpa antre, proses cepat 1x24 jam!
          </p>
        </div>

        {/* Selected Package Banner */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 sm:px-6">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Pilihan Paket Internet:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-7">
              <select
                value={selectedPkgId}
                onChange={(e) => setSelectedPkgId(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <optgroup label="--- Internet + Streaming ---">
                  {PACKAGES.filter((p) => p.category === 'internet-streaming').map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} - {formatRupiah(pkg.pricePromo)}/bln
                    </option>
                  ))}
                </optgroup>
                <optgroup label="--- Telkomsel One (WiFi + Kuota HP) ---">
                  {PACKAGES.filter((p) => p.category === 'telkomsel-one').map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} - {formatRupiah(pkg.pricePromo)}/bln
                    </option>
                  ))}
                </optgroup>
                <optgroup label="--- Paket Khusus (Gamer & Movie) ---">
                  {PACKAGES.filter((p) => p.category === 'gaming' || p.category === 'movie').map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} - {formatRupiah(pkg.pricePromo)}/bln
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="sm:col-span-5 bg-red-50 border border-red-200 rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-red-600 font-bold block uppercase tracking-wide">Harga Promo Paket:</span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-base sm:text-lg font-black text-red-700">
                  {formatRupiah(currentPkg.pricePromo)}
                </span>
                <span className="text-[11px] text-slate-600">/ bulan</span>
              </div>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-extrabold">
                *Harga belum termasuk PPN 11%
              </span>
            </div>
          </div>

          {/* Streaming Logos in Modal */}
          {currentPkg.ottBonus && currentPkg.ottBonus.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-slate-700">
                Layanan Streaming Termasuk:
              </span>
              <StreamingBenefitBadges apps={currentPkg.ottBonus} size="sm" variant="light" showLabel={true} />
            </div>
          )}
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSendWhatsApp} className="p-5 sm:p-6 space-y-5 max-h-[68vh] overflow-y-auto">
          
          {/* Section 1: Customer Data */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-150">
              <User className="w-3.5 h-3.5 text-red-600" />
              <span>1. Data Calon Pelanggan (Sesuai KTP)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Sesuai KTP <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-red-500 ${
                      errors.fullName ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-red-500 ${
                      errors.whatsapp ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.whatsapp && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.whatsapp}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Email Aktif (Untuk Tagihan e-Billing) <span className="text-slate-400 font-normal">(Opsional)</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="contoh@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-red-500"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Installation Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-150">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>2. Alamat Lengkap Pemasangan</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kota / Kabupaten <span className="text-red-500">*</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-red-500"
                >
                  {INDONESIAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patokan Rumah / Shareloc Maps <span className="text-slate-400 font-normal">(Disarankan)</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pagar hitam, samping masjid Al-Ikhlas"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Lengkap (Nama Jalan, No Rumah, RT/RW, Kelurahan, Kecamatan) <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Contoh: Jl. Anggrek No. 24, RT 03/RW 05, Kel. Tebet Barat, Kec. Tebet"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className={`w-full py-2 px-3 bg-slate-50 border rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-red-500 ${
                    errors.fullAddress ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.fullAddress && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.fullAddress}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Notes & Installation Schedule Notice */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-150">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>3. Catatan Tambahan & Prosedur Jadwal Pasang</span>
            </h4>

            {/* Info notice about schedule chosen after registration & upload */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed space-y-0.5">
                <span className="font-bold text-amber-900 block">Informasi Jadwal Pemasangan:</span>
                <p className="text-[11px] text-amber-900/90">
                  Jadwal kedatangan teknisi baru dapat Anda tentukan <strong>setelah formulir ini terkirim dan data/foto identitas terunggah</strong> untuk verifikasi sistem Telkom.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Catatan Tambahan untuk Sales Mas Vicky <span className="text-slate-400 font-normal">(Opsional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Contoh: Tolong bawa kabel ekstra / rumah masuk gang pagar abu-abu / hubungi via telepon bila WA slow response"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Submission Buttons */}
          <div className="pt-4 border-t border-slate-200 space-y-2.5">
            
            {/* WhatsApp Primary Submit */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 group"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>Kirim Pendaftaran via WhatsApp Otomatis</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Direct Online Alternative Submit */}
            <button
              type="button"
              onClick={handleSubmitOnline}
              className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Formulir & Dapatkan Nomor Registrasi</span>
            </button>

            <p className="text-center text-[11px] text-slate-500 pt-1">
              Data Anda aman dan langsung diterima oleh Sales Resmi Vicky untuk pengecekan ODP.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
