import { CustomerRegistration, InternetPackage } from '../types';
import { SALES_AGENT_INFO } from '../data/packages';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateRegistrationId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const dateStr = new Date().toISOString().slice(2, 7).replace('-', '');
  return `VK-IND-${dateStr}-${randomNum}`;
}

export function createWhatsAppRegistrationUrl(reg: Partial<CustomerRegistration>, pkg?: InternetPackage): string {
  const phone = SALES_AGENT_INFO.whatsappNumber;
  const packageName = pkg?.name || reg.packageName || 'Paket IndiHome';
  const price = pkg ? formatRupiah(pkg.pricePromo) : '';

  const messageLines = [
    `*HALO MAS VICKY (SALES RESMI INDIHOME)*`,
    `Saya ingin mendaftar pasang baru IndiHome via website *${SALES_AGENT_INFO.domainName}*:`,
    ``,
    `📋 *DATA PENDAFTARAN:*`,
    `• ID Registrasi: ${reg.id || generateRegistrationId()}`,
    `• Nama Lengkap: ${reg.fullName || '-'}`,
    `• No. WhatsApp: ${reg.whatsapp || '-'}`,
    reg.email ? `• Email: ${reg.email}` : null,
    `• Pilihan Paket: *${packageName}* (${price}/bulan)`,
    `• Alamat Pemasangan: ${reg.fullAddress || '-'}`,
    `• Kota/Kabupaten: ${reg.city || '-'}`,
    reg.landmark ? `• Patokan Rumah/Shareloc: ${reg.landmark}` : null,
    reg.installationDate ? `• Rencana Pasang: ${reg.installationDate} (${reg.installationTimeSlot || 'Pagi'})` : null,
    reg.notes ? `• Catatan Khusus: ${reg.notes}` : null,
    ``,
    `Mohon dibantu cek ketersediaan port ODP tiang dan proses pendaftarannya ya Mas Vicky. Terima kasih! 🙏`,
  ].filter(Boolean).join('\n');

  return `https://wa.me/${phone}?text=${encodeURIComponent(messageLines)}`;
}

export function createWhatsAppConsultUrl(topic: string = 'Konsultasi Pasang Baru'): string {
  const phone = SALES_AGENT_INFO.whatsappNumber;
  const message = `Halo Mas Vicky (Sales Resmi IndiHome Pusat).\n\nSaya ingin konsultasi mengenai: *${topic}*.\nMohon info rekomendasi paket terbaik & promo biaya pasang di area saya ya mas. Terima kasih!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppCustomUrl(message: string): string {
  const phone = SALES_AGENT_INFO.whatsappNumber;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppCoverageUrl(address: string, city?: string): string {
  const phone = SALES_AGENT_INFO.whatsappNumber;
  const addressText = address.trim() || 'Alamat belum diisi';
  const cityLine = city ? `\n• Kota/Kabupaten: ${city}` : '';
  const message = [
    `*HALO MAS VICKY (SALES RESMI TELKOM / INDIHOME)*`,
    `Saya ingin cek ketersediaan jaringan Fiber Optik & slot tiang ODP di alamat saya:`,
    ``,
    `📍 *Alamat Detail / Shareloc:*`,
    `${addressText}${cityLine}`,
    ``,
    `Mohon dibantu cek ketersediaan jaringan dan slot port ODP terdekat ya mas. Terima kasih! 🙏`,
  ].join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const STORAGE_KEY = 'vicky_indihome_registrations';

export function getSavedRegistrations(): CustomerRegistration[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveRegistration(registration: CustomerRegistration): void {
  try {
    const current = getSavedRegistrations();
    const updated = [registration, ...current.filter((item) => item.id !== registration.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 10)));
  } catch (err) {
    console.error('Error saving registration locally', err);
  }
}
