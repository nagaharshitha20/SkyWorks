import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import {
  sectionContainer, fadeUp, headingReveal, cardReveal,
  imageReveal, slideInLeft, slideInRight, inViewProps,
} from './ui/motion';

export const Overlay = forwardRef<HTMLDivElement, { introFinished?: boolean }>((props, ref) => {
  const { introFinished = true } = props;

  // Hero uses sectionContainer + fadeUp from the motion system
  const heroContainerVariants = {
    hidden: { opacity: 0 as const },
    visible: {
      opacity: 1 as const,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetHash = e.currentTarget.getAttribute('href');
    if (targetHash) {
      window.location.hash = targetHash;
    }
  };

  return (
    <div ref={ref} className="w-full bg-[#03070c] text-white selection:bg-[#00ffcc] selection:text-black font-sans antialiased">

      {/* 1. HERO SECTION */}
      <section id="home" className="relative min-h-[95vh] flex items-center pt-24 pb-60 overflow-hidden bg-[#03070c]">
        {/* Premium radial gradient & mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00ffcc]/10 via-[#03070c] to-[#010204]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-10 pointer-events-none"></div>

        {/* Sophisticated Radar wave lines */}
        <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-[30%] w-[600px] h-[600px] rounded-full border-[1px] border-[#00ffcc]/20 transform -translate-x-1/2 -translate-y-1/2 animate-[ping_12s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
          <div className="absolute top-1/2 left-[30%] w-[900px] h-[900px] rounded-full border-[1px] border-[#00ffcc]/10 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-12">
          <motion.div 
            className="flex flex-col md:flex-row gap-12 items-center"
            variants={heroContainerVariants}
            initial="hidden"
            animate={introFinished ? "visible" : "hidden"}
          >

            {/* LEFT: Drone image with enhanced tech aura */}
            <motion.div variants={fadeUp} className="w-full md:w-1/2 flex justify-center relative order-2 md:order-1 perspective-1000">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-[#00ffcc] to-[#047857] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
              <img
                src="/drone_hero.png"
                alt="SkyVision Premium Drone"
                className="relative w-full max-w-[500px] object-contain animate-[float_8s_ease-in-out_infinite] drop-shadow-[0_30px_50px_rgba(0,255,204,0.15)] transform -rotate-12 hover:rotate-0 transition-transform duration-1000 ease-out"
              />
            </motion.div>

            {/* RIGHT: Text */}
            <div className="w-full md:w-1/2 text-center md:text-left order-1 md:order-2 z-20">
              <motion.div variants={fadeUp} className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-widest text-[#00ffcc] uppercase">Next-Gen Aviation</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-white drop-shadow-2xl">
                The Future of <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] drop-shadow-[0_0_20px_rgba(0,255,204,0.2)]">Intelligent Drones</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-base md:text-lg text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
                Precision-engineered aerial systems custom-built for delivery, mapping, and high-endurance industrial applications.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                <a href="#contact" onClick={handleNavigate} className="group relative px-6 py-3 bg-[#00ffcc] text-black rounded-full font-bold shadow-[0_0_30px_rgba(0,255,204,0.3)] hover:shadow-[0_0_40px_rgba(0,255,204,0.6)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center overflow-hidden">
                  <span className="relative z-10 text-sm">Get a Quote</span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1s_forwards]"></div>
                </a>
                <a href="#products" onClick={handleNavigate} className="px-6 py-3 bg-transparent border border-white/20 text-white rounded-full font-bold hover:border-[#00ffcc] hover:bg-[#00ffcc]/5 transition-all duration-300 w-full sm:w-auto text-center backdrop-blur-sm text-sm">
                  Explore Products
                </a>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* --- PREMIUM LIGHT BACKGROUND SECTION --- */}
      <div className="bg-[#f8fafc] pb-24 relative z-10 w-full rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.03)] border-t border-white/50">

        {/* Soft geometric background noise */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none rounded-t-[4rem]"></div>

        {/* 4. INNOVATIONS SHOWCASE — Centered exactly on the boundary between dark/green bg and white bg */}
        <section className="relative px-4 sm:px-6 lg:px-8 -translate-y-1/2 z-30 w-full">
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.93 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-5xl mx-auto"
          >
            {/* Card — intentionally short, overflow visible */}
            <div
              className="relative rounded-[2.5rem] bg-white border border-gray-100"
              style={{
                minHeight: '230px',
                overflow: 'visible',
                boxShadow: '0 16px 70px rgba(0,0,0,0.16), 0 2px 12px rgba(0,0,0,0.07)',
              }}
            >
              {/* ── LEFT TEXT — 36% wide, compact ── */}
              <div className="relative z-20 w-full md:w-[36%] px-8 py-8 md:px-10 md:py-10">

                {/* Tag */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.28 }}
                  className="font-black tracking-[0.18em] uppercase text-[9px] mb-2 block"
                  style={{ color: '#00cc99' }}
                >
                  — Innovations
                </motion.span>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.36, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-black text-[#050505] tracking-tight leading-[1.12] mb-3"
                  style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
                >
                  Innovations and<br />Breakthroughs
                </motion.h2>

                {/* Body */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.44 }}
                  className="text-gray-500 text-xs leading-relaxed mb-6"
                  style={{ maxWidth: '220px' }}
                >
                  The ultra-portable SkyVision platform features high-end flight performance and functionality for limitless exploration.
                </motion.p>

                {/* CTA */}
                <motion.a
                  href="#missions"
                  onClick={handleNavigate}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.52 }}
                  whileHover={{ scale: 1.07, boxShadow: '0 0 32px rgba(0,255,204,0.55)' }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center px-7 py-2.5 rounded-full text-xs font-black transition-all"
                  style={{
                    background: '#00ffcc',
                    color: '#000',
                    boxShadow: '0 6px 20px rgba(0,255,204,0.35)',
                  }}
                >
                  Explore Now
                </motion.a>
              </div>

              {/* ── DRONE — anchored bottom-right, centered vertically, massively overflowing ── */}
              <div
                className="absolute hidden md:block pointer-events-none"
                style={{
                  width: '880px',
                  right: '-80px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 30,
                }}
              >
                <motion.img
                  src="/image.png"
                  alt="SkyVision Drone"
                  className="w-full h-auto object-contain animate-[float_7s_ease-in-out_infinite]"
                  style={{
                    filter:
                      'drop-shadow(0px 40px 70px rgba(0,0,0,0.4)) drop-shadow(0px 10px 24px rgba(0,0,0,0.22))',
                  }}
                  initial={{ opacity: 0, scale: 0.6, rotate: -14, x: 100, y: 80 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.15, delay: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>

              {/* Soft ambient glow behind drone */}
              <div
                className="absolute hidden md:block pointer-events-none"
                style={{
                  right: '-60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '600px',
                  height: '400px',
                  background: 'radial-gradient(circle, rgba(0,255,204,0.12) 0%, transparent 70%)',
                  filter: 'blur(50px)',
                  zIndex: 10,
                }}
              />
            </div>
          </motion.div>

          {/* Mobile fallback */}
          <motion.div
            initial={{ opacity: 0, scale: 0.78 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.38 }}
            className="md:hidden flex justify-center mt-8"
          >
            <img
              src="/image.png"
              alt="SkyVision Drone"
              className="w-80 object-contain"
              style={{ filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.28))' }}
            />
          </motion.div>
        </section>

        {/* 2. STATS / TRUST BAR — Infinite Horizontal Marquee */}
        <section className="relative z-20 py-8 mb-16 border-y border-gray-200 bg-white/50 backdrop-blur-sm overflow-hidden w-full">
          <style>{`
            @keyframes marqueeStats {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.33%); }
            }
            .animate-marquee-stats {
              display: flex;
              gap: 5rem;
              width: max-content;
              animation: marqueeStats 35s linear infinite;
            }
            .animate-marquee-stats:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="w-full flex overflow-hidden select-none">
            <div className="animate-marquee-stats py-2">
              {/* Duplicated 3 times to ensure a seamless infinite scrolling loop on all resolutions */}
              {[...Array(3)].flatMap((_, loopIdx) => 
                [
                  { val: "50+", label: "Projects Completed" },
                  { val: "500+", label: "Flight Hours" },
                  { val: "10+", label: "Clients Served" },
                  { val: "99%", label: "Reliability" }
                ].map((stat, i) => (
                  <div key={`${loopIdx}-${i}`} className="flex flex-col items-center justify-center min-w-[200px] md:min-w-[260px] group transition-all duration-300">
                    <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#047857] mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{stat.val}</span>
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-800 font-bold bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-100">{stat.label}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* 3. ABOUT SNAPSHOT */}
        <section id="about-snapshot" className="py-12 relative text-center px-4 sm:px-6 mb-12">
          <motion.div variants={sectionContainer} {...inViewProps} className="max-w-3xl mx-auto">
            <motion.span variants={fadeUp} className="text-[#047857] font-bold tracking-widest uppercase text-xs mb-3 block">Who We Are</motion.span>
            <motion.h2 variants={headingReveal} className="text-3xl md:text-4xl font-extrabold mb-6 text-[#050505] tracking-tight">Pioneering Aerial Solutions</motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
              SkyVision is a drone technology startup focused on designing and manufacturing custom drones for real-world applications. We blend cutting-edge engineering with practical, scalable solutions.
            </motion.p>
          </motion.div>
        </section>

        {/* 5. PRODUCTS SECTION */}
        <section id="products" className="py-12 px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={sectionContainer} {...inViewProps} className="text-center mb-16 relative">
              <motion.span variants={fadeUp} className="text-[#047857] font-bold tracking-widest uppercase text-xs mb-3 block">Our Fleet</motion.span>
              <motion.h2 variants={headingReveal} className="text-3xl md:text-4xl font-extrabold mb-3 text-[#050505]">Drone Solutions</motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">Mastering the skies with platforms designed for high performance, uncompromising reliability, and true scalability.</motion.p>
            </motion.div>

            <motion.div variants={sectionContainer} {...inViewProps} className="grid md:grid-cols-3 gap-8">
              {[
                { id: "x1", name: "SkyVision X1", type: "Delivery", desc: "High payload autonomous logistics. Engineered to carry more, further.", img: "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=600&auto=format&fit=crop" },
                { id: "s1", name: "SkyVision S1", type: "Surveillance", desc: "Long-endurance situational awareness. Thermal imaging standard.", img: "https://images.unsplash.com/photo-1508614589041-895b68904561?q=80&w=600&auto=format&fit=crop" },
                { id: "a1", name: "SkyVision A1", type: "Agriculture", desc: "Precision crop monitoring & spraying. Save resources, boost yield.", img: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=600&auto=format&fit=crop" }
              ].map((p, i) => (
                <motion.div
                  key={i}
                  variants={cardReveal}
                  whileHover={{ y: -12, boxShadow: '0 24px 50px rgba(0,255,204,0.15)' }}
                  className="bg-white rounded-[1.5rem] overflow-hidden group transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex flex-col relative border border-gray-100"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem] ring-2 ring-inset ring-[#00ffcc]"></div>
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow bg-white z-20">
                    <div className="flex flex-col items-center mb-4 text-center">
                      <span className="text-[9px] font-black text-[#047857] tracking-[0.2em] uppercase bg-[#00ffcc]/10 px-3 py-1 rounded-full mb-3">{p.type}</span>
                      <h3 className="text-2xl font-bold text-[#050505]">{p.name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-6 flex-grow text-center font-medium leading-relaxed">{p.desc}</p>
                    <motion.a
                      href={`#missions/${p.id}`}
                      onClick={handleNavigate}
                      whileHover={{ backgroundColor: '#00ffcc', color: '#000' }}
                      className="inline-flex justify-center items-center w-full px-5 py-3 bg-gray-50 text-gray-900 rounded-lg text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00ffcc] shadow-sm"
                    >
                      Explore Specs
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. USE CASES SECTION */}
        <section id="solutions" className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={sectionContainer} {...inViewProps} className="text-center mb-16">
              <motion.span variants={fadeUp} className="text-[#047857] font-bold tracking-widest uppercase text-xs mb-3 block">Versatility</motion.span>
              <motion.h2 variants={headingReveal} className="text-3xl md:text-4xl font-extrabold text-[#050505] mb-3">Industrial Applications</motion.h2>
            </motion.div>

            <motion.div variants={sectionContainer} {...inViewProps} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "cube-outline", title: "Logistics", desc: "Fast last-mile autonomous drops." },
                { icon: "leaf-outline", title: "Agriculture", desc: "Precision spraying & monitoring." },
                { icon: "eye-outline", title: "Surveillance", desc: "Border and perimeter security." },
                { icon: "map-outline", title: "Surveying", desc: "High-accuracy topographic maps." }
              ].map((uc, i) => (
                <motion.div
                  key={i}
                  variants={cardReveal}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,255,204,0.12)' }}
                  className="p-8 bg-white shadow-lg shadow-gray-200/40 rounded-[1.5rem] border border-gray-100 hover:border-[#00ffcc]/50 transition-all duration-500 group text-center flex flex-col items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 0, backgroundColor: '#00ffcc', color: '#000' }}
                    className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6 text-[#047857] transition-all duration-500 rotate-3"
                  >
                    <ion-icon name={uc.icon} className="text-3xl drop-shadow-sm"></ion-icon>
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#050505] mb-2">{uc.title}</h3>
                  <p className="text-gray-500 text-sm font-medium">{uc.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </div> {/* --- END PREMIUM LIGHT SECTION --- */}

      {/* 7. PORTFOLIO / WORK */}
      <section id="portfolio" className="py-24 bg-[#02050a] px-4 sm:px-6 lg:px-8 border-t border-white/5 relative z-20 rounded-t-[4rem] -mt-10 shadow-[0_-30px_60px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={sectionContainer} {...inViewProps} className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <motion.span variants={fadeUp} className="text-[#00ffcc] font-bold tracking-widest uppercase text-xs mb-3 block">Case Studies</motion.span>
              <motion.h2 variants={headingReveal} className="text-3xl md:text-4xl font-extrabold text-white mb-3">Our Technology at Work</motion.h2>
              <motion.p variants={fadeUp} className="text-gray-400 text-base">Witness our platforms operating flawlessly in real-world scenarios.</motion.p>
            </div>
            <motion.a variants={fadeUp} href="#portfolio" onClick={handleNavigate} className="hidden md:inline-flex items-center space-x-2 text-[#00ffcc] hover:text-white text-sm font-bold transition-colors group px-5 py-2.5 rounded-full border border-[#00ffcc]/30 hover:border-[#00ffcc] bg-[#00ffcc]/5">
              <span>View All Deployments</span>
              <ion-icon name="arrow-forward" className="group-hover:translate-x-1 transition-transform"></ion-icon>
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Large Item */}
            <motion.div variants={imageReveal} {...inViewProps} className="overflow-hidden rounded-[2rem] group relative h-[350px] md:h-[500px] shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#02050a] via-black/40 to-transparent z-10 pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
              <img src="https://images.unsplash.com/photo-1579820010410-c10411aaaa88?q=80&w=1200&auto=format&fit=crop" alt="Drone Testing" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center text-white hover:bg-[#00ffcc] hover:text-black hover:border-transparent transition-colors">
                  <ion-icon name="play" className="text-2xl ml-1"></ion-icon>
                </button>
              </div>
              <div className="absolute bottom-8 left-8 z-30 pointer-events-none pr-8">
                <span className="text-[#00ffcc] font-black text-[9px] uppercase tracking-[0.2em] mb-2 inline-block bg-black/50 backdrop-blur-sm px-2 py-1 rounded">Harsh Weather Testing</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">Extreme Environment Endurance Trials</h3>
              </div>
            </motion.div>

            {/* 2 Small Items */}
            <div className="grid grid-rows-2 gap-5 h-[350px] md:h-[500px]">
              <motion.div variants={imageReveal} {...inViewProps} className="overflow-hidden rounded-[2rem] group relative shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#02050a] via-black/40 to-transparent z-10 pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                <img src="https://images.unsplash.com/photo-1524143986875-3b098d78b363?q=80&w=800&auto=format&fit=crop" alt="Mapping" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute bottom-6 left-6 z-30 pointer-events-none"><h3 className="text-xl md:text-2xl font-bold text-white">Topographical Scans</h3></div>
              </motion.div>
              <motion.div variants={imageReveal} {...inViewProps} className="overflow-hidden rounded-[2rem] group relative shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#02050a] via-black/40 to-transparent z-10 pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                <img src="https://images.unsplash.com/photo-1587893458428-111d4eaca2eb?q=80&w=800&auto=format&fit=crop" alt="Agriculture" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute bottom-6 left-6 z-30 pointer-events-none"><h3 className="text-xl md:text-2xl font-bold text-white">Automated Foliage Analysis</h3></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY SKYVISION */}
      <section className="py-24 bg-[#03070c] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-[#00ffcc]/5 blur-[120px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div variants={sectionContainer} {...inViewProps} className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-[#00ffcc] font-bold tracking-widest uppercase text-xs mb-3 block">The Advantage</motion.span>
            <motion.h2 variants={headingReveal} className="text-3xl md:text-4xl font-extrabold text-white mb-5">Why Partner with SkyVision</motion.h2>
          </motion.div>

          <motion.div variants={sectionContainer} {...inViewProps} className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {[
              { icon: "color-wand-outline", title: "Tailor-Made Configurations", desc: "No generic templates. Every hull, sensor, and battery configuration is mapped to your distinct ROI requirements." },
              { icon: "battery-charging-outline", title: "Unmatched Endurance", desc: "Featuring solid-state batteries and ultra-lightweight composite frames for 45% longer flight times than market standards." },
              { icon: "shield-checkmark-outline", title: "Enterprise Reliability", desc: "Redundant flight controllers and encrypted comm-links guarantee your fleet stays airborne and secure." },
              { icon: "rocket-outline", title: "Locally Sourced & Supported", desc: "Proudly engineered and assembled in India, guaranteeing rapid part replacements and localized customer support." }
            ].map((ft, i) => (
              <motion.div
                key={i}
                variants={cardReveal}
                whileHover={{ y: -8, borderColor: 'rgba(0,255,204,0.4)', boxShadow: '0 20px 50px rgba(0,255,204,0.1)' }}
                className="flex items-start space-x-5 p-8 bg-gradient-to-br from-[#0a111a] to-[#04080e] rounded-[2rem] border border-white/5 transition-all duration-500 group shadow-xl"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 0, backgroundColor: '#00ffcc', color: '#000' }}
                  className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 text-[#00ffcc] rounded-xl flex items-center justify-center text-2xl transition-colors rotate-3 shadow-md"
                >
                  <ion-icon name={ft.icon}></ion-icon>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{ft.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{ft.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. CTA SECTION */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#02050a]">
        <motion.div variants={imageReveal} {...inViewProps} className="relative z-10 max-w-5xl mx-auto rounded-[2.5rem] p-1 overflow-hidden shadow-[0_0_60px_rgba(0,255,204,0.1)] group">
          <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,#020a12_0%,#00ffcc_50%,#3b82f6_100%)] animate-[spin_8s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite] opacity-50"></div>
          <div className="relative bg-[#02050a]/90 backdrop-blur-xl rounded-[2.4rem] p-12 md:p-20 text-center z-20 flex flex-col items-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay opacity-30 rounded-[2.4rem] pointer-events-none"></div>
            <motion.h2 variants={headingReveal} {...inViewProps} className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">Scale Your Operations <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#3b82f6]">Into The Stratosphere</span></motion.h2>
            <motion.p variants={fadeUp} {...inViewProps} className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl font-light leading-relaxed">Stop adapting to generic drones. Have an intelligent machine built explicitly for your mission.</motion.p>
            <motion.a
              href="#contact"
              onClick={handleNavigate}
              whileHover={{ scale: 1.06, boxShadow: '0 20px 50px rgba(0,255,204,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex justify-center items-center px-10 py-4 bg-gradient-to-r from-[#00ffcc] to-[#047857] text-black text-lg font-black uppercase tracking-widest rounded-full shadow-[0_10px_30px_rgba(0,255,204,0.3)] transition-all"
            >
              Initiate Project
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="py-24 bg-[#010306] border-t border-white/5 text-center px-4 sm:px-6 relative shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20">
        <motion.div variants={sectionContainer} {...inViewProps} className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
          <motion.div variants={fadeUp} className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-lg">
            <span className="font-serif text-[#00ffcc] text-5xl translate-y-2.5 leading-[0]">"
</span>
          </motion.div>

          <motion.blockquote variants={headingReveal} className="text-xl md:text-3xl text-gray-200 italic font-light leading-relaxed mb-12 px-4">
            SkyVision practically re-educated us on what drones are capable of. Their custom A1 configurations halved our surveying time while doubling our yield accuracy during the first harvest cycle alone.
          </motion.blockquote>

          <motion.div variants={fadeUp} className="flex flex-col items-center">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Client" className="w-16 h-16 rounded-full object-cover border-2 border-[#00ffcc] mb-4 shadow-xl" />
            <h4 className="font-bold text-white text-lg mb-1 tracking-tight">Rajesh Kumar</h4>
            <span className="text-[#00ffcc] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">Director of Operations, AgroTech India</span>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
});

Overlay.displayName = 'Overlay';
