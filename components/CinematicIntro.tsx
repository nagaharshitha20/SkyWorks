import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface IntroProps {
  onComplete: () => void;
}

type Phase = 'loading' | 'video' | 'freeze' | 'fly' | 'done';

interface WordmarkBounds {
  x: number; y: number; w: number; h: number;
}

/* ──────────────────────────────────────────────────────────────────
   detectWordmarkBounds
   Draws the image onto an offscreen canvas and finds the tight
   bounding box of all bright pixels (lum > threshold) in the
   central scan zone. Returns image-space { x, y, w, h }.
────────────────────────────────────────────────────────────────── */
function detectWordmarkBounds(
  img: HTMLImageElement,
  threshold = 55,
  padPx = 16,
): WordmarkBounds {
  const cw = img.naturalWidth;
  const ch = img.naturalHeight;

  const oc  = document.createElement('canvas');
  oc.width  = cw;
  oc.height = ch;
  const ctx = oc.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, cw, ch);

  const data     = ctx.getImageData(0, 0, cw, ch).data;
  let minX = cw, maxX = 0, minY = ch, maxY = 0;

  // Limit scan to the region where the wordmark lives
  // (avoids noise at edges and blank areas)
  const scanT = Math.floor(ch * 0.25);
  const scanB = Math.floor(ch * 0.75);
  const scanL = Math.floor(cw * 0.15);
  const scanR = Math.floor(cw * 0.85);

  for (let y = scanT; y < scanB; y++) {
    for (let x = scanL; x < scanR; x++) {
      const i   = (y * cw + x) * 4;
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      if (lum > threshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Graceful fallback using known approximate coords for this specific frame
  if (maxX <= minX || maxY <= minY || (maxX - minX) < 50) {
    minX = Math.floor(cw * 0.262);
    maxX = Math.floor(cw * 0.738);
    minY = Math.floor(ch * 0.385);
    maxY = Math.floor(ch * 0.615);
  }

  return {
    x: Math.max(0,  minX - padPx),
    y: Math.max(0,  minY - padPx),
    w: Math.min(cw - Math.max(0, minX - padPx), maxX - minX + padPx * 2),
    h: Math.min(ch - Math.max(0, minY - padPx), maxY - minY + padPx * 2),
  };
}

/* ──────────────────────────────────────────────────────────────────
   renderWordmarkToCanvas
   Paints the exact wordmark region from `img` into `dest` canvas.
   Uses devicePixelRatio for crisp rendering on HiDPI screens.
────────────────────────────────────────────────────────────────── */
function renderWordmarkToCanvas(
  img: HTMLImageElement,
  bounds: WordmarkBounds,
  dest: HTMLCanvasElement,
  dpr: number,
) {
  dest.width  = Math.round(bounds.w * dpr);
  dest.height = Math.round(bounds.h * dpr);
  const ctx = dest.getContext('2d')!;
  ctx.scale(dpr, dpr);
  ctx.drawImage(
    img,
    bounds.x, bounds.y, bounds.w, bounds.h,
    0,        0,        bounds.w, bounds.h,
  );
}

/* ──────────────────────────────────────────────────────────────────
   computeCoverLayout
   Given an img element using object-fit:cover, returns the
   rendered scale and the offset of the image within its container.
────────────────────────────────────────────────────────────────── */
function computeCoverLayout(img: HTMLImageElement) {
  const rect  = img.getBoundingClientRect();
  const nw    = img.naturalWidth;
  const nh    = img.naturalHeight;
  const scale = Math.max(rect.width / nw, rect.height / nh);
  return {
    scale,
    offsetLeft: rect.left + (rect.width  - nw * scale) / 2,
    offsetTop:  rect.top  + (rect.height - nh * scale) / 2,
    rect,
  };
}

/* ══════════════════════════════════════════════════════════════════
   CinematicIntro
   ══════════════════════════════════════════════════════════════════ */
export default function CinematicIntro({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState<Phase>('loading');

  const containerRef  = useRef<HTMLDivElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const frameImgRef   = useRef<HTMLImageElement>(null);
  const flyCanvasRef  = useRef<HTMLCanvasElement>(null);

  // Data shared between effects
  const loadedImg  = useRef<HTMLImageElement | null>(null);
  const bounds     = useRef<WordmarkBounds | null>(null);
  const holdTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tlRef      = useRef<gsap.core.Timeline | null>(null);

  /* ── 0. Preload the freeze frame ─────────────────────────────── */
  useEffect(() => {
    const img  = new Image();
    img.src    = '/Final_frame.jpeg';
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      loadedImg.current = img;
      bounds.current    = detectWordmarkBounds(img);
      setPhase('video');
    };
    img.onerror = () => setPhase('video'); // still attempt video
  }, []);

  /* ── 1. Video ended → freeze ─────────────────────────────────── */
  const handleVideoEnded = useCallback(() => setPhase('freeze'), []);
  const handleVideoError = useCallback(() => {
    // Can't play video — jump to freeze after a brief hold
    const t = setTimeout(() => setPhase('freeze'), 500);
    holdTimer.current = t;
  }, []);

  /* ── 2. Freeze → position fly-canvas → schedule flight ───────── */
  useEffect(() => {
    if (phase !== 'freeze') return;

    // Use two rAF ticks to guarantee the freeze <img> is painted + laid out
    let raf1: number, raf2: number;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const img       = loadedImg.current;
        const flyCanvas = flyCanvasRef.current;
        const freezeImg = frameImgRef.current;
        if (!img || !flyCanvas || !freezeImg || !bounds.current) return;

        const dpr = window.devicePixelRatio || 1;

        // Render the exact wordmark pixels into the fly canvas
        renderWordmarkToCanvas(img, bounds.current, flyCanvas, dpr);

        // Compute where those pixels appear on screen
        const layout = computeCoverLayout(freezeImg);
        const b      = bounds.current;

        const screenL = layout.offsetLeft + b.x * layout.scale;
        const screenT = layout.offsetTop  + b.y * layout.scale;
        const screenW = b.w * layout.scale;
        const screenH = b.h * layout.scale;

        // Size + position the fly canvas to overlay the exact wordmark region
        flyCanvas.style.width  = `${screenW}px`;
        flyCanvas.style.height = `${screenH}px`;
        flyCanvas.style.left   = `${screenL}px`;
        flyCanvas.style.top    = `${screenT}px`;
        flyCanvas.style.opacity = '1';

        // Hold the freeze frame, then fly
        holdTimer.current = setTimeout(() => setPhase('fly'), 750);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (holdTimer.current) clearTimeout(holdTimer.current);
    };
  }, [phase]);

  /* ── 3. Fly ──────────────────────────────────────────────────── */
  useEffect(() => {
    if (phase !== 'fly') return;

    const flyCanvas = flyCanvasRef.current;
    const freezeImg = frameImgRef.current;
    const container = containerRef.current;
    if (!flyCanvas || !freezeImg || !container) return;

    const navLogo = document.querySelector<HTMLElement>('[data-nav-logo]');
    if (!navLogo) { onComplete(); return; }

    const canvasRect = flyCanvas.getBoundingClientRect();
    const navRect    = navLogo.getBoundingClientRect();

    // Scale that makes the canvas width match the nav logo width
    const finalScale = navRect.width / canvasRect.width;

    // Delta from canvas center to nav logo center
    const cCx  = canvasRect.left + canvasRect.width  / 2;
    const cCy  = canvasRect.top  + canvasRect.height / 2;
    const nCx  = navRect.left    + navRect.width     / 2;
    const nCy  = navRect.top     + navRect.height    / 2;
    const dx   = nCx - cCx;
    const dy   = nCy - cCy;

    // Hide the real navbar logo — the flying canvas will cover it
    gsap.set(navLogo, { opacity: 0, pointerEvents: 'none' });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(navLogo, { opacity: 1, pointerEvents: 'auto', clearProps: 'opacity,pointerEvents' });
        setPhase('done');
        onComplete();
      },
    });
    tlRef.current = tl;

    // a. Fade out the freeze-frame background → homepage visible beneath
    tl.to(freezeImg, {
      opacity: 0,
      duration: 0.85,
      ease: 'power2.inOut',
    }, 0);

    // b. Dissolve the dark overlay of the container so the page shows through
    tl.to(container, {
      backgroundColor: 'rgba(1,3,6,0)',
      duration: 0.85,
      ease: 'power2.inOut',
    }, 0);

    // c. Fly the wordmark canvas — power4.inOut = Apple / aerospace premium easing
    tl.to(flyCanvas, {
      x: dx,
      y: dy,
      scale: finalScale,
      transformOrigin: 'center center',
      duration: 1.1,
      ease: 'power4.inOut',
    }, 0.05);

    // d. Subtle motion-blur midway (peaks at 50% travel, clears by end)
    tl.to(flyCanvas, {
      filter: 'blur(0.6px)',
      duration: 0.3,
      ease: 'power1.in',
      yoyo: true,
      repeat: 1,
    }, 0.2);

    // e. Crossfade: fly canvas fades out exactly as nav logo fades in
    //    This window is short (0.15s) — imperceptible to the eye.
    tl.to(flyCanvas, {
      opacity: 0,
      duration: 0.15,
      ease: 'power1.in',
    }, 1.05);

    tl.to(navLogo, {
      opacity: 1,
      duration: 0.15,
      ease: 'power1.out',
    }, 1.05);

    return () => { tl.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  /* ── Cleanup on unmount ──────────────────────────────────────── */
  useEffect(() => {
    return () => {
      tlRef.current?.kill();
      if (holdTimer.current) clearTimeout(holdTimer.current);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#010306',
        overflow: 'hidden',
        // Disable pointer events during flight so the page underneath is interactive-ready
        pointerEvents: phase === 'fly' ? 'none' : 'auto',
      }}
    >
      {/* ── Drone Video ───────────────────────────────────────── */}
      {(phase === 'loading' || phase === 'video') && (
        <video
          ref={videoRef}
          src="/Drone_BG.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          onError={handleVideoError}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
      )}

      {/* ── Freeze Frame ─────────────────────────────────────── */}
      {(phase === 'freeze' || phase === 'fly') && (
        <img
          ref={frameImgRef}
          src="/Final_frame.jpeg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 2,
            display: 'block',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ── Fly Canvas ───────────────────────────────────────────
          Pixel-extracted wordmark. Starts hidden (opacity 0),
          JS sets its position + reveals it in the freeze effect.
          GSAP moves it to the navbar.
      ─────────────────────────────────────────────────────────── */}
      <canvas
        ref={flyCanvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          zIndex: 10,
          opacity: 0,             // revealed by JS once positioned
          pointerEvents: 'none',
          transformOrigin: 'center center',
          display: phase === 'loading' || phase === 'video' ? 'none' : 'block',
          // Crisp image rendering — prevents bilinear blurring when scaling down
          imageRendering: 'auto',
        }}
      />
    </div>
  );
}
