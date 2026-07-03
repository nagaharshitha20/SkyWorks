import React, { forwardRef, useRef, useEffect } from 'react';
import ServicesSection from './ServicesSection';
import IndustrialSection from './IndustrialSection';
import StatsSection from './StatsSection';
import WhyPartnerSection from './WhyPartnerSection';
import ApplicationsSection from './ApplicationsSection';
import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  sectionContainer, fadeUp, headingReveal, cardReveal,
  imageReveal, inViewProps,
} from './ui/motion';

gsap.registerPlugin(ScrollTrigger);

/*
  ═══════════════════════════════════════════════════════════════════
  CINEMATIC HERO  — Apple/Tesla-style GSAP ScrollTrigger pinned hero
  ───────────────────────────────────────────────────────────────────
  • Hero is pinned via ScrollTrigger (pin:true, scrub:true)
  • Video compresses from full-screen → ~48vh using clip-path: inset()
    — a true cinematic LETTERBOX effect: top & bottom clip simultaneously
  • Content is INSIDE the clipped container → never overflows
  • Content scales proportionally (0.65×) and stays centered
  • Border-radius animates within inset() for rounded letterbox corners
  • Perfect reverse on scroll-up — zero jumps, 60fps target
  • anticipatePin + invalidateOnRefresh for robustness
  ═══════════════════════════════════════════════════════════════════
*/
function CinematicHero({ introFinished }: { introFinished: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const videoWrap = videoWrapRef.current;
    const content = contentRef.current;
    const cue = cueRef.current;
    const bg = bgRef.current;
    if (!section || !videoWrap || !content || !cue || !bg) return;

    // ── GPU hints ─────────────────────────────────────────────────
    // Start with full-screen clip (no inset)
    gsap.set(videoWrap, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
      willChange: 'clip-path',
    });
    gsap.set(content, { willChange: 'transform' });
    gsap.set(cue, { willChange: 'opacity' });

    // ── MASTER TIMELINE tied to scroll ───────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',          // pin for 200vh of scroll travel (longer hold)
        pin: true,
        scrub: 1.2,             // buttery lag for cinematic feel
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Phase 1 (0 → 0.5): letterbox compresses + content scales
    tl
      // Background darkens as video compresses
      .to(bg, {
        backgroundColor: '#020202',
        duration: 0.5,
        ease: 'power2.inOut',
      }, 0)

      // TRUE LETTERBOX: clip from top AND bottom simultaneously.
      // 26% top + 26% bottom = 48vh visible (meets 45-50vh requirement).
      // 0% left + 0% right = 100vw visible (only shrink from top and bottom).
      // round 24px = cinematic rounded-corner finish.
      // Content inside clips naturally — zero text overflow.
      .to(videoWrap, {
        clipPath: 'inset(26% 0% 26% 0% round 24px)',
        duration: 0.5,
        ease: 'power2.inOut',
      }, 0)

      // Content: scale down, stays centered within clipped area
      .to(content, {
        scale: 0.65,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 0)

      // Scroll cue fades out early
      .to(cue, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.out',
      }, 0)

      // Phase 2 (0.5 → 1.0): hold — video stays there before moving down
      .to({}, { duration: 0.5 }, 0.5);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.set([videoWrap, content], { clearProps: 'all' });
    };
  }, []);

  // ── INITIAL CONTENT MOUNT ANIMATION ──────────────────────────
  const contentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: introFinished ? 0.2 : 0.6 },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const h = e.currentTarget.getAttribute('href');
    if (h) window.location.hash = h;
  };

  return (
    /*
      SECTION: Pinned by ScrollTrigger for 100vh + extra scroll budget.
      position:relative, height:100vh — the sentinel height comes from
      ScrollTrigger's `end` offset (+=200%).
    */
    <div ref={sectionRef} className="relative w-full" style={{ height: '100vh' }}>

      {/* ── DARK BACKGROUND (fills viewport during pin) ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#050505', zIndex: 0 }}
      />

      {/*
        VIDEO + CONTENT WRAPPER — receives clip-path: inset() letterbox.
        ─────────────────────────────────────────────────────────────────
        The entire element (video + overlays + content) is 100vw × 100vh
        in its own coordinate space. GSAP animates the clip-path to
        progressively reveal only the center letterbox band (~48vh).

        Content is INSIDE this wrapper → it clips along with the video,
        meaning text can never overflow outside the visible letterbox.
        Items centered in 100vh remain visible in the 26%–74% clip window.
      */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* ── BACKGROUND VIDEO ── */}
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/Background.mp4" type="video/mp4" />
        </video>

        {/* Cinematic gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/80 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/55 pointer-events-none z-10" />

        {/* Scan-line texture */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            opacity: 0.035,
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,1) 3px,rgba(255,255,255,1) 4px)',
          }}
        />

        {/* ── HUD CORNER BRACKETS ── */}
        {[
          'top-3 left-3 border-t-2 border-l-2',
          'top-3 right-3 border-t-2 border-r-2',
          'bottom-3 left-3 border-b-2 border-l-2',
          'bottom-3 right-3 border-b-2 border-r-2',
        ].map((cls, i) => (
          <div key={i} className={`absolute w-4 h-4 z-30 pointer-events-none border-yellow/40 ${cls}`} />
        ))}

        {/* ── GPS COORDS STRIP ── */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 font-mono tracking-[0.22em] uppercase pointer-events-none hidden sm:block"
          style={{ fontSize: 'clamp(7px, 0.7vw, 9px)', color: 'rgba(255,255,255,0.18)' }}
        >
          23.7491° N · 80.3286° E · ALT 450m
        </div>

        {/* ── HERO CONTENT ─────────────────────────────────────────
            Lives INSIDE videoWrapRef. Flex-centered in the full 100vh
            local space. clip-path on the wrapper reveals only the
            center band → content is naturally clipped to letterbox.
            GSAP scales content to 0.65× for proportional compression.
        ──────────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        >
          <div
            ref={contentRef}
            className="w-full px-5 sm:px-10 lg:px-20 text-center flex flex-col items-center pointer-events-auto"
            style={{ transformOrigin: 'center center', willChange: 'transform' }}
          >
            <motion.div
              className="flex flex-col items-center w-full"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {/* ── BADGE ── */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 border text-yellow font-bold uppercase tracking-[0.22em] rounded-sm mb-5 backdrop-blur-md"
                style={{
                  fontSize: 'clamp(8px, 1vw, 11px)',
                  background: 'rgba(255,214,0,0.08)',
                  borderColor: 'rgba(255,214,0,0.45)',
                  boxShadow: '0 0 20px rgba(255,214,0,0.1)',
                }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-yellow flex-shrink-0"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.5, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                Next-Gen Aviation · SkyWorks
              </motion.div>

              {/* ── HEADLINE ── */}
              <motion.h1
                variants={itemVariants}
                className="font-condensed font-extrabold tracking-tight leading-[0.92] text-white uppercase mb-4"
                style={{
                  fontSize: 'clamp(36px, 8vw, 96px)',
                  textShadow: '0 4px 32px rgba(0,0,0,0.7), 0 1px 0 rgba(0,0,0,0.9)',
                }}
              >
                The Future of<br />
                <span
                  className="text-yellow"
                  style={{ textShadow: '0 0 48px rgba(255,214,0,0.5), 0 4px 24px rgba(0,0,0,0.6)' }}
                >
                  Intelligent Drones
                </span>
              </motion.h1>

              {/* ── DESCRIPTION ── */}
              <motion.p
                variants={itemVariants}
                className="hero-sub text-white/80 font-medium tracking-wide mb-7 max-w-xl mx-auto leading-relaxed"
                style={{ fontSize: 'clamp(12px, 1.5vw, 18px)' }}
              >
                Precision-engineered aerial systems custom-built for delivery,
                mapping&nbsp;&amp; high-endurance industrial applications.
              </motion.p>

              {/* ── CTAs ── */}
              <motion.div
                variants={itemVariants}
                className="flex flex-row gap-3 justify-center items-center"
              >
                <motion.a
                  href="#contact"
                  onClick={handleNavigate}
                  className="btn-primary cursor-pointer whitespace-nowrap"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(255,214,0,0.4)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                >
                  Get a Quote
                </motion.a>
                <motion.a
                  href="#products"
                  onClick={handleNavigate}
                  className="btn-dark-outline cursor-pointer whitespace-nowrap"
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
                className="mt-6 flex items-center gap-4 font-mono uppercase"
                style={{
                  fontSize: 'clamp(8px, 0.85vw, 10px)',
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.2em',
                }}
              >
                <span className="flex items-center gap-1.5">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  Systems Online
                </span>
                <span className="w-px h-3 bg-white/20" />
                <span>Fleet Active</span>
                <span className="w-px h-3 bg-white/20" />
                <span>50+ Missions</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── SCROLL CUE ── (outside videoWrap so visible below compressed letterbox) */}
      <div
        ref={cueRef}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-40 pointer-events-none"
        style={{ willChange: 'opacity' }}
      >
        <span
          className="text-white/55 font-bold uppercase tracking-[0.2em]"
          style={{ fontSize: '9px' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-px h-7 bg-gradient-to-b from-white/55 to-transparent" />
          <div
            className="w-1.5 h-1.5 rotate-45 border border-white/45"
            style={{ boxShadow: '0 0 8px rgba(255,255,255,0.15)' }}
          />
        </motion.div>
      </div>
    </div>
  );
}


export const Overlay = forwardRef<HTMLDivElement, { introFinished?: boolean }>((props, ref) => {
  const { introFinished = true } = props;

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetHash = e.currentTarget.getAttribute('href');
    if (targetHash) window.location.hash = targetHash;
  };

  return (
    <div ref={ref} className="w-full bg-white text-gray-mid font-sans antialiased">

      {/* ─── 1. CINEMATIC HERO ─── */}
      <div id="home">
        <CinematicHero introFinished={introFinished} />
      </div>

      {/* ─── 2. STATS BAR ─── */}

      <StatsSection />

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

      {/* ─── 4. ABOUT SNAPSHOT (LIGHT) ─── */}
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

      {/* ─── 5. SERVICES — Premium Parallelogram Cards ─── */}
      <ServicesSection />

      {/* ─── 6. INDUSTRIAL APPLICATIONS — Poster Roll Reveal ─── */}
      <IndustrialSection />

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
                { src: 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?q=80&w=800&auto=format&fit=crop', alt: 'Mapping', label: 'Topographical Scans' },
                { src: 'https://images.unsplash.com/photo-1587893458428-111d4eaca2eb?q=80&w=800&auto=format&fit=crop', alt: 'Agriculture', label: 'Automated Foliage Analysis' },
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

      {/* ─── 8. WHY SKYVISION (LIGHT) ─── */}
      <WhyPartnerSection />

      {/* ─── NEW: APPLICATIONS (FLIP CARDS) ─── */}
      <ApplicationsSection />

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
