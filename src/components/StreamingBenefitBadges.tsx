import React, { useState } from 'react';
import { getStreamingAppInfo } from '../data/streamingLogos';

interface StreamingBenefitBadgesProps {
  apps: string[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'card' | 'dark' | 'light';
  showLabel?: boolean;
}

export const StreamingBenefitBadges: React.FC<StreamingBenefitBadgesProps> = ({
  apps,
  size = 'md',
  variant = 'card',
  showLabel = true,
}) => {
  if (!apps || apps.length === 0) return null;

  const sizeClasses = {
    sm: {
      container: 'h-6 px-2.5 py-0.5 gap-1.5 text-[10px]',
      img: 'h-4 max-w-[70px]',
      label: 'text-[10px]',
    },
    md: {
      container: 'h-8 px-3 py-1 gap-2 text-xs',
      img: 'h-5 max-w-[90px]',
      label: 'text-xs',
    },
    lg: {
      container: 'h-10 px-4 py-1.5 gap-2.5 text-xs sm:text-sm',
      img: 'h-6 max-w-[110px]',
      label: 'text-xs font-semibold',
    },
  }[size];

  const variantStyles = {
    card: 'bg-slate-900/90 border border-slate-700/80 text-white shadow-xs',
    dark: 'bg-slate-950/80 border border-slate-750 text-white shadow-sm',
    light: 'bg-white border border-slate-200 text-slate-800 shadow-2xs hover:border-slate-300',
  }[variant];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {apps.map((appName, index) => {
        const logoInfo = getStreamingAppInfo(appName);

        if (logoInfo) {
          return (
            <div
              key={`${appName}-${index}`}
              title={`Termasuk langganan ${logoInfo.name}`}
              className={`inline-flex items-center rounded-xl overflow-hidden transition-transform duration-150 hover:scale-105 select-none ${sizeClasses.container} ${variantStyles}`}
            >
              <img
                src={logoInfo.logoUrl}
                alt={logoInfo.alt}
                className={`${sizeClasses.img} object-contain shrink-0 rounded-xs ${
                  logoInfo.name === 'Vision+' ? 'pl-0.5 sm:pl-1' : ''
                }`}
                loading="lazy"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  e.currentTarget.style.display = 'none';
                  const nextSibling = e.currentTarget.nextElementSibling;
                  if (nextSibling) {
                    (nextSibling as HTMLElement).style.display = 'inline';
                  }
                }}
              />
              {showLabel && (
                <span className={`font-bold tracking-tight ${sizeClasses.label}`}>
                  {logoInfo.name}
                </span>
              )}
            </div>
          );
        }

        // Generic fallback for non-streaming apps (e.g. game apps or extra services)
        return (
          <div
            key={`${appName}-${index}`}
            className={`inline-flex items-center rounded-xl font-bold ${sizeClasses.container} ${variantStyles}`}
          >
            <span>{appName}</span>
          </div>
        );
      })}
    </div>
  );
};
