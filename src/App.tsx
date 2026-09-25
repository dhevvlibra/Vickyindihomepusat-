import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PromoBanner } from './components/PromoBanner';
import { InteractivePackageShowcase } from './components/InteractivePackageShowcase';
import { SpeedCalculator } from './components/SpeedCalculator';
import { CoverageCheck } from './components/CoverageCheck';
import { InstallationSteps } from './components/InstallationSteps';
import { WhyChooseVicky } from './components/WhyChooseVicky';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { RegistrationPage } from './components/RegistrationPage';
import { RegistrationReceiptModal } from './components/RegistrationReceiptModal';
import { MyRegistrationsModal } from './components/MyRegistrationsModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SalesPhotoModal } from './components/SalesPhotoModal';
import { GlobalClickEffect } from './components/GlobalClickEffect';
import { CustomerRegistration } from './types';
import { getSavedRegistrations } from './utils/helpers';

export default function App() {
  // Navigation view: 'home' or 'register'
  const [currentView, setCurrentView] = useState<'home' | 'register'>('home');
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>();
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<CustomerRegistration | null>(null);
  const [isMyRegsOpen, setIsMyRegsOpen] = useState(false);
  const [isSalesPhotoOpen, setIsSalesPhotoOpen] = useState(false);
  const [savedRegistrations, setSavedRegistrations] = useState<CustomerRegistration[]>([]);

  useEffect(() => {
    setSavedRegistrations(getSavedRegistrations());
  }, []);

  // When user clicks 'Pilih Paket' or 'Daftar'
  // Navigate directly to the dedicated registration page (starts with package confirmation)
  const handleOpenRegister = (packageId?: string) => {
    setSelectedPackageId(packageId);
    setCurrentView('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistrationSuccess = (newReg: CustomerRegistration) => {
    setActiveReceipt(newReg);
    setIsReceiptOpen(true);
    setSavedRegistrations(getSavedRegistrations());
  };

  const handleClearRegistrations = () => {
    localStorage.removeItem('vicky_indihome_registrations');
    setSavedRegistrations([]);
    setIsMyRegsOpen(false);
  };

  const handleSelectPackageFromHero = (_packageId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setTimeout(() => {
      const el = document.getElementById('katalog-paket');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleNavigate = (targetId: string) => {
    const cleanId = targetId.replace('#', '');
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(cleanId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 70);
    } else {
      const el = document.getElementById(cleanId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Global Interactive Click Ripple & Spring Animation */}
      <GlobalClickEffect />

      {/* Top Navbar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister(selectedPackageId)}
        onOpenMyRegistrations={() => setIsMyRegsOpen(true)}
        onOpenSalesPhoto={() => setIsSalesPhotoOpen(true)}
        onNavigateHome={handleBackToHome}
        onNavigate={handleNavigate}
        savedCount={savedRegistrations.length}
      />

      {/* VIEW 1: DEDICATED REGISTRATION & PACKAGE VERIFICATION PAGE */}
      {currentView === 'register' ? (
        <main className="flex-1">
          <RegistrationPage
            initialPackageId={selectedPackageId}
            onBackToHome={handleBackToHome}
            onSuccess={handleRegistrationSuccess}
          />
        </main>
      ) : (
        /* VIEW 2: MAIN HOMEPAGE / CATALOG */
        <main className="flex-1">
          {/* Hero Section with 3D Parallax router background */}
          <HeroSection
            onSelectPackage={handleSelectPackageFromHero}
            onOpenRegister={handleOpenRegister}
          />

          {/* Promo Flash Banner */}
          <PromoBanner onOpenRegister={() => handleOpenRegister()} />

          {/* Master-Detail Interactive Package Showcase */}
          <InteractivePackageShowcase
            onSelectPackage={(pkg) => handleOpenRegister(pkg.id)}
            onOpenRegister={handleOpenRegister}
          />

          {/* Interactive Speed Requirement Calculator */}
          <SpeedCalculator onOpenRegister={handleOpenRegister} />

          {/* Coverage & ODP Checker */}
          <CoverageCheck onOpenRegister={() => handleOpenRegister()} />

          {/* 4 Steps to Install & Requirements */}
          <InstallationSteps onOpenRegister={() => handleOpenRegister()} />

          {/* Why Choose Sales Vicky */}
          <WhyChooseVicky onOpenSalesPhoto={() => setIsSalesPhotoOpen(true)} />

          {/* Customer Testimonials */}
          <TestimonialsSection />

          {/* FAQ Section */}
          <FaqSection />
        </main>
      )}

      {/* Footer */}
      <Footer onOpenRegister={() => handleOpenRegister()} />

      {/* Floating WhatsApp Quick Contact Button */}
      <FloatingWhatsApp 
        onOpenRegister={() => handleOpenRegister()} 
        onOpenSalesPhoto={() => setIsSalesPhotoOpen(true)}
      />

      {/* Sales Photo Lightbox Modal */}
      <SalesPhotoModal
        isOpen={isSalesPhotoOpen}
        onClose={() => setIsSalesPhotoOpen(false)}
      />

      {/* Registration Success Receipt Modal */}
      <RegistrationReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => {
          setIsReceiptOpen(false);
          // Return to home upon closing receipt if currently in register view
          if (currentView === 'register') {
            setCurrentView('home');
          }
        }}
        registration={activeReceipt}
      />

      {/* My Registrations Modal */}
      <MyRegistrationsModal
        isOpen={isMyRegsOpen}
        onClose={() => setIsMyRegsOpen(false)}
        registrations={savedRegistrations}
        onClear={handleClearRegistrations}
        onSelectReceipt={(reg) => {
          setActiveReceipt(reg);
          setIsReceiptOpen(true);
        }}
      />
    </div>
  );
}
