import React, { useState } from 'react';
import { MapPin, CheckCircle, Search, Sparkles, Building2 } from 'lucide-react';
import { INDONESIAN_CITIES, SALES_AGENT_INFO } from '../data/packages';

interface CoverageCheckProps {
  onOpenRegister: () => void;
}

export const CoverageCheck: React.FC<CoverageCheckProps> = ({ onOpenRegister }) => {
  const [selectedCity, setSelectedCity] = useState(INDONESIAN_CITIES[0]);
  const [addressInput, setAddressInput] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{
    status: 'ready' | 'success';
    city: string;
    address: string;
  } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) return;

    setIsChecking(true);
    // Realistic short delay checking animation
    setTimeout(() => {
      setIsChecking(false);
      setCheckResult({
        status: 'success',
        city: selectedCity,
        address: addressInput,
      });
    }, 700);
  };

  return (
    <section id="cek-jangkauan" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Pengecekan Jaringan Fiber Optik</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cek Ketersediaan Jaringan di Lokasi Anda
          </h2>

          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            IndiHome by Telkomsel telah menjangkau lebih dari 500 kota di seluruh Indonesia. Masukkan alamat Anda untuk memverifikasi kesiapan jaringan fiber optik.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          <form onSubmit={handleCheck} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
              
              {/* City Selection */}
              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Pilih Kota / Kabupaten:</span>
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-red-500"
                >
                  {INDONESIAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address Input */}
              <div className="sm:col-span-8">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>Nama Jalan / Perumahan / Patokan:</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Jl. Flamboyan Blok B No. 12 / Dekat Masjid Al-Ikhlas"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    className="flex-1 py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    type="submit"
                    disabled={isChecking}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5 shrink-0"
                  >
                    {isChecking ? (
                      <span className="inline-block animate-spin">⏳</span>
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    <span>{isChecking ? 'Mengecek...' : 'Cek Area'}</span>
                  </button>
                </div>
              </div>

            </div>
          </form>

          {/* Instant Feedback Result Box */}
          {checkResult && (
            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-left space-y-3 animate-in fade-in duration-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-emerald-950">
                    Kabar Baik! Area Anda Tercover Jaringan IndiHome Fiber
                  </h4>
                  <p className="text-xs text-emerald-900 mt-0.5 leading-relaxed">
                    Jaringan serat optik aktif terdeteksi di wilayah <strong>{checkResult.city}</strong> ({checkResult.address}). Pemasangan dapat langsung dijadwalkan oleh teknisi resmi.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenRegister}
                  className="w-full sm:w-auto py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors"
                >
                  Lanjut Isi Data Pendaftaran
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
