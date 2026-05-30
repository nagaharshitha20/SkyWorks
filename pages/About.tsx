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

  const featureCards = [
    { num: '01', title: 'Advanced Obstacle Avoidance', desc: 'Fly safely with smart sensors detecting nearby objects.', position: 'top-right' },
    { num: '02', title: 'Intelligent Flight Modes', desc: 'Follow Me, Waypoints, and Gesture Control for effortless operation.', position: 'top-left' },
    { num: '03', title: 'Compact & Portable Design', desc: 'Foldable, lightweight, and perfect for adventures.', position: 'bottom-left' },
    { num: '04', title: 'Extended Flight Time', desc: 'Up to 45 minutes on a single charge.', position: 'bottom-right' },
  ];

  return (
    <div className="min-h-screen bg-[#03070c] text-white selection:bg-[#00ffcc] selection:text-black font-sans antialiased overflow-hidden">

      {/* Background Decorators */}
      <div className="fixed top-0 right-0 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1e3a8a]/20 via-[#03070c]/0 to-transparent pointer-events-none z-0" />
      <div className="fixed top-[40%] left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00ffcc]/5 via-transparent to-transparent pointer-events-none z-0" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 md:pt-48 pb-20 px-4 sm:px-6 lg:px-8 z-10 w-full flex flex-col items-center justify-center min-h-[90vh]">
        {/* Watermark text */}
        <div className="absolute top-1/4 w-full flex items-center justify-center select-none pointer-events-none overflow-hidden z-0">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[14vw] md:text-[18vw] font-black uppercase tracking-tighter whitespace-nowrap text-white/5"
          >
            SKYWORKS
          </motion.h1>
        </div>

        <div className="relative z-20 flex flex-col items-center w-full max-w-7xl mx-auto">
          {/* Drone image */}
          <motion.div
            variants={imageReveal}
            {...inViewProps}
            className="relative w-full max-w-5xl flex justify-center perspective-1000 group"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#00ffcc]/10 blur-[100px] rounded-full group-hover:bg-[#00ffcc]/20 transition-colors duration-700" />
            <img
              src="/drone_hero.png"
              alt="SkyVision Drone"
              className="relative w-full md:w-[70%] object-contain animate-[float_6s_ease-in-out_infinite] drop-shadow-[0_40px_50px_rgba(0,0,0,0.5)] z-10"
            />
          </motion.div>

          {/* Text bar below drone */}
          <motion.div
            variants={sectionContainer}
            {...inViewProps}
            className="w-full flex flex-col md:flex-row justify-between items-end mt-16 md:mt-24 pb-8 border-b border-white/10"
          >
            <motion.div variants={fadeUp} className="text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-xs mb-8 md:mb-0">
              Experience precision,<br className="hidden md:block" />
              power, and innovation like<br className="hidden md:block" />
              never before.
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-right">
              <div className="flex items-center gap-8 text-[#00ffcc] text-lg md:text-2xl">
                <div className="flex items-center gap-2">
                  <ion-icon name="star"></ion-icon>
                  <span className="font-bold text-white">4.8</span>
                </div>
                <p className="text-gray-400 text-xs md:text-sm italic max-w-[200px] text-left border-l border-white/10 pl-6 py-2">
                  "Incredible Experience With SkyVision Precision in Flight."
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, borderColor: '#00ffcc' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-[#00ffcc] hover:border-[#00ffcc] transition-colors md:ml-4"
              >
                <ion-icon name="arrow-down-outline" className="text-xl md:text-2xl text-gray-300"></ion-icon>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY SKYVISION STANDS OUT */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#02050a] border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col pt-10">
          {/* Title */}
          <motion.div
            variants={sectionContainer}
            {...inViewProps}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          >
            <motion.h2 variants={headingReveal} className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Why SkyVision <br />Stands Out
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-sm leading-relaxed max-w-lg">
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
                whileHover={{ y: -12, scale: 1.03, zIndex: 30 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute left-0 bottom-0 z-10 bg-[#050914]/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl w-[85%] shadow-xl group"
              >
                <span className="text-[#00ffcc] font-black text-2xl opacity-20 group-hover:opacity-100 transition-opacity absolute top-4 right-4">03</span>
                <h3 className="text-white font-bold text-lg mb-2">Compact &<br />Portable Design</h3>
                <p className="text-gray-500 text-xs mt-6">Foldable, lightweight, and perfect for adventures.</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -12, scale: 1.05, zIndex: 30 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute right-0 top-0 z-20 bg-gradient-to-br from-white/10 to-transparent p-[1px] rounded-3xl w-[85%]"
              >
                <div className="bg-[#0a111e] rounded-[1.4rem] p-6 h-full shadow-2xl relative group">
                  <span className="text-[#00ffcc] font-black text-2xl opacity-20 group-hover:opacity-100 transition-opacity absolute top-4 right-4">01</span>
                  <h3 className="text-white font-bold text-lg mb-2">Advanced Obstacle<br />Avoidance</h3>
                  <p className="text-gray-500 text-xs mt-12 w-4/5">Fly safely with smart sensors detecting nearby objects.</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Center Drone */}
            <motion.div
              variants={imageReveal}
              {...inViewProps}
              className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0 flex flex-col items-center justify-center z-10 text-center group mx-auto"
            >
              <div className="absolute inset-0 rounded-full bg-[#00ffcc]/5 blur-2xl pointer-events-none" />
              <img
                src="/image.png"
                alt="Camera Drone"
                className="w-86 md:w-72 lg:w-96 object-contain mb-4 group-hover:scale-110 transition-transform duration-700 relative z-10"
              />
              <h3 className="text-white font-bold text-xl md:text-2xl mb-1">4K Ultra-HD Camera</h3>
              <p className="text-gray-500 text-[10px] md:text-xs max-w-[160px]">Capture stunning aerial footage with incredible clarity.</p>
            </motion.div>

            {/* Right Cards */}
            <motion.div
              variants={slideInRight}
              {...inViewProps}
              className="flex flex-col relative w-full md:w-1/3 min-h-[350px]"
            >
              <motion.div
                whileHover={{ y: -12, scale: 1.05, zIndex: 30 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute left-0 top-0 z-20 bg-gradient-to-br from-white/10 to-transparent p-[1px] rounded-3xl w-[85%]"
              >
                <div className="bg-[#0a111e] rounded-[1.4rem] p-6 h-full shadow-2xl relative group">
                  <span className="text-[#00ffcc] font-black text-2xl opacity-20 group-hover:opacity-100 transition-opacity absolute top-4 right-4">02</span>
                  <h3 className="text-white font-bold text-lg mb-2">Intelligent Flight<br />Modes</h3>
                  <p className="text-gray-500 text-xs mt-12 w-4/5">Follow Me, Waypoints, and Gesture Control for effortless operation.</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -12, scale: 1.03, zIndex: 30 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute right-0 bottom-0 z-10 bg-[#050914]/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl w-[85%] shadow-xl group"
              >
                <span className="text-[#00ffcc] font-black text-2xl opacity-20 group-hover:opacity-100 transition-opacity absolute top-4 right-4">04</span>
                <h3 className="text-white font-bold text-lg mb-2">Extended Flight<br />Time</h3>
                <p className="text-gray-500 text-xs mt-6">Up to 45 minutes on a single charge.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SEE IN ACTION / SETUP */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left: See in action */}
          <motion.div
            variants={slideInLeft}
            {...inViewProps}
            className="flex flex-col justify-between pt-4"
          >
            <div>
              <motion.h2 variants={headingReveal} {...inViewProps} className="text-4xl md:text-5xl font-black text-white mb-6">
                See SkyVision<br />In Action
              </motion.h2>
              <motion.p variants={fadeUp} {...inViewProps} className="text-gray-400 text-sm leading-relaxed mb-12 max-w-md">
                Experience SkyVision's unmatched performance, precision, and creativity through real-world scenarios, showcasing stunning visuals, intelligent flight modes, and seamless agility in diverse environments.
              </motion.p>
            </div>

            <motion.div
              variants={imageReveal}
              {...inViewProps}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-[2rem] overflow-hidden border border-white/10 group mt-auto h-56 md:h-72 w-3/4 max-w-sm self-end shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <img
                src="https://images.unsplash.com/photo-1579820010410-c10411aaaa88?q=80&w=600&auto=format&fit=crop"
                alt="Drone View"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-full px-5 py-2.5 flex items-center justify-between gap-4 border border-white/10 w-[85%]">
                <ion-icon name="videocam-outline" className="text-white drop-shadow"></ion-icon>
                <div className="flex-1 px-3">
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-white rounded-full" />
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs text-black shadow-lg">
                  <ion-icon name="close"></ion-icon>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Setup Steps */}
          <motion.div
            variants={slideInRight}
            {...inViewProps}
            className="border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0 lg:pl-20 relative"
          >
            <motion.div variants={sectionContainer} {...inViewProps} className="mb-16 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <motion.h2 variants={headingReveal} className="text-3xl md:text-4xl font-black text-white leading-tight">
                Simple Setup,<br />Stunning Results
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-400 text-xs sm:text-right max-w-[200px]">
                Achieve stunning results with SkyVision's simple setup. Unfold, connect via the app, and take off effortlessly.
              </motion.p>
            </motion.div>

            <div className="space-y-8 relative">
              <div className="absolute left-6 top-8 bottom-8 w-[1px] bg-white/5 z-0 hidden sm:block" />
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
                  <motion.div
                    whileHover={{ scale: 1.15, borderColor: '#00ffcc', color: '#00ffcc' }}
                    className="w-12 h-12 rounded-full bg-[#03070c] border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center text-xs font-bold text-gray-500 transition-colors flex-shrink-0 relative"
                  >
                    {step.num}
                  </motion.div>
                  <div className="flex-grow bg-white/5 border border-white/5 rounded-2xl p-4 flex justify-between items-center group-hover:bg-white/10 group-hover:border-white/10 transition-all gap-4">
                    <p className="text-gray-300 text-sm font-medium w-2/3">{step.title}</p>
                    <div className="w-16 h-12 md:w-24 md:h-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 bg-black/50 hidden sm:block">
                      <img src={step.img} alt={`Step ${step.num}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. TRUSTED BY */}
      <section className="py-32 px-4 sm:px-6 relative z-10 bg-[#050914] flex justify-center text-center">
        <div className="absolute top-0 w-full">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="max-w-4xl flex justify-between gap-12 text-left relative w-full items-center pl-4 lg:pl-0">
          <motion.div variants={slideInLeft} {...inViewProps} className="w-1/3 min-w-[200px]">
            <h2 className="text-3xl font-black text-white mb-4">Trusted By<br />Thousands People</h2>
            <p className="text-gray-400 text-xs leading-relaxed hidden sm:block">
              SkyVision is trusted by thousands of aerial enthusiasts worldwide, celebrated for its precision, reliability, and ability to capture stunning visuals.
            </p>
          </motion.div>

          <motion.div variants={slideInRight} {...inViewProps} className="w-2/3 max-w-2xl px-4 md:px-0 flex flex-col items-center">
            <ion-icon name="aperture" className="text-white border border-white/10 p-2 rounded-full text-2xl mb-8 opacity-50"></ion-icon>
            <h3 className="text-xl md:text-3xl font-black text-white mb-6">Nietzsche</h3>
            <p className="text-lg md:text-2xl font-light italic text-gray-300 leading-relaxed mb-10 text-center text-balance">
              "SkyVision is a game-changer! Its phenomenal camera quality and intelligent flight modes make it incredibly easy to use, allowing me to capture stunning visuals effortlessly for my travel vlogs."
            </p>
            <div className="flex items-center gap-4 justify-center w-full mb-10">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop" alt="Leslie Alexander" className="w-14 h-14 rounded-full object-cover border-2 border-white/10" />
              <div className="text-left flex flex-col justify-center">
                <h4 className="font-bold text-white text-sm tracking-wide">Leslie Alexander</h4>
                <span className="text-gray-500 text-[10px] uppercase tracking-widest">Advanced Technique Coach</span>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <div className="w-6 h-1 bg-white rounded-full" />
              <div className="w-2 h-1 bg-white/20 rounded-full hover:bg-white/50 cursor-pointer transition-colors" />
              <div className="w-2 h-1 bg-white/20 rounded-full hover:bg-white/50 cursor-pointer transition-colors" />
              <div className="w-2 h-1 bg-white/20 rounded-full hover:bg-white/50 cursor-pointer transition-colors" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. FAQs & FOOTER SECTION */}
      <section className="pt-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#03070c] min-h-screen flex flex-col pb-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 flex-grow items-start w-full">

          {/* Left: FAQs */}
          <motion.div variants={slideInLeft} {...inViewProps} className="pr-4 md:pr-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Frequently Asked<br />Questions</h2>
            <p className="text-gray-400 text-xs leading-relaxed mb-10 max-w-sm">
              Have questions about SkyVision? Browse through our frequently asked questions to learn more about features, setup, compatibility, and performance.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={cardReveal}
                  {...inViewProps}
                  className="border border-white/10 rounded-[1.5rem] overflow-hidden transition-all duration-300 hover:border-[#00ffcc]/30 bg-[#050914] shadow-lg"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                  >
                    <span className="font-bold text-white text-sm md:text-base group-hover:text-[#00ffcc] transition-colors">{faq.q}</span>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors border border-white/20 text-white">
                      <ion-icon name={openFaq === index ? 'remove' : 'add'} className="opacity-70"></ion-icon>
                    </div>
                  </button>
                  <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-400 text-xs leading-relaxed pt-2 border-t border-white/5">{faq.a}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: CTA card with drone */}
          <motion.div
            variants={slideInRight}
            {...inViewProps}
            whileHover={{ scale: 1.01 }}
            className="relative h-[600px] w-full rounded-[2.5rem] bg-gradient-to-b from-white/5 to-[#02050a] border border-white/5 overflow-hidden flex flex-col items-center p-12 text-center group transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 z-0" />
            <h2 className="text-4xl md:text-5xl font-black text-white relative z-20 mt-8 tracking-tight drop-shadow-lg">Have a Question?<br />We're Here.</h2>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs mt-6 relative z-20">"Have a question? We're here to help. Reach out to our support team anytime!"</p>
            <img src="/drone_hero.png" alt="Drone Base" className="absolute -bottom-16 w-[120%] max-w-[800px] group-hover:w-[130%] transition-all duration-700 drop-shadow-[0_-30px_50px_rgba(0,0,0,0.8)] z-10" />
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default About;
