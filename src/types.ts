export interface PackageOption {
  monthlyPrice: number;
  formattedPrice: string;
  kuotaKeluarga?: string;
  ctaMessage?: string;
}

export interface TelkomselOneTier {
  id: string;
  name: string;
  speedMbps: number;
  upspeedMbps: number;
  upspeedDuration: string;
  priceNote: string;
  idealFor: string;
  deviceRecommendation: string;
  isBestSeller?: boolean;
  tag?: string;
  includedApps: string[];
  options: {
    [key: string]: PackageOption;
  };
  perks: string[];
}

export interface PackageItem {
  id: string;
  name: string;
  speedMbps: number;
  upspeedMbps?: number;
  upspeedDuration?: string;
  category: string;
  categoryLabel: string;
  monthlyPrice: number;
  formattedPrice: string;
  priceNote: string;
  kuotaKeluarga?: string;
  includedApps?: string[];
  idealFor: string;
  deviceRecommendation: string;
  isBestSeller?: boolean;
  tag?: string;
  perks: string[];
  ctaMessage: string;
}

// Backward-compatible InternetPackage alias/interface used by components
export interface InternetPackage {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  speed: number; // in Mbps
  speedLabel: string;
  pricePromo: number; // in IDR
  priceNormal: number; // in IDR
  fup: string;
  bestFor: string;
  deviceCount: string;
  features: string[];
  ottBonus?: string[];
  isPopular?: boolean;
  isPromo?: boolean;
  badge?: string;
  description: string;
  upspeedMbps?: number;
  upspeedDuration?: string;
  priceNote?: string;
  kuotaKeluarga?: string;
  ctaMessage?: string;
}

export interface CustomerRegistration {
  id: string;
  fullName: string;
  whatsapp: string;
  email?: string;
  packageId: string;
  packageName: string;
  speed: number;
  pricePromo: number;
  fullAddress: string;
  landmark: string;
  city: string;
  installationDate: string;
  installationTimeSlot: string;
  notes?: string;
  status: 'pending' | 'verified' | 'technician_assigned' | 'completed';
  createdAt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  packageUsed: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}
