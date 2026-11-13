import React, { useEffect, useRef } from 'react';

export const InteractiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Default focal point before pointer interaction
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.26;
    let currentX = targetX;
    let currentY = targetY;
    let isActive = false;
    let rafId = 0;

    const applyCoords = (x: number, y: number, active: boolean) => {
      el.style.setProperty('--mx', `${x.toFixed(1)}px`);
      el.style.setProperty('--my', `${y.toFixed(1)}px`);
      el.style.setProperty('--glow-strength', active ? '1' : '0.72');
    };

    applyCoords(currentX, currentY, false);

    if (prefersReducedMotion) {
      const onResize = () => {
        applyCoords(window.innerWidth * 0.5, window.innerHeight * 0.26, false);
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    const tick = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * 0.14;
      currentY += dy * 0.14;
      applyCoords(currentX, currentY, isActive);

      if (Math.abs(dx) > 0.25 || Math.abs(dy) > 0.25) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const scheduleTick = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isActive = true;
      scheduleTick();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
        isActive = true;
        scheduleTick();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
        isActive = true;
        scheduleTick();
      }
    };

    const handlePointerLeave = () => {
      isActive = false;
      scheduleTick();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050705]"
      style={
        {
          '--mx': '50vw',
          '--my': '26vh',
          '--glow-strength': '0.72',
        } as React.CSSProperties
      }
    >
      {/* Large Ambient Pistachio Blooms */}
      <div
        className="absolute -top-40 left-1/4 w-[46rem] h-[46rem] rounded-full blur-[150px] opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(190, 242, 100, 0.32) 0%, rgba(122, 179, 67, 0.12) 45%, transparent 72%)',
        }}
      />
      <div
        className="absolute -bottom-48 right-1/6 w-[40rem] h-[40rem] rounded-full blur-[150px] opacity-25"
        style={{
          background:
            'radial-gradient(circle, rgba(163, 230, 53, 0.28) 0%, rgba(122, 179, 67, 0.08) 48%, transparent 72%)',
        }}
      />

      {/* Base Pistachio Green Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(190, 242, 100, 0.085) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(190, 242, 100, 0.085) 1px, transparent 1px),
            linear-gradient(to right, rgba(190, 242, 100, 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(190, 242, 100, 0.14) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px, 36px 36px, 180px 180px, 180px 180px',
        }}
      />

      {/* Interactive Highlighted Pistachio Grid Masked Around Mouse / Touch */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: 'var(--glow-strength)',
          backgroundImage: `
            linear-gradient(to right, rgba(190, 242, 100, 0.34) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(190, 242, 100, 0.34) 1px, transparent 1px),
            radial-gradient(circle 1.5px at 0 0, rgba(190, 242, 100, 0.55) 100%, transparent 0)
          `,
          backgroundSize: '36px 36px, 36px 36px, 36px 36px',
          maskImage:
            'radial-gradient(circle 340px at var(--mx) var(--my), rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 45%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(circle 340px at var(--mx) var(--my), rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 45%, transparent 78%)',
        }}
      />

      {/* Interactive Big Pistachio Glow Following Mouse / Touch */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: 'var(--glow-strength)',
          background:
            'radial-gradient(620px circle at var(--mx) var(--my), rgba(190, 242, 100, 0.22), rgba(163, 230, 53, 0.09) 35%, rgba(122, 179, 67, 0.03) 58%, transparent 75%)',
        }}
      />

      {/* Subtle Edge Vignette for Depth & Contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(3, 5, 3, 0.65) 100%)',
        }}
      />
    </div>
  );
};
