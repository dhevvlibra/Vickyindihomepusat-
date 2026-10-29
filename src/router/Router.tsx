import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface RouteInfo {
  path: string;
  title: string;
  description: string;
  breadcrumb: string;
}

export const ROUTES: Record<string, RouteInfo> = {
  home: {
    path: '/',
    title: 'Vicky IndiHome Pusat - Pasang Baru IndiHome Resmi & Cepat',
    description: 'Layanan resmi pasang baru internet IndiHome Telkomsel bersama Sales Vicky. Promo biaya pasang 99K, gratis modem WiFi, proses 1x24 jam.',
    breadcrumb: 'Beranda',
  },
  packages: {
    path: '/paket',
    title: 'Katalog Paket Internet IndiHome 2026 | Vicky IndiHome Pusat',
    description: 'Daftar harga resmi paket internet IndiHome 1P Internet Only, 2P TV/Telepon, 3P Triple Play, Telkomsel One 148K, dan Gamer 30 Mbps - 200 Mbps.',
    breadcrumb: 'Katalog Paket',
  },
  coverage: {
    path: '/cek-area',
    title: 'Cek Jangkauan Tiang ODP & Area Fiber IndiHome | Vicky IndiHome',
    description: 'Cek ketersediaan port fiber optik tiang ODP di alamat rumah Anda secara gratis dan cepat bersama Sales Resmi Vicky.',
    breadcrumb: 'Cek Jangkauan ODP',
  },
  calculator: {
    path: '/kalkulator',
    title: 'Kalkulator Kebutuhan Kecepatan WiFi IndiHome | Rekomendasi Akurat',
    description: 'Hitung kebutuhan Mbps internet rumah berdasarkan jumlah perangkat dan aktivitas (Streaming 4K, WFH, Gaming, CCTV).',
    breadcrumb: 'Kalkulator Speed',
  },
  register: {
    path: '/daftar',
    title: 'Formulir Pendaftaran Pasang Baru IndiHome Resmi | Sales Vicky',
    description: 'Daftar pasang baru WiFi IndiHome resmi langsung ke Sales Telkom tanpa perantara. Pembayaran resmi setelah pasang aktif.',
    breadcrumb: 'Formulir Pendaftaran',
  },
  promo: {
    path: '/promo',
    title: 'Promo Spesial IndiHome & Telkomsel One 148K | Vicky IndiHome',
    description: 'Kumpulan promo terbaru IndiHome: Paket Telkomsel One hemat 148K (Gratis PSB), diskon biaya pasang 99K, dan lonjakan kecepatan upspeed.',
    breadcrumb: 'Promo Spesial',
  },
  installation: {
    path: '/alur-pasang',
    title: 'Syarat & Alur Pemasangan WiFi IndiHome 1x24 Jam | Sales Vicky',
    description: 'Panduan lengkap syarat dokumen KTP, alur pendaftaran, jadwal teknisi datang, hingga cara pembayaran tagihan resmi Telkom.',
    breadcrumb: 'Alur & Syarat Pasang',
  },
  about: {
    path: '/tentang-vicky',
    title: 'Profil & Legalitas Sales Resmi Mas Vicky | PT Telkom Indonesia',
    description: 'Kenali Mas Vicky, Sales Executive resmi PT Telkom Indonesia dengan verifikasi ID badge, transparansi tarif tanpa biaya tersembunyi.',
    breadcrumb: 'Profil Sales Resmi',
  },
  testimonials: {
    path: '/testimoni',
    title: 'Testimoni & Bukti Pemasangan Pelanggan IndiHome | Mas Vicky',
    description: 'Lihat ulasan kepuasan pelanggan, foto bukti pemasangan aktif, dan testimoni kecepatan internet fiber optik rumah/kantor.',
    breadcrumb: 'Testimoni Pelanggan',
  },
  faq: {
    path: '/faq',
    title: 'Tanya Jawab Seputar IndiHome & Telkomsel One | FAQ Lengkap',
    description: 'Jawaban lengkap atas pertanyaan biaya pasang, beda 1P/2P/3P, sistem FUP, cara pembayaran tagihan, dan bantuan teknisi.',
    breadcrumb: 'Pusat Bantuan & FAQ',
  },
  blog: {
    path: '/blog',
    title: 'Blog & Panduan Edukasi WiFi IndiHome 2026 | Vicky IndiHome',
    description: 'Artikel panduan, tips WiFi cepat anti lemot, ulasan paket 20 Mbps - 200 Mbps, dan info promo Telkomsel One terkini.',
    breadcrumb: 'Blog & Edukasi',
  },
  history: {
    path: '/riwayat',
    title: 'Cek Riwayat Pendaftaran Pasang Baru | Vicky IndiHome',
    description: 'Lihat status dan nomor registrasi pasang baru IndiHome yang tersimpan di perangkat Anda.',
    breadcrumb: 'Riwayat Registrasi',
  },
};

interface RouterContextType {
  pathname: string;
  search: string;
  hash: string;
  params: Record<string, string>;
  navigate: (to: string, options?: { replace?: boolean; scroll?: boolean }) => void;
  goBack: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '') return '/';
  // Strip origin if full url passed
  let clean = rawPath.replace(/^(?:https?:\/\/[^/]+)/, '');
  if (!clean.startsWith('/')) clean = '/' + clean;
  // Strip trailing slash if not root
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean;
}

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState(() => ({
    pathname: normalizePath(window.location.pathname),
    search: window.location.search,
    hash: window.location.hash,
  }));

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentUrl({
        pathname: normalizePath(window.location.pathname),
        search: window.location.search,
        hash: window.location.hash,
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title and meta description based on route
  useEffect(() => {
    const cleanPath = currentUrl.pathname;
    let matchingRoute: RouteInfo | undefined;

    if (cleanPath === '/') {
      matchingRoute = ROUTES.home;
    } else if (cleanPath.startsWith('/paket')) {
      matchingRoute = ROUTES.packages;
    } else if (cleanPath.startsWith('/cek-area')) {
      matchingRoute = ROUTES.coverage;
    } else if (cleanPath.startsWith('/kalkulator')) {
      matchingRoute = ROUTES.calculator;
    } else if (cleanPath.startsWith('/daftar')) {
      matchingRoute = ROUTES.register;
    } else if (cleanPath.startsWith('/promo')) {
      matchingRoute = ROUTES.promo;
    } else if (cleanPath.startsWith('/alur-pasang')) {
      matchingRoute = ROUTES.installation;
    } else if (cleanPath.startsWith('/tentang-vicky')) {
      matchingRoute = ROUTES.about;
    } else if (cleanPath.startsWith('/testimoni')) {
      matchingRoute = ROUTES.testimonials;
    } else if (cleanPath.startsWith('/faq')) {
      matchingRoute = ROUTES.faq;
    } else if (cleanPath.startsWith('/blog')) {
      // Blog article detail handles its own specific article title, fallback to general blog
      matchingRoute = ROUTES.blog;
    } else if (cleanPath.startsWith('/riwayat')) {
      matchingRoute = ROUTES.history;
    }

    if (matchingRoute && !cleanPath.startsWith('/blog/')) {
      document.title = matchingRoute.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', matchingRoute.description);
      }
    }
  }, [currentUrl.pathname]);

  const navigate = useCallback((to: string, options?: { replace?: boolean; scroll?: boolean }) => {
    const scroll = options?.scroll !== false;
    let targetPath = to;
    let targetSearch = '';
    let targetHash = '';

    // Extract hash
    const hashIndex = targetPath.indexOf('#');
    if (hashIndex !== -1) {
      targetHash = targetPath.substring(hashIndex);
      targetPath = targetPath.substring(0, hashIndex);
    }

    // Extract search query
    const searchIndex = targetPath.indexOf('?');
    if (searchIndex !== -1) {
      targetSearch = targetPath.substring(searchIndex);
      targetPath = targetPath.substring(0, searchIndex);
    }

    const normalized = normalizePath(targetPath);
    const fullTarget = normalized + targetSearch + targetHash;

    if (options?.replace) {
      window.history.replaceState({}, '', fullTarget);
    } else {
      window.history.pushState({}, '', fullTarget);
    }

    setCurrentUrl({
      pathname: normalized,
      search: targetSearch,
      hash: targetHash,
    });

    if (scroll) {
      if (targetHash) {
        setTimeout(() => {
          const el = document.getElementById(targetHash.replace('#', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  // Compute params (e.g. /blog/:slug)
  const params: Record<string, string> = {};
  if (currentUrl.pathname.startsWith('/blog/')) {
    const slug = currentUrl.pathname.replace('/blog/', '').trim();
    if (slug) {
      params.slug = slug;
    }
  }

  return (
    <RouterContext.Provider
      value={{
        pathname: currentUrl.pathname,
        search: currentUrl.search,
        hash: currentUrl.hash,
        params,
        navigate,
        goBack,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
  scroll?: boolean;
  children: ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, replace, scroll, children, onClick, ...props }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If modifier keys pressed, let browser handle normal behavior (e.g. new tab)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to, { replace, scroll });
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
