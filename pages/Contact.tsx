import React, { useEffect, useState, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import {
  sectionContainer, fadeUp, headingReveal, cardReveal,
  imageReveal, slideInLeft, slideInRight, inViewProps,
} from '../components/ui/motion';

function AnimatedCounter({ from, to, suffix = '', prefix = '', duration = 2.5 }: { from: number, to: number, suffix?: string, prefix?: string, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: '-50px' });
  
  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (node) {
      const controls = animate(from, to, {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        onUpdate(value) {
          node.textContent = prefix + Math.round(value).toString() + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView, prefix, suffix]);

  return <span ref={nodeRef}>{prefix}{from}{suffix}</span>;
}

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
      const timer = setTimeout(() => {
        setIsResetting(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isResetting]);

  return (
    <div className="min-h-[70vh] flex flex-col flex-grow bg-white text-gray-mid font-sans antialiased overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 z-10 max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between min-h-[70vh] bg-transparent">
        {/* Left: Text reveals first */}
        <motion.div
          variants={slideInLeft}
          {...inViewProps}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="w-full md:w-1/2 md:pr-12 relative z-20 text-center md:text-left"
        >
          <span className="section-eyebrow tracking-[0.2em] opacity-80">
            — Reach The Future
          </span>
          <h1 className="text-4xl md:text-[68px] font-condensed font-extrabold mb-6 uppercase tracking-tight text-black leading-[0.95]">
            Get In Touch <br />With The Future
          </h1>
          <div className="underline-accent mx-auto md:mx-0 opacity-80" />
          <p className="text-gray-mid text-base md:text-lg mb-10 max-w-md leading-relaxed mx-auto md:mx-0 font-medium">
            SkyVision isn't just an aviation company, it's your partner in aerial innovation. Reach out to coordinate your next industrial fleet deployment.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('contact-form-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary cursor-pointer w-full sm:w-auto shadow-[0_8px_30px_rgba(255,214,0,0.3)] hover:shadow-[0_12px_40px_rgba(255,214,0,0.5)] transition-all"
          >
            Send Us a Message
          </button>
          
          <div className="flex gap-6 mt-12 justify-center md:justify-start">
            {['logo-twitter', 'logo-instagram', 'logo-linkedin'].map((icon) => (
              <motion.div
                key={icon}
                whileHover={{ scale: 1.15, backgroundColor: 'var(--yellow)', borderColor: 'var(--yellow)' }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-gray-border flex items-center justify-center transition-colors duration-300 cursor-pointer text-black hover:text-black shadow-sm"
              >
                <ion-icon name={icon}></ion-icon>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Drone floating naturally with no box */}
        <motion.div
          variants={slideInRight}
          {...inViewProps}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.8 }} // Increased delay so text reveals first
          className="w-full md:w-1/2 relative mt-16 md:mt-0 flex justify-center perspective-1000 pointer-events-none"
        >
          <img
            src="/drone_hero.png"
            alt="SkyVision Drone"
            className="relative w-full max-w-[550px] object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.25)] animate-[float_6s_ease-in-out_infinite] z-10"
          />
        </motion.div>
      </section>

      {/* 2. CONTACT CHANNELS */}
      <section className="py-24 px-4 sm:px-6 relative z-10 w-full overflow-hidden bg-transparent text-gray-mid">
        <motion.div variants={sectionContainer} {...inViewProps} className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 flex flex-col items-center">
            <motion.span variants={fadeUp} className="section-eyebrow tracking-[0.2em] opacity-80">— Reach Out</motion.span>
            <motion.h2 variants={fadeUp} className="text-[28px] md:text-[46px] font-condensed font-bold text-black uppercase tracking-tight">Our Contact Channels</motion.h2>
            <motion.div variants={fadeUp} className="underline-accent opacity-80" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
            {[
              { icon: 'mail-outline', title: 'Email Address', info: 'hello@skyvision.com', desc: 'Drop us a line anytime.' },
              { icon: 'call-outline', title: 'Phone Number', info: '+1 (800) 123-4567', desc: 'Mon-Fri from 8am to 5pm.' },
              { icon: 'location-outline', title: 'Headquarters', info: 'Silicon Valley, CA', desc: '1423 Drone Way, Tech Park' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={cardReveal}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
                className="bg-white rounded-[8px] p-8 shadow-sm border border-gray-border flex flex-col items-center text-center group transition-all duration-500 hover:border-yellow"
              >
                <div
                  className="w-16 h-16 rounded-full bg-yellow/10 border border-yellow/30 flex items-center justify-center text-2xl text-yellow mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-yellow group-hover:text-black group-hover:shadow-[0_0_20px_rgba(255,214,0,0.4)]"
                >
                  <ion-icon name={item.icon}></ion-icon>
                </div>
                <h3 className="text-black font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-yellow font-bold tracking-wide mb-3">{item.info}</p>
                <p className="text-gray-mid text-sm font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. STATS BAR (Transparent Marquee with Count-ups) */}
      <section className="w-full bg-transparent py-16 overflow-hidden relative">
        {/* Subtle horizontal gradient fades on edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="text-center mb-10">
          <span className="text-gray-400 font-bold tracking-[0.25em] uppercase text-[11px]">
            SUCCESSFUL AERIAL RESOLUTIONS
          </span>
        </div>

        <div className="flex w-full overflow-hidden">
          <motion.div
            className="flex gap-16 md:gap-32 whitespace-nowrap min-w-max items-center pr-16 md:pr-32"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
          >
            {/* We render the stats twice to create a seamless infinite loop */}
            {[
              { num: 24, to: 24, suffix: '/7', text: 'Global Support' },
              { num: 0, to: 2, prefix: '<', suffix: 'h', text: 'Response Time' },
              { num: 0, to: 50, suffix: '+', text: 'Enterprise Clients' },
              { num: 0, to: 99, suffix: '%', text: 'Satisfaction Rate' },
              { num: 24, to: 24, suffix: '/7', text: 'Global Support' },
              { num: 0, to: 2, prefix: '<', suffix: 'h', text: 'Response Time' },
              { num: 0, to: 50, suffix: '+', text: 'Enterprise Clients' },
              { num: 0, to: 99, suffix: '%', text: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center min-w-[200px]">
                <span className="text-5xl md:text-6xl font-condensed font-extrabold text-black tracking-tight drop-shadow-sm">
                  <AnimatedCounter from={stat.num} to={stat.to} prefix={stat.prefix} suffix={stat.suffix} duration={2.5} />
                </span>
                <span className="text-gray-mid text-[12px] font-bold uppercase mt-3 tracking-[0.15em]">
                  {stat.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. FORM & MAP SECTION (PREMIUM SaaS LAYOUT) */}
      <section id="contact-form-section" className="py-24 px-4 sm:px-6 relative z-10 overflow-hidden bg-[#FAFAFA]">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12 items-center relative z-20">

          {/* Left: Embedded Map */}
          <motion.div variants={slideInLeft} {...inViewProps} className="w-full lg:w-1/2 relative group h-[500px]">
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white/60 p-2 z-10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.06346299104!2d-122.420894084682!3d37.774929979759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter+HQ!5e0!3m2!1sen!2sus!4v1550000000000" 
                className="w-full h-full rounded-xl"
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
              ></iframe>
            </div>
            {/* Overlay badge */}
            <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-800 shadow-xl flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow animate-pulse" />
              <span className="text-white text-[10px] uppercase tracking-widest font-bold">SkyVision HQ</span>
            </div>
          </motion.div>

          {/* Right: Glassmorphism Form */}
          <motion.div variants={slideInRight} {...inViewProps} className="w-full lg:w-1/2 relative z-20">
            <div className="text-left mb-10">
              <span className="section-eyebrow tracking-[0.2em] opacity-80">
                — Connect
              </span>
              <h2 className="text-[32px] md:text-[42px] font-condensed font-extrabold text-black uppercase mb-4 tracking-tight leading-none">
                Embrace The Future
              </h2>
              <p className="text-gray-mid text-sm max-w-md font-medium">
                Our experts are ready to engineer the perfect aerial fleet for your enterprise. Send us your requirements or visit us at our Silicon Valley headquarters.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-[12px] p-8 md:p-10 relative overflow-hidden">
              {/* Inner top highlight for premium feel */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow/40 to-transparent opacity-50" />
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="relative w-full sm:w-1/2">
                    <input type="text" id="fname" className="peer w-full bg-gray-50/50 border border-gray-200 px-4 pt-5 pb-2 rounded-lg outline-none focus:bg-white focus:border-yellow focus:ring-1 focus:ring-yellow transition-all text-sm text-black shadow-sm" placeholder=" " />
                    <label htmlFor="fname" className="absolute left-4 top-4 text-gray-400 font-medium text-xs tracking-wide transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-yellow pointer-events-none">First Name</label>
                  </div>
                  <div className="relative w-full sm:w-1/2">
                    <input type="text" id="lname" className="peer w-full bg-gray-50/50 border border-gray-200 px-4 pt-5 pb-2 rounded-lg outline-none focus:bg-white focus:border-yellow focus:ring-1 focus:ring-yellow transition-all text-sm text-black shadow-sm" placeholder=" " />
                    <label htmlFor="lname" className="absolute left-4 top-4 text-gray-400 font-medium text-xs tracking-wide transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-yellow pointer-events-none">Last Name</label>
                  </div>
                </div>
                <div className="relative w-full">
                  <input type="email" id="email" className="peer w-full bg-gray-50/50 border border-gray-200 px-4 pt-5 pb-2 rounded-lg outline-none focus:bg-white focus:border-yellow focus:ring-1 focus:ring-yellow transition-all text-sm text-black shadow-sm" placeholder=" " />
                  <label htmlFor="email" className="absolute left-4 top-4 text-gray-400 font-medium text-xs tracking-wide transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-yellow pointer-events-none">Email Address</label>
                </div>
                <div className="relative w-full">
                  <textarea id="message" rows={4} className="peer w-full bg-gray-50/50 border border-gray-200 px-4 pt-6 pb-2 rounded-lg outline-none focus:bg-white focus:border-yellow focus:ring-1 focus:ring-yellow transition-all text-sm text-black resize-none shadow-sm" placeholder=" " />
                  <label htmlFor="message" className="absolute left-4 top-4 text-gray-400 font-medium text-xs tracking-wide transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-yellow pointer-events-none">How can we help you?</label>
                </div>
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(255,214,0,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full shadow-[0_8px_25px_rgba(255,214,0,0.3)] transition-all flex items-center justify-center border-none"
                  >
                    Submit Inquiry
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. DEDICATED TEAM (LIGHT SECTION) */}
      <section className="py-24 bg-[#F7F7F7] text-gray-mid px-4 relative z-10 text-center reveal">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 flex flex-col items-center">
            <span className="section-eyebrow">— Meet the Experts</span>
            <h2 className="text-[28px] md:text-[46px] font-condensed font-bold text-black uppercase tracking-tight">Our Dedicated Team</h2>
            <div className="underline-accent animate-pulse" />
          </div>

          {/* Stateful Carousel Container */}
          <div className="relative w-full max-w-[950px] mx-auto overflow-hidden flex flex-col items-center select-none py-10">

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
                  stiffness: 200,
                  damping: 25,
                }}
                onAnimationComplete={() => {
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
                        className={`flex flex-col items-center cursor-pointer flex-shrink-0 ${isActive ? 'z-20' : 'z-10'
                          }`}
                        style={{
                          width: '280px',
                        }}
                      >
                        {/* Circle Image container */}
                        <div
                          className={`w-48 h-48 rounded-full overflow-hidden mb-6 transition-all duration-500 relative ${isActive
                              ? 'shadow-[0_0_30px_rgba(255,214,0,0.5)] scale-105'
                              : 'shadow-sm border border-gray-border'
                            }`}
                        >
                          <div className={`absolute inset-0 transition-colors duration-500 z-10 ${isActive ? 'bg-transparent' : 'bg-white/40'}`} />
                          <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                        </div>

                        <h4 className={`font-bold text-xl mb-1 transition-colors duration-500 ${isActive ? 'text-black' : 'text-gray-mid'}`}>
                          {member.name}
                        </h4>

                        <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mt-1 mb-4 transition-all duration-500 ${isActive
                            ? 'bg-yellow text-black'
                            : 'bg-white border border-gray-border text-gray-mid'
                          }`}>
                          {member.role}
                        </span>

                        <div className={`flex gap-4 text-lg border-t pt-4 w-1/2 justify-center transition-all duration-500 ${isActive ? 'border-yellow/30 text-yellow' : 'border-gray-border text-gray-mid'
                          }`}>
                          <ion-icon name="logo-twitter" className="hover:text-yellow cursor-pointer transition-colors"></ion-icon>
                          <ion-icon name="logo-linkedin" className="hover:text-yellow cursor-pointer transition-colors"></ion-icon>
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
                className="w-12 h-12 rounded-full border border-gray-border flex items-center justify-center text-black hover:bg-white hover:border-yellow transition-all bg-transparent cursor-pointer animate-none shadow-sm"
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
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${(activeIdx % 3) === i ? 'bg-yellow w-6' : 'bg-gray-300'
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  if (!isResetting) setActiveIdx((prev) => prev + 1);
                }}
                className="w-12 h-12 rounded-full border border-gray-border flex items-center justify-center text-black hover:bg-white hover:border-yellow transition-all bg-transparent cursor-pointer animate-none shadow-sm"
              >
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL (WHITE SECTION) */}
      <section className="py-24 bg-white px-4 relative z-10 flex justify-center text-center border-t border-gray-border overflow-hidden">
        <div className="max-w-[900px] mx-auto flex flex-col items-center justify-center relative">
          
          {/* Subtle background glow effect for uniqueness */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-yellow/5 rounded-full blur-[80px] pointer-events-none" />

          <motion.div variants={fadeUp} {...inViewProps} className="text-center flex flex-col items-center mb-12 relative z-10">
            <span className="section-eyebrow">— Client Stories</span>
            <h2 className="text-[32px] md:text-[46px] font-condensed font-bold text-black uppercase mb-4 tracking-tight">What Clients Say</h2>
            <div className="underline-accent mx-auto" />
          </motion.div>

          <motion.div
            variants={cardReveal}
            {...inViewProps}
            whileHover={{ y: -10, boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
            className="w-full bg-white border border-gray-border rounded-2xl p-12 md:p-16 relative transition-all shadow-xl group flex flex-col items-center justify-center"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-yellow rounded-b-lg" />
            
            <ion-icon name="quote" className="text-6xl text-yellow/30 mb-8 transition-transform group-hover:scale-110 group-hover:text-yellow/50"></ion-icon>
            
            <p className="text-black text-xl md:text-2xl font-medium italic mb-10 relative z-10 leading-relaxed text-center max-w-3xl">
              "SkyVision provides unparalleled access and highly customized 3D data-gathering solutions. Its safe, reliable maneuverability, highly capable camera unit, and robust software made it the best choice for our enterprise."
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" alt="Client" className="w-16 h-16 rounded-full border-2 border-white shadow-lg relative z-10 object-cover" />
                <div className="absolute inset-0 rounded-full border-2 border-yellow scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
              </div>
              <div className="text-center">
                <h4 className="text-black font-extrabold text-lg tracking-wide uppercase">David C. Hull</h4>
                <p className="text-yellow text-[11px] uppercase tracking-[0.2em] font-bold mt-1">Lead Operations Director</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
