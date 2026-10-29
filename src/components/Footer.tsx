import React from 'react';
import { Wifi, ShieldCheck, Clock, MapPin, Phone, ArrowRight } from 'lucide-react';
import { SALES_AGENT_INFO } from '../data/packages';
import { Link } from '../router/Router';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs pt-16 pb-24 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-bold shadow-md">
                <Wifi className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                vicky<span className="text-red-500">indihome</span>pusat
              </span>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Layanan pendaftaran pasang baru internet IndiHome by Telkomsel resmi dan terpercaya. Nikmati koneksi 100% serat optik berkecepatan tinggi dengan proses registrasi kilat dan bantuan pengawalan teknisi hingga tuntas.
            </p>

            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-[11px]">
                Mitra Resmi IndiHome by Telkomsel Indonesia
              </span>
            </div>

            <div className="pt-2">
              <Link
                to="/daftar"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                <span>Daftar Pasang Baru Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Halaman Fitur Utama */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Halaman Fitur
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/paket" className="hover:text-white transition-colors">
                  Katalog Paket Internet
                </Link>
              </li>
              <li>
                <Link to="/cek-area" className="hover:text-white transition-colors">
                  Cek Jangkauan Tiang ODP
                </Link>
              </li>
              <li>
                <Link to="/kalkulator" className="hover:text-white transition-colors">
                  Kalkulator Kecepatan WiFi
                </Link>
              </li>
              <li>
                <Link to="/promo" className="hover:text-white transition-colors">
                  Promo Spesial & Paket 148K
                </Link>
              </li>
              <li>
                <Link to="/alur-pasang" className="hover:text-white transition-colors">
                  Syarat & Alur Pemasangan
                </Link>
              </li>
              <li>
                <Link to="/tentang-vicky" className="hover:text-white transition-colors">
                  Profil & Kredensial Vicky
                </Link>
              </li>
              <li>
                <Link to="/testimoni" className="hover:text-white transition-colors">
                  Testimoni Pelanggan
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Pusat Bantuan & FAQ
                </Link>
              </li>
              <li>
                <Link to="/riwayat" className="hover:text-white transition-colors">
                  Cek Status Pendaftaran
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Info & Blog Guides */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Blog & Edukasi SEO
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog/biaya-pasang-baru-indihome-2026" className="hover:text-white transition-colors block">
                  Biaya Pasang Baru 2026 (Promo 99K)
                </Link>
              </li>
              <li>
                <Link to="/blog/perbedaan-telkomsel-one-dan-indihome-reguler" className="hover:text-white transition-colors block">
                  Telkomsel One vs IndiHome Reguler
                </Link>
              </li>
              <li>
                <Link to="/blog/review-paket-eznet-telkomsel-148k" className="hover:text-white transition-colors block">
                  Review Paket 148K Bebas Biaya PSB
                </Link>
              </li>
              <li>
                <Link to="/blog/tips-mengatasi-wifi-lemot-di-rumah" className="hover:text-white transition-colors block">
                  5 Tips Mengatasi WiFi Lemot
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-red-400 font-bold hover:text-red-300 transition-colors inline-flex items-center gap-1">
                  Semua Artikel & Panduan →
                </Link>
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
                  className="hover:text-white font-mono"
                >
                  {SALES_AGENT_INFO.whatsappDisplay}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${SALES_AGENT_INFO.whatsappNumber}?text=Halo%20Mas%20Vicky,%20saya%20ingin%20konsultasi%20pasang%20IndiHome`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-all"
                >
                  <span>Chat WhatsApp Mas Vicky</span>
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
