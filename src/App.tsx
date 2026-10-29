import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './router/Router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SalesPhotoModal } from './components/SalesPhotoModal';
import { PromoHighlightModal, PromoFloatingTrigger } from './components/PromoHighlightModal';
import { RegistrationReceiptModal } from './components/RegistrationReceiptModal';
import { GlobalClickEffect } from './components/GlobalClickEffect';
import { AmbientBackground } from './components/AmbientBackground';

// Dedicated Full-Page Route Components
import { HomePage } from './pages/HomePage';
import { PackagesPage } from './pages/PackagesPage';
import { CoveragePage } from './pages/CoveragePage';
import { PromoPage } from './pages/PromoPage';
import { InstallationPage } from './pages/InstallationPage';
import { AboutSalesPage } from './pages/AboutSalesPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { FaqPage } from './pages/FaqPage';
import { HistoryPage } from './pages/HistoryPage';
import { SpeedCalculatorPage } from './components/SpeedCalculatorPage';
import { BlogPage } from './components/BlogPage';
import { RegistrationPage } from './components/RegistrationPage';

import { CustomerRegistration } from './types';
import { getSavedRegistrations } from './utils/helpers';

function MainApp() {
  const { pathname, params, navigate } = useRouter();
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<CustomerRegistration | null>(null);
  const [isSalesPhotoOpen, setIsSalesPhotoOpen] = useState(false);
  const [isPromoHighlightOpen, setIsPromoHighlightOpen] = useState(false);
  const [savedRegistrations, setSavedRegistrations] = useState<CustomerRegistration[]>([]);

  useEffect(() => {
    setSavedRegistrations(getSavedRegistrations());

    // Auto show 148K promo highlight modal when visitor first enters the site
    try {
      const isDismissed = sessionStorage.getItem('vicky_promo_148k_dismissed');
      if (!isDismissed) {
        const timer = setTimeout(() => {
          setIsPromoHighlightOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      const timer = setTimeout(() => {
        setIsPromoHighlightOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleRegistrationSuccess = (newReg: CustomerRegistration) => {
    setActiveReceipt(newReg);
    setIsReceiptOpen(true);
    setSavedRegistrations(getSavedRegistrations());
  };

  const handleClaimPromo = (pkgId: string) => {
    setIsPromoHighlightOpen(false);
    navigate(`/daftar?paket=${pkgId}`);
  };

  const handleViewAllPackagesFromPromo = () => {
    setIsPromoHighlightOpen(false);
    navigate('/paket');
  };

  // Render the appropriate dedicated page based on current route pathname
  const renderCurrentPage = () => {
    if (pathname === '/') {
      return (
        <HomePage
          onOpenPromoHighlight={() => setIsPromoHighlightOpen(true)}
          onOpenSalesPhoto={() => setIsSalesPhotoOpen(true)}
        />
      );
    }

    if (pathname.startsWith('/paket')) {
      return <PackagesPage />;
    }

    if (pathname.startsWith('/cek-area')) {
      return <CoveragePage />;
    }

    if (pathname.startsWith('/kalkulator')) {
      return (
        <SpeedCalculatorPage
          onBackToHome={() => navigate('/')}
          onOpenRegister={(pkgId) => navigate(pkgId ? `/daftar?paket=${pkgId}` : '/daftar')}
        />
      );
    }

    if (pathname.startsWith('/promo')) {
      return <PromoPage />;
    }

    if (pathname.startsWith('/alur-pasang')) {
      return <InstallationPage />;
    }

    if (pathname.startsWith('/tentang-vicky')) {
      return <AboutSalesPage onOpenSalesPhoto={() => setIsSalesPhotoOpen(true)} />;
    }

    if (pathname.startsWith('/testimoni')) {
      return <TestimonialsPage />;
    }

    if (pathname.startsWith('/faq')) {
      return <FaqPage />;
    }

    if (pathname.startsWith('/riwayat')) {
      return (
        <HistoryPage
          onSelectReceipt={(reg) => {
            setActiveReceipt(reg);
            setIsReceiptOpen(true);
          }}
        />
      );
    }

    if (pathname.startsWith('/blog')) {
      return (
        <BlogPage
          initialSlug={params.slug}
          onBackToHome={() => navigate('/')}
          onOpenRegister={(pkgId) => navigate(pkgId ? `/daftar?paket=${pkgId}` : '/daftar')}
        />
      );
    }

    if (pathname.startsWith('/daftar')) {
      return (
        <RegistrationPage
          onBackToHome={() => navigate('/')}
          onSuccess={handleRegistrationSuccess}
        />
      );
    }

    // Default fallback to HomePage
    return (
      <HomePage
        onOpenPromoHighlight={() => setIsPromoHighlightOpen(true)}
        onOpenSalesPhoto={() => setIsSalesPhotoOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-800 flex flex-col font-sans relative">
      {/* Dynamic Ambient High-Tech Fiber Background */}
      <AmbientBackground />

      {/* Global Interactive Click Wave Ripple */}
      <GlobalClickEffect />

      {/* Main Top Header Navbar */}
      <Navbar
        onOpenRegister={(pkgId) => navigate(pkgId ? `/daftar?paket=${pkgId}` : '/daftar')}
        onOpenMyRegistrations={() => navigate('/riwayat')}
        onOpenSalesPhoto={() => setIsSalesPhotoOpen(true)}
        onOpenPromoHighlight={() => setIsPromoHighlightOpen(true)}
        savedCount={savedRegistrations.length}
      />

      {/* Main Content: Dedicated Page */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp
        onOpenRegister={() => navigate('/daftar')}
        onOpenSalesPhoto={() => setIsSalesPhotoOpen(true)}
      />

      {/* Official Sales Photo & ID Lightbox Modal */}
      <SalesPhotoModal
        isOpen={isSalesPhotoOpen}
        onClose={() => setIsSalesPhotoOpen(false)}
      />

      {/* Digital Registration Receipt Modal */}
      <RegistrationReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        registration={activeReceipt}
      />

      {/* Automatic Promo Highlight Pop-up (148K Telkomsel One) */}
      <PromoHighlightModal
        isOpen={isPromoHighlightOpen}
        onClose={() => setIsPromoHighlightOpen(false)}
        onClaimPromo={handleClaimPromo}
        onViewAllPackages={handleViewAllPackagesFromPromo}
      />

      {/* Floating Promo Trigger (active on root or when popup closed) */}
      {!isPromoHighlightOpen && (
        <PromoFloatingTrigger onOpen={() => setIsPromoHighlightOpen(true)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <MainApp />
    </RouterProvider>
  );
}
