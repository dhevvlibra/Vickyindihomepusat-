import { BlogPost } from '../types';
import { SALES_AGENT_INFO } from './packages';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'biaya-pasang-baru-indihome-2026',
    slug: 'biaya-pasang-baru-indihome-2026',
    title: 'Biaya Pasang Baru (PSB) IndiHome Terbaru 2026: Promo Diskon 99K & Syarat Registrasi',
    excerpt: 'Simak rincian tarif biaya pemasangan baru (PSB) IndiHome Telkomsel resmi 2026. Manfaatkan promo PSB hanya Rp 99.000 (coret normal Rp 250.000) dan tips pasang 1 hari aktif tanpa antre.',
    category: 'Promo',
    author: {
      name: SALES_AGENT_INFO.name,
      role: 'Senior Sales Executive IndiHome',
      avatar: SALES_AGENT_INFO.photoUrl,
    },
    publishDate: '15 Oktober 2026',
    readTime: '5 menit baca',
    isFeatured: true,
    keywords: [
      'biaya pasang indihome 2026',
      'promo psb indihome 99k',
      'tarif pasang baru indihome',
      'daftar indihome murah',
      'syarat pasang indihome',
      'sales resmi indihome pusat'
    ],
    recommendedPackageId: 'stream-75',
    recommendedPackageName: 'IndiHome 75 Mbps (Upspeed 200 Mbps 3 Bulan)',
    content: {
      intro: 'Banyak calon pelanggan menanyakan berapa biaya pasang baru (PSB) IndiHome by Telkomsel untuk tahun 2026. Di artikel panduan resmi ini, kami merangkum rincian biaya instalasi, diskon promo spesial yang sedang berlaku, serta prosedur pendaftaran cepat tanpa uang muka.',
      tableOfContents: [
        { id: 'biaya-psb-resmi', title: 'Rincian Biaya Pasang Baru (PSB) Normal vs Promo' },
        { id: 'bebas-psb-148k', title: 'Paket Spesial Bebas Biaya PSB (Rp 0)' },
        { id: 'kapan-dibayar', title: 'Kapan Biaya Pasang Baru Harus Dibayarkan?' },
        { id: 'syarat-dokumen', title: 'Syarat & Dokumen Pendaftaran' },
        { id: 'alur-registrasi', title: 'Cara Daftar Cepat Bersama Sales Resmi' },
      ],
      sections: [
        {
          id: 'biaya-psb-resmi',
          title: 'Rincian Biaya Pasang Baru (PSB) Normal vs Promo 2026',
          content: 'Sesuai ketentuan PT Telkom Indonesia, biaya pasang baru (PSB) standar untuk jaringan fiber optik IndiHome adalah Rp 250.000. Namun melalui program promo terbatas melalui Sales Executive resmi Vicky, Anda berhak mendapatkan subsidi diskon biaya pemasangan sebesar lebih dari 60%.',
          highlightBox: {
            title: '🔥 Promo Biaya Pasang Baru (PSB)',
            text: 'Tarif normal Rp 250.000 kini dipangkas menjadi HANYA Rp 99.000 untuk paket reguler 75 Mbps ke atas. Khusus paket Telkomsel One 20 Mbps, Biaya PSB bahkan GRATIS Rp 0!',
            type: 'promo',
          },
          table: {
            headers: ['Jenis Paket', 'Biaya PSB Normal', 'Biaya PSB Promo', 'Keterangan'],
            rows: [
              ['Paket Telkomsel One 20 Mbps (Rp 148K)', 'Rp 250.000', 'GRATIS (Rp 0)', 'Promo Terbatas, Bebas Biaya Pasang'],
              ['Paket Internet Only 75 - 300 Mbps', 'Rp 250.000', 'Rp 99.000', 'Hemat Rp 151.000 (Subsidi Promo)'],
              ['Paket Internet + Game 75 - 300 Mbps', 'Rp 250.000', 'Rp 99.000', 'Subsidi Pasang + Bonus Item Game'],
              ['Paket Internet + Movie 75 - 300 Mbps', 'Rp 250.000', 'Rp 99.000', 'Termasuk Akun OTT Streaming'],
            ],
          },
        },
        {
          id: 'bebas-psb-148k',
          title: 'Pilihan Paket dengan Bebas Biaya PSB (Rp 0)',
          content: 'Jika Anda mencari solusi internet rumah dengan modal awal serendah mungkin, paket Telkomsel One Dynamic 20 Mbps + 30 GB Kuota Keluarga dengan harga Rp 148.000/bulan adalah opsi paling tepat. Paket ini mendapatkan fasilitas pembebasan biaya instalasi penuh (PSB Rp 0).',
          bulletPoints: [
            'Kecepatan WiFi 20 Mbps stabil 100% kabel fiber optik',
            'Bonus kuota bersama HP keluarga 30 GB tiap bulan',
            'Bebas biaya pasang baru (PSB Rp 0)',
            'Gratis peminjaman modem WiFi ONT Dual Band selama berlangganan',
          ],
        },
        {
          id: 'kapan-dibayar',
          title: 'Kapan Biaya Pasang Baru Harus Dibayarkan?',
          content: 'PENTING: Jangan pernah menyerahkan uang tunai atau mentransfer biaya pemasangan ke rekening pribadi sales atau teknisi lapangan. Biaya pasang baru (PSB) Rp 99.000 akan ditagihkan secara resmi pada billing tagihan bulan pertama bersamaan dengan biaya langganan bulanan setelah internet aktif di rumah Anda.',
          highlightBox: {
            title: 'Keamanan Transaksi Terjamin',
            text: 'Tidak ada biaya uang muka (DP). Pembayaran hanya dilakukan melalui kanal resmi Telkom: aplikasi MyTelkomsel / MyIndiHome, Virtual Account Bank, Indomaret, Alfamart, atau eCommerce terpercaya.',
            type: 'info',
          },
        },
        {
          id: 'syarat-dokumen',
          title: 'Syarat & Dokumen Pendaftaran Pasang Baru',
          content: 'Registrasi pasang baru IndiHome kini sangat praktis dan 100% digital tanpa perlu datang ke Plasa Telkom. Dokumen yang dibutuhkan hanya:',
          bulletPoints: [
            'Foto e-KTP asli pemohon (jelas, tidak buram)',
            'Nomor WhatsApp & nomor HP alternatif yang aktif untuk konfirmasi teknisi',
            'Alamat email aktif untuk pengiriman tagihan e-billing resmi',
            'Alamat pasang lengkap beserta patokan/ancer-ancer dan share live location',
          ],
        },
        {
          id: 'alur-registrasi',
          title: 'Cara Daftar Cepat Bersama Sales Resmi Mas Vicky',
          content: 'Dengan mendaftar melalui website vickyindihomepusat, pendaftaran Anda langsung diprioritaskan di sistem Telkomsel Pusat untuk pengecekan box ODP terdekat dan penugasan teknisi dalam 1x24 jam.',
        },
      ],
      faq: [
        {
          question: 'Apakah teknisi menarik biaya kabel tambahan jika jarak tiang agak jauh?',
          answer: 'Pemasangan standar sudah mencakup kabel dropcore fiber optik hingga panjang standar yang ditentukan Telkom. Jika posisi rumah memerlukan kabel ekstra melebihi jatah standar, teknisi akan memberikan penjelasan resmi sesuai SOP Telkom.',
        },
        {
          question: 'Berapa lama proses pemasangan setelah registrasi online?',
          answer: 'Rata-rata pemasangan berlangsung antara 1x24 jam hingga 2x24 jam tergantung ketersediaan slot teknisi dan kondisi cuaca di lokasi Anda.',
        },
      ],
      conclusion: 'Memasang internet rumah IndiHome di tahun 2026 semakin mudah dan hemat dengan promo PSB Rp 99.000 dan paket Telkomsel One Rp 148.000 bebas biaya pasang. Pastikan selalu mendaftar lewat mitra sales resmi agar data Anda aman dan proses instalasi terawal secara profesional.',
      ctaNote: 'Ingin cek jangkauan ODP dan klaim promo PSB 99K hari ini? Hubungi Mas Vicky langsung via WhatsApp 0821-1529-1198.',
    },
  },
  {
    id: 'perbedaan-telkomsel-one-dan-indihome-reguler',
    slug: 'perbedaan-telkomsel-one-dan-indihome-reguler',
    title: 'Telkomsel One vs IndiHome Reguler: Mana yang Lebih Murah & Menguntungkan untuk Rumah?',
    excerpt: 'Bingung memilih antara Telkomsel One Dynamic atau IndiHome Reguler? Pahami perbandingan fitur kuota keluarga, benefit upspeed hingga 500 Mbps, serta simulasi penghematan tagihan bulanan.',
    category: 'Panduan',
    author: {
      name: SALES_AGENT_INFO.name,
      role: 'Senior Sales Executive IndiHome',
      avatar: SALES_AGENT_INFO.photoUrl,
    },
    publishDate: '14 Oktober 2026',
    readTime: '6 menit baca',
    isFeatured: true,
    keywords: [
      'telkomsel one',
      'perbedaan telkomsel one dan indihome',
      'kuota keluarga telkomsel one',
      'paket telkomsel one dynamic',
      'wifi dan kuota hp satu tagihan',
      'internet rumah hemat'
    ],
    recommendedPackageId: 'tone-75',
    recommendedPackageName: 'Telkomsel One 75 ke 200 Mbps + 30GB Kuota Keluarga',
    content: {
      intro: 'Integrasi IndiHome ke dalam naungan Telkomsel melahirkan produk baru bernama Telkomsel One. Produk ini menggabungkan layanan internet serat optik kabel di rumah dengan kuota seluler HP untuk sekeluarga dalam satu tagihan ringkas. Apa perbedaannya dengan paket IndiHome biasa?',
      tableOfContents: [
        { id: 'konsep-telkomsel-one', title: 'Apa itu Telkomsel One Dynamic?' },
        { id: 'tabel-perbandingan', title: 'Tabel Perbandingan Telkomsel One vs IndiHome Biasa' },
        { id: 'fitur-kuota-keluarga', title: 'Cara Kerja Kuota Bersama HP Keluarga' },
        { id: 'promo-upspeed', title: 'Bonus Upspeed: Nikmati Kecepatan Berlipat Ganda' },
        { id: 'kesimpulan-pilihan', title: 'Mana yang Sebaiknya Anda Pilih?' },
      ],
      sections: [
        {
          id: 'konsep-telkomsel-one',
          title: 'Apa itu Telkomsel One Dynamic?',
          content: 'Telkomsel One adalah inovasi Fixed-Mobile Convergence (FMC) pertama di Indonesia yang menyatukan koneksi WiFi rumah unlimited berkecepatan tinggi dengan kuota seluler internet Telkomsel untuk keluarga (bisa dibagi hingga 6 nomor HP Telkomsel/By.U).',
          highlightBox: {
            title: '💡 Konsep 1 Tagihan untuk Semua Kebutuhan',
            text: 'Tidak perlu lagi pusing beli kuota internet HP untuk ayah, ibu, dan anak secara terpisah tiap minggu. Cukup 1 paket Telkomsel One, semua kuota di rumah dan di luar rumah tercover sekaligus.',
            type: 'info',
          },
        },
        {
          id: 'tabel-perbandingan',
          title: 'Tabel Perbandingan Telkomsel One vs IndiHome Biasa',
          content: 'Berikut adalah perbandingan mendalam antara kedua lini produk:',
          table: {
            headers: ['Parameter', 'Telkomsel One Dynamic', 'IndiHome Reguler Internet Only'],
            rows: [
              ['Internet Rumah (WiFi)', 'Kabel Fiber Optik Unlimited', 'Kabel Fiber Optik Unlimited'],
              ['Kuota HP Seluler', 'Ada (30 GB / 50 GB untuk keluarga)', 'Tidak Ada (khusus WiFi rumah)'],
              ['Nomor yang Bisa Gabung', 'Hingga 6 nomor Telkomsel', 'Tidak Ada'],
              ['Bonus Streaming', 'MAXstream, Vidio, Catchplay', 'Tergantung paket (Stream/Movie/Game)'],
              ['Upspeed Promo', 'Otomatis aktif sesuai tier', 'Otomatis aktif sesuai tier'],
              ['Sistem Tagihan', '1 Tagihan gabungan all-in-one', 'Tagihan murni internet rumah'],
            ],
          },
        },
        {
          id: 'fitur-kuota-keluarga',
          title: 'Cara Kerja Kuota Bersama HP Keluarga',
          content: 'Setelah paket Telkomsel One aktif, nomor utama yang Anda daftarkan dapat mengundang anggota keluarga melalui aplikasi MyTelkomsel. Kuota 30 GB atau 50 GB tersebut langsung bisa dinikmati bersama di jaringan 4G/5G terbaik Telkomsel saat anggota keluarga berada di luar jangkauan WiFi rumah.',
          bulletPoints: [
            'Bebas atur batas kuota tiap anggota keluarga di aplikasi MyTelkomsel',
            'Nelpon & SMS sesama anggota keluarga gratis tanpa potong pulsa',
            'Tidak hangus jika nomor berpindah lokasi di seluruh Indonesia',
          ],
        },
        {
          id: 'promo-upspeed',
          title: 'Bonus Promo Upspeed Resmi',
          content: 'Kabar gembira bagi pelanggan baru! Paket Telkomsel One dan IndiHome dilengkapi program boost kecepatan otomatis:',
          bulletPoints: [
            '75 Mbps naik ke 200 Mbps selama 3 bulan pertama',
            '100 Mbps naik ke 300 Mbps selama 6 bulan pertama',
            '150 Mbps naik ke 500 Mbps selama 6 bulan pertama',
            '200 Mbps naik ke 500 Mbps selama 1 TAHUN penuh',
            '300 Mbps naik ke 500 Mbps selama 1 TAHUN penuh',
          ],
        },
        {
          id: 'kesimpulan-pilihan',
          title: 'Mana yang Sebaiknya Anda Pilih?',
          content: 'Pilihlah Telkomsel One jika anggota keluarga Anda mayoritas pengguna kartu Telkomsel dan Anda ingin memangkas pengeluaran pulsa bulanan. Namun bila Anda hanya butuh internet untuk kantor ruko atau kos-kosan tanpa kuota HP, paket IndiHome Internet Only sudah sangat memadai.',
        },
      ],
      faq: [
        {
          question: 'Apakah kuota keluarga Telkomsel One bisa untuk kartu selain Telkomsel?',
          answer: 'Fitur kuota keluarga berlaku khusus untuk nomor Telkomsel (Prabayar, Halo, dan By.U). Jika anggota keluarga menggunakan operator lain, mereka tetap dapat menikmati koneksi WiFi rumah tanpa batas.',
        },
      ],
      conclusion: 'Telkomsel One memberikan nilai ekonomis luar biasa bagi keluarga modern di era digital. Hemat pengeluaran hingga 40% dibandingkan membeli paket WiFi rumah dan paket data seluler secara terpisah.',
      ctaNote: 'Mau hitung estimasi penghematan keluarga Anda? Konsultasikan paket Telkomsel One terbaik dengan Mas Vicky sekarang.',
    },
  },
  {
    id: 'panduan-memilih-kecepatan-wifi-indihome',
    slug: 'panduan-memilih-kecepatan-wifi-indihome',
    title: 'Panduan Memilih Kecepatan WiFi Rumah: 20 Mbps, 75 Mbps, 150 Mbps, atau 300 Mbps?',
    excerpt: 'Jangan sampai salah pilih kecepatan! Temukan tips menentukan speed internet IndiHome yang pas dengan jumlah pengguna, kebutuhan streaming 4K, WFH Zoom, hingga game online tanpa lag.',
    category: 'Rekomendasi',
    author: {
      name: SALES_AGENT_INFO.name,
      role: 'Senior Sales Executive IndiHome',
      avatar: SALES_AGENT_INFO.photoUrl,
    },
    publishDate: '13 Oktober 2026',
    readTime: '7 menit baca',
    isFeatured: false,
    keywords: [
      'kecepatan wifi indihome',
      'berapa mbps untuk wfh',
      'rekomendasi paket wifi rumah',
      'paket internet streaming movie game',
      'wifi 75 mbps vs 100 mbps',
      'tips memilih kecepatan internet'
    ],
    recommendedPackageId: 'stream-100',
    recommendedPackageName: 'IndiHome 100 Mbps (Upspeed 300 Mbps 6 Bulan)',
    content: {
      intro: 'Memilih kecepatan internet yang terlalu rendah akan menyebabkan video buffering dan meeting online terputus. Sebaliknya, memilih paket yang terlalu besar bisa membuat anggaran membengkak. Simak panduan praktis menghitung kebutuhan bandwidth keluarga Anda berikut ini.',
      tableOfContents: [
        { id: 'rumus-kebutuhan', title: 'Rumus Menghitung Kebutuhan Bandwidth Rumah' },
        { id: 'kategori-20mbps', title: '20 Mbps: Kebutuhan Dasar & Hemat Budget' },
        { id: 'kategori-75mbps', title: '75 Mbps: Pilihan Terfavorit Keluarga Modern' },
        { id: 'kategori-100-150', title: '100 - 150 Mbps: WFH Intensif, Kreator Konten & Gaming' },
        { id: 'kategori-300mbps', title: '300 Mbps: Performa Maksimal & Smart Home Multi-Device' },
      ],
      sections: [
        {
          id: 'rumus-kebutuhan',
          title: 'Rumus Menghitung Kebutuhan Bandwidth Rumah',
          content: 'Secara umum, tiap aktivitas online membutuhkan bandwidth minimum yang berbeda. Menonton YouTube HD membutuhkan sekitar 5 Mbps, streaming Netflix 4K butuh 15-25 Mbps, sedangkan Video Call Zoom HD butuh 3-5 Mbps stabil baik upload maupun download.',
          highlightBox: {
            title: '💡 Rumus Praktis',
            text: 'Kalikan jumlah gadget aktif di rumah dengan 10-15 Mbps. Jika ada 5 perangkat aktif bersamaan, maka kecepatan minimum yang disarankan adalah 50 - 75 Mbps.',
            type: 'tip',
          },
        },
        {
          id: 'kategori-20mbps',
          title: '20 Mbps: Opsi Paling Hemat untuk Kebutuhan Pokok',
          content: 'Cocok untuk 2 hingga 4 perangkat. Sangat pas untuk kirim chat WhatsApp, browsing media sosial, browsing resep masakan, dan menonton video resolusi standar. Pilihan terbaik di kelas ini adalah paket Telkomsel One 20 Mbps hanya Rp 148.000/bln.',
        },
        {
          id: 'kategori-75mbps',
          title: '75 Mbps (Bonus Upspeed 200 Mbps): Best Value Terlaris',
          content: 'Tier 75 Mbps merupakan paket paling laris di tahun 2026. Sangat ideal untuk rumah dengan 4 - 8 gadget aktif, 1 Smart TV nonton Netflix / Vidio, anak sekolah daring, dan orang tua WFH tanpa rebutan bandwidth.',
          bulletPoints: [
            'Bonus Upspeed 200 Mbps selama 3 bulan pertama',
            'Streaming Full HD lancar di 3 TV sekaligus',
            'Harga terjangkau mulai Rp 270.000/bln (Internet Only)',
          ],
        },
        {
          id: 'kategori-100-150',
          title: '100 - 150 Mbps: Solusi Work From Home & Gamer',
          content: 'Bagi Anda yang sering mengunggah file besar, content creator YouTube/TikTok, atau gamer kompetitif (Mobile Legends, Valorant, Dota 2) yang membutuhkan latensi rendah dan ping stabil di bawah 15ms.',
          bulletPoints: [
            'Paket 100 Mbps: Bonus upspeed melonjak ke 300 Mbps selama 6 bulan',
            'Paket 150 Mbps: Bonus upspeed melonjak ke 500 Mbps selama 6 bulan',
            'Sudah dilengkapi router Dual Band WiFi 5 / WiFi 6 performa tinggi',
          ],
        },
        {
          id: 'kategori-300mbps',
          title: '300 Mbps: Kecepatan Sultan & Smart Home Serba Otomatis',
          content: 'Paket 300 Mbps memberikan kebebasan mutlak. Didukung bonus upspeed 500 Mbps selama 1 TAHUN PENUH! Sangat cocok untuk villa, kantor start-up, rumah dengan 15+ perangkat IoT / CCTV online, dan pengguna yang gemar download game berukuran 100 GB dalam hitungan menit.',
        },
      ],
      faq: [
        {
          question: 'Bisakah saya upgrade kecepatan di kemudian hari?',
          answer: 'Tentu bisa. Pelanggan dapat mengajukan upgrade kecepatan kapan saja dengan mudah melalui bantuan Sales Mas Vicky atau aplikasi MyTelkomsel tanpa biaya ganti modem.',
        },
      ],
      conclusion: 'Sesuaikan pilihan kecepatan dengan kebiasaan anggota keluarga di rumah. Manfaatkan fitur Kalkulator Kebutuhan Speed di website kami untuk mendapatkan rekomendasi instan.',
      ctaNote: 'Coba Kalkulator Kebutuhan Speed sekarang atau chat Mas Vicky untuk konsultasi gratis.',
    },
  },
  {
    id: 'review-paket-eznet-telkomsel-148k',
    slug: 'review-paket-eznet-telkomsel-148k',
    title: 'Review Paket Internet Murah 100 Ribuan: Telkomsel One 20 Mbps Rp 148.000 / Bulan Bebas Biaya PSB',
    excerpt: 'Mencari internet WiFi rumah murah dengan budget Rp 100 ribuan? Simak ulasan mendalam paket Telkomsel One 20 Mbps: keunggulan kabel fiber optik, kuota HP keluarga 30 GB, dan bebas biaya pasang.',
    category: 'Promo',
    author: {
      name: SALES_AGENT_INFO.name,
      role: 'Senior Sales Executive IndiHome',
      avatar: SALES_AGENT_INFO.photoUrl,
    },
    publishDate: '12 Oktober 2026',
    readTime: '4 menit baca',
    isFeatured: false,
    keywords: [
      'paket internet 100 ribuan',
      'eznet promo terbatas',
      'telkomsel one 148k',
      'wifi rumah murah',
      'gratis biaya pasang indihome',
      'internet kabel murah 20 mbps'
    ],
    recommendedPackageId: 'tone-20',
    recommendedPackageName: 'Telkomsel One 20 Mbps (Rp 148.000/bln)',
    content: {
      intro: 'Kebutuhan internet rumah yang terjangkau semakin diminati oleh mahasiswa, pasangan muda, maupun keluarga kecil. Telkomsel meluncurkan paket fenomenal Telkomsel One 20 Mbps seharga Rp 148.000 per bulan. Simak apa saja yang Anda dapatkan.',
      tableOfContents: [
        { id: 'fitur-utama', title: 'Fitur Utama Paket 148K' },
        { id: 'kabel-bukan-wireless', title: '100% Kabel Fiber Optik (Bukan WiFi Portable)' },
        { id: 'perhitungan-biaya', title: 'Rincian Pengeluaran Bulan Pertama' },
        { id: 'cara-daftar-148k', title: 'Cara Klaim Promo Kuota Terbatas' },
      ],
      sections: [
        {
          id: 'fitur-utama',
          title: 'Fitur Utama Paket Rp 148.000 / Bulan',
          content: 'Dengan biaya langganan hanya Rp 148.000/bulan (belum PPN 11%), pelanggan mendapatkan paket komplit:',
          bulletPoints: [
            'Kecepatan WiFi 20 Mbps unlimited tanpa was-was kuota habis',
            'Bonus kuota data bersama 30 GB per bulan untuk nomor Telkomsel keluarga',
            'Bonus akses tayangan MAXstream',
            'GRATIS Biaya Pasang Baru (PSB Rp 0, hemat Rp 250.000)',
            'Peminjaman modem Optical Network Terminal (ONT) resmi Telkom',
          ],
        },
        {
          id: 'kabel-bukan-wireless',
          title: '100% Kabel Fiber Optik (Bukan WiFi Portable)',
          content: 'Berbeda dengan modem seluler portabel yang sinyalnya bergantung pada cuaca dan rentan drop di dalam ruangan, paket ini ditarik langsung menggunakan kabel serat optik dari tiang ODP Telkomsel terdekat, menjamin kestabilan koneksi 24 jam.',
          highlightBox: {
            title: 'Koneksi Stabil Anti Cuaca Buruk',
            text: 'Karena menggunakan kabel fiber optik langsung ke dalam rumah, koneksi tetap prima saat hujan deras maupun mendung tebal.',
            type: 'tip',
          },
        },
        {
          id: 'perhitungan-biaya',
          title: 'Rincian Pengeluaran Bulan Pertama',
          content: 'Banyak orang khawatir ada biaya siluman saat pasang internet. Pada paket promo 148K ini:',
          table: {
            headers: ['Komponen Biaya', 'Tarif Normal', 'Tarif Promo Spesial'],
            rows: [
              ['Biaya Pasang Baru (PSB)', 'Rp 250.000', 'GRATIS (Rp 0)'],
              ['Tarif Bulanan Paket', 'Rp 148.000', 'Rp 148.000'],
              ['PPN 11%', 'Rp 16.280', 'Rp 16.280'],
              ['Total Tagihan Pertama', 'Rp 414.280', 'Hanya Rp 164.280'],
            ],
          },
        },
        {
          id: 'cara-daftar-148k',
          title: 'Cara Klaim Promo Kuota Terbatas',
          content: 'Paket promo Rp 148.000 ini memiliki kuota slot terbatas di setiap area ODP. Segera kirimkan alamat lengkap Anda ke Mas Vicky agar dicek apakah tiang ODP di jalan rumah Anda masih memiliki port kosong.',
        },
      ],
      faq: [
        {
          question: 'Apakah paket 148K tersedia di seluruh Indonesia?',
          answer: 'Paket ini tersedia di hampir seluruh wilayah yang telah terjangkau jaringan fiber optik Telkomsel / IndiHome. Pengecekan titik tiang ODP diperlukan untuk memastikan ketersediaan port.',
        },
      ],
      conclusion: 'Paket Telkomsel One 20 Mbps 148K adalah solusi cerdas untuk menghemat pengeluaran bulanan tanpa mengorbankan kualitas jaringan internet rumah.',
      ctaNote: 'Slot ODP promo 148K cepat terisi. Amankan kuota promo Anda sekarang via WhatsApp Mas Vicky.',
    },
  },
  {
    id: 'tips-mengatasi-wifi-lemot-di-rumah',
    slug: 'tips-mengatasi-wifi-lemot-di-rumah',
    title: '5 Cara Mengatasi WiFi Lemot di Rumah & Tips Optimasi Router Fiber Optik',
    excerpt: 'Sinyal WiFi sering putus atau kecepatan drop saat di kamar? Terapkan 5 langkah mudah optimasi penempatan router, pemilihan frekuensi 5 GHz, dan trik agar jangkauan internet tembus tembok tebal.',
    category: 'Tips WiFi',
    author: {
      name: SALES_AGENT_INFO.name,
      role: 'Senior Sales Executive IndiHome',
      avatar: SALES_AGENT_INFO.photoUrl,
    },
    publishDate: '11 Oktober 2026',
    readTime: '5 menit baca',
    isFeatured: false,
    keywords: [
      'wifi lemot',
      'cara mengatasi wifi lambat',
      'posisi router wifi terbaik',
      'sinyal wifi tembus tembok',
      'frekuensi 5ghz vs 2.4ghz',
      'optimasi internet indihome'
    ],
    recommendedPackageId: 'stream-150',
    recommendedPackageName: 'IndiHome 150 Mbps (Upspeed 500 Mbps 6 Bulan)',
    content: {
      intro: 'Koneksi internet fiber optik yang masuk ke rumah Anda sebenarnya sangat kencang, namun seringkali sinyal radio WiFi yang dipancarkan modem terhambat oleh tata letak ruangan, perabotan, atau gangguan interferensi. Berikut 5 tips ampuh mengatasi WiFi lemot di rumah.',
      tableOfContents: [
        { id: 'posisi-router', title: '1. Letakkan Router di Area Terbuka dan Lebih Tinggi' },
        { id: 'frekuensi-band', title: '2. Gunakan Frekuensi 5 GHz untuk Jarak Dekat' },
        { id: 'hindari-interferensi', title: '3. Jauhkan dari Perangkat Elektronik Pengganggu' },
        { id: 'restart-modem', title: '4. Restart Modem Secara Berkala' },
        { id: 'upgrade-upspeed', title: '5. Manfaatkan Program Upspeed Resmi' },
      ],
      sections: [
        {
          id: 'posisi-router',
          title: '1. Letakkan Router di Area Terbuka dan Lebih Tinggi',
          content: 'Jangan menyembunyikan router di dalam lemari tv, di bawah kolong meja, atau di balik pintu. Gelombang radio WiFi memancar ke segala arah seperti kubah payung. Letakkan modem minimal setinggi 1 - 1,5 meter dari lantai di ruang tengah rumah.',
        },
        {
          id: 'frekuensi-band',
          title: '2. Gunakan Frekuensi 5 GHz untuk Kecepatan Maksimal',
          content: 'Modem IndiHome terbaru sudah mendukung Dual Band (2.4 GHz dan 5 GHz). Frekuensi 5 GHz memberikan kecepatan transfer data jauh lebih tinggi dan bebas macet, sangat pas untuk Smart TV, Laptop kerja, dan HP saat bermain game.',
          highlightBox: {
            title: 'Karakteristik Dual Band',
            text: '2.4 GHz memiliki jangkauan lebih jauh dan mampu menembus tembok tebal, sedangkan 5 GHz menawarkan kecepatan internet maksimal dengan latensi ultra rendah.',
            type: 'info',
          },
        },
        {
          id: 'hindari-interferensi',
          title: '3. Jauhkan dari Perangkat Elektronik Pengganggu',
          content: 'Gelombang mikro seperti microwave oven, telepon nirkabel rumah, speaker bluetooth besar, dan cermin tebal dapat memantulkan atau mengacaukan sinyal WiFi. Beri jarak minimal 1 meter antara router dengan barang-barang tersebut.',
        },
        {
          id: 'restart-modem',
          title: '4. Restart Modem Secara Berkala',
          content: 'Sama seperti smartphone dan laptop, router memiliki RAM internal. Mematikan modem selama 30 detik lalu menyalakannya kembali seminggu sekali akan membersihkan cache memori dan memilih kanal frekuensi paling jernih secara otomatis.',
        },
        {
          id: 'upgrade-upspeed',
          title: '5. Manfaatkan Program Upspeed Resmi',
          content: 'Bila anggota keluarga di rumah terus bertambah dan perangkat pintar (CCTV, Smart Lamp, Tablet) makin banyak, mungkin bandwidth paket lama Anda sudah tidak mencukupi. Manfaatkan paket promo baru dengan bonus lonjakan kecepatan (upspeed) otomatis hingga 500 Mbps.',
        },
      ],
      faq: [
        {
          question: 'Apakah menambah repeater WiFi bisa menyelesaikan masalah kamar belakang?',
          answer: 'Ya, penambahan WiFi Extender atau Mesh WiFi sangat efektif untuk rumah bertingkat atau rumah memanjang agar sinyal merata di setiap sudut.',
        },
      ],
      conclusion: 'Dengan menerapkan penempatan router yang tepat dan memilih frekuensi yang pas, performa WiFi IndiHome di rumah Anda akan terasa jauh lebih kencang dan stabil.',
      ctaNote: 'Butuh bantuan konsultasi kendala jaringan atau upgrade speed? Tim Sales Mas Vicky siap membantu.',
    },
  },
  {
    id: 'alur-dan-syarat-pasang-indihome-1-hari-aktif',
    slug: 'alur-dan-syarat-pasang-indihome-1-hari-aktif',
    title: 'Alur Pasang Baru IndiHome Langsung Aktif 1x24 Jam Bersama Sales Resmi',
    excerpt: 'Ingin internet rumah langsung aktif tanpa ribet antre di kantor cabang? Pelajari alur registrasi resmi lewat Sales Partner Vicky: cek port ODP, verifikasi KTP, hingga teknisi datang memasang kabel.',
    category: 'Panduan',
    author: {
      name: SALES_AGENT_INFO.name,
      role: 'Senior Sales Executive IndiHome',
      avatar: SALES_AGENT_INFO.photoUrl,
    },
    publishDate: '10 Oktober 2026',
    readTime: '4 menit baca',
    isFeatured: false,
    keywords: [
      'alur pasang indihome',
      'cara daftar indihome cepat',
      'sales resmi indihome',
      'pasang wifi 1 hari aktif',
      'cek odp telkomsel indihome',
      'registrasi pasang baru online'
    ],
    recommendedPackageId: 'stream-75',
    recommendedPackageName: 'IndiHome 75 Mbps',
    content: {
      intro: 'Banyak calon pelanggan ragu mendaftar online karena takut prosesnya berbelit-belit atau teknisi lama datang. Di website vickyindihomepusat, alur pendaftaran dirancang transparan, cepat, dan dikawal langsung oleh Sales Executive resmi hingga internet menyala di rumah Anda.',
      tableOfContents: [
        { id: 'tahap-1', title: 'Langkah 1: Cek Ketersediaan Titik Tiang ODP' },
        { id: 'tahap-2', title: 'Langkah 2: Pilih Paket & Konfirmasi Data KTP' },
        { id: 'tahap-3', title: 'Langkah 3: Input Sistem Telkom & Terbit Work Order (WO)' },
        { id: 'tahap-4', title: 'Langkah 4: Kunjungan Teknisi & Pemasangan Kabel' },
        { id: 'tahap-5', title: 'Langkah 5: Aktivasi & Tes Kecepatan di Tempat' },
      ],
      sections: [
        {
          id: 'tahap-1',
          title: 'Langkah 1: Cek Ketersediaan Titik Tiang ODP',
          content: 'Sebelum memasang, Sales Mas Vicky akan mengecek database Optical Distribution Point (ODP) Telkom di radius sekitar rumah Anda untuk memastikan ada port kosong yang siap dicolok kabel dropcore.',
        },
        {
          id: 'tahap-2',
          title: 'Langkah 2: Pilih Paket & Konfirmasi Data KTP',
          content: 'Pilih paket yang paling pas dengan anggaran Anda (misalnya Promo 148K, Paket 75 Mbps upspeed 200 Mbps, Paket Gamer, atau Paket Movie). Kirimkan foto KTP dan nomor telepon aktif untuk registrasi di server Telkom.',
        },
        {
          id: 'tahap-3',
          title: 'Langkah 3: Input Sistem Telkom & Terbit Work Order (WO)',
          content: 'Data Anda langsung diinput ke sistem sentral Telkomsel. Dalam waktu singkat, nomor registrasi (Sc Track) dan Surat Perintah Kerja (WO) diterbitkan ke tim teknisi lapangan area Anda.',
        },
        {
          id: 'tahap-4',
          title: 'Langkah 4: Kunjungan Teknisi & Pemasangan Kabel',
          content: 'Teknisi berseragam resmi Telkomsel akan menghubungi Anda terlebih dahulu untuk mengonfirmasi jadwal kedatangan, menarik kabel fiber dari tiang ke dalam rumah, dan memasang modem ONT.',
        },
        {
          id: 'tahap-5',
          title: 'Langkah 5: Aktivasi & Tes Kecepatan di Tempat',
          content: 'Setelah kabel terpasang rapi, modem akan diaktifkan secara online oleh tim pusat. Teknisi akan memandu Anda melakukan Speedtest langsung di HP Anda untuk memastikan kecepatan sesuai paket.',
        },
      ],
      faq: [
        {
          question: 'Apakah ada biaya tambahan yang harus dibayar langsung ke teknisi?',
          answer: 'Tidak ada biaya langsung kepada teknisi untuk pemasangan standar. Biaya pasang promo Rp 99.000 akan ditagihkan di tagihan bulan pertama melalui kanal resmi Telkom.',
        },
      ],
      conclusion: 'Pemasangan IndiHome bersama Sales Resmi Vicky menjamin kemudahan, kecepatan, dan pengawalan tuntas dari awal hingga koneksi WiFi menyala sempurna di rumah Anda.',
      ctaNote: 'Daftar sekarang dan nikmati proses pasang kilat bergaransi resmi. Hubungi Mas Vicky di 0821-1529-1198.',
    },
  },
];
