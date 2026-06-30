import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Hotspot {
  id: number;
  name: string;
  x: number; // percentage values (0-100)
  y: number;
  labelX: number; // destination coordinates for labels
  labelY: number;
  align: 'left' | 'right' | 'center';
  title: string;
  desc: string;
  linePath: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    name: "Propeller System",
    x: 22, y: 36,
    labelX: 5, labelY: 18,
    align: 'left',
    title: "Carbon-Fiber Propellers",
    desc: "Aerodynamically optimized props with self-locking mechanisms.",
    linePath: "M 22 36 C 16 28, 10 24, 5 21"
  },
  {
    id: 2,
    name: "Solid-State Battery Pack",
    x: 52, y: 25,
    labelX: 52, labelY: 6,
    align: 'center',
    title: "Solid-State Battery Pack",
    desc: "Dual-redundant high-density cells for up to 45 mins flight.",
    linePath: "M 52 25 L 52 10"
  },
  {
    id: 3,
    name: "Gimbal Camera",
    x: 48, y: 71,
    labelX: 20, labelY: 90,
    align: 'left',
    title: "4K Gimbal & Thermal Sensor",
    desc: "Integrated optical + thermal sensors with 3-axis stabilization.",
    linePath: "M 48 71 C 36 78, 28 84, 20 88"
  },
  {
    id: 4,
    name: "Detachable Wings / Arms",
    x: 77, y: 53,
    labelX: 82, labelY: 42,
    align: 'right',
    title: "Detachable Arm Design",
    desc: "Quick-release arm locking mechanism enables rapid folding.",
    linePath: "M 77 53 C 82 48, 84 45, 82 44"
  }
];

export const InteractiveDrone: React.FC = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [activeId, setActiveId] = useState<number | null>(4); // Default active is wings like second image

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Limit rotation between -10deg and +10deg for realistic 3D feel
    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative w-full max-w-5xl aspect-[16/10] overflow-visible rounded-xl select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Moving Drone Image */}
      <motion.div 
        className="w-full h-full flex items-center justify-center relative cursor-crosshair"
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,214,0,0.08)_0%,transparent_70%)] pointer-events-none z-0" />
        
        {/* Drone Image */}
        <img
          src="/drone_hero.png"
          alt="SkyVision 3D Drone"
          className="relative w-full md:w-[75%] object-contain z-10 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
        />

        {/* Hotspots */}
        {HOTSPOTS.map((hotspot) => {
          const isActive = activeId === hotspot.id;
          return (
            <button
              key={hotspot.id}
              onClick={() => setActiveId(isActive ? null : hotspot.id)}
              onMouseEnter={() => setActiveId(hotspot.id)}
              className="absolute z-30 w-6 h-6 rounded-full flex items-center justify-center focus:outline-none cursor-pointer border-none bg-transparent group"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%) translateZ(40px)',
              }}
            >
              {/* Pulse rings */}
              <span className={`absolute inline-flex h-full w-full rounded-full bg-yellow opacity-75 animate-ping`} />
              {/* Inner yellow center dot */}
              <span className={`relative inline-flex rounded-full h-3.5 w-3.5 bg-yellow border border-black transition-all ${isActive ? 'scale-125' : 'group-hover:scale-115'}`} />
            </button>
          );
        })}
      </motion.div>

      {/* SVG Connecting Lines & Labels Overlay */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        {HOTSPOTS.map((hotspot) => {
          const isActive = activeId === hotspot.id;
          if (!isActive) return null;
          return (
            <g key={hotspot.id}>
              {/* Animated line path */}
              <motion.path
                d={hotspot.linePath}
                stroke="var(--black)"
                strokeWidth="0.4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              {/* Small dot on label side */}
              <motion.circle
                cx={hotspot.labelX}
                cy={hotspot.labelY}
                r="0.6"
                fill="var(--yellow)"
                stroke="var(--black)"
                strokeWidth="0.2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              />
            </g>
          );
        })}
      </svg>

      {/* Labels Containers overlay */}
      {HOTSPOTS.map((hotspot) => {
        const isActive = activeId === hotspot.id;
        if (!isActive) return null;
        return (
          <div
            key={hotspot.id}
            className="absolute z-40 bg-white border border-gray-border rounded-[4px] border-t-[3px] border-yellow p-4 shadow-lg pointer-events-none transition-all duration-300 max-w-[260px] md:max-w-[300px]"
            style={{
              left: `${hotspot.labelX}%`,
              top: `${hotspot.labelY}%`,
              transform: hotspot.align === 'left' 
                ? 'translate(10px, -50%)' 
                : hotspot.align === 'right' 
                  ? 'translate(-105%, -50%)' 
                  : 'translate(-50%, -110%)',
            }}
          >
            <h4 className="font-condensed font-extrabold text-black uppercase text-sm mb-1 leading-snug">{hotspot.title}</h4>
            <p className="text-gray-mid text-xs leading-relaxed font-normal">{hotspot.desc}</p>
          </div>
        );
      })}
    </div>
  );
};
