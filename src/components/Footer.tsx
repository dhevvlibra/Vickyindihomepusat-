import React from 'react';
import { Wifi, ShieldCheck, Clock, MapPin, Phone } from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';

interface FooterProps {
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegister }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs pt-16 pb-24 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-bold">
                <Wifi className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                vicky<span className="text-red-500">indihome</span>pusat
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Layanan pendaftaran pasang baru internet IndiHome by Telkomsel resmi dan terpercaya. Nikmati koneksi 100% serat optik berkecepatan tinggi dengan proses registrasi kilat dan bantuan pengawalan teknisi hingga tuntas.
            </p>

            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-[11px]">
                Mitra Resmi IndiHome by Telkomsel
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Kategori Paket
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#katalog-paket" className="hover:text-white transition-colors">
                  1P Internet Only (30 - 200 Mbps)
                </a>
              </li>
              <li>
                <a href="#katalog-paket" className="hover:text-white transition-colors">
                  2P Internet + TV Kabel Android 4K
                </a>
              </li>
              <li>
                <a href="#katalog-paket" className="hover:text-white transition-colors">
                  2P Internet + Bebas Nelpon Rumah
                </a>
              </li>
              <li>
                <a href="#katalog-paket" className="hover:text-white transition-colors">
                  3P Komplit Triple Play
                </a>
              </li>
              <li>
                <a href="#katalog-paket" className="hover:text-white transition-colors">
                  Paket Gamer Pro (Low Latency)
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Info & Navigation */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#promo" className="hover:text-white transition-colors">
                  Promo Biaya Pasang 70%
                </a>
              </li>
              <li>
                <a href="#kalkulator" className="hover:text-white transition-colors">
                  Kalkulator Kebutuhan Speed
                </a>
              </li>
              <li>
                <a href="#cek-jangkauan" className="hover:text-white transition-colors">
                  Cek Ketersediaan Jaringan ODP
                </a>
              </li>
              <li>
                <a href="#cara-pasang" className="hover:text-white transition-colors">
                  Syarat & 4 Langkah Pasang
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ & Syarat Ketentuan
                </a>
              </li>
              <li>
                <a href="#testimoni" className="hover:text-white transition-colors">
                  Testimoni Pelanggan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Sales Vicky */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Kontak Sales Resmi
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{SALES_AGENT_INFO.workingHours}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{SALES_AGENT_INFO.serviceArea}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <a
                  href={`tel:${SALES_AGENT_INFO.whatsappNumber}`}
                  className="hover:text-white"
                >
                  {SALES_AGENT_INFO.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 space-y-3 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong className="text-slate-400">Disclaimer Resmi:</strong> Website <span className="font-mono text-slate-300">vickyindihomepusat</span> dikelola oleh Sales Partner & Mitra Eksekutif Resmi IndiHome by Telkomsel. Seluruh transaksi biaya pasang baru resmi dan tagihan bulanan dibayarkan langsung melalui saluran resmi PT Telkom Indonesia Tbk (bukan ke rekening pribadi). Logo IndiHome dan Telkomsel adalah hak milik terdaftar PT Telkom Indonesia Tbk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-slate-500">
            <p>© 2026 vickyindihomepusat. Hak Cipta Dilindungi Undang-Undang.</p>
            <p>Layanan Pasang Baru IndiHome Seluruh Indonesia.</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
