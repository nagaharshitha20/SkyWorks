import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { ShopCard } from './ShopCard';
import {
  sectionContainer, fadeUp, headingReveal, cardReveal, inViewProps,
} from './ui/motion';

type FilterCategory = 'All' | 'Delivery' | 'Surveillance' | 'Agriculture' | 'Mapping';

const CATEGORIES: FilterCategory[] = ['All', 'Delivery', 'Surveillance', 'Agriculture', 'Mapping'];

const CATEGORY_META: Record<FilterCategory, { icon: string; desc: string }> = {
  All:          { icon: 'apps-outline',   desc: 'View the complete SkyVision fleet' },
  Delivery:     { icon: 'cube-outline',   desc: 'Autonomous payload logistics drones' },
  Surveillance: { icon: 'eye-outline',    desc: 'Persistent situational awareness' },
  Agriculture:  { icon: 'leaf-outline',   desc: 'Precision crop monitoring & spraying' },
  Mapping:      { icon: 'map-outline',    desc: 'Survey-grade topographic mapping' },
};

const Shop: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  const filtered = useMemo(() =>
    activeFilter === 'All'
      ? products
      : products.filter(p => p.category === activeFilter),
    [activeFilter]
  );

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const h = e.currentTarget.getAttribute('href');
    if (h) window.location.hash = h;
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">

      {/* ── LIGHT HERO ── */}
      <div className="relative w-full bg-white border-b border-gray-border overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        {/* Decorative yellow strip at very top */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-yellow" />

        {/* Soft yellow radial glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,_rgba(255,214,0,0.12)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,214,0,0.08)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

            {/* Left: Title block */}
            <div className="flex flex-col">
              <motion.span
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="section-eyebrow mb-3"
              >
                — Fleet Catalog
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="font-condensed font-extrabold text-black uppercase leading-[0.9] tracking-tight"
                style={{ fontSize: 'clamp(38px, 6vw, 76px)' }}
              >
                Drone<br />
                <span className="text-yellow">Solutions</span>
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="underline-accent mt-4"
              />
            </div>

            {/* Right: Description + stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-6 md:max-w-sm"
            >
              <p className="text-gray-mid text-sm sm:text-base leading-relaxed font-normal">
                Precision-engineered aerial systems for high performance, uncompromising reliability, and true scalability across every industry.
              </p>

              {/* Quick stats */}
              <div className="flex gap-8">
                {[
                  { val: `${products.length}`, label: 'Platforms' },
                  { val: '50+', label: 'Deployments' },
                  { val: '99%', label: 'Reliability' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-condensed font-extrabold text-black text-xl sm:text-2xl">{s.val}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div className="sticky top-[62px] z-40 bg-white border-b border-gray-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-stretch gap-0 overflow-x-auto filter-scroll">
            {CATEGORIES.map(cat => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative flex items-center gap-2 px-4 sm:px-5 py-4 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex-shrink-0 border-b-2 ${
                    isActive
                      ? 'border-yellow text-black bg-yellow/5'
                      : 'border-transparent text-gray-mid hover:text-black hover:bg-gray-light'
                  }`}
                >
                  <ion-icon name={CATEGORY_META[cat].icon} class={`text-sm ${isActive ? 'text-yellow' : ''}`} />
                  <span>{cat}</span>
                  {isActive && (
                    <motion.span
                      layoutId="filter-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow"
                    />
                  )}
                </button>
              );
            })}
            <div className="ml-auto flex items-center px-4 flex-shrink-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap hidden sm:block">
                {filtered.length} {filtered.length === 1 ? 'Platform' : 'Platforms'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Active category description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + '-label'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-1 h-6 bg-yellow rounded-full flex-shrink-0" />
            <div>
              <span className="font-bold text-black text-sm uppercase tracking-wider">
                {activeFilter === 'All' ? 'All Platforms' : `${activeFilter} Series`}
              </span>
              <span className="text-gray-400 text-xs ml-3">{CATEGORY_META[activeFilter].desc}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
            }}
          >
            {filtered.map((product) => (
              <motion.div key={product.id} variants={cardReveal}>
                <ShopCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <ion-icon name="search-outline" class="text-4xl text-gray-300 mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">No platforms in this category</p>
          </motion.div>
        )}
      </div>

      {/* ── CUSTOM BUILD CTA ── */}
      <motion.section
        className="border-t border-gray-border bg-[#F7F7F7]"
        variants={sectionContainer}
        {...inViewProps}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* Left */}
            <div className="flex flex-col max-w-xl">
              <motion.span variants={fadeUp} className="section-eyebrow">— Bespoke Engineering</motion.span>
              <motion.h2 variants={headingReveal} className="text-2xl sm:text-3xl md:text-4xl font-condensed font-extrabold text-black uppercase mt-2 leading-tight">
                Need a Custom<br />Aerial Platform?
              </motion.h2>
              <motion.div variants={fadeUp} className="underline-accent" />
              <motion.p variants={fadeUp} className="text-gray-mid text-sm sm:text-base leading-relaxed">
                Every mission is unique. We engineer bespoke drones mapped precisely to your payload, environment, and ROI — no generic templates, ever.
              </motion.p>
            </div>

            {/* Right: Feature list + CTA */}
            <motion.div variants={fadeUp} className="flex flex-col gap-5 lg:items-end">
              <ul className="flex flex-col gap-3">
                {['Fully custom hull & sensor stack', 'Dedicated engineering team', 'End-to-end support & maintenance'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-mid">
                    <span className="w-5 h-5 rounded-full bg-yellow flex items-center justify-center flex-shrink-0">
                      <ion-icon name="checkmark" class="text-black text-xs" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <motion.a
                href="#contact"
                onClick={handleNav}
                className="btn-primary cursor-pointer px-10 mt-2 self-start lg:self-auto"
                whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(255,214,0,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                Start Custom Project
              </motion.a>
            </motion.div>

          </div>
        </div>
      </motion.section>

    </div>
  );
};

export default Shop;
