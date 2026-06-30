import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════ */

const INSIGHTS = [
  {
    id: 1,
    category: 'AI Navigation',
    date: 'May 28, 2026',
    readTime: '6 min read',
    title: 'AI-Powered Flight Path Optimization',
    excerpt: 'How our proprietary neural mesh calculates real-time obstacle avoidance across 3D terrain maps at 120fps, reducing mission time by 40%.',
    gradient: 'from-[#FFD600]/15 to-transparent',
    accent: '#FFD600',
    icon: '🧠',
  },
  {
    id: 2,
    category: 'Industrial',
    date: 'May 22, 2026',
    readTime: '4 min read',
    title: 'Drone Inspection for Solar Farms',
    excerpt: 'Thermal imaging drones identified 2,400 failing solar cells across a 500-acre facility — a job that would have taken 3 weeks done in 6 hours.',
    gradient: 'from-white/5 to-transparent',
    accent: '#FFD600',
    icon: '⚡',
  },
  {
    id: 3,
    category: 'Aerial Mapping',
    date: 'May 15, 2026',
    readTime: '5 min read',
    title: 'How Aerial Mapping Saves Time on Construction Sites',
    excerpt: 'Centimeter-accurate topographic surveys in under 2 hours. Our LiDAR payload stack delivers survey-grade results without boots on the ground.',
    gradient: 'from-[#FFD600]/10 to-blue-900/10',
    accent: '#FFD600',
    icon: '🗺️',
  },
  {
    id: 4,
    category: 'Behind the Scenes',
    date: 'May 8, 2026',
    readTime: '8 min read',
    title: 'Behind the Scenes of SkyWorks Operations',
    excerpt: 'A deep look into our mission control room, pre-flight checklists, safety protocols, and the 200+ data points collected per second during every flight.',
    gradient: 'from-white/5 to-transparent',
    accent: '#FFD600',
    icon: '🎬',
  },
  {
    id: 5,
    category: 'Research',
    date: 'April 30, 2026',
    readTime: '7 min read',
    title: 'The Future of Autonomous Drone Swarms',
    excerpt: 'SkyWorks R&D is testing decentralised swarm intelligence — 50 drones, zero human pilots, one unified mission objective. Here\'s what we learned.',
    gradient: 'from-[#FFD600]/10 to-transparent',
    accent: '#FFD600',
    icon: '🤖',
  },
  {
    id: 6,
    category: 'Agriculture',
    date: 'April 24, 2026',
    readTime: '5 min read',
    title: 'Precision Agriculture from Above',
    excerpt: 'NDVI multispectral imaging reveals hidden crop stress weeks before visible symptoms appear. Partnering with 12 farms across 3 states.',
    gradient: 'from-white/5 to-transparent',
    accent: '#FFD600',
    icon: '🌾',
  },
];

const TIMELINE = [
  { year: '2023', title: 'Company Founded', desc: 'SkyWorks launched from a 400 sq ft hangar with two engineers and a vision to redefine autonomous flight.', side: 'left' },
  { year: '2024', title: 'First Enterprise Client', desc: 'Secured a landmark contract with a Fortune 500 energy company for pipeline inspection across 800 miles.', side: 'right' },
  { year: '2025', title: 'Autonomous Navigation System', desc: 'Shipped SkyNav 1.0 — our proprietary AI stack that enables fully autonomous missions without GPS dependency.', side: 'left' },
  { year: '2026', title: 'Industrial Expansion', desc: 'Expanded into smart city mapping, disaster response, and coastal surveillance. 50+ enterprise clients and counting.', side: 'right' },
];

const STATS = [
  { value: 250, suffix: '+', label: 'Projects Completed' },
  { value: 1500, suffix: '+', label: 'Flight Hours Logged' },
  { value: 50, suffix: '+', label: 'Enterprise Clients' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

// Perfect-filling masonry: 3-col grid, explicit spans that add up to zero empty cells
// Row A: [col2-row2] [col1-row1] [col1-row1]
// Row B:             [col1-row1] [col1-row1]  (continues row-span-2 from A)
// Row C: [col1-row1] [col2-row1]
const GALLERY = [
  { col: 'md:col-span-2', row: 'md:row-span-2', h: 'h-80 md:h-auto', label: 'Coastal Surveillance Mission', tag: 'Maritime',   emoji: '🌊' },
  { col: 'md:col-span-1', row: 'md:row-span-1', h: 'h-48',           label: 'Solar Farm Thermal Scan',    tag: 'Industrial',  emoji: '⚡' },
  { col: 'md:col-span-1', row: 'md:row-span-1', h: 'h-48',           label: 'Urban Mapping Flight',       tag: 'Smart City',  emoji: '🏙️' },
  { col: 'md:col-span-1', row: 'md:row-span-1', h: 'h-48',           label: 'Pipeline Inspection',        tag: 'Energy',      emoji: '🛢️' },
  { col: 'md:col-span-1', row: 'md:row-span-1', h: 'h-48',           label: 'Agricultural Survey',        tag: 'Agriculture', emoji: '🌾' },
  { col: 'md:col-span-1', row: 'md:row-span-1', h: 'h-48',           label: 'Night Vision Recon',         tag: 'Defence',     emoji: '🌙' },
];

const VIDEOS = [
  { title: 'Autonomous Coastal Mission Replay', duration: '4:32', tag: 'Mission Brief' },
  { title: 'SkyNav AI: Live Obstacle Avoidance', duration: '6:14', tag: 'Technology' },
  { title: 'Solar Farm Inspection Full Run', duration: '8:55', tag: 'Industrial' },
];

const BLUEPRINT_MISSIONS = [
  {
    num: 'A-01',
    title: 'Forest Monitoring Network',
    desc: 'Deploying 24 autonomous drones across 12,000 acres of protected rainforest. Real-time deforestation tracking synced to satellite telemetry.',
    timeline: 'Q3 2026',
    status: 'PRE-FLIGHT',
    schematicId: 0,
  },
  {
    num: 'A-02',
    title: 'Smart City Mapping System',
    desc: 'Millimetre-accurate 3D point cloud generation across 5 major metropolitan areas for next-gen urban infrastructure simulation.',
    timeline: 'Q4 2026',
    status: 'PLANNING',
    schematicId: 1,
  },
  {
    num: 'A-03',
    title: 'Autonomous Emergency Fleet',
    desc: 'Always-ready distributed drone network with 90-second dispatch from emergency signal to airborne. 32 pre-positioned relay stations.',
    timeline: '2027',
    status: 'DESIGN',
    schematicId: 2,
  },
];

const RADAR_NODES = [
  {
    id: 0,
    num: 'A-01',
    label: 'FOREST MONITORING',
    x: 438, y: 182,
    anchorX: 14, anchorY: -8, textAnchor: 'start' as const,
    desc: 'Deploying 24 autonomous drones across 12,000 acres of protected rainforest. Real-time deforestation tracking synced to satellite telemetry.',
    status: 'PRE-FLIGHT',
    timeline: 'Q3 2026',
  },
  {
    id: 1,
    num: 'A-02',
    label: 'SMART CITY MAPPING',
    x: 248, y: 476,
    anchorX: 0, anchorY: 22, textAnchor: 'middle' as const,
    desc: 'Millimetre-accurate 3D point cloud generation across 5 major metropolitan areas for next-gen urban infrastructure simulation.',
    status: 'PLANNING',
    timeline: 'Q4 2026',
  },
  {
    id: 2,
    num: 'A-03',
    label: 'DISASTER RESPONSE',
    x: 164, y: 186,
    anchorX: -14, anchorY: -8, textAnchor: 'end' as const,
    desc: 'Always-ready distributed drone network with 90-second dispatch from emergency signal to airborne. 32 pre-positioned relay stations.',
    status: 'DESIGN',
    timeline: '2027',
  },
];

const GHOST_BLIPS = [
  { x: 392, y: 338, r: 2, d: 2.1 },
  { x: 198, y: 370, r: 1.5, d: 3.2 },
  { x: 358, y: 218, r: 1.5, d: 2.7 },
  { x: 228, y: 258, r: 1.8, d: 4.0 },
  { x: 418, y: 416, r: 1.5, d: 2.3 },
  { x: 320, y: 445, r: 2, d: 3.5 },
  { x: 155, y: 350, r: 1.5, d: 2.8 },
];

/* ═══════════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════════ */

function useAnimatedCounter(target: number, duration = 2200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════════════ */

/* ── Floating Particles ─────────────────────────────────────────── */
function FloatingParticles({ count = 30 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-yellow/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ── Animated Grid Background ───────────────────────────────────── */
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

/* ── Stat Counter ───────────────────────────────────────────────── */
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useAnimatedCounter(value);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-6xl md:text-7xl font-black tracking-tighter text-gray-900 mb-2">
        <span className="tabular-nums">{count.toLocaleString()}</span>
        <span className="text-[#FFD600]">{suffix}</span>
      </div>
      <div className="text-gray-600 text-sm font-medium tracking-widest uppercase">{label}</div>
      <motion.div
        className="mx-auto mt-3 h-px bg-gradient-to-r from-transparent via-[#FFD600] to-transparent"
        initial={{ width: 0 }}
        whileInView={{ width: '80%' }}
        transition={{ duration: 1.2, delay: 0.3 }}
        viewport={{ once: true }}
      />
    </div>
  );
}

/* ── Blog Card ──────────────────────────────────────────────────── */
function InsightCard({ card, index }: { card: typeof INSIGHTS[0]; index: number }) {
  const directions = [
    { x: -60, y: 0, rotate: -3 },
    { x: 0, y: 60, rotate: 0 },
    { x: 60, y: 0, rotate: 3 },
    { x: -40, y: 40, rotate: -2 },
    { x: 0, y: -40, rotate: 0 },
    { x: 40, y: 40, rotate: 2 },
  ];
  const dir = directions[index % directions.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: dir.x, y: dir.y, rotate: dir.rotate, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative cursor-pointer"
    >
      {/* Magnetic glow */}
      <div
        className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="card-light overflow-hidden flex flex-col h-full">
        {/* Scan line on hover */}
        <motion.div
          className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-yellow/40 to-transparent pointer-events-none"
          style={{ top: '50%' }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
        />

        <div className="flex items-start justify-between mb-4">
          <span
            className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
            style={{ color: card.accent, borderColor: `${card.accent}40`, background: `${card.accent}10` }}
          >
            {card.category}
          </span>
          <span className="text-3xl">{card.icon}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#FFD600] transition-colors duration-300">
          {card.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">{card.excerpt}</p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{card.date}</span>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-[#FFD600]" />
            <span>{card.readTime}</span>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] rounded-full"
          style={{ background: card.accent }}
          initial={{ width: 0 }}
          whileInView={{ width: '30%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
}

/* ── Timeline Item ──────────────────────────────────────────────── */
function TimelineItem({ item, index }: { item: typeof TIMELINE[0]; index: number }) {
  const isLeft = item.side === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: '-80px' }}
      className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-16`}
    >
      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
        <div className="card-light inline-block max-w-sm w-full">
          <div className="text-[#FFD600] text-sm font-bold tracking-widest mb-2">{item.year}</div>
          <h3 className="text-gray-900 font-bold text-xl mb-2">{item.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
        </div>
      </div>

      {/* Node */}
      <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#FFD600]/40"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
        />
        <div className="w-4 h-4 rounded-full bg-[#FFD600] shadow-[0_0_16px_rgba(255,214,0,0.6)]" />
      </div>

      <div className="flex-1" />
    </motion.div>
  );
}

/* ── Folder Card ────────────────────────────────────────────────── */
/* ── Blueprint Schematics ─────────────────────────────────────── */

function ForestSchematic({ hovered }: { hovered: boolean }) {
  const nodes: [number, number][] = [[40,28],[200,28],[18,82],[222,82],[78,112],[162,112]];
  return (
    <>
      {/* Star connections: hub to each node */}
      <motion.path
        d="M 120 62 L 40 28 M 120 62 L 200 28 M 120 62 L 18 82 M 120 62 L 222 82 M 120 62 L 78 112 M 120 62 L 162 112"
        stroke="rgba(255,255,255,0.28)" strokeWidth="0.7" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 1.2, ease: 'easeInOut' }, opacity: { duration: 0.05 } }}
      />
      {/* Mesh cross-links */}
      <motion.path
        d="M 40 28 L 78 112 M 200 28 L 162 112 M 18 82 L 78 112 M 222 82 L 162 112"
        stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" fill="none" strokeDasharray="3 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 1.4, delay: 0.25, ease: 'easeInOut' }, opacity: { duration: 0.05, delay: 0.25 } }}
      />
      {/* Coverage radius */}
      <motion.circle cx="120" cy="62" r="86"
        stroke="rgba(255,214,0,0.08)" strokeWidth="0.6" fill="none" strokeDasharray="4 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 1.0, delay: 0.5 }, opacity: { duration: 0.1, delay: 0.5 } }}
      />
      {/* Hub */}
      <motion.circle cx="120" cy="62" r="5.5"
        stroke="rgba(255,214,0,0.6)" strokeWidth="1" fill="rgba(255,214,0,0.08)"
        initial={{ scale: 0, opacity: 0 }} animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.85 }} style={{ transformOrigin: '120px 62px' }}
      />
      {/* Sensor nodes */}
      {nodes.map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="3.5"
          stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" fill="rgba(255,255,255,0.04)"
          initial={{ scale: 0, opacity: 0 }} animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.25, delay: 0.5 + i * 0.07 }} style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      {/* Annotations */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.1 }}>
        <text x="125" y="59" fontSize="5" fill="rgba(255,214,0,0.7)" fontFamily="monospace">HUB-01</text>
        <text x="43" y="24" fontSize="4.5" fill="rgba(255,255,255,0.35)" fontFamily="monospace">SN-A</text>
        <text x="203" y="24" fontSize="4.5" fill="rgba(255,255,255,0.35)" fontFamily="monospace">SN-B</text>
        <text x="21" y="79" fontSize="4.5" fill="rgba(255,255,255,0.35)" fontFamily="monospace">SN-C</text>
        <text x="226" y="79" fontSize="4.5" fill="rgba(255,255,255,0.35)" fontFamily="monospace">SN-D</text>
      </motion.g>
      {/* Dimension line */}
      <motion.path d="M 34 123 L 206 123"
        stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 0.5, delay: 1.3 }, opacity: { duration: 0.1, delay: 1.3 } }}
      />
      <motion.text x="88" y="121" fontSize="4.5" fill="rgba(255,255,255,0.22)" fontFamily="monospace"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.6 }}>12,000 ACRES COVERAGE</motion.text>
    </>
  );
}

function CitySchematic({ hovered }: { hovered: boolean }) {
  const blocks = [
    [22,22,34,26],[60,22,40,26],[104,22,34,26],[142,22,56,26],
    [22,56,56,26],[82,56,34,26],[120,56,34,26],[158,56,40,26],
    [22,90,34,18],[60,90,56,18],[120,90,34,18],[158,90,40,18],
  ];
  return (
    <>
      {/* Street grid */}
      <motion.path
        d="M 18 18 L 202 18 M 18 52 L 202 52 M 18 86 L 202 86 M 18 112 L 202 112 M 18 18 L 18 112 M 58 18 L 58 112 M 100 18 L 100 112 M 140 18 L 140 112 M 202 18 L 202 112"
        stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 1.4, ease: 'easeInOut' }, opacity: { duration: 0.05 } }}
      />
      {/* Building footprints */}
      {blocks.map(([x,y,w,h], i) => (
        <motion.rect key={i} x={x} y={y} width={w} height={h}
          stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" fill="rgba(255,255,255,0.03)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.6 + i * 0.04 }}
        />
      ))}
      {/* Drone survey path */}
      <motion.path d="M 22 104 Q 110 10 198 104"
        stroke="rgba(255,214,0,0.4)" strokeWidth="0.8" fill="none" strokeDasharray="4 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 0.9, delay: 0.9, ease: 'easeInOut' }, opacity: { duration: 0.1, delay: 0.9 } }}
      />
      {/* UAV marker */}
      <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1.6 }} style={{ transformOrigin: '110px 30px' }}>
        <circle cx="110" cy="30" r="4" stroke="rgba(255,214,0,0.6)" strokeWidth="0.8" fill="rgba(255,214,0,0.1)" />
        <text x="115" y="28" fontSize="5" fill="rgba(255,214,0,0.7)" fontFamily="monospace">UAV</text>
      </motion.g>
      {/* Annotations */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.3 }}>
        <text x="18" y="14" fontSize="4.5" fill="rgba(255,255,255,0.28)" fontFamily="monospace">SECTOR-A</text>
        <text x="140" y="14" fontSize="4.5" fill="rgba(255,255,255,0.28)" fontFamily="monospace">SECTOR-B</text>
        <text x="60" y="122" fontSize="4.5" fill="rgba(255,255,255,0.22)" fontFamily="monospace">±2mm POINT ACCURACY</text>
      </motion.g>
    </>
  );
}

function FleetSchematic({ hovered }: { hovered: boolean }) {
  const drones: [number,number,string][] = [[72,48,'UAV-01'],[168,48,'UAV-02'],[120,88,'UAV-03']];
  return (
    <>
      {/* Formation triangle */}
      <motion.path d="M 72 48 L 168 48 M 72 48 L 120 88 M 168 48 L 120 88"
        stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" fill="none" strokeDasharray="4 2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 0.9, delay: 0.2 }, opacity: { duration: 0.05, delay: 0.2 } }}
      />
      {/* Coverage arcs */}
      {drones.map(([cx,cy], i) => (
        <motion.circle key={`arc${i}`} cx={cx} cy={cy} r="34"
          stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" fill="none" strokeDasharray="3 2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ pathLength: { duration: 0.8, delay: 0.45 + i * 0.12 }, opacity: { duration: 0.1, delay: 0.45 + i * 0.12 } }}
        />
      ))}
      {/* Dispatch vectors from HQ */}
      <motion.path d="M 120 108 L 72 48 M 120 108 L 168 48 M 120 108 L 120 88"
        stroke="rgba(255,214,0,0.2)" strokeWidth="0.5" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 0.7, delay: 1.0 }, opacity: { duration: 0.1, delay: 1.0 } }}
      />
      {/* Drone X symbols */}
      {drones.map(([cx,cy,label], i) => (
        <motion.g key={`d${i}`}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.65 + i * 0.1 }} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <line x1={cx-7} y1={cy-7} x2={cx+7} y2={cy+7} stroke="rgba(255,214,0,0.65)" strokeWidth="1.3" strokeLinecap="round" />
          <line x1={cx+7} y1={cy-7} x2={cx-7} y2={cy+7} stroke="rgba(255,214,0,0.65)" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx={cx} cy={cy} r="4.5" stroke="rgba(255,214,0,0.35)" strokeWidth="0.6" fill="rgba(255,214,0,0.06)" />
        </motion.g>
      ))}
      {/* HQ dispatch point */}
      <motion.circle cx="120" cy="108" r="5"
        stroke="rgba(255,214,0,0.5)" strokeWidth="0.8" fill="rgba(255,214,0,0.07)"
        initial={{ scale: 0, opacity: 0 }} animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.5 }} style={{ transformOrigin: '120px 108px' }}
      />
      {/* Annotations */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.2 }}>
        <text x="64" y="42" fontSize="4.5" fill="rgba(255,214,0,0.55)" fontFamily="monospace">UAV-01</text>
        <text x="170" y="42" fontSize="4.5" fill="rgba(255,214,0,0.55)" fontFamily="monospace">UAV-02</text>
        <text x="123" y="85" fontSize="4.5" fill="rgba(255,214,0,0.55)" fontFamily="monospace">UAV-03</text>
        <text x="125" y="110" fontSize="4.5" fill="rgba(255,214,0,0.5)" fontFamily="monospace">HQ</text>
        <text x="58" y="122" fontSize="4.5" fill="rgba(255,255,255,0.22)" fontFamily="monospace">T+90s DISPATCH READY</text>
      </motion.g>
    </>
  );
}

/* ── Blueprint Card ──────────────────────────────────────────────── */
function BlueprintCard({ mission, index }: { mission: typeof BLUEPRINT_MISSIONS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  const renderSchematic = () => {
    switch (mission.schematicId) {
      case 0: return <ForestSchematic hovered={true} />;
      case 1: return <CitySchematic hovered={true} />;
      case 2: return <FleetSchematic hovered={true} />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative cursor-pointer group"
    >
      <div className="relative bg-[#1A1A1A] border border-[#2A2A2A] border-left-[3px] border-left-yellow rounded-[4px] overflow-hidden transition-all duration-300 group-hover:border-yellow">

        {/* Blueprint micro-grid */}
        <div className="absolute inset-0 pointer-events-none opacity-100" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }} />

        {/* Corner crosshair — TL */}
        <div className="absolute top-3.5 left-3.5 w-4 h-4 pointer-events-none">
          <div className="absolute top-[7px] left-0 w-full h-px bg-white/20" />
          <div className="absolute top-0 left-[7px] w-px h-full bg-white/20" />
        </div>
        {/* Corner crosshair — TR */}
        <div className="absolute top-3.5 right-3.5 w-4 h-4 pointer-events-none">
          <div className="absolute top-[7px] left-0 w-full h-px bg-white/20" />
          <div className="absolute top-0 left-[7px] w-px h-full bg-white/20" />
        </div>
        {/* Corner crosshair — BL */}
        <div className="absolute bottom-3.5 left-3.5 w-4 h-4 pointer-events-none">
          <div className="absolute top-[7px] left-0 w-full h-px bg-white/20" />
          <div className="absolute top-0 left-[7px] w-px h-full bg-white/20" />
        </div>
        {/* Corner crosshair — BR */}
        <div className="absolute bottom-3.5 right-3.5 w-4 h-4 pointer-events-none">
          <div className="absolute top-[7px] left-0 w-full h-px bg-white/20" />
          <div className="absolute top-0 left-[7px] w-px h-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[9px] text-gray-900/25 tracking-[0.3em] uppercase">Project</span>
            <span className="font-mono text-[10px] text-[#FFD600]/60 tracking-[0.25em] font-bold">{mission.num}</span>
          </div>
          <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#FFD600]/70"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="font-mono text-[9px] text-[#FFD600]/50 tracking-[0.2em] uppercase">Accessing</span>
          </motion.div>
        </div>

        {/* SVG Schematic Area */}
        <div className="relative px-5 pt-4 pb-2 group-hover:scale-105 transition-transform duration-500 ease-out" style={{ height: '168px' }}>
          <svg viewBox="0 0 240 128" className="w-full h-full overflow-visible">
            {renderSchematic()}
          </svg>
        </div>

        {/* Project Info */}
        <div className="px-5 pb-5 pt-1 border-t border-white/[0.06]">
          <h3 className="text-gray-900 font-bold text-base tracking-tight mb-1.5 leading-snug">
            {mission.title}
          </h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-gray-500 text-xs leading-relaxed mb-3"
          >
            {mission.desc}
          </motion.p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-gray-900/25 tracking-[0.2em] uppercase">{mission.status}</span>
            <span className="font-mono text-[9px] text-[#FFD600]/35 tracking-[0.2em]">{mission.timeline}</span>
          </div>
        </div>

        {/* Bottom glow on hover */}
        <motion.div
          className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD600]/40 to-transparent"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

/* ── Video Card ─────────────────────────────────────────────────── */
function VideoCard({ video, index }: { video: typeof VIDEOS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      viewport={{ once: true }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="card-light cursor-pointer group flex flex-col h-full relative"
    >
      {/* Thumbnail area */}
      <div className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-10">🚁</div>
        </div>

        {/* Animated scan lines on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: '200%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'linear' }}
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow/60 to-transparent"
            />
          )}
        </AnimatePresence>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-16 h-16 flex items-center justify-center"
            animate={hovered ? { scale: 1.15 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Pulse rings */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#FFD600]/40"
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-[#FFD600]/20"
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
            />
            <div className="relative w-12 h-12 rounded-full bg-[#FFD600]/10 border border-[#FFD600]/50 backdrop-blur-sm flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5 3.5L15 9L5 14.5V3.5Z" fill="#FFD600" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 bg-[#FFD600]/10 border border-[#FFD600]/30 text-[#FFD600] rounded-full">
            {video.tag}
          </span>
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 text-xs text-gray-900/60 font-mono bg-white/50 px-2 py-0.5 rounded">
          {video.duration}
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs text-[#FFD600]/70 font-bold tracking-widest uppercase mb-1.5">Mission Replay</div>
        <h4 className="text-gray-900 font-semibold text-sm leading-snug group-hover:text-[#FFD600] transition-colors duration-300">
          {video.title}
        </h4>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════ */

/* ── Radar Missions ──────────────────────────────────────────────── */
function RadarMissions() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const CX = 300, CY = 300, OUTER_R = 252;

  // Precompute sweep trail path (80° behind the sweep, pointing right in local space)
  const trailDeg = 80;
  const trailRad = (-trailDeg) * Math.PI / 180;
  const tx = (CX + OUTER_R * Math.cos(trailRad)).toFixed(2);
  const ty = (CY + OUTER_R * Math.sin(trailRad)).toFixed(2);
  const trailPath = `M ${CX} ${CY} L ${tx} ${ty} A ${OUTER_R} ${OUTER_R} 0 0 1 ${CX + OUTER_R} ${CY} Z`;

  // Tick marks
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const angleDeg = i * 5;
    const rad = (angleDeg - 90) * Math.PI / 180;
    const isMajor = angleDeg % 90 === 0;
    const isMed   = angleDeg % 45 === 0;
    const r1 = OUTER_R;
    const r2 = OUTER_R + (isMajor ? 10 : isMed ? 7 : 4);
    return {
      x1: CX + r1 * Math.cos(rad), y1: CY + r1 * Math.sin(rad),
      x2: CX + r2 * Math.cos(rad), y2: CY + r2 * Math.sin(rad),
      w: isMajor ? 1.2 : isMed ? 0.8 : 0.4,
      op: isMajor ? 0.35 : isMed ? 0.22 : 0.12,
    };
  });

  return (
    <section className="relative py-24 bg-white text-gray-900 overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,214,0,0.008) 3px, rgba(255,214,0,0.008) 4px)',
      }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase block mb-4">Incoming</span>
          <h2 className="text-4xl md:text-5xl font-condensed font-extrabold tracking-tight text-gray-900 mb-3 uppercase">
            Future Missions
          </h2>
          <p className="text-gray-900/20 text-sm font-mono tracking-widest">HOVER A NODE TO ACTIVATE MISSION</p>
        </motion.div>

        {/* Radar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="relative max-w-[580px] mx-auto"
        >
          <svg viewBox="0 0 600 600" className="w-full" style={{ filter: 'drop-shadow(0 0 40px rgba(255,214,0,0.08))' }}>
            <defs>
              <radialGradient id="radar-bg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,214,0,0.04)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
              <radialGradient id="sweep-glow" cx="0%" cy="50%" r="100%" gradientUnits="userSpaceOnUse"
                x1={CX} y1={CY} x2={CX + OUTER_R} y2={CY}>
                <stop offset="0%" stopColor="rgba(255,214,0,0)" />
                <stop offset="100%" stopColor="rgba(255,214,0,0.4)" />
              </radialGradient>
            </defs>

            {/* Radar background fill */}
            <circle cx={CX} cy={CY} r={OUTER_R} fill="url(#radar-bg)" />

            {/* Concentric rings */}
            {[1, 0.75, 0.5, 0.25].map((ratio, i) => (
              <circle key={i} cx={CX} cy={CY} r={OUTER_R * ratio}
                stroke={`rgba(255,214,0,${ratio === 1 ? 0.18 : 0.07})`}
                strokeWidth={ratio === 1 ? 1 : 0.5} fill="none"
              />
            ))}

            {/* Crosshair lines */}
            {[
              [CX - OUTER_R, CY, CX + OUTER_R, CY],
              [CX, CY - OUTER_R, CX, CY + OUTER_R],
              [CX - OUTER_R * 0.707, CY - OUTER_R * 0.707, CX + OUTER_R * 0.707, CY + OUTER_R * 0.707],
              [CX + OUTER_R * 0.707, CY - OUTER_R * 0.707, CX - OUTER_R * 0.707, CY + OUTER_R * 0.707],
            ].map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={`rgba(255,214,0,${i < 2 ? 0.07 : 0.03})`} strokeWidth="0.5"
              />
            ))}

            {/* Tick marks around perimeter */}
            {ticks.map((t, i) => (
              <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                stroke={`rgba(255,214,0,${t.op})`} strokeWidth={t.w}
              />
            ))}

            {/* Cardinal labels */}
            {[['N', CX, CY - OUTER_R - 18, 'middle'], ['S', CX, CY + OUTER_R + 22, 'middle'],
              ['E', CX + OUTER_R + 14, CY + 3, 'start'], ['W', CX - OUTER_R - 14, CY + 3, 'end']].map(
              ([label, x, y, anchor]) => (
                <text key={label as string} x={x as number} y={y as number}
                  textAnchor={anchor as "inherit" | "end" | "middle" | "start"} fontSize="8"
                  fill="rgba(255,214,0,0.25)" fontFamily="monospace"
                >{label}</text>
              )
            )}

            {/* Range labels */}
            <text x={CX + 6} y={CY - OUTER_R * 0.75 + 3} fontSize="6" fill="rgba(255,214,0,0.18)" fontFamily="monospace">75km</text>
            <text x={CX + 6} y={CY - OUTER_R * 0.50 + 3} fontSize="6" fill="rgba(255,214,0,0.18)" fontFamily="monospace">50km</text>
            <text x={CX + 6} y={CY - OUTER_R * 0.25 + 3} fontSize="6" fill="rgba(255,214,0,0.18)" fontFamily="monospace">25km</text>

            {/* Ghost blips — decorative background contacts */}
            {GHOST_BLIPS.map((b, i) => (
              <motion.circle key={i} cx={b.x} cy={b.y} r={b.r}
                fill="rgba(255,214,0,0.25)"
                animate={{ opacity: [0.25, 0.05, 0.25] }}
                transition={{ duration: b.d, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}

            {/* ── ROTATING SWEEP ── */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            >
              {/* Sweep trail wedge */}
              <path d={trailPath} fill="rgba(255,214,0,0.055)" />
              {/* Bright sweep edge line */}
              <line x1={CX} y1={CY} x2={CX + OUTER_R} y2={CY}
                stroke="rgba(255,214,0,0.7)" strokeWidth="1.5"
              />
              {/* Bright tip dot */}
              <circle cx={CX + OUTER_R} cy={CY} r="2.5" fill="rgba(255,214,0,0.85)" />
            </motion.g>

            {/* ── CENTER HUB ── */}
            <motion.circle cx={CX} cy={CY} r={22}
              stroke="rgba(255,214,0,0.12)" strokeWidth="1" fill="rgba(0,0,0,0.8)"
              animate={{ opacity: [0.12, 0.3, 0.12] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <circle cx={CX} cy={CY} r={4} fill="rgba(255,214,0,0.7)" />
            <circle cx={CX} cy={CY} r={1.5} fill="#010810" />
            <text x={CX} y={CY + 32} textAnchor="middle" fontSize="7"
              fill="rgba(255,214,0,0.2)" fontFamily="monospace">SKYWORKS</text>
            <text x={CX} y={CY + 42} textAnchor="middle" fontSize="5.5"
              fill="rgba(255,214,0,0.13)" fontFamily="monospace">MISSION CONTROL</text>

            {/* ── MISSION NODES ── */}
            {RADAR_NODES.map(node => {
              const isActive = activeNode === node.id;
              return (
                <g key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  style={{ cursor: 'crosshair' }}
                >
                  {/* Dashed line from center */}
                  <motion.line x1={CX} y1={CY} x2={node.x} y2={node.y}
                    stroke="rgba(255,214,0,0.12)" strokeWidth="0.5" strokeDasharray="4 4"
                    animate={{ opacity: isActive ? 0.6 : 0.25 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Expanding pulse rings on hover */}
                  {isActive && [
                    { delay: 0, dur: 1.6 },
                    { delay: 0.55, dur: 1.6 },
                    { delay: 1.1, dur: 1.6 },
                  ].map((p, pi) => (
                    <motion.circle key={pi} cx={node.x} cy={node.y}
                      stroke="rgba(255,214,0,0.45)" strokeWidth="0.8" fill="none"
                      initial={{ r: 10, opacity: 0.45 }}
                      animate={{ r: 72, opacity: 0 }}
                      transition={{
                        r: { duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeOut' },
                        opacity: { duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeOut' },
                      }}
                    />
                  ))}

                  {/* Outer ring */}
                  <motion.circle cx={node.x} cy={node.y}
                    stroke={isActive ? 'rgba(255,214,0,0.5)' : 'rgba(255,214,0,0.22)'}
                    strokeWidth="0.8" fill="none"
                    animate={{ r: isActive ? 14 : 10 }}
                    initial={{ r: 10 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Inner node */}
                  <motion.circle cx={node.x} cy={node.y}
                    fill={isActive ? '#FFD600' : 'rgba(255,214,0,0.55)'}
                    animate={{ r: isActive ? 7 : 4.5 }}
                    initial={{ r: 4.5 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Cross-hair tick on node when active */}
                  {isActive && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      <line x1={node.x - 18} y1={node.y} x2={node.x - 10} y2={node.y} stroke="rgba(255,214,0,0.5)" strokeWidth="0.7" />
                      <line x1={node.x + 10} y1={node.y} x2={node.x + 18} y2={node.y} stroke="rgba(255,214,0,0.5)" strokeWidth="0.7" />
                      <line x1={node.x} y1={node.y - 18} x2={node.x} y2={node.y - 10} stroke="rgba(255,214,0,0.5)" strokeWidth="0.7" />
                      <line x1={node.x} y1={node.y + 10} x2={node.x} y2={node.y + 18} stroke="rgba(255,214,0,0.5)" strokeWidth="0.7" />
                    </motion.g>
                  )}

                  {/* Label */}
                  <text
                    x={node.x + node.anchorX}
                    y={node.y + node.anchorY}
                    textAnchor={node.textAnchor}
                    fontSize="8" fontFamily="monospace" fontWeight="bold"
                    fill={isActive ? 'rgba(255,214,0,0.95)' : 'rgba(255,255,255,0.45)'}
                  >
                    {node.num}
                  </text>
                  <text
                    x={node.x + node.anchorX}
                    y={node.y + node.anchorY + 11}
                    textAnchor={node.textAnchor}
                    fontSize="7" fontFamily="monospace"
                    fill={isActive ? 'rgba(255,214,0,0.7)' : 'rgba(255,255,255,0.25)'}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Info panel — below radar */}
        <div className="mt-8 flex items-center justify-center" style={{ minHeight: '120px' }}>
          <AnimatePresence mode="wait">
            {activeNode !== null ? (
              <motion.div key={activeNode}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center max-w-lg px-4"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFD600]/50" />
                  <span className="font-mono text-[10px] text-[#FFD600] tracking-[0.3em] uppercase">
                    {RADAR_NODES[activeNode].num} — Mission Activated
                  </span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFD600]/50" />
                </div>
                <h3 className="text-gray-900 font-black text-xl md:text-2xl tracking-tight mb-3">
                  {RADAR_NODES[activeNode].label}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {RADAR_NODES[activeNode].desc}
                </p>
                <div className="flex items-center justify-center gap-10">
                  <div>
                    <div className="font-mono text-[9px] text-gray-900/20 tracking-[0.25em] uppercase mb-1">Status</div>
                    <div className="font-mono text-xs font-bold text-[#FFD600]">{RADAR_NODES[activeNode].status}</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <div className="font-mono text-[9px] text-gray-900/20 tracking-[0.25em] uppercase mb-1">Timeline</div>
                    <div className="font-mono text-xs font-bold text-[#FFD600]">{RADAR_NODES[activeNode].timeline}</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.p key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-[11px] text-gray-900/15 tracking-[0.25em] uppercase"
              >
                ─── Awaiting Target Lock ───
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default function Blogs() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scanY = useTransform(scrollYProgress, [0, 1], ['-100%', '200%']);

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="min-h-[70vh] flex flex-col flex-grow bg-white text-gray-600 overflow-x-hidden font-sans pt-16">

      {/* ══ SECTION 1: HERO ════════════════════════════════════════ */}
      <section
        ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white text-gray-900"
      >
        <GridBackground />
        <FloatingParticles count={40} />

        {/* Parallax hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          {/* Category label */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase">
              SkyWorks Flight Log
            </span>
          </motion.div>

          {/* Title with stagger */}
          <div className="overflow-hidden mb-6">
            {'Flight Log'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block text-7xl md:text-9xl font-condensed font-extrabold tracking-tighter text-gray-900 uppercase"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-gray-600 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Stories, missions, innovations and aerial perspectives from the future of autonomous flight.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(255,214,0,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-[#FFD600] text-black font-bold rounded-full text-sm tracking-wide"
            >
              Explore Missions
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 border border-gray-300 text-gray-900 rounded-full text-sm tracking-wide hover:border-[#FFD600]/50 transition-colors"
            >
              Watch Showreel
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Drone wireframe silhouette */}
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, 1.5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 md:right-24 opacity-[0.07] pointer-events-none select-none text-[180px] md:text-[260px]"
        >
          🚁
        </motion.div>

        {/* Scanning line */}
        <motion.div
          style={{ y: scanY }}
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-yellow/50 to-transparent pointer-events-none z-20"
        />

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#FFD600]/50 to-transparent" />
        </motion.div>
      </section>

      {/* ══ SECTION 2: FEATURED MISSION ════════════════════════════ */}
      <section className="relative py-32 px-6 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-16"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-[#FFD600]/40 to-transparent" />
            <span className="text-[#FFD600] text-xs font-bold tracking-[0.3em] uppercase">Featured Mission</span>
            <div className="h-px flex-1 bg-gradient-to-l from-[#FFD600]/40 to-transparent" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-200">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="relative h-80 lg:h-auto min-h-[400px] bg-gradient-to-br from-gray-100 via-gray-200 to-white overflow-hidden group"
            >
              {/* Simulated aerial image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[160px] opacity-10">🌊</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-light/20 to-blue-900/20" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,214,0,0.05)_0%,transparent_70%)]" />

              {/* Zoom on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6 }}
              />

              {/* Mission badge */}
              <div className="absolute top-6 left-6">
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 bg-[#FFD600]/10 border border-[#FFD600]/40 text-[#FFD600] rounded-full backdrop-blur-sm">
                  Active Mission
                </span>
              </div>

              {/* Coords overlay */}
              <div className="absolute bottom-6 left-6 font-mono text-xs text-gray-900/40">
                23.7491°N, 80.3286°E · ALT 450m · 2026-05-28
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="bg-white/[0.02] p-10 lg:p-14 flex flex-col justify-center"
            >
              <div className="flex gap-3 mb-6">
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full">
                  Maritime
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-full">
                  10 min read
                </span>
              </div>

              {/* Masked text reveal */}
              <div className="overflow-hidden mb-4">
                <motion.h2
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-black text-gray-900 leading-tight"
                >
                  Autonomous Coastal Surveillance Mission
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                viewport={{ once: true }}
                className="text-gray-600 leading-relaxed mb-4"
              >
                Deploying a fleet of 8 autonomous drones across 340km of coastline for real-time surveillance, illegal activity detection, and environmental monitoring — without a single human pilot.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                viewport={{ once: true }}
                className="text-gray-500 text-sm leading-relaxed mb-8"
              >
                Using our SkyNav 2.0 mesh intelligence, every drone shares a unified situational picture, automatically re-routing around weather events and coordinating 72-hour uninterrupted coverage.
              </motion.p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[['340 km', 'Coastline'], ['72 hrs', 'Duration'], ['8 Units', 'Drones']].map(([v, l]) => (
                  <div key={l} className="border border-gray-200 rounded-xl p-3 text-center bg-white/[0.02]">
                    <div className="text-[#FFD600] font-bold text-lg">{v}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{l}</div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ x: 6 }}
                className="flex items-center gap-2 text-[#FFD600] font-bold text-sm tracking-wide group"
              >
                Read Full Mission Brief
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="group-hover:translate-x-1 transition-transform">
                  <path d="M3.75 9H14.25M14.25 9L10.5 5.25M14.25 9L10.5 12.75" stroke="#FFD600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: LATEST INSIGHTS ═════════════════════════════ */}
      <section className="relative py-24 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase block mb-4">Latest Insights</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
              From The Flight Log
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSIGHTS.map((card, i) => (
              <InsightCard key={card.id} card={card} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.04, borderColor: 'rgba(255,214,0,0.6)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 border border-gray-300 text-gray-600 rounded-full text-sm font-medium tracking-wide hover:text-gray-900 transition-colors"
            >
              Load More Stories
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ══ SECTION 4: FLIGHT TIMELINE ═════════════════════════════ */}
      <section className="relative py-32 px-6 overflow-hidden bg-white">
        <GridBackground />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase block mb-4">Flight Timeline</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
              Our Journey in the Sky
            </h2>
          </motion.div>

          <div className="relative">
            {/* Animated centre line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-[#FFD600] to-transparent"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              viewport={{ once: true }}
            />

            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: MISSION STATISTICS ══════════════════════════ */}
      <section className="relative py-32 px-6 overflow-hidden bg-gray-50 border-y border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFD600]/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,214,0,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase block mb-4">By The Numbers</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
              Mission Statistics
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true }}
              >
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 6: MEDIA VAULT (GALLERY) ═══════════════════════ */}
      <section className="relative py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase block mb-4">Media Vault</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
              Captured from Above
            </h2>
          </motion.div>

          {/* Perfect 2-row layout with no empty space:
               Row 1: [large hero col-span-2 h-96] [two stacked smalls col-span-1]
               Row 2: [three equal cells col-span-1 each]
          */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Row 1 left – large hero */}
            {[GALLERY[0]].map((item, i) => (
              <motion.div
                key="hero"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.015, zIndex: 10 }}
                className="md:col-span-2 h-72 md:h-96 relative rounded-2xl overflow-hidden border border-gray-200 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 text-[160px] select-none">{item.emoji}</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full" whileHover={{ translateX: '200%' }} transition={{ duration: 0.7 }} />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 1.5h4v4M5.5 12.5h-4v-4M13 1L8 6M6 8l-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
                <div className="absolute bottom-5 left-5">
                  <div className="text-xs font-bold tracking-widest uppercase text-[#FFD600]/80 mb-1">{item.tag}</div>
                  <div className="text-gray-900 text-base font-semibold">{item.label}</div>
                </div>
              </motion.div>
            ))}

            {/* Row 1 right – two stacked smalls */}
            <div className="flex flex-col gap-4">
              {GALLERY.slice(1, 3).map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  className="flex-1 min-h-[160px] relative rounded-2xl overflow-hidden border border-gray-200 group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 text-8xl select-none">{item.emoji}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full" whileHover={{ translateX: '200%' }} transition={{ duration: 0.6 }} />
                  <div className="absolute bottom-3 left-4">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-[#FFD600]/70 mb-0.5">{item.tag}</div>
                    <div className="text-gray-900 text-sm font-semibold">{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Row 2 – three equal cells */}
            {GALLERY.slice(3).map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                className="h-52 relative rounded-2xl overflow-hidden border border-gray-200 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 text-8xl select-none">{item.emoji}</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full" whileHover={{ translateX: '200%' }} transition={{ duration: 0.6 }} />
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M8.5 1.5h4v4M5.5 12.5h-4v-4M13 1L8 6M6 8l-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
                <div className="absolute bottom-3 left-4">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[#FFD600]/70 mb-0.5">{item.tag}</div>
                  <div className="text-gray-900 text-sm font-semibold">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══ SECTION 7 (extra): VIDEO SHOWCASE ══════════════════════ */}
      <section className="relative py-24 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase block mb-4">Mission Replays</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
              Watch Us Fly
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS.map((video, i) => (
              <VideoCard key={i} video={video} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 8: FUTURE MISSIONS — FOLDER CARDS ══════════════ */}
      <section className="relative py-32 px-6 overflow-hidden bg-white">
        <GridBackground />
        <FloatingParticles count={20} />

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase block mb-4">Incoming</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
              Future Missions
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm">
              Classified operations currently in planning. Hover to open the mission file.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {BLUEPRINT_MISSIONS.map((mission, i) => (
              <BlueprintCard key={mission.num} mission={mission} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 9: NEWSLETTER ══════════════════════════════════ */}
      <section className="relative py-32 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-[2px] overflow-hidden"
          >
            <div className="rotating-glow-bg" />
            <div className="relative rounded-[calc(1.5rem-2px)] bg-gray-50 border border-gray-200 p-12 text-center z-10 h-full">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,214,0,0.06)_0%,transparent_70%)] pointer-events-none" />

            {/* Floating specks */}
            <FloatingParticles count={12} />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-14 h-14 rounded-2xl bg-[#FFD600]/10 border border-[#FFD600]/30 flex items-center justify-center mx-auto mb-6"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#FFD600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-gray-900 mb-3">
              Stay Connected To The
              <br />
              <span className="text-[#FFD600]">Future of Flight</span>
            </h2>
            <p className="text-gray-600 text-sm mb-8 max-w-sm mx-auto">
              Mission updates, AI research breakthroughs, and behind-the-scenes footage — delivered to your inbox.
            </p>

            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 py-4"
                >
                  <div className="w-8 h-8 rounded-full bg-[#FFD600]/10 border border-[#FFD600]/40 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 5" stroke="#FFD600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[#FFD600] font-semibold">You're on the flight manifest.</span>
                </motion.div>
              ) : (
                <motion.div key="form" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-5 py-3.5 bg-white border border-gray-200 rounded-full text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FFD600]/50 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(255,214,0,0.25)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => email.includes('@') && setSubscribed(true)}
                    className="px-7 py-3.5 bg-[#FFD600] text-black font-bold rounded-full text-sm tracking-wide whitespace-nowrap"
                  >
                    Subscribe
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-gray-600 text-xs mt-4">No spam. Unsubscribe anytime. We fly clean.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
