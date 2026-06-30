import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  sectionContainer, fadeUp, headingReveal, cardReveal,
  imageReveal, slideInLeft, slideInRight, inViewProps,
} from '../components/ui/motion';

const About: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "What's the maximum flight range?", a: "The SkyVision X100 Pro offers an impressive flight range of up to 10 kilometers, allowing you to explore and capture stunning visuals from greater distances." },
    { q: "Is the drone beginner-friendly?", a: "Yes, it features intuitive controls and multiple beginner modes." },
    { q: "What's included in the box?", a: "The drone, controller, 2 batteries, extra propellers, and a charging hub." },
    { q: "Can I use the drone for professional photography?", a: "Absolutely. With its 4K Ultra-HD camera, it's perfect for professional shots." },
    { q: "How long does the battery last?", a: "Up to 45 minutes on a single charge under optimal conditions." },
    { q: "Is there a warranty for the drone?", a: "Yes, we offer a 1-year limited warranty on all our drones." },
  ];

  return (
    <div className="min-h-[70vh] flex flex-col flex-grow bg-white text-gray-mid font-sans antialiased overflow-hidden">

      {/* 1. HERO SECTION (WHITE SECTION) */}
      <section className="relative pt-32 md:pt-48 pb-20 px-4 sm:px-6 lg:px-8 z-10 w-full flex flex-col items-center justify-center min-h-[90vh] bg-white">
        {/* Watermark text */}
        <div className="absolute top-1/4 w-full flex items-center justify-center select-none pointer-events-none overflow-hidden z-0">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="text-[14vw] md:text-[18vw] font-condensed font-extrabold uppercase tracking-tighter whitespace-nowrap text-gray-light"
          >
            SKYVISION
          </motion.h1>
        </div>

        <div className="relative z-20 flex flex-col items-center w-full max-w-[1200px] mx-auto">
          {/* Drone image */}
          <motion.div
            variants={imageReveal}
            {...inViewProps}
            className="relative w-full max-w-5xl flex justify-center perspective-1000 group"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-yellow-light/30 blur-[100px] rounded-full" />
            <img
              src="/drone_hero.png"
              alt="SkyVision Drone"
              className="relative w-full md:w-[70%] object-contain animate-[float_6s_ease-in-out_infinite] drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-10"
            />
          </motion.div>

          {/* Text bar below drone */}
          <motion.div
            variants={sectionContainer}
            {...inViewProps}
            className="w-full flex flex-col md:flex-row justify-between items-end mt-16 md:mt-24 pb-8 border-b border-gray-border"
          >
            <motion.div variants={fadeUp} className="text-gray-mid font-light text-base md:text-lg leading-relaxed max-w-xs mb-8 md:mb-0">
              Experience precision,<br className="hidden md:block" />
              power, and innovation like<br className="hidden md:block" />
              never before.
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-right">
              <div className="flex items-center gap-8 text-yellow text-lg md:text-2xl">
                <div className="flex items-center gap-2">
                  <ion-icon name="star" class="text-yellow"></ion-icon>
                  <span className="font-bold text-black font-condensed">4.8</span>
                </div>
                <p className="text-gray-mid text-xs md:text-sm italic max-w-[200px] text-left border-l border-gray-border pl-6 py-2">
                  "Incredible Experience With SkyVision Precision in Flight."
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-border flex items-center justify-center text-black hover:text-yellow hover:border-yellow transition-colors md:ml-4 bg-transparent cursor-pointer"
              >
                <ion-icon name="arrow-down-outline" className="text-xl md:text-2xl"></ion-icon>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY SKYVISION STANDS OUT (LIGHT SECTION) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#F7F7F7] text-gray-mid overflow-hidden">
        {/* Background Scrolling Text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0 opacity-40">
          <div className="flex whitespace-nowrap animate-[scroll_30s_linear_infinite]">
            <span className="text-[25vw] font-condensed font-bold uppercase tracking-tighter text-gray-300/30 pr-10">SKYVISION</span>
            <span className="text-[25vw] font-condensed font-bold uppercase tracking-tighter text-gray-300/30 pr-10">SKYVISION</span>
            <span className="text-[25vw] font-condensed font-bold uppercase tracking-tighter text-gray-300/30 pr-10">SKYVISION</span>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto flex flex-col pt-10 relative z-10">
          {/* Title */}
          <motion.div
            variants={sectionContainer}
            {...inViewProps}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          >
            <div>
              <span className="section-eyebrow">— Features</span>
              <h2 className="text-[28px] md:text-[46px] font-condensed font-bold text-black tracking-tight leading-[1.1] uppercase">
                Why SkyVision <br />Stands Out
              </h2>
              <div className="underline-accent" />
            </div>
            <motion.p variants={fadeUp} className="text-gray-mid text-sm leading-relaxed max-w-lg">
              Our users love the simplicity and efficiency of our platform. They've shared stories of increased productivity, seamless experiences, and transformative results that make a real difference in their daily lives.
            </motion.p>
          </motion.div>

          {/* Feature layout */}
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-8 w-full mt-4">
            {/* Left Cards */}
            <motion.div
              variants={slideInLeft}
              {...inViewProps}
              className="flex flex-col relative w-full md:w-1/3 min-h-[350px]"
            >
              <motion.div
                className="card-light border border-gray-border absolute left-0 bottom-0 z-10 w-[85%] shadow-sm group hover:border-yellow transition-colors"
              >
                <span className="text-yellow font-condensed font-bold text-2xl opacity-20 group-hover:opacity-100 transition-opacity absolute top-4 right-4">03</span>
                <h3 className="text-black font-bold text-lg mb-2">Compact &<br />Portable Design</h3>
                <p className="text-gray-mid text-xs mt-6">Foldable, lightweight, and perfect for adventures.</p>
              </motion.div>
              <motion.div
                className="card-light border border-gray-border absolute right-0 top-0 z-20 w-[85%] shadow-md group hover:border-yellow transition-colors"
              >
                <span className="text-yellow font-condensed font-bold text-2xl opacity-20 group-hover:opacity-100 transition-opacity absolute top-4 right-4">01</span>
                <h3 className="text-black font-bold text-lg mb-2">Advanced Obstacle<br />Avoidance</h3>
                <p className="text-gray-mid text-xs mt-12 w-4/5">Fly safely with smart sensors detecting nearby objects.</p>
              </motion.div>
            </motion.div>

            {/* Center Drone */}
            <motion.div
              variants={imageReveal}
              {...inViewProps}
              className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0 flex flex-col items-center justify-center z-10 text-center group mx-auto"
            >
              <div className="absolute inset-0 rounded-full bg-yellow-light/20 blur-2xl pointer-events-none" />
              <img
                src="/image.png"
                alt="Camera Drone"
                className="w-86 md:w-72 lg:w-96 object-contain mb-4 group-hover:scale-110 transition-transform duration-700 relative z-10"
              />
              <h3 className="text-black font-condensed font-bold text-xl md:text-2xl mb-1 uppercase">4K Ultra-HD Camera</h3>
              <p className="text-gray-mid text-[10px] md:text-xs max-w-[160px]">Capture stunning aerial footage with incredible clarity.</p>
            </motion.div>

            {/* Right Cards */}
            <motion.div
              variants={slideInRight}
              {...inViewProps}
              className="flex flex-col relative w-full md:w-1/3 min-h-[350px]"
            >
              <motion.div
                className="card-light border border-gray-border absolute left-0 top-0 z-20 w-[85%] shadow-md group hover:border-yellow transition-colors"
              >
                <span className="text-yellow font-condensed font-bold text-2xl opacity-20 group-hover:opacity-100 transition-opacity absolute top-4 right-4">02</span>
                <h3 className="text-black font-bold text-lg mb-2">Intelligent Flight<br />Modes</h3>
                <p className="text-gray-mid text-xs mt-12 w-4/5">Follow Me, Waypoints, and Gesture Control for effortless operation.</p>
              </motion.div>
              <motion.div
                className="card-light border border-gray-border absolute right-0 bottom-0 z-10 w-[85%] shadow-sm group hover:border-yellow transition-colors"
              >
                <span className="text-yellow font-condensed font-bold text-2xl opacity-20 group-hover:opacity-100 transition-opacity absolute top-4 right-4">04</span>
                <h3 className="text-black font-bold text-lg mb-2">Extended Flight<br />Time</h3>
                <p className="text-gray-mid text-xs mt-6">Up to 45 minutes on a single charge.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SETUP STEPS (WHITE SECTION) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 w-full bg-white text-gray-mid reveal">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left: See in action */}
          <motion.div
            variants={slideInLeft}
            {...inViewProps}
            className="flex flex-col justify-between pt-4"
          >
            <div>
              <span className="section-eyebrow">— Agility</span>
              <h2 className="text-[28px] md:text-[46px] font-condensed font-extrabold text-black mb-6 uppercase">
                See SkyVision<br />In Action
              </h2>
              <div className="underline-accent" />
              <p className="text-gray-mid text-sm leading-relaxed mb-12 max-w-md">
                Experience SkyVision's unmatched performance, precision, and creativity through real-world scenarios, showcasing stunning visuals, intelligent flight modes, and seamless agility in diverse environments.
              </p>
            </div>

            <motion.div
              variants={imageReveal}
              {...inViewProps}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-[4px] overflow-hidden border border-gray-border group mt-auto h-56 md:h-72 w-3/4 max-w-sm self-end shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1579820010410-c10411aaaa88?q=80&w=600&auto=format&fit=crop"
                alt="Drone View"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 border border-gray-border rounded-[4px] px-5 py-2.5 flex items-center justify-between gap-4 w-[85%]">
                <ion-icon name="videocam-outline" className="text-black"></ion-icon>
                <div className="flex-1 px-3">
                  <div className="w-full h-1 bg-gray-border rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-yellow rounded-full" />
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-xs text-white shadow">
                  <ion-icon name="close"></ion-icon>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Setup Steps */}
          <motion.div
            variants={slideInRight}
            {...inViewProps}
            className="border-t lg:border-t-0 lg:border-l border-gray-border pt-12 lg:pt-0 lg:pl-20 relative"
          >
            <motion.div variants={sectionContainer} {...inViewProps} className="mb-16 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <div>
                <h2 className="text-[24px] md:text-[36px] font-condensed font-extrabold text-black leading-tight uppercase">
                  Simple Setup,<br />Stunning Results
                </h2>
                <div className="underline-accent" />
              </div>
              <p className="text-gray-mid text-xs sm:text-right max-w-[200px]">
                Achieve stunning results with SkyVision's simple setup. Unfold, connect via the app, and take off effortlessly.
              </p>
            </motion.div>

            <div className="space-y-8 relative">
              <div className="absolute left-6 top-8 bottom-8 w-[1px] bg-gray-border z-0 hidden sm:block" />
              {[
                { num: '1', title: 'Unfold the drone and power it on.', img: 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?q=80&w=300&auto=format&fit=crop' },
                { num: '2', title: 'Connect to the companion app via your device.', img: 'https://images.unsplash.com/photo-1587893458428-111d4eaca2eb?q=80&w=300&auto=format&fit=crop' },
                { num: '3', title: 'Take off and capture the world from above.', img: 'https://images.unsplash.com/photo-1508614589041-895b68904561?q=80&w=300&auto=format&fit=crop' },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  variants={cardReveal}
                  {...inViewProps}
                  custom={i}
                  transition={{ delay: i * 0.12 }}
                  className="flex items-center gap-6 relative z-10 group"
                >
                  <div
                    className="w-12 h-12 rounded-full bg-white border border-gray-border flex items-center justify-center text-xs font-bold text-black transition-colors flex-shrink-0 relative group-hover:border-yellow"
                  >
                    {step.num}
                  </div>
                  <div className="flex-grow bg-white border border-gray-border rounded-[4px] p-4 flex justify-between items-center group-hover:border-yellow transition-all gap-4 shadow-sm">
                    <p className="text-black text-sm font-semibold w-2/3">{step.title}</p>
                    <div className="w-16 h-12 md:w-24 md:h-16 rounded-[2px] overflow-hidden flex-shrink-0 border border-gray-border hidden sm:block">
                      <img src={step.img} alt={`Step ${step.num}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. TRUSTED BY (LIGHT SECTION) */}
      <section className="py-32 px-4 sm:px-6 relative z-10 bg-gray-light text-gray-mid flex justify-center text-center reveal border-t border-gray-border">
        <div className="max-w-[1200px] flex justify-between gap-12 text-left relative w-full items-center pl-4 lg:pl-0">
          <motion.div variants={slideInLeft} {...inViewProps} className="w-1/3 min-w-[200px]">
            <span className="section-eyebrow">— Trust</span>
            <h2 className="text-[28px] md:text-[36px] font-condensed font-bold text-black mb-4 uppercase">Trusted By<br />Thousands</h2>
            <div className="underline-accent" />
            <p className="text-gray-mid text-xs leading-relaxed hidden sm:block">
              SkyVision is trusted by thousands of aerial enthusiasts worldwide, celebrated for its precision, reliability, and ability to capture stunning visuals.
            </p>
          </motion.div>

          <motion.div variants={slideInRight} {...inViewProps} className="w-2/3 max-w-2xl px-4 md:px-0 flex flex-col items-center text-center">
            <ion-icon name="aperture" className="text-yellow border border-gray-border bg-white p-2 rounded-full text-2xl mb-8 shadow-sm"></ion-icon>
            <h3 className="text-xl md:text-3xl font-condensed font-bold text-black mb-6 uppercase">Nietzsche</h3>
            <p className="text-lg md:text-2xl font-light italic text-gray-mid leading-relaxed mb-10 text-balance">
              "SkyVision is a game-changer! Its phenomenal camera quality and intelligent flight modes make it incredibly easy to use, allowing me to capture stunning visuals effortlessly for my travel vlogs."
            </p>
            <div className="flex items-center gap-4 justify-center w-full mb-10">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop" alt="Leslie Alexander" className="w-14 h-14 rounded-full object-cover border-2 border-yellow" />
              <div className="text-left flex flex-col justify-center">
                <h4 className="font-bold text-black text-sm tracking-wide uppercase">Leslie Alexander</h4>
                <span className="text-yellow text-[10px] uppercase tracking-widest font-semibold">Advanced Technique Coach</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. FAQs (NEW LAYOUT) */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-white text-gray-mid flex flex-col pb-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 flex-grow items-start w-full">

          {/* Left: FAQs Search & Accordion */}
          <motion.div variants={slideInLeft} {...inViewProps} className="pr-0 lg:pr-12">
            <h2 className="text-[32px] md:text-[46px] font-condensed font-bold text-[#353E5C] mb-8 capitalize tracking-tight leading-tight">
              Frequently Asked<br />Questions
            </h2>
            
            <div className="relative mb-10">
               <input 
                 type="text" 
                 placeholder="Search question here" 
                 className="w-full bg-gray-50 border border-gray-border rounded-full py-3.5 px-6 pl-12 text-sm text-black focus:outline-none focus:border-yellow transition-colors font-medium placeholder:text-gray-400 shadow-sm" 
               />
               <ion-icon name="search-outline" className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></ion-icon>
            </div>

            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={cardReveal}
                  {...inViewProps}
                  className="border-b border-gray-border overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between py-6 text-left group bg-transparent cursor-pointer"
                  >
                    <span className="font-bold text-[#353E5C] text-sm md:text-base group-hover:text-yellow transition-colors">{faq.q}</span>
                    <span className="text-gray-400 font-light text-xl transition-colors group-hover:text-yellow ml-4">
                      {openFaq === index ? '-' : '+'}
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-mid text-sm leading-relaxed pr-8">{faq.a}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Graphic */}
          <motion.div
            variants={slideInRight}
            {...inViewProps}
            className="w-full h-full min-h-[400px] flex items-center justify-center relative perspective-1000 mt-12 lg:mt-0"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-yellow/10 blur-[80px] rounded-full pointer-events-none"></div>
             <div className="relative z-10 w-full flex justify-center items-center font-condensed font-bold text-[#E5E7EB] text-[15rem] leading-none drop-shadow-xl select-none">
               <span className="-mr-12 animate-[float_6s_ease-in-out_infinite]">F</span>
               <span className="text-yellow drop-shadow-md z-20">A</span>
               <span className="-ml-12 animate-[float_7s_ease-in-out_infinite]">Q</span>
             </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default About;
