import React, { forwardRef, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  sectionContainer, fadeUp, headingReveal, cardReveal,
  imageReveal, inViewProps,
} from './ui/motion';

gsap.registerPlugin(ScrollTrigger);

/*
  ═══════════════════════════════════════════════════════════════════
  CINEMATIC HERO — Apple / Tesla / IdeaForge-style shrink hero
  ───────────────────────────────────────────────────────────────────
  DOM HIERARCHY (strict — no floats / no negative margins):
    <section id="hero">            ← pinned by ScrollTrigger
      <video />                   ← z-index: 1
      <div.overlay />             ← z-index: 20 (gradient darken)
      <div.hero-content />        ← z-index: 30 (heading + CTA)
      <div.scroll-cue />          ← z-index: 40
    </section>

    <section id="stats" />        ← normal flow, z-index: auto
    <section id="innovation" />   ← normal flow

  ANIMATION:
  • Hero section is pinned for 150vh of scroll travel.
  • The outer <section> starts at height: 100vh.
  • clip-path: inset() trims EQUAL amounts from top AND bottom.
  • Content (heading + CTA) is centered in the full 100vh space
    and ALSO clips with the section — it can never overflow.
  • Content scale: 1 → 0.72 for proportional cinematic compression.
  • Final visible band ≈ 65vh (15% top + 15% bottom → 70vh, then 17.5% each → 65vh).
  • Stats section scrolls up naturally after pin releases — zero overlap.
  ═══════════════════════════════════════════════════════════════════
*/

function CinematicHero({ introFinished }: { introFinished: boolean }) {
  const sectionRef   = useRef<HTMLElement>(null);
  const clipWrapRef  = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const cueRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section  = sectionRef.current;
    const clipWrap = clipWrapRef.current;
    const content  = contentRef.current;
    const cue      = cueRef.current;
    if (!section || !clipWrap || !content || !cue) return;

    // ── Initial state: full-screen, no clip ────────────────────────
    gsap.set(clipWrap, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      willChange: 'clip-path',
    });
    gsap.set(content, { scale: 1, willChange: 'transform' });
    gsap.set(cue, { opacity: 1, willChange: 'opacity' });

    // ── Master timeline pinned to the hero section ─────────────────
    // 'end: +=150%' — hero stays pinned for 1.5× viewport of scroll.
    // scrub: 1.0 — smooth but responsive feel.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1.0,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // Ensure the pinned spacer does not cause the stats section
        // to float over the hero — ScrollTrigger handles this with
        // pinSpacing: true (default). Do NOT override to false.
        pinSpacing: true,
      },
    });

    // ─── Phase 1 (0 → 0.6): letterbox compress + content scale ───
    // clip equally from top AND bottom: 0% → 17.5% each side
    // → 100vh visible → ~65vh visible. Meets 65-70vh requirement.
    tl
      .to(clipWrap, {
        clipPath: 'inset(17.5% 0% 17.5% 0% round 20px)',
        duration: 0.6,
        ease: 'power2.inOut',
      }, 0)

      // Content scales proportionally to the letterbox compression
      .to(content, {
        scale: 0.72,
        duration: 0.6,
        ease: 'power2.inOut',
      }, 0)

      // Scroll cue fades out quickly
      .to(cue, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      }, 0)

      // ─── Phase 2 (0.6 → 1.0): hold — video stays compressed ───
      // This gives a "pause" before the pin releases so that the
      // stats section scrolls up smoothly into view beneath.
      .to({}, { duration: 0.4 }, 0.6);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.set([clipWrap, content, cue], { clearProps: 'all' });
    };
  }, []);

  // ── Mount animation (framer-motion stagger) ────────────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: introFinished ? 0.2 : 0.65,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };


  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const h = e.currentTarget.getAttribute('href');
    if (h) window.location.hash = h;
  };

  return (
    /*
      ┌──────────────────────────────────────────────────────────────┐
      │  <section id="hero">                                         │
      │    The ONLY element that gets pinned by ScrollTrigger.       │
      │    overflow:hidden ensures content never bleeds out.         │
      │    position:relative is required for absolute children.      │
      │    z-index is NOT set here — stays in normal stacking ctx.   │
      └──────────────────────────────────────────────────────────────┘
    */
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#050505',
      }}
    >
      {/*
        ┌────────────────────────────────────────────────────────────┐
        │  CLIP-PATH WRAPPER                                         │
        │  Receives the GSAP clip-path: inset() animation.           │
        │  Contains: video, gradient overlays, hero content.         │
        │  Everything inside clips together — content never leaks.   │
        └────────────────────────────────────────────────────────────┘
      */}
      <div
        ref={clipWrapRef}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* ── BACKGROUND VIDEO ── z-index: 1 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <source src="/Background.mp4" type="video/mp4" />
        </video>

        {/* ── HERO OVERLAY (gradient darken) ── z-index: 20 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.75) 100%)',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />
        {/* Side vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%)',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />
        {/* Subtle scan-line texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,1) 3px,rgba(255,255,255,1) 4px)',
            pointerEvents: 'none',
            zIndex: 21,
          }}
        />

        {/* ── HUD CORNER BRACKETS ── */}
        {([
          { top: 12, left: 12,  borderTop: '2px solid rgba(255,214,0,0.4)',    borderLeft:   '2px solid rgba(255,214,0,0.4)'  },
          { top: 12, right: 12, borderTop: '2px solid rgba(255,214,0,0.4)',    borderRight:  '2px solid rgba(255,214,0,0.4)'  },
          { bottom: 12, left: 12,  borderBottom: '2px solid rgba(255,214,0,0.4)', borderLeft:  '2px solid rgba(255,214,0,0.4)'  },
          { bottom: 12, right: 12, borderBottom: '2px solid rgba(255,214,0,0.4)', borderRight: '2px solid rgba(255,214,0,0.4)'  },
        ] as React.CSSProperties[]).map((extra, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 16,
              height: 16,
              pointerEvents: 'none',
              zIndex: 25,
              ...extra,
            }}
          />
        ))}

        {/* ── GPS STRIP ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 25,
            fontFamily: 'monospace',
            fontSize: 'clamp(7px, 0.7vw, 9px)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.18)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          23.7491° N · 80.3286° E · ALT 450m
        </div>

        {/*
          ┌──────────────────────────────────────────────────────────┐
          │  HERO CONTENT (heading + CTA)                            │
          │  Centered in the full 100vh space via flex.              │
          │  GSAP scales this to 0.72× during compression.           │
          │  Lives inside the clip-path wrapper → clips with video.  │
          │  z-index: 30 per spec.                                   │
          └──────────────────────────────────────────────────────────┘
        */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30,
            pointerEvents: 'none',
          }}
        >
          <div
            ref={contentRef}
            style={{
              width: '100%',
              padding: '0 clamp(20px, 5vw, 80px)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transformOrigin: 'center center',
              pointerEvents: 'auto',
            }}
          >
            <motion.div
              className="flex flex-col items-center w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* ── BADGE ── */}
              <motion.div
                variants={itemVariants}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 16px',
                  border: '1px solid rgba(255,214,0,0.45)',
                  borderRadius: 2,
                  background: 'rgba(255,214,0,0.08)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 0 20px rgba(255,214,0,0.1)',
                  marginBottom: 20,
                  color: '#FFD600',
                  fontWeight: 700,
                  fontSize: 'clamp(8px, 1vw, 11px)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}
              >
                <motion.span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#FFD600',
                    flexShrink: 0,
                    display: 'inline-block',
                  }}
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.5, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                Next-Gen Aviation · SkyWorks
              </motion.div>

              {/* ── HEADLINE ── */}
              <motion.h1
                variants={itemVariants}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(36px, 8vw, 96px)',
                  letterSpacing: '-0.01em',
                  lineHeight: 0.92,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  textShadow: '0 4px 32px rgba(0,0,0,0.7), 0 1px 0 rgba(0,0,0,0.9)',
                  marginBottom: 16,
                }}
              >
                The Future of<br />
                <span
                  style={{
                    color: '#FFD600',
                    textShadow: '0 0 48px rgba(255,214,0,0.5), 0 4px 24px rgba(0,0,0,0.6)',
                  }}
                >
                  Intelligent Drones
                </span>
              </motion.h1>

              {/* ── DESCRIPTION ── */}
              <motion.p
                variants={itemVariants}
                style={{
                  color: 'rgba(255,255,255,0.80)',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  fontSize: 'clamp(12px, 1.5vw, 18px)',
                  lineHeight: 1.65,
                  marginBottom: 28,
                  maxWidth: 560,
                }}
              >
                Precision-engineered aerial systems custom-built for delivery,
                mapping&nbsp;&amp; high-endurance industrial applications.
              </motion.p>

              {/* ── CTAs ── */}
              <motion.div
                variants={itemVariants}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <motion.a
                  href="#contact"
                  onClick={handleNavigate}
                  className="btn-primary cursor-pointer"
                  style={{ whiteSpace: 'nowrap' }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(255,214,0,0.4)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                >
                  Get a Quote
                </motion.a>
                <motion.a
                  href="#products"
                  onClick={handleNavigate}
                  className="btn-dark-outline cursor-pointer"
                  style={{ whiteSpace: 'nowrap' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                >
                  Explore Fleet
                </motion.a>
              </motion.div>

              {/* ── LIVE STATUS STRIP ── */}
              <motion.div
                variants={itemVariants}
                style={{
                  marginTop: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  fontSize: 'clamp(8px, 0.85vw, 10px)',
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.2em',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <motion.span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#4ade80',
                      display: 'inline-block',
                    }}
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  Systems Online
                </span>
                <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
                <span>Fleet Active</span>
                <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
                <span>50+ Missions</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>{/* end clipWrapRef */}

      {/*
        SCROLL CUE — outside clipWrapRef so it stays visible
        at the physical bottom of the pinned section viewport.
        Fades out as soon as scrolling begins.
      */}
      <div
        ref={cueRef}
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          zIndex: 40,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontSize: 9,
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
        >
          <div
            style={{
              width: 1,
              height: 28,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.55), transparent)',
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              transform: 'rotate(45deg)',
              border: '1px solid rgba(255,255,255,0.45)',
              boxShadow: '0 0 8px rgba(255,255,255,0.15)',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}


// ─── OVERLAY (page shell) ──────────────────────────────────────────────────
export const Overlay = forwardRef<HTMLDivElement, { introFinished?: boolean }>((props, ref) => {
  const { introFinished = true } = props;

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetHash = e.currentTarget.getAttribute('href');
    if (targetHash) window.location.hash = targetHash;
  };

  return (
    /*
      ROOT SHELL — normal document flow.
      Each major block is a distinct <section> in the DOM.
      No negative margins. No absolute positioning between sections.
      z-index only used inside the hero for video/overlay/content layering.
    */
    <div ref={ref} className="w-full bg-white text-gray-mid font-sans antialiased">

      {/*
        ┌─────────────────────────────────────────────────────────────┐
        │  1. HERO SECTION                                            │
        │     Self-contained: video + overlay + content               │
        │     Pinned by ScrollTrigger. Stats section is NOT inside.   │
        └─────────────────────────────────────────────────────────────┘
      */}
      <CinematicHero introFinished={introFinished} />

      {/*
        ┌─────────────────────────────────────────────────────────────┐
        │  2. STATS SECTION                                           │
        │     Normal document flow — appears AFTER the hero.          │
        │     No negative margin. No absolute positioning.            │
        │     z-index: auto — never floats over hero.                 │
        │     Scrolls naturally upward from below after pin releases. │
        └─────────────────────────────────────────────────────────────┘
      */}
      <section
        id="stats"
        style={{
          position: 'relative',
          zIndex: 'auto',
          width: '100%',
          background: '#ffffff',
          borderTop: '3px solid #FFD600',
        }}
        className="py-14"
      >
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={sectionContainer}
          {...inViewProps}
        >
          {[
            { val: '50',  suffix: '+', label: 'Projects Completed' },
            { val: '500', suffix: '+', label: 'Flight Hours'       },
            { val: '10',  suffix: '+', label: 'Clients Served'     },
            { val: '99',  suffix: '%', label: 'Reliability'        },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={cardReveal}
              className="card-light py-10 px-6 text-center flex flex-col items-center justify-center cursor-pointer group"
            >
              <span className="text-4xl md:text-5xl font-condensed font-extrabold text-black group-hover:text-yellow transition-colors duration-300">
                {stat.val}<span className="text-yellow">{stat.suffix}</span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-mid mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── 3. INNOVATIONS SHOWCASE ─── */}
      <motion.section
        className="py-20 sm:py-24 bg-white"
        variants={sectionContainer}
        {...inViewProps}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={cardReveal}
            className="overflow-hidden card-light p-0 shadow-md flex flex-col md:flex-row items-stretch min-h-[480px]"
          >
            {/* Left text — padded */}
            <div className="w-full md:w-[45%] flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <motion.span variants={fadeUp} className="section-eyebrow mb-3">— Innovations</motion.span>
              <motion.h2 variants={headingReveal} className="text-[28px] sm:text-[36px] md:text-[44px] font-condensed font-extrabold text-black uppercase mb-5 leading-tight">
                Innovations &amp;<br />Breakthroughs
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-mid text-base mb-8 leading-relaxed">
                The ultra-portable SkyVision platform features high-end flight performance and functionality for limitless exploration.
              </motion.p>
              <motion.a href="#missions" onClick={handleNavigate} variants={fadeUp} className="btn-primary cursor-pointer self-start">
                Explore Now
              </motion.a>
            </div>
            {/* Right — drone fills the entire right half */}
            <motion.div
              variants={imageReveal}
              className="w-full md:w-[55%] bg-[#F7F7F7] flex items-center justify-center p-6 md:p-8 min-h-[320px] md:min-h-0"
            >
              <img
                src="/image.png"
                alt="SkyVision Drone"
                className="w-full max-w-full h-full max-h-[500px] object-contain animate-[float_7s_ease-in-out_infinite] drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── 4. ABOUT SNAPSHOT ─── */}
      <motion.section
        id="about-snapshot"
        className="py-20 sm:py-24 bg-[#F7F7F7] text-center"
        variants={sectionContainer}
        {...inViewProps}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.span variants={fadeUp} className="section-eyebrow">— Who We Are</motion.span>
          <motion.h2 variants={headingReveal} className="text-[26px] sm:text-[34px] md:text-[46px] font-condensed font-extrabold text-black">
            Pioneering Aerial Solutions
          </motion.h2>
          <motion.div variants={fadeUp} className="underline-accent mx-auto" />
          <motion.p variants={fadeUp} className="text-base sm:text-lg text-gray-mid font-normal leading-relaxed max-w-3xl">
            SkyVision is a drone technology startup focused on designing and manufacturing custom drones for real-world
            applications. We blend cutting-edge engineering with practical, scalable solutions.
          </motion.p>
        </div>
      </motion.section>

      {/* ─── 5. PRODUCTS ─── */}
      <motion.section
        id="products"
        className="py-20 sm:py-24 bg-white"
        variants={sectionContainer}
        {...inViewProps}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 flex flex-col items-center">
            <motion.span variants={fadeUp} className="section-eyebrow">— Our Fleet</motion.span>
            <motion.h2 variants={headingReveal} className="text-[26px] sm:text-[34px] md:text-[46px] font-condensed font-extrabold text-black">
              Drone Solutions
            </motion.h2>
            <motion.div variants={fadeUp} className="underline-accent mx-auto" />
            <motion.p variants={fadeUp} className="text-gray-mid text-base sm:text-lg font-normal max-w-2xl mx-auto">
              Mastering the skies with platforms designed for high performance, uncompromising reliability, and true scalability.
            </motion.p>
          </div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8" variants={sectionContainer}>
            {[
              { id: 'x1', name: 'SkyVision X1', type: 'Delivery',     desc: 'High payload autonomous logistics. Engineered to carry more, further.',    img: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=600&auto=format&fit=crop' },
              { id: 's1', name: 'SkyVision S1', type: 'Surveillance',  desc: 'Long-endurance situational awareness. Thermal imaging standard.',           img: 'https://images.unsplash.com/photo-1508614589041-895b68904561?q=80&w=600&auto=format&fit=crop' },
              { id: 'a1', name: 'SkyVision A1', type: 'Agriculture',   desc: 'Precision crop monitoring & spraying. Save resources, boost yield.',         img: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=600&auto=format&fit=crop' },
            ].map((p, i) => (
              <motion.div key={i} variants={cardReveal} className="card-light flex flex-col h-full group">
                <div className="h-48 overflow-hidden relative mb-6 rounded">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex-grow flex flex-col">
                  <span className="text-[10px] font-bold text-yellow tracking-widest uppercase mb-2 block">{p.type}</span>
                  <h3 className="text-xl font-condensed font-extrabold text-black mb-3">{p.name}</h3>
                  <p className="text-gray-mid text-sm mb-6 flex-grow leading-relaxed">{p.desc}</p>
                  <a href={`#shop/${p.id}`} onClick={handleNavigate} className="btn-primary w-full text-center cursor-pointer">
                    Explore Specs
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── 6. USE CASES ─── */}
      <motion.section
        id="solutions"
        className="py-20 sm:py-24 bg-[#F7F7F7]"
        variants={sectionContainer}
        {...inViewProps}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.span variants={fadeUp} className="section-eyebrow">— Versatility</motion.span>
          <motion.h2 variants={headingReveal} className="text-[26px] sm:text-[34px] md:text-[46px] font-condensed font-extrabold text-black">
            Industrial Applications
          </motion.h2>
          <motion.div variants={fadeUp} className="underline-accent" />

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6" variants={sectionContainer}>
            {[
              { icon: 'cube-outline',  title: 'Logistics',    desc: 'Fast last-mile autonomous drops.'    },
              { icon: 'leaf-outline',  title: 'Agriculture',  desc: 'Precision spraying & monitoring.'    },
              { icon: 'eye-outline',   title: 'Surveillance', desc: 'Border and perimeter security.'      },
              { icon: 'map-outline',   title: 'Surveying',    desc: 'High-accuracy topographic maps.'     },
            ].map((uc, i) => (
              <motion.div key={i} variants={cardReveal} className="card-light flex flex-col items-start group">
                <div className="card-icon mb-5">
                  <ion-icon name={uc.icon} className="text-xl"></ion-icon>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-2">{uc.title}</h3>
                <p className="text-gray-mid text-sm leading-relaxed">{uc.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── 7. PORTFOLIO ─── */}
      <motion.section
        id="portfolio"
        className="py-20 sm:py-24 bg-white"
        variants={sectionContainer}
        {...inViewProps}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.span variants={fadeUp} className="section-eyebrow">— Case Studies</motion.span>
          <motion.h2 variants={headingReveal} className="text-[26px] sm:text-[34px] md:text-[46px] font-condensed font-extrabold text-black">
            Our Technology at Work
          </motion.h2>
          <motion.div variants={fadeUp} className="underline-accent" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6">
            {/* Large card */}
            <motion.div
              variants={imageReveal}
              className="overflow-hidden rounded-[6px] border border-gray-border group relative h-[300px] sm:h-[400px] md:h-[500px] shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1579820010410-c10411aaaa88?q=80&w=1200&auto=format&fit=crop"
                alt="Drone Testing"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-30 pointer-events-none pr-6">
                <span className="text-yellow font-bold text-[10px] uppercase tracking-widest mb-2 inline-block bg-black/80 px-3 py-1.5 rounded-[2px]">
                  Harsh Weather Testing
                </span>
                <h3 className="text-xl sm:text-2xl font-condensed font-extrabold text-white leading-tight uppercase mt-2">
                  Extreme Environment Endurance Trials
                </h3>
              </div>
            </motion.div>

            {/* Two stacked small cards */}
            <div className="grid grid-rows-2 gap-6 sm:gap-8 h-[300px] sm:h-[400px] md:h-[500px]">
              {[
                { src: 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?q=80&w=800&auto=format&fit=crop', alt: 'Mapping',     label: 'Topographical Scans'       },
                { src: 'https://images.unsplash.com/photo-1587893458428-111d4eaca2eb?q=80&w=800&auto=format&fit=crop', alt: 'Agriculture', label: 'Automated Foliage Analysis'  },
              ].map((item, i) => (
                <motion.div key={i} variants={imageReveal} className="overflow-hidden rounded-[6px] border border-gray-border group relative shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
                  <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute bottom-4 left-5 z-30 pointer-events-none">
                    <h3 className="text-base sm:text-xl font-condensed font-extrabold text-white uppercase">{item.label}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── 8. WHY SKYVISION ─── */}
      <motion.section
        className="py-20 sm:py-24 bg-[#F7F7F7] relative overflow-hidden"
        variants={sectionContainer}
        {...inViewProps}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.span variants={fadeUp} className="section-eyebrow">— The Advantage</motion.span>
          <motion.h2 variants={headingReveal} className="text-[26px] sm:text-[34px] md:text-[46px] font-condensed font-extrabold text-black">
            Why Partner with SkyVision
          </motion.h2>
          <motion.div variants={fadeUp} className="underline-accent" />

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mt-6" variants={sectionContainer}>
            {[
              { icon: 'color-wand-outline',       title: 'Tailor-Made Configurations', desc: 'No generic templates. Every hull, sensor, and battery configuration is mapped to your distinct ROI requirements.' },
              { icon: 'battery-charging-outline',  title: 'Unmatched Endurance',        desc: 'Featuring solid-state batteries and ultra-lightweight composite frames for 45% longer flight times than market standards.' },
              { icon: 'shield-checkmark-outline',  title: 'Enterprise Reliability',     desc: 'Redundant flight controllers and encrypted comm-links guarantee your fleet stays airborne and secure.' },
              { icon: 'rocket-outline',            title: 'Locally Sourced & Supported',desc: 'Proudly engineered and assembled in India, guaranteeing rapid part replacements and localized customer support.' },
            ].map((ft, i) => (
              <motion.div key={i} variants={cardReveal} className="card-light flex items-start space-x-4 sm:space-x-5 group">
                <div className="card-icon flex-shrink-0">
                  <ion-icon name={ft.icon} className="text-xl"></ion-icon>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-2">{ft.title}</h3>
                  <p className="text-gray-mid text-sm leading-relaxed">{ft.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── 9. TESTIMONIAL ─── */}
      <motion.section
        className="py-20 sm:py-24 bg-white border-t border-gray-border text-center relative"
        variants={sectionContainer}
        {...inViewProps}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <motion.span variants={fadeUp} className="section-eyebrow">— Client Stories</motion.span>
          <motion.h2 variants={headingReveal} className="text-[26px] sm:text-[34px] md:text-[46px] font-condensed font-extrabold text-black">
            What Clients Say
          </motion.h2>
          <motion.div variants={fadeUp} className="underline-accent mx-auto" />

          <motion.div className="max-w-3xl flex flex-col items-center mt-6" variants={fadeUp}>
            <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-mid italic font-light leading-relaxed mb-10 px-2 sm:px-4">
              "SkyVision practically re-educated us on what drones are capable of. Their custom A1 configurations halved
              our surveying time while doubling our yield accuracy during the first harvest cycle alone."
            </blockquote>

            <div className="flex flex-col items-center">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
                alt="Client"
                className="w-16 h-16 rounded-full object-cover border-2 border-yellow mb-4 shadow-sm"
              />
              <h4 className="font-bold text-black text-sm tracking-wide uppercase mb-1">Rajesh Kumar</h4>
              <span className="text-yellow text-[11px] font-semibold tracking-wider uppercase">Director of Operations, AgroTech India</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── 10. CTA ─── */}
      <motion.section
        id="contact"
        className="py-20 sm:py-24 bg-[#F7F7F7] text-center border-t border-gray-border"
        variants={sectionContainer}
        {...inViewProps}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center py-8 sm:py-12">
          <motion.span variants={fadeUp} className="section-eyebrow">— Start Today</motion.span>
          <motion.h2
            variants={headingReveal}
            className="text-[26px] sm:text-[34px] md:text-[46px] font-condensed font-extrabold text-black mb-6 uppercase"
          >
            Scale Your Operations Into The Stratosphere
          </motion.h2>
          <motion.div variants={fadeUp} className="underline-accent mx-auto" />
          <motion.p variants={fadeUp} className="text-gray-mid text-base sm:text-lg mb-10 max-w-xl font-normal leading-relaxed">
            Stop adapting to generic drones. Have an intelligent machine built explicitly for your mission.
          </motion.p>
          <motion.a
            href="#contact"
            onClick={handleNavigate}
            variants={fadeUp}
            className="btn-primary cursor-pointer text-center px-10"
          >
            Initiate Project
          </motion.a>
        </div>
      </motion.section>

    </div>
  );
});

Overlay.displayName = 'Overlay';
