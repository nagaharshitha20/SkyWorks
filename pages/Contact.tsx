import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  sectionContainer, fadeUp, headingReveal, cardReveal,
  imageReveal, slideInLeft, slideInRight, inViewProps,
} from '../components/ui/motion';

const Contact: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(4); // Default to middle copy center (Stephen Humbert = index 4)
  const [isPaused, setIsPaused] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (isPaused || isResetting) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => prev + 1); // Continuously move to the next item (sliding left)
    }, 4000); // Automatically move every 4 seconds
    return () => clearInterval(timer);
  }, [isPaused, isResetting]);

  useEffect(() => {
    if (isResetting) {
      // In the next frame, enable spring animation again
      const timer = setTimeout(() => {
        setIsResetting(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isResetting]);

  return (
    <div className="min-h-screen bg-[#03070c] text-white selection:bg-[#00ffcc] selection:text-black font-sans antialiased overflow-hidden">

      {/* Background Decorators */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00ffcc]/10 via-[#03070c]/0 to-transparent pointer-events-none z-0" />
      <div className="fixed top-[40%] left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1e3a8a]/10 via-transparent to-transparent pointer-events-none z-0" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-[70vh]">
        {/* Left: Text reveals first */}
        <motion.div
          variants={slideInLeft}
          {...inViewProps}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full md:w-1/2 md:pr-12 relative z-20"
        >
          <motion.span variants={fadeUp} {...inViewProps} className="text-[#00ffcc] font-bold tracking-widest uppercase text-xs mb-4 block">
            — Reach The Future
          </motion.span>
          <motion.h1 variants={headingReveal} {...inViewProps} className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tighter text-white leading-tight">
            Get In Touch <br />With The Future
          </motion.h1>
          <motion.p variants={fadeUp} {...inViewProps} className="text-gray-400 text-base md:text-lg mb-8 max-w-md leading-relaxed">
            SkyVision isn't just an aviation company, it's your partner in aerial innovation. Reach out to coordinate your next industrial fleet deployment.
          </motion.p>
          <motion.button
            variants={fadeUp}
            {...inViewProps}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,255,204,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 bg-[#00ffcc] text-black font-bold uppercase tracking-widest rounded-full shadow-[0_10px_30px_rgba(0,255,204,0.3)] transition-all"
          >
            Send Us a Message
          </motion.button>
          <motion.div variants={fadeUp} {...inViewProps} className="flex gap-6 mt-12 text-[#00ffcc] text-2xl">
            {['logo-twitter', 'logo-instagram', 'logo-linkedin'].map((icon) => (
              <motion.div
                key={icon}
                whileHover={{ scale: 1.2, backgroundColor: '#00ffcc', color: '#000' }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-[#00ffcc]/30 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ion-icon name={icon}></ion-icon>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Drone reveals second (coming from right after 0.5s delay) */}
        <motion.div
          variants={slideInRight}
          {...inViewProps}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
          className="w-full md:w-1/2 relative mt-16 md:mt-0 flex justify-center perspective-1000"
        >
          <div className="absolute inset-0 bg-transparent border border-white/10 rounded-[60%] -rotate-12 scale-110 pointer-events-none" />
          <div className="absolute inset-4 bg-transparent border border-[#00ffcc]/20 rounded-[50%] rotate-6 scale-100 pointer-events-none" />
          <motion.img
            src="/drone_hero.png"
            alt="SkyVision Drone"
            className="relative w-full max-w-md mx-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] animate-[float_6s_ease-in-out_infinite] z-10"
            whileHover={{ scale: 1.04, rotate: 3 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </motion.div>
      </section>

      {/* 2. CONTACT CHANNELS */}
      <section className="py-24 px-4 sm:px-6 relative z-10 w-full overflow-hidden bg-[#02050a] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={sectionContainer} {...inViewProps} className="text-center mb-16">
            <motion.h3 variants={fadeUp} className="text-[#00ffcc] font-bold tracking-widest uppercase text-xs mb-3">Reach Out</motion.h3>
            <motion.h2 variants={headingReveal} className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Our Contact Channels</motion.h2>
          </motion.div>

          <motion.div variants={sectionContainer} {...inViewProps} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'mail-outline', title: 'Email Address', info: 'hello@skyvision.com', desc: 'Drop us a line anytime.' },
              { icon: 'call-outline', title: 'Phone Number', info: '+1 (800) 123-4567', desc: 'Mon-Fri from 8am to 5pm.' },
              { icon: 'location-outline', title: 'Headquarters', info: 'Silicon Valley, CA', desc: '1423 Drone Way, Tech Park' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={cardReveal}
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(0,255,204,0.1)', borderColor: 'rgba(0,255,204,0.3)' }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center transition-all group shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-16 h-16 rounded-full bg-[#03070c] border border-white/10 flex items-center justify-center text-2xl text-[#00ffcc] mb-6 transition-transform"
                >
                  <ion-icon name={item.icon}></ion-icon>
                </motion.div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[#00ffcc] font-medium mb-4">{item.info}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. STATS — Infinite Horizontal Marquee */}
      <section className="py-16 bg-[#03070c] z-10 relative border-b border-white/5 overflow-hidden w-full">
        <style>{`
          @keyframes marqueeContactStats {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .animate-marquee-contact-stats {
            display: flex;
            gap: 5rem;
            width: max-content;
            animation: marqueeContactStats 35s linear infinite;
          }
          .animate-marquee-contact-stats:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-8">
          <motion.h3 variants={fadeUp} {...inViewProps} className="text-gray-500 font-bold tracking-widest uppercase text-[10px]">
            SUCCESSFUL AERIAL RESOLUTIONS
          </motion.h3>
        </div>
        <div className="w-full flex overflow-hidden select-none">
          <div className="animate-marquee-contact-stats py-2">
            {[...Array(3)].flatMap((_, loopIdx) => 
              [
                { num: '24/7', text: 'Global Support' },
                { num: '<2h', text: 'Response Time' },
                { num: '50+', text: 'Enterprise Clients' },
                { num: '99%', text: 'Satisfaction Rate' },
              ].map((stat, i) => (
                <div key={`${loopIdx}-${i}`} className="flex flex-col items-center min-w-[200px] md:min-w-[260px] group transition-all duration-300">
                  <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2 group-hover:from-[#00ffcc] group-hover:to-[#3b82f6] transition-all">{stat.num}</span>
                  <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{stat.text}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. FORM SPLIT SECTION */}
      <section className="py-24 px-4 sm:px-6 relative z-10 overflow-hidden bg-[#0a111e]/30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

          {/* Left: Image */}
          <motion.div variants={slideInLeft} {...inViewProps} className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-4 border-2 border-[#00ffcc]/20 rounded-[2rem] z-0 transition-transform duration-700 group-hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-[#00ffcc]/5 blur-3xl rounded-full z-0 pointer-events-none" />
            <motion.img
              src="https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?q=80&w=800&auto=format&fit=crop"
              alt="Drone Operator"
              className="w-full h-[500px] object-cover rounded-[2rem] relative z-10 shadow-2xl opacity-90 border border-white/5 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Right: Form */}
          <motion.div variants={slideInRight} {...inViewProps} className="w-full lg:w-1/2 relative z-10">
            <motion.h2 variants={headingReveal} {...inViewProps} className="text-4xl md:text-5xl font-black text-white uppercase mb-6 tracking-tight">
              We Help You Embrace<br />The Future
            </motion.h2>
            <motion.p variants={fadeUp} {...inViewProps} className="text-gray-400 text-sm mb-10 max-w-md leading-relaxed">
              Since 2018, our team of drone experts have advised, built, and supplied drones all over the world. We're your one-stop shop for everything related to remote control aircraft.
            </motion.p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col sm:flex-row gap-5">
                <input type="text" placeholder="First Name" className="w-full sm:w-1/2 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] focus:bg-white/10 transition-colors" />
                <input type="text" placeholder="Last Name" className="w-full sm:w-1/2 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] focus:bg-white/10 transition-colors" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] focus:bg-white/10 transition-colors" />
              <textarea placeholder="How can we help you?" rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] focus:bg-white/10 transition-colors resize-none" />
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,255,204,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 bg-[#00ffcc] text-black font-bold uppercase tracking-widest rounded-xl transition-colors w-full sm:w-auto shadow-[0_10px_30px_rgba(0,255,204,0.2)]"
              >
                Explore More
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 5. DEDICATED TEAM */}
      <section className="py-24 bg-[#02050a] px-4 sm:px-6 relative z-10 text-center border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={sectionContainer} {...inViewProps} className="mb-12">
            <motion.h3 variants={fadeUp} className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-3">Meet the Experts</motion.h3>
            <motion.h2 variants={headingReveal} className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Our Dedicated Team</motion.h2>
          </motion.div>

          {/* Stateful Carousel Container — Restricted width to exactly 950px to show only 3 cards at a time */}
          <div className="relative w-full max-w-[950px] mx-auto overflow-hidden flex flex-col items-center select-none py-10">
            
            {/* Infinite Sliding Track Container */}
            <div 
              className="w-full flex justify-start items-center relative overflow-visible"
              style={{ minHeight: '420px' }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <motion.div
                animate={{ x: -(activeIdx * 328 + 140) }}
                transition={isResetting ? { duration: 0 } : {
                  type: 'spring',
                  stiffness: 200, // Fast, snappy, high-end spring
                  damping: 25,    // Smooth damping, zero jitter
                }}
                onAnimationComplete={() => {
                  // Silently jump to the middle copy once transition completes
                  if (activeIdx >= 6) {
                    setIsResetting(true);
                    setActiveIdx(activeIdx - 3);
                  } else if (activeIdx <= 2) {
                    setIsResetting(true);
                    setActiveIdx(activeIdx + 3);
                  }
                }}
                className="flex gap-12 absolute left-1/2"
                style={{ transformOrigin: 'left center' }}
              >
                {(() => {
                  const teamMembers = [
                    { name: 'Sarah Connor', role: 'Support Lead', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop' },
                    { name: 'Stephen Humbert', role: 'Sales Director', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop' },
                    { name: 'Marcus D. Hoffman', role: 'Tech Operations', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop' },
                  ];
                  const virtualTrack = [...teamMembers, ...teamMembers, ...teamMembers];
                  return virtualTrack.map((member, i) => {
                    const isActive = i === activeIdx;
                    return (
                      <motion.div
                        key={`${i}-${member.name}`}
                        animate={{
                          scale: isActive ? 1.15 : 0.9,
                          opacity: isActive ? 1 : 0.4,
                        }}
                        transition={isResetting ? { duration: 0 } : {
                          type: 'spring',
                          stiffness: 200,
                          damping: 25,
                        }}
                        onClick={() => {
                          if (!isResetting) setActiveIdx(i);
                        }}
                        className={`flex flex-col items-center cursor-pointer flex-shrink-0 ${
                          isActive ? 'z-20' : 'z-10'
                        }`}
                        style={{
                          width: '280px',
                        }}
                      >
                        {/* Circle Image container — Glow only, no border line outline! */}
                        <div
                          className={`w-48 h-48 rounded-full overflow-hidden mb-6 transition-all duration-500 relative ${
                            isActive 
                              ? 'shadow-[0_0_40px_rgba(0,255,204,0.55)] scale-105' 
                              : 'shadow-none'
                          }`}
                        >
                          <div className={`absolute inset-0 transition-colors duration-500 z-10 ${isActive ? 'bg-transparent' : 'bg-black/45'}`} />
                          <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <h4 className={`font-black text-xl mb-1 transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                          {member.name}
                        </h4>
                        
                        <span className={`text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full mt-1 mb-4 transition-all duration-500 ${
                          isActive 
                            ? 'bg-[#00ffcc] text-black shadow-[0_4px_12px_rgba(0,255,204,0.2)]' 
                            : 'bg-white/5 text-gray-500'
                        }`}>
                          {member.role}
                        </span>
                        
                        <div className={`flex gap-4 text-lg border-t pt-4 w-1/2 justify-center transition-all duration-500 ${
                          isActive ? 'border-[#00ffcc]/30 text-[#00ffcc]' : 'border-white/10 text-gray-500'
                        }`}>
                          <ion-icon name="logo-twitter" className="hover:text-white cursor-pointer transition-colors"></ion-icon>
                          <ion-icon name="logo-linkedin" className="hover:text-white cursor-pointer transition-colors"></ion-icon>
                        </div>
                      </motion.div>
                    );
                  });
                })()}
              </motion.div>
            </div>

            {/* Navigation Dots & Controls */}
            <div className="flex items-center gap-6 mt-10">
              <button
                onClick={() => {
                  if (!isResetting) setActiveIdx((prev) => prev - 1);
                }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#00ffcc] transition-all"
              >
                <ion-icon name="chevron-back-outline"></ion-icon>
              </button>
              
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (!isResetting) setActiveIdx(i + 3);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      (activeIdx % 3) === i ? 'bg-[#00ffcc] w-6' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  if (!isResetting) setActiveIdx((prev) => prev + 1);
                }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#00ffcc] transition-all"
              >
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL */}
      <section className="py-24 bg-[#03070c] px-4 sm:px-6 relative z-10 text-center border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 text-left">
          <motion.div variants={slideInLeft} {...inViewProps} className="w-full md:w-1/3 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-2">What Our Clients<br />Say</h2>
            <p className="text-[#00ffcc] font-medium text-sm">Welcome to the personal presentation.</p>
          </motion.div>

          <motion.div
            variants={slideInRight}
            {...inViewProps}
            whileHover={{ borderColor: 'rgba(0,255,204,0.3)' }}
            className="w-full md:w-2/3 bg-white/5 border border-white/10 rounded-3xl p-8 relative transition-all"
          >
            <ion-icon name="quote" className="absolute top-4 left-4 text-4xl text-[#00ffcc]/20"></ion-icon>
            <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed pl-6">
              "SkyVision provides unparalleled access and highly customized 3D data-gathering solutions. It's safe, reliable maneuverability, highly capable camera unit, and robust software made it the best choice."
            </p>
            <div className="flex items-center gap-4 pl-6">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" alt="Client" className="w-12 h-12 rounded-full border border-white/20" />
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide">David C. Hull</h4>
                <p className="text-[#00ffcc] text-[10px] uppercase tracking-widest">Facebook - Twitter - LinkedIn</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
