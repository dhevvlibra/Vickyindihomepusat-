import React, { useEffect } from 'react';

export const GlobalClickEffect: React.FC = () => {
  useEffect(() => {
    let rippleCount = 0;

    const handleClick = (e: MouseEvent) => {
      // Don't create too many simultaneous elements
      if (rippleCount > 10) return;

      const x = e.clientX;
      const y = e.clientY;

      // Create outer ripple element
      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      
      // Determine color tone: subtle red/rose gradient ring
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = '42px';
      ripple.style.height = '42px';
      ripple.style.background = 'radial-gradient(circle, rgba(239, 68, 68, 0.28) 0%, rgba(245, 158, 11, 0.18) 50%, rgba(220, 38, 38, 0) 75%)';
      ripple.style.border = '1.5px solid rgba(239, 68, 68, 0.6)';
      ripple.style.boxShadow = '0 0 16px rgba(239, 68, 68, 0.35)';

      document.body.appendChild(ripple);
      rippleCount++;

      // If clicked on an image or photo container, add a spring pop animation
      const target = e.target as HTMLElement | null;
      if (target) {
        const photoEl = target.closest('img, .photo-pop-trigger') as HTMLElement | null;
        if (photoEl) {
          photoEl.style.animation = 'none';
          // Trigger reflow
          void photoEl.offsetWidth;
          photoEl.style.animation = 'photoClickPulse 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
      }

      setTimeout(() => {
        ripple.remove();
        rippleCount = Math.max(0, rippleCount - 1);
      }, 520);
    };

    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
};
