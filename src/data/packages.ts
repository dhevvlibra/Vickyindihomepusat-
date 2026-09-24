import { PackageItem, TelkomselOneTier, InternetPackage, FaqItem, Testimonial } from '../types';

export const SALES_AGENT_INFO = {
  name: 'Vicky',
  role: 'Senior Sales Executive & Partner Resmi IndiHome',
  domainName: 'vickyindihomepusat',
  whatsappNumber: '6281234567890',
  whatsappDisplay: '0812-3456-7890',
  telegramHandle: '@vickyindihome',
  email: 'vicky.sales@indihomepusat.com',
  workingHours: 'Setiap Hari: 07.30 - 22.00 WIB',
  serviceArea: 'Seluruh Indonesia (Pusat, Jabodetabek, Jawa, Sumatera, Bali, Kalimantan, Sulawesi & Papua)',
  rating: 4.9,
  totalInstalled: 2450,
  photoUrl: 'https://cdn.phototourl.com/member/2026-09-24-b599813c-d6fb-4e87-9775-178f6841ee21.jpg',
};

// -------------------------------------------------------------
// 1. TELKOMSEL ONE DYNAMIC TIERS (WiFi + Kuota HP Keluarga + Streaming)
// -------------------------------------------------------------
export const TELKOMSEL_ONE_TIERS: TelkomselOneTier[] = [
  {
    id: 'tone-75',
    name: 'Telkomsel One 75 Mbps',
    speedMbps: 75,
    upspeedMbps: 150,
    upspeedDuration: '3 Bulan Pertama',
    priceNote: 'Belum termasuk PPN 11%',
    idealFor: 'Keluarga modern: WiFi rumah kencang upspeed 150 Mbps + kuota nomor HP sekeluarga dalam 1 tagihan hemat.',
    deviceRecommendation: 'Optimal untuk 4 - 6 perangkat di rumah + HP keluarga',
    isBestSeller: true,
    tag: 'Pilihan Paling Cuan (Selisih Cuma 10rb)',
    includedApps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    options: {
      '30 GB': {
        monthlyPrice: 280000,
        formattedPrice: 'Rp 280.000',
        kuotaKeluarga: '30 GB',
        ctaMessage:
          'Halo, saya mau daftar Telkomsel One Dynamic 75 Mbps (upspeed 150 Mbps 3 bln) + Kuota Keluarga 30 GB (Rp 280.000/bln belum PPN). Mohon info ketersediaan jaringan di alamat saya.',
      },
      '50 GB': {
        monthlyPrice: 290000,
        formattedPrice: 'Rp 290.000',
        kuotaKeluarga: '50 GB',
        ctaMessage:
          'Halo, saya mau ambil promo Telkomsel One Dynamic 75 Mbps (upspeed 150 Mbps 3 bln) + Kuota Keluarga 50 GB (Rp 290.000/bln belum PPN). Selisih cuma 10rb langsung dapet 50GB!',
      },
    },
    perks: [
      'Upspeed Promo: Kecepatan lonjak ke 150 Mbps selama 3 bulan!',
      'Bonus Langganan Streaming: Vision+, Prime Video, Viu, & MaxStream',
      'Internet Rumah Fiber Optic Unlimited Tanpa Batas Kuota',
      'Kuota bersama keluarga untuk nomor Telkomsel prabayar/pascabayar',
    ],
  },
  {
    id: 'tone-100',
    name: 'Telkomsel One 100 Mbps',
    speedMbps: 100,
    upspeedMbps: 200,
    upspeedDuration: '6 Bulan Penuh',
    priceNote: 'Belum termasuk PPN 11%',
    idealFor: 'Keluarga produktif dengan kebutuhan streaming 4K, video conference, dan internetan mobile tanpa cemas.',
    deviceRecommendation: 'Optimal untuk 6 - 10 perangkat di rumah + HP keluarga',
    isBestSeller: false,
    tag: 'Upspeed 6 Bulan',
    includedApps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    options: {
      '30 GB': {
        monthlyPrice: 310000,
        formattedPrice: 'Rp 310.000',
        kuotaKeluarga: '30 GB',
        ctaMessage:
          'Halo, saya mau daftar Telkomsel One Dynamic 100 Mbps (upspeed 200 Mbps 6 bln) + Kuota Keluarga 30 GB (Rp 310.000/bln belum PPN).',
      },
      '50 GB': {
        monthlyPrice: 320000,
        formattedPrice: 'Rp 320.000',
        kuotaKeluarga: '50 GB',
        ctaMessage:
          'Halo, saya mau ambil Telkomsel One Dynamic 100 Mbps (upspeed 200 Mbps 6 bln) + Kuota Keluarga 50 GB (Rp 320.000/bln belum PPN). Selisih 10rb dapet 50GB!',
      },
    },
    perks: [
      'Upspeed Promo: Kecepatan lonjak ke 200 Mbps selama 6 bulan penuh!',
      'Bonus Langganan Streaming: Vision+, Prime Video, Viu, & MaxStream',
      'Internet Fiber Optic berkecepatan tinggi tanpa hambatan',
      'Kuota bersama keluarga untuk nomor Telkomsel',
    ],
  },
  {
    id: 'tone-150',
    name: 'Telkomsel One 150 Mbps',
    speedMbps: 150,
    upspeedMbps: 300,
    upspeedDuration: '6 Bulan Penuh',
    priceNote: 'Belum termasuk PPN 11%',
    idealFor: 'Performa tertinggi untuk keluarga besar, smart home luas, multitasking kerja remote & hiburan intensif.',
    deviceRecommendation: 'Optimal untuk 10 - 15+ perangkat di rumah + HP keluarga',
    isBestSeller: false,
    tag: 'Upspeed 300 Mbps',
    includedApps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    options: {
      '30 GB': {
        monthlyPrice: 340000,
        formattedPrice: 'Rp 340.000',
        kuotaKeluarga: '30 GB',
        ctaMessage:
          'Halo, saya tertarik Telkomsel One Dynamic 150 Mbps (upspeed 300 Mbps 6 bln) + Kuota Keluarga 30 GB (Rp 340.000/bln belum PPN).',
      },
      '50 GB': {
        monthlyPrice: 350000,
        formattedPrice: 'Rp 350.000',
        kuotaKeluarga: '50 GB',
        ctaMessage:
          'Halo, saya mau paket tertinggi Telkomsel One Dynamic 150 Mbps (upspeed 300 Mbps 6 bln) + Kuota Keluarga 50 GB (Rp 350.000/bln belum PPN).',
      },
    },
    perks: [
      'Upspeed Promo: Kecepatan lonjak ke 300 Mbps selama 6 bulan!',
      'Bonus Langganan Streaming: Vision+, Prime Video, Viu, & MaxStream',
      'Koneksi Premium 150-300 Mbps Full Fiber Optic',
      'Kuota keluarga 30 GB atau 50 GB per bulan',
    ],
  },
];

// -------------------------------------------------------------
// 2. ALL PACKAGES CATALOG (Real Data Sesuai Permintaan User)
// -------------------------------------------------------------
export const PACKAGES_DATA: PackageItem[] = [
  // 1. INTERNET ONLY + STREAMING (Vision+, Prime Video, Viu, MaxStream)
  {
    id: 'stream-75',
    name: 'Paket Internet Streaming 75 Mbps',
    speedMbps: 75,
    upspeedMbps: 200,
    upspeedDuration: '3 Bulan Pertama',
    category: 'internet-streaming',
    categoryLabel: 'Internet Only + Streaming',
    monthlyPrice: 240000,
    formattedPrice: 'Rp 240.000',
    priceNote: 'Belum termasuk PPN 11%',
    includedApps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    idealFor: 'Streaming lancar bebas buffering, video call kerja/sekolah & browsing seluruh keluarga.',
    deviceRecommendation: 'Optimal untuk 4 - 8 perangkat terhubung',
    isBestSeller: true,
    tag: 'Upspeed 200 Mbps (3 Bln)',
    perks: [
      'Upspeed Promo: Kecepatan melonjak ke 200 Mbps selama 3 bulan pertama!',
      'Bonus Langganan Streaming: Vision+, Prime Video, Viu, & MaxStream',
      'Koneksi 100% Fiber Optic murni stabil dan unlimited',
      'Pengawalan teknisi resmi Telkom hingga tuntas',
    ],
    ctaMessage:
      'Halo, saya tertarik pasang Paket Internet Only + Streaming 75 Mbps (upspeed 200 Mbps 3 bln) seharga Rp 240.000/bln belum PPN. Mohon cek jangkauan jaringan di alamat saya.',
  },
  {
    id: 'stream-100',
    name: 'Paket Internet Streaming 100 Mbps',
    speedMbps: 100,
    upspeedMbps: 300,
    upspeedDuration: '6 Bulan Penuh',
    category: 'internet-streaming',
    categoryLabel: 'Internet Only + Streaming',
    monthlyPrice: 270000,
    formattedPrice: 'Rp 270.000',
    priceNote: 'Belum termasuk PPN 11%',
    includedApps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    idealFor: 'Kebutuhan streaming 4K tanpa jeda, upload/download file berukuran besar & multitasking cepat.',
    deviceRecommendation: 'Optimal untuk 6 - 12 perangkat terhubung',
    isBestSeller: false,
    tag: 'Upspeed 300 Mbps (6 Bln)',
    perks: [
      'Upspeed Promo: Kecepatan melonjak ke 300 Mbps selama 6 bulan penuh!',
      'Bonus Langganan Streaming: Vision+, Prime Video, Viu, & MaxStream',
      'Internet Super Cepat Full Fiber Optic',
      'Prioritas penanganan jaringan dan instalasi',
    ],
    ctaMessage:
      'Halo, saya berminat daftar Paket Internet Only + Streaming 100 Mbps (upspeed 300 Mbps 6 bln) seharga Rp 270.000/bln belum PPN. Mohon dibantu pendaftarannya.',
  },
  {
    id: 'stream-200',
    name: 'Paket Internet Streaming 200 Mbps',
    speedMbps: 200,
    upspeedMbps: 500,
    upspeedDuration: '1 Tahun Penuh',
    category: 'internet-streaming',
    categoryLabel: 'Internet Only + Streaming',
    monthlyPrice: 350000,
    formattedPrice: 'Rp 350.000',
    priceNote: 'Belum termasuk PPN 11%',
    includedApps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    idealFor: 'Performa monster: rumah besar, smart home lengkap, streaming 8K & download instan gigabyte.',
    deviceRecommendation: 'Optimal untuk 12 - 20+ perangkat terhubung',
    isBestSeller: false,
    tag: 'Upspeed 500 Mbps (1 Tahun)',
    perks: [
      'Upspeed Promo: Kecepatan melonjak ke 500 Mbps selama 1 tahun penuh!',
      'Bonus Langganan Streaming: Vision+, Prime Video, Viu, & MaxStream',
      'Performa ultra kencang latensi sangat rendah',
      'Kapasitas bandwidth raksasa untuk puluhan perangkat',
    ],
    ctaMessage:
      'Halo, saya mau pasang Paket Internet Only + Streaming 200 Mbps (upspeed 500 Mbps 1 tahun) seharga Rp 350.000/bln belum PPN.',
  },

  // 2. INTERNET + GAME (GameQoo, MLBB, Free Fire, Point Blank, Ayodance, Ragnarok)
  {
    id: 'game-75',
    name: 'Paket Internet + Game 75 Mbps',
    speedMbps: 75,
    upspeedMbps: 200,
    upspeedDuration: '3 Bulan Pertama',
    category: 'gaming',
    categoryLabel: 'Internet + Game',
    monthlyPrice: 290000,
    formattedPrice: 'Rp 290.000',
    priceNote: 'Belum termasuk PPN 11%',
    includedApps: [
      'GameQoo',
      'Mobile Legends: Bang Bang',
      'Free Fire',
      'Point Blank',
      'Audition Ayodance & Ayodance Mobile',
      'Ragnarok Online',
    ],
    idealFor: 'Gamers sejati: routing server game prioritas dengan latensi ultra-rendah dan benefit game eksklusif.',
    deviceRecommendation: 'Optimal untuk PC Gaming, Konsol & Mobile Gaming',
    isBestSeller: false,
    tag: 'Upspeed 200 Mbps (3 Bln)',
    perks: [
      'Upspeed Promo: Lonjakan ke 200 Mbps selama 3 bulan pertama!',
      'Jalur Prioritas Game Server: Ping stabil & anti packet loss',
      'Benefit Game: GameQoo, MLBB, Free Fire, Point Blank, Ayodance, Ragnarok Online',
      'Koneksi fiber optik responsif minim jitter',
    ],
    ctaMessage:
      'Halo, saya tertarik pasang Paket Internet + Game 75 Mbps (upspeed 200 Mbps 3 bln) seharga Rp 290.000/bln belum PPN dengan benefit GameQoo, MLBB, Free Fire, dll. Mohon dibantu pendaftaran.',
  },

  // 3. INTERNET + MOVIE COMPLETE (Netflix, Vidio, Vision+, Prime Video, Disney+)
  {
    id: 'movie-75',
    name: 'Paket Internet + Movie Complete 75 Mbps',
    speedMbps: 75,
    upspeedMbps: 200,
    upspeedDuration: '3 Bulan Pertama',
    category: 'movie',
    categoryLabel: 'Internet + Movie Complete',
    monthlyPrice: 350000,
    formattedPrice: 'Rp 350.000',
    priceNote: 'Belum termasuk PPN 11%',
    includedApps: [
      'Netflix',
      'Vidio',
      'Vision+',
      'Prime Video',
      'Disney+ Hotstar',
    ],
    idealFor: 'Pecinta film bioskop & serial maraton: koleksi hiburan terlengkap langsung aktif di TV & perangkat rumah Anda.',
    deviceRecommendation: 'Optimal untuk Smart TV 4K & semua anggota keluarga',
    isBestSeller: false,
    tag: 'All-in-One Bioskop',
    perks: [
      'Upspeed Promo: Kecepatan melonjak ke 200 Mbps selama 3 bulan pertama!',
      'Langganan All-in-One Komplit: Netflix, Vidio, Vision+, Prime Video, & Disney+ Hotstar',
      'Streaming 4K Ultra HD tanpa jeda buffering di berbagai layar',
      'Koneksi fiber optik tanpa batas kuota',
    ],
    ctaMessage:
      'Halo, saya mau daftar Paket Internet + Movie Complete 75 Mbps (upspeed 200 Mbps 3 bln) seharga Rp 350.000/bln belum PPN yang sudah lengkap Netflix, Vidio, Disney+, Prime Video, Vision+. Mohon cek alamat.',
  },

  // 4. TELKOMSEL ONE DYNAMIC (WiFi + Kuota HP Keluarga + Streaming Vision+, Prime Video, Viu, MaxStream)
  {
    id: 'tone-75-30gb',
    name: 'Telkomsel One Dynamic 75 Mbps (+30GB)',
    speedMbps: 75,
    upspeedMbps: 150,
    upspeedDuration: '3 Bulan Pertama',
    category: 'telkomsel-one',
    categoryLabel: 'Telkomsel One Dynamic',
    monthlyPrice: 280000,
    formattedPrice: 'Rp 280.000',
    priceNote: 'Belum termasuk PPN 11%',
    kuotaKeluarga: '30 GB',
    includedApps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    idealFor: 'Satu tagihan hemat: WiFi rumah 75 ke 150 Mbps + kuota keluarga 30 GB/bulan.',
    deviceRecommendation: 'Optimal untuk 4 - 6 perangkat di rumah + HP keluarga',
    isBestSeller: false,
    tag: 'Upspeed 150 Mbps (3 Bln)',
    perks: [
      'Upspeed Promo: Kecepatan lonjak ke 150 Mbps selama 3 bulan!',
      'Kuota Bersama Keluarga 30 GB/bulan untuk nomor Telkomsel sekeluarga',
      'Bonus Langganan Streaming: Vision+, Prime Video, Viu, & MaxStream',
      'Internet rumah fiber optik stabil tanpa kuota',
    ],
    ctaMessage:
      'Halo, saya mau daftar Telkomsel One Dynamic 75 ke 150 Mbps (3 bln) + Kuota Keluarga 30 GB seharga Rp 280.000/bln belum PPN.',
  },
  {
    id: 'tone-75-50gb',
    name: 'Telkomsel One Dynamic 75 Mbps (+50GB)',
    speedMbps: 75,
    upspeedMbps: 150,
    upspeedDuration: '3 Bulan Pertama',
    category: 'telkomsel-one',
    categoryLabel: 'Telkomsel One Dynamic',
    monthlyPrice: 290000,
    formattedPrice: 'Rp 290.000',
    priceNote: 'Belum termasuk PPN 11%',
    kuotaKeluarga: '50 GB',
    includedApps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    idealFor: 'Paling untung & cerdas! Selisih cuma 10rb langsung dapat kuota 50 GB per bulan.',
    deviceRecommendation: 'Optimal untuk 4 - 6 perangkat di rumah + HP keluarga',
    isBestSeller: true,
    tag: 'Paling Cuan (+10rb Dapet 50GB)',
    perks: [
      'Upspeed Promo: Kecepatan lonjak ke 150 Mbps selama 3 bulan!',
      'Kuota Bersama Keluarga 50 GB/bulan (Hanya selisih 10rb dari 30GB!)',
      'Bonus Langganan Streaming: Vision+, Prime Video, Viu, & MaxStream',
      'Internet rumah fiber optik stabil tanpa kuota',
    ],
    ctaMessage:
      'Halo, saya mau ambil promo Telkomsel One Dynamic 75 ke 150 Mbps (3 bln) + Kuota Keluarga 50 GB seharga Rp 290.000/bln belum PPN. Selisih cuma 10rb langsung dapet 50GB!',
  },
  {
    id: 'tone-100-30gb',
    name: 'Telkomsel One Dynamic 100 Mbps (+30GB)',
    speedMbps: 100,
    upspeedMbps: 200,
    upspeedDuration: '6 Bulan Penuh',
    category: 'telkomsel-one',
    categoryLabel: 'Telkomsel One Dynamic',
    monthlyPrice: 310000,
    formattedPrice: 'Rp 310.000',
    priceNote: 'Belum termasuk PPN 11%',
    kuotaKeluarga: '30 GB',
    includedApps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    idealFor: 'Kecepatan 100 ke 200 Mbps (6 bulan) + Kuota Keluarga 30 GB/bln.',
    deviceRecommendation: 'Optimal untuk 6 - 10 perangkat di rumah + HP keluarga',
    isBestSeller: false,
    tag: 'Upspeed 200 Mbps (6 Bln)',
    perks: [
      'Upspeed Promo: Kecepatan melonjak ke 200 Mbps selama 6 bulan penuh!',
      'Kuota Bersama Keluarga 30 GB/bulan',
      'Bonus Langganan Streaming: Vision+, Prime Video, Viu, & MaxStream',
      'Internet Fiber Optic berkecepatan tinggi tanpa hambatan',
    ],
    ctaMessage:
      'Halo, saya mau daftar Telkomsel One Dynamic 100 ke 200 Mbps (6 bln) + Kuota Keluarga 30 GB seharga Rp 310.000/bln belum PPN.',
  },
  {
    id: 'tone-100-50gb',
    name: 'Telkomsel One Dynamic 100 Mbps (+50GB)',
    speedMbps: 100,
    upspeedMbps: 200,
    upspeedDuration: '6 Bulan Penuh',
    category: 'telkomsel-one',
    categoryLabel: 'Telkomsel One Dynamic',
    monthlyPrice: 320000,
    formattedPrice: 'Rp 320.000',
    priceNote: 'Belum termasuk PPN 11%',
    kuotaKeluarga: '50 GB',
    includedApps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    idealFor: 'Kecepatan 100 ke 200 Mbps (6 bln) + Kuota 50 GB. Hemat maksimal, cuma beda 10rb!',
    deviceRecommendation: 'Optimal untuk 6 - 10 perangkat di rumah + HP keluarga',
    isBestSeller: false,
    tag: 'Paling Cuan (+10rb Dapet 50GB)',
    perks: [
      'Upspeed Promo: Kecepatan lonjak ke 200 Mbps selama 6 bulan penuh!',
      'Kuota Bersama Keluarga 50 GB/bulan (Hanya selisih 10rb dari 30GB)',
      'Bonus Langganan Streaming: Vision+, Prime Video, Viu, & MaxStream',
      'Internet Fiber Optic berkecepatan tinggi',
    ],
    ctaMessage:
      'Halo, saya mau ambil Telkomsel One Dynamic 100 ke 200 Mbps (6 bln) + Kuota Keluarga 50 GB seharga Rp 320.000/bln belum PPN.',
  },
  {
    id: 'tone-150-30gb',
    name: 'Telkomsel One Dynamic 150 Mbps (+30GB)',
    speedMbps: 150,
    upspeedMbps: 300,
    upspeedDuration: '6 Bulan Penuh',
    category: 'telkomsel-one',
    categoryLabel: 'Telkomsel One Dynamic',
    monthlyPrice: 340000,
    formattedPrice: 'Rp 340.000',
    priceNote: 'Belum termasuk PPN 11%',
    kuotaKeluarga: '30 GB',
    includedApps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    idealFor: 'Kecepatan kencang 150 ke 300 Mbps (6 bulan) + Kuota Keluarga 30 GB.',
    deviceRecommendation: 'Optimal untuk 10 - 15 perangkat di rumah + HP keluarga',
    isBestSeller: false,
    tag: 'Upspeed 300 Mbps (6 Bln)',
    perks: [
      'Upspeed Promo: Kecepatan lonjak ke 300 Mbps selama 6 bulan penuh!',
      'Kuota Bersama Keluarga 30 GB/bulan',
      'Bonus Langganan Streaming: Vision+, Prime Video, Viu, & MaxStream',
      'Koneksi Premium 150-300 Mbps Full Fiber',
    ],
    ctaMessage:
      'Halo, saya tertarik Telkomsel One Dynamic 150 ke 300 Mbps (6 bln) + Kuota Keluarga 30 GB seharga Rp 340.000/bln belum PPN.',
  },
  {
    id: 'tone-150-50gb',
    name: 'Telkomsel One Dynamic 150 Mbps (+50GB)',
    speedMbps: 150,
    upspeedMbps: 300,
    upspeedDuration: '6 Bulan Penuh',
    category: 'telkomsel-one',
    categoryLabel: 'Telkomsel One Dynamic',
    monthlyPrice: 350000,
    formattedPrice: 'Rp 350.000',
    priceNote: 'Belum termasuk PPN 11%',
    kuotaKeluarga: '50 GB',
    includedApps: ['Vision+', 'Prime Video', 'Viu', 'MaxStream'],
    idealFor: 'Puncak kecepatan 150 ke 300 Mbps (6 bln) + Kuota 50 GB. Sangat hemat cuma selisih 10rb!',
    deviceRecommendation: 'Optimal untuk 10 - 15 perangkat di rumah + HP keluarga',
    isBestSeller: false,
    tag: 'Paling Cuan (+10rb Dapet 50GB)',
    perks: [
      'Upspeed Promo: Kecepatan lonjak ke 300 Mbps selama 6 bulan penuh!',
      'Kuota Bersama Keluarga 50 GB/bulan (Hanya selisih 10rb dari 30GB)',
      'Bonus Langganan Streaming: Vision+, Prime Video, Viu, & MaxStream',
      'Koneksi Premium 150-300 Mbps Full Fiber',
    ],
    ctaMessage:
      'Halo, saya mau paket tertinggi Telkomsel One Dynamic 150 ke 300 Mbps (6 bln) + Kuota Keluarga 50 GB seharga Rp 350.000/bln belum PPN.',
  },
];

// Helper to bridge PACKAGES_DATA with the InternetPackage UI contract
export const PACKAGES: InternetPackage[] = PACKAGES_DATA.map((item) => {
  // Approximate normal reference price before promo discount
  const normalPrice = Math.round((item.monthlyPrice * 1.25) / 10000) * 10000;
  
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    categoryLabel: item.categoryLabel,
    speed: item.speedMbps,
    speedLabel: `${item.speedMbps} Mbps`,
    pricePromo: item.monthlyPrice,
    priceNormal: normalPrice,
    fup: 'Unlimited Fiber Optic',
    bestFor: item.idealFor,
    deviceCount: item.deviceRecommendation,
    features: item.perks,
    ottBonus: item.includedApps,
    isPopular: !!item.isBestSeller,
    isPromo: true,
    badge: item.tag || (item.isBestSeller ? 'POPULER ⭐' : undefined),
    description: `${item.idealFor}. ${item.priceNote}.`,
    upspeedMbps: item.upspeedMbps,
    upspeedDuration: item.upspeedDuration,
    priceNote: item.priceNote,
    kuotaKeluarga: item.kuotaKeluarga,
    ctaMessage: item.ctaMessage,
  };
});

export const PROMO_HIGHLIGHTS = [
  {
    title: 'Diskon Biaya Pasang Baru (PSB)',
    desc: 'Dapatkan potongan biaya pasang baru resmi hingga 70% melalui sales resmi Vicky.',
    icon: 'Percent',
  },
  {
    title: 'Koneksi 100% Fiber Optic Murni',
    desc: 'Jaringan serat optik murni dengan stabilitas tinggi, tahan cuaca dan latensi rendah.',
    icon: 'Wifi',
  },
  {
    title: 'Proses Kilat 1x24 Jam',
    desc: 'Setelah data lengkap dan ODP ready, tim teknisi Telkom dijadwalkan langsung meluncur ke lokasi Anda.',
    icon: 'Zap',
  },
  {
    title: 'Bantuan Pengawalan ODP',
    desc: 'Jika kotak ODP di tiang dekat rumah terlihat penuh, Mas Vicky akan carikan solusi jalur alternatif resmi.',
    icon: 'ShieldCheck',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Budi Santoso',
    city: 'Jakarta Selatan',
    packageUsed: 'Paket Internet Streaming 75 Mbps',
    rating: 5,
    comment: 'Pelayanan Mas Vicky top banget! Kemarin daftar sore jam 4 lewat WhatsApp, besok siangnya teknisi Telkom udah datang narik kabel. Sekarang WFH lancar jaya, streaming Vision+, Prime Video & Maxstream lancar tanpa buffering.',
    date: '2 hari yang lalu',
    verified: true,
  },
  {
    id: 't2',
    name: 'dr. Sarah Nabila',
    city: 'Surabaya',
    packageUsed: 'Telkomsel One Dynamic 75 Mbps (+50GB)',
    rating: 5,
    comment: 'Awalnya ragu daftar online takut calo, ternyata Mas Vicky beneran Sales Resmi Telkom. Ambil Telkomsel One yang 50GB selisih cuma 10rb dapet kuota sekeluarga 50GB per bulan, hemat banget!',
    date: '5 hari yang lalu',
    verified: true,
  },
  {
    id: 't3',
    name: 'Reza Pratama',
    city: 'Bandung',
    packageUsed: 'Paket Internet + Game 75 Mbps',
    rating: 5,
    comment: 'Puas banget ambil paket game lewat Mas Vicky. Ping Mobile Legends, Point Blank & Free Fire stabil banget, dapet upspeed 200 Mbps selama 3 bulan lagi. Mantap!',
    date: '1 minggu yang lalu',
    verified: true,
  },
  {
    id: 't4',
    name: 'Hj. Fatimah',
    city: 'Makassar',
    packageUsed: 'Paket Internet Streaming 75 Mbps',
    rating: 5,
    comment: 'Alhamdulillah dibantu Mas Vicky dari awal sampai internet nyala. Sangat sabar menjelaskan paket mana yang cocok buat rumah saya. Tarif 240rb sangat terjangkau. Terima kasih banyak mas!',
    date: '2 minggu yang lalu',
    verified: true,
  },
  {
    id: 't5',
    name: 'Denny Kurniawan',
    city: 'Bekasi',
    packageUsed: 'Paket Internet + Movie Complete 75 Mbps',
    rating: 5,
    comment: 'Sempat kendala ODP di tiang depan rumah penuh, tapi Mas Vicky langsung koordinasi dengan spv area buat penambahan port. Paket Movie sudah lengkap Netflix, Disney+, Vidio langsung aktif di TV!',
    date: '3 minggu yang lalu',
    verified: true,
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'Apa saja syarat untuk mendaftar pasang baru IndiHome / Telkomsel One?',
    answer: 'Syaratnya sangat mudah dan praktis: cukup siapkan Foto KTP asli yang masih berlaku, nomor WhatsApp dan nomor HP aktif, alamat email aktif untuk pengiriman e-billing tagihan, serta alamat lengkap pemasangan dan link shareloc Google Maps agar teknisi mudah menemukan lokasi Anda.',
  },
  {
    question: 'Berapa biaya pasang baru (PSB) IndiHome?',
    answer: 'Biaya Pasang Baru (PSB) resmi normal adalah Rp 500.000, namun saat ini tersedia promo diskon hingga 70% menjadi hanya Rp 150.000 s/d Rp 250.000 (tergantung paket dan promo wilayah). Biaya pasang ini tidak dibayarkan tunai ke sales, melainkan masuk ke tagihan bulan pertama resmi dari Telkom.',
  },
  {
    question: 'Berapa lama proses pemasangan hingga internet aktif?',
    answer: 'Rata-rata proses pemasangan membutuhkan waktu 1x24 jam setelah data berhasil diverifikasi dan ketersediaan port ODP dipastikan siap. Teknisi Telkom akan menghubungi Anda terlebih dahulu untuk konfirmasi jam kedatangan.',
  },
  {
    question: 'Apakah pembayaran tagihan bisa via online?',
    answer: 'Tentu saja! Pembayaran tagihan IndiHome sangat fleksibel, dapat dilakukan melalui aplikasi MyTelkomsel / myIndiHome, M-Banking (BCA, Mandiri, BRI, BNI, BSI, dll), ATM, dompet digital (GoPay, OVO, DANA, ShopeePay), serta gerai minimarket seperti Indomaret dan Alfamart.',
  },
  {
    question: 'Apakah ada kontrak berlangganan minimal di IndiHome?',
    answer: 'Untuk pelanggan pasang baru IndiHome, masa berlangganan minimal adalah 12 bulan (1 tahun) sesuai ketentuan resmi Telkom Indonesia.',
  },
  {
    question: 'Kenapa harus mendaftar melalui Sales Resmi Vicky (vickyindihomepusat)?',
    answer: 'Mendaftar lewat Mas Vicky memberikan keuntungan: proses cepat tanpa antre di kantor Plasa Telkom, konsultasi pemilihan paket paling hemat sesuai kebutuhan, pengawalan status ODP tiang oleh orang dalam, serta layanan bantuan langsung jika suatu hari Anda membutuhkan upgrade atau ada kendala teknis.',
  },
  {
    question: 'Bagaimana jika tiang ODP di dekat rumah saya sudah penuh?',
    answer: 'Jangan khawatir! Mas Vicky akan langsung mengusulkan penarikan jalur dari ODP terdekat lainnya yang masih memiliki port kosong atau mengajukan penambahan splitter port ke tim jaringan Telkom di area Anda.',
  },
];

export const INDONESIAN_CITIES = [
  'Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Barat', 'Jakarta Timur', 'Jakarta Utara',
  'Kota Bogor', 'Kabupaten Bogor', 'Kota Depok', 'Kota Tangerang', 'Kota Tangerang Selatan', 'Kabupaten Tangerang',
  'Kota Bekasi', 'Kabupaten Bekasi', 'Kota Bandung', 'Kabupaten Bandung', 'Kota Cimahi',
  'Kota Semarang', 'Kota Surakarta (Solo)', 'Kota Yogyakarta', 'Kabupaten Sleman',
  'Kota Surabaya', 'Kabupaten Sidoarjo', 'Kota Malang', 'Kota Denpasar', 'Kabupaten Badung',
  'Kota Medan', 'Kota Palembang', 'Kota Pekanbaru', 'Kota Padang', 'Kota Bandar Lampung',
  'Kota Balikpapan', 'Kota Samarinda', 'Kota Banjarmasin', 'Kota Pontianak',
  'Kota Makassar', 'Kota Manado', 'Kota Mataram', 'Kota Lainnya (Seluruh Indonesia)',
];
