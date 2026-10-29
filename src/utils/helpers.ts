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

export function createWhatsAppConsultUrl(
  topicOrOptions: string | { source?: string; note?: string } = 'Konsultasi Pasang Baru',
  phone?: string
): string {
  const targetPhone = phone || SALES_AGENT_INFO.whatsappNumber;
  let message = '';
  if (typeof topicOrOptions === 'object' && topicOrOptions !== null) {
    const note = topicOrOptions.note || 'Saya ingin konsultasi rekomendasi paket IndiHome terbaik.';
    const source = topicOrOptions.source ? `\n(Sumber: ${topicOrOptions.source})` : '';
    message = `Halo Mas Vicky (Sales Resmi IndiHome Pusat).\n\n${note}${source}\nMohon info rekomendasi paket & promo biaya pasang di area saya ya mas. Terima kasih!`;
  } else {
    message = `Halo Mas Vicky (Sales Resmi IndiHome Pusat).\n\nSaya ingin konsultasi mengenai: *${topicOrOptions}*.\nMohon info rekomendasi paket terbaik & promo biaya pasang di area saya ya mas. Terima kasih!`;
  }
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppCustomUrl(message: string, phone?: string): string {
  const targetPhone = phone || SALES_AGENT_INFO.whatsappNumber;
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
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

/**
 * Track Meta Pixel standard and custom events (e.g., PageView, Lead, Contact)
 */
export function trackMetaPixel(eventName: string, params?: Record<string, any>): void {
  try {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      if (params) {
        (window as any).fbq('track', eventName, params);
      } else {
        (window as any).fbq('track', eventName);
      }
    }
  } catch (err) {
    console.debug('Meta Pixel tracking skipped or blocked', err);
  }
}

export const GOOGLE_ADS_ID = 'AW-18516304640';
export const GOOGLE_ADS_KONTAK_CONVERSION = 'AW-18516304640/ZtNpCPmUoKgdEIDGof1E';

/**
 * Track Google Ads standard conversion or custom event via gtag
 */
export function trackGoogleAds(eventName: string, params?: Record<string, any>): void {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      if (params) {
        (window as any).gtag('event', eventName, params);
      } else {
        (window as any).gtag('event', eventName);
      }
    }
  } catch (err) {
    console.debug('Google Ads tracking skipped or blocked', err);
  }
}

/**
 * Trigger Kontak conversion event snippet in Google Ads
 */
export function trackGoogleAdsContactConversion(extraParams?: Record<string, any>): void {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_KONTAK_CONVERSION,
        ...extraParams,
      });
    }
  } catch (err) {
    console.debug('Google Ads contact conversion skipped', err);
  }
}



