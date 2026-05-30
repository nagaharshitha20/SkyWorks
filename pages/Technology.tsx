import React from 'react';
import { motion } from 'framer-motion';
import {
  sectionContainer, fadeUp, headingReveal, cardReveal,
  imageReveal, slideInLeft, slideInRight, inViewProps,
} from '../components/ui/motion';

const features = [
  {
    name: 'Flight Controller (FC)',
    description: 'The brain of the drone — processing sensor inputs 400 times per second to maintain perfect stability in any wind condition.',
    icon: 'hardware-chip-outline',
    tag: 'Core System',
  },
  {
    name: 'Battery Module',
    description: 'High-capacity solid-state cells engineered for 45% longer endurance than standard lithium polymer packs.',
    icon: 'battery-charging-outline',
    tag: 'Power',
  },
  {
    name: 'GPS + RTK Module',
    description: 'Centimeter-level positioning accuracy for precise autonomous navigation, return-to-home, and geofencing.',
    icon: 'navigate-circle-outline',
    tag: 'Navigation',
  },
  {
    name: 'Propulsion System',
    description: 'High-efficiency brushless motors paired with carbon-fiber props — delivering maximum thrust with near-silent operation.',
    icon: 'cog-outline',
    tag: 'Propulsion',
  },
  {
    name: 'Gimbal & Imaging Array',
    description: '4K Ultra-HD 3-axis stabilized camera with 10-bit color depth and 120fps slow-motion capability.',
    icon: 'camera-outline',
    tag: 'Imaging',
  },
  {
    name: 'Obstacle Avoidance Sensors',
    description: 'Omnidirectional LIDAR and stereo-vision arrays providing 360° collision prevention in real time.',
    icon: 'eye-outline',
    tag: 'Safety',
  },
];

const specs = [
  { label: 'Max Flight Time', value: '45 min' },
  { label: 'Top Speed', value: '72 km/h' },
  { label: 'Max Range', value: '10 km' },
  { label: 'Camera Resolution', value: '4K/120fps' },
  { label: 'Payload Capacity', value: '2.5 kg' },
  { label: 'Wind Resistance', value: 'Level 7' },
];

const TechnologyPage: React.FC = () => {
  return (
    <div className="bg-[#03070c] text-white min-h-screen font-sans antialiased">

      {/* Background */}
      <div className="fixed top-0 right-0 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1e3a8a]/20 via-transparent to-transparent pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00ffcc]/5 via-transparent to-transparent pointer-events-none z-0" />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#00ffcc08_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div variants={sectionContainer} {...inViewProps}>
            <motion.span variants={fadeUp} className="text-[#00ffcc] font-bold tracking-widest uppercase text-xs mb-4 block">
              — Aerospace Technology
            </motion.span>
            <motion.h1 variants={headingReveal} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.95]">
              SKYVISION<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#3b82f6]">PRO</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              Revolutionizing autonomous aviation with precision-engineered systems built for the demands of tomorrow's industrial applications.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#missions"
                onClick={(e) => { e.preventDefault(); window.location.hash = '#missions'; }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,255,204,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 bg-[#00ffcc] text-black font-bold uppercase tracking-widest rounded-full shadow-[0_10px_30px_rgba(0,255,204,0.25)] transition-all text-sm"
              >
                Explore Fleet
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); window.location.hash = '#contact'; }}
                whileHover={{ scale: 1.04, borderColor: '#00ffcc', color: '#00ffcc' }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 border border-white/20 text-white font-bold uppercase tracking-widest rounded-full transition-all text-sm"
              >
                Request Briefing
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div variants={imageReveal} {...inViewProps} className="relative flex justify-center">
            <div className="absolute inset-0 bg-[#00ffcc]/10 blur-[80px] rounded-full pointer-events-none" />
            <motion.img
              src="/drone_hero.png"
              alt="SkyVision Pro"
              className="relative w-full max-w-lg object-contain animate-[float_7s_ease-in-out_infinite] drop-shadow-[0_30px_60px_rgba(0,255,204,0.15)]"
              whileHover={{ scale: 1.04, rotate: -2 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── SPECS BAR ────────────────────────────────────── */}
      <section className="py-12 border-y border-white/5 bg-[#02050a] z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={sectionContainer} {...inViewProps} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {specs.map((spec, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center group">
                <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#00ffcc] to-[#3b82f6] mb-1 group-hover:scale-110 transition-transform">
                  {spec.value}
                </span>
                <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{spec.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURE GRID ─────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={sectionContainer} {...inViewProps} className="text-center mb-20">
            <motion.span variants={fadeUp} className="text-[#00ffcc] font-bold tracking-widest uppercase text-xs mb-3 block">
              Engineering Systems
            </motion.span>
            <motion.h2 variants={headingReveal} className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Built for the Mission
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={cardReveal}
                {...inViewProps}
                whileHover={{ y: -10, boxShadow: '0 20px 60px rgba(0,255,204,0.12)', borderColor: 'rgba(0,255,204,0.4)' }}
                className="bg-gradient-to-br from-[#0a111a] to-[#04080e] rounded-[2rem] border border-white/5 p-8 flex flex-col transition-all duration-500 group relative overflow-hidden"
              >
                {/* Corner glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#00ffcc]/5 rounded-full blur-2xl group-hover:bg-[#00ffcc]/15 transition-colors duration-500" />

                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-12 h-12 bg-white/5 border border-white/10 text-[#00ffcc] rounded-xl flex items-center justify-center text-2xl group-hover:bg-[#00ffcc] group-hover:text-black transition-all duration-400"
                  >
                    <ion-icon name={feature.icon}></ion-icon>
                  </motion.div>
                  <span className="text-[9px] font-black text-[#00ffcc] tracking-[0.2em] uppercase bg-[#00ffcc]/10 px-3 py-1 rounded-full">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight relative z-10">{feature.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT: VISUAL + CTA ──────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#02050a] border-t border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Sticky image */}
          <motion.div variants={imageReveal} {...inViewProps} className="relative group">
            <div className="absolute -inset-4 border border-[#00ffcc]/15 rounded-[2rem] group-hover:border-[#00ffcc]/30 transition-colors duration-700" />
            <motion.img
              src="https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=1770&auto=format&fit=crop"
              alt="SkyVision Pro Technology"
              className="w-full h-[500px] object-cover rounded-[2rem] shadow-2xl border border-white/5 group-hover:scale-[1.01] transition-transform duration-700"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10">
              <p className="text-[#00ffcc] text-xs font-bold tracking-widest uppercase mb-1">Active Systems</p>
              <p className="text-white font-bold text-sm">All 6 subsystems operational</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={sectionContainer} {...inViewProps}>
            <motion.span variants={fadeUp} className="text-[#00ffcc] font-bold tracking-widest uppercase text-xs mb-4 block">
              — Precision at Scale
            </motion.span>
            <motion.h2 variants={headingReveal} className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
              Every Component.<br />Every Gram.<br />Engineered.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-base leading-relaxed mb-8 max-w-lg">
              From the composite airframe to the encrypted telemetry link, every element of the SkyVision platform is purpose-built for performance, reliability, and longevity in demanding environments.
            </motion.p>

            <div className="space-y-4">
              {['Redundant flight controllers', 'Encrypted comms link (AES-256)', 'IP55 weather protection', 'Hot-swap battery system'].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00ffcc]/15 border border-[#00ffcc]/40 flex items-center justify-center flex-shrink-0">
                    <ion-icon name="checkmark" class="text-[#00ffcc] text-xs"></ion-icon>
                  </div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default TechnologyPage;
