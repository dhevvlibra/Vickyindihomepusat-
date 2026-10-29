import React from 'react';

/**
 * AmbientBackground Component
 * Provides a dynamic, high-tech fiber-optic ambient background with:
 * - Subtle geometric dot matrix and circuit grid
 * - Soft glowing Telkom red, blue, and amber ambient orbs
 * - Animated fiber optic light trails and data pulses
 * - Full WCAG AA contrast preservation and zero interference with header photos
 */
export const AmbientBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Base Gradient Foundation */}
      <div className="absolute inset-0 bg-[#f8fafc]" />

      {/* 2. Micro Dot Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #94a3b8 1.2px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* 3. Subtle Digital Grid Crossbars */}
      <div 
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(203, 213, 225, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(203, 213, 225, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '112px 112px',
        }}
      />

      {/* 4. Ambient Glowing Energy Orbs (Breathing & Floating) */}
      {/* Orb 1: Telkom Crimson / Rose (Top Right) */}
      <div 
        className="absolute -top-32 -right-32 w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full blur-3xl animate-fiber-orb-1"
        style={{
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.09) 0%, rgba(244, 63, 94, 0.04) 45%, transparent 70%)',
        }}
      />

      {/* Orb 2: Optical Fiber Blue / Indigo (Mid-Page Left) */}
      <div 
        className="absolute top-[28%] -left-36 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full blur-3xl animate-fiber-orb-2"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.035) 50%, transparent 75%)',
        }}
      />

      {/* Orb 3: Radiant Telkom Red Accent (Mid-Page Right) */}
      <div 
        className="absolute top-[58%] -right-40 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full blur-3xl animate-fiber-orb-3"
        style={{
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.07) 0%, rgba(251, 113, 133, 0.03) 50%, transparent 75%)',
        }}
      />

      {/* Orb 4: Warm Sunlight / Amber Energy (Bottom Left) */}
      <div 
        className="absolute bottom-10 -left-20 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full blur-3xl animate-fiber-orb-1"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, rgba(239, 68, 68, 0.025) 50%, transparent 75%)',
        }}
      />

      {/* 5. Elegant SVG Fiber Optic Stream Lines & Connection Nodes */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fiberGradRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.02" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
          </linearGradient>

          <linearGradient id="fiberGradBlue" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.02" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>

          <filter id="fiberGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Diagonal high-speed optical curves across the canvas */}
        <path
          d="M -100 250 C 300 180, 600 480, 1100 360 S 1800 600, 2200 400"
          fill="none"
          stroke="url(#fiberGradRed)"
          strokeWidth="1.5"
          className="fiber-stream-line"
        />

        <path
          d="M -100 650 C 400 780, 800 520, 1300 700 S 1900 620, 2300 850"
          fill="none"
          stroke="url(#fiberGradBlue)"
          strokeWidth="1.5"
          className="fiber-stream-line-reverse"
        />

        <path
          d="M -50 1150 C 350 980, 750 1280, 1250 1100 S 1850 1350, 2250 1180"
          fill="none"
          stroke="url(#fiberGradRed)"
          strokeWidth="1.5"
          className="fiber-stream-line"
        />

        {/* Pulsing optical network nodes */}
        <circle cx="280" cy="220" r="3.5" fill="#ef4444" opacity="0.3" className="animate-ping" style={{ animationDuration: '4s' }} />
        <circle cx="280" cy="220" r="2" fill="#ef4444" opacity="0.6" />

        <circle cx="950" cy="410" r="3.5" fill="#3b82f6" opacity="0.3" className="animate-ping" style={{ animationDuration: '5s' }} />
        <circle cx="950" cy="410" r="2" fill="#3b82f6" opacity="0.6" />

        <circle cx="1520" cy="650" r="3.5" fill="#ef4444" opacity="0.3" className="animate-ping" style={{ animationDuration: '6s' }} />
        <circle cx="1520" cy="650" r="2" fill="#ef4444" opacity="0.6" />
      </svg>

      {/* 6. Subtle Vignette Edge Masking for Smooth Peripheral Focus */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(248, 250, 252, 0.4) 100%)',
        }}
      />
    </div>
  );
};
