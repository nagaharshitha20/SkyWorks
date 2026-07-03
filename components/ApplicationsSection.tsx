import React, { useEffect, useRef, useState } from 'react';
import { TypewriterText } from './ui/TypewriterText';

const APPS = [
  {
    id: 'agriculture', title: 'Agriculture', icon: 'leaf-outline',
    desc: 'Precision crop monitoring, NDVI analysis, irrigation planning and yield optimization.',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=600&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-green-landscape-4184-large.mp4'
  },
  {
    id: 'drone-delivery', title: 'Drone Delivery', icon: 'cube-outline',
    desc: 'Autonomous last-mile delivery, payload drop mechanisms, and logistics tracking.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=600&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-drone-flying-over-a-forest-in-autumn-4654-large.mp4'
  },
  {
    id: 'air-taxi', title: 'Air Taxi', icon: 'airplane-outline',
    desc: 'Urban air mobility, vertical takeoff and landing, and inter-city passenger transit.',
    image: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?q=80&w=600&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-wind-turbines-in-a-wind-farm-1931-large.mp4'
  }
];

const ApplicationCard: React.FC<{ app: typeof APPS[0], index: number }> = ({ app, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="app-card-wrapper group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="app-card-inner">
        {/* FRONT */}
        <div className="app-card-front">
          <img src={app.image} alt={app.title} className="w-full h-full object-cover" loading="lazy" />
          <div className="app-card-gradient" />

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 z-10">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-3 bg-black/10 backdrop-blur-sm shadow-lg">
              <ion-icon name={app.icon} className="text-2xl text-white"></ion-icon>
            </div>

            {/* Cinematic Title Reveal wrapper */}
            <div className="app-card-title-wrap">
              <h3 className="app-card-title text-white font-condensed font-extrabold text-2xl uppercase tracking-wide">
                {app.title}
              </h3>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="app-card-back">
          <video
            src={app.video}
            loop
            muted
            playsInline
            autoPlay
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] z-10" />

          <div className="relative z-20 h-full flex flex-col justify-between p-6">
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-yellow font-condensed font-extrabold text-2xl uppercase tracking-wide mb-3 min-h-[32px]">
                <TypewriterText text={app.title} trigger={isHovered} speed={40} />
              </h3>
              <div className="text-white/90 text-sm leading-relaxed font-light min-h-[80px]">
                <TypewriterText text={app.desc} trigger={isHovered} delay={400} speed={30} />
              </div>
            </div>

            <button className="w-full py-3 bg-white/10 hover:bg-yellow hover:text-black border border-white/20 hover:border-yellow text-white text-xs font-bold uppercase tracking-widest transition-colors duration-300 rounded-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('intersecting');

            // Trigger Heading Reveal
            if (titleRef.current) titleRef.current.classList.add('reveal');

            // Sequential Stagger Reveal for Cards
            cardRefs.current.forEach((card, i) => {
              if (!card) return;
              setTimeout(() => {
                card.classList.add('reveal');
              }, i * 150 + 200); // 200ms initial delay so heading leads
            });
          } else {
            // Reset for replay
            section.classList.remove('intersecting');
            if (titleRef.current) titleRef.current.classList.remove('reveal');
            cardRefs.current.forEach((card) => {
              if (card) card.classList.remove('reveal');
            });
          }
        });
      },
      { threshold: 0.10 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Cinematic Heading Reveal */}
        <div className="inline-block overflow-hidden mb-12 sm:mb-16">
          <span className="section-eyebrow block mb-2">— Use Cases</span>
          <h2
            ref={titleRef}
            className="app-heading text-[32px] sm:text-[42px] md:text-[52px] font-condensed font-extrabold text-black"
          >
            APPLICATIONS
          </h2>
        </div>

        {/* 3 Cards / 2 Cards / 1 Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {APPS.map((app, i) => (
            <div key={app.id} ref={(el) => { cardRefs.current[i] = el; }} className="app-card-entry">
              <ApplicationCard app={app} index={i} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ══════════════════════════════════════
           CINEMATIC HEADING REVEAL
           ══════════════════════════════════════ */
        .app-heading {
          transform: translateY(110%);
          filter: blur(8px);
          opacity: 0;
          transition: 
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 900ms ease,
            opacity 900ms ease;
          will-change: transform, filter, opacity;
        }

        .app-heading.reveal {
          transform: translateY(0);
          filter: blur(0px);
          opacity: 1;
        }

        /* ══════════════════════════════════════
           CARD ENTRANCE STAGGER
           ══════════════════════════════════════ */
        .app-card-entry {
          opacity: 0;
          transform: translateY(50px) scale(0.96);
          transition: 
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 900ms ease;
          will-change: transform, opacity;
        }

        .app-card-entry.reveal {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* ══════════════════════════════════════
           CINEMATIC CARD TITLE REVEAL
           ══════════════════════════════════════ */
        .app-card-title-wrap {
          display: inline-block;
        }

        .app-card-title {
          /* translateY(100px) pushes it below the bottom edge of the card */
          transform: translateY(80px);
          filter: blur(6px);
          opacity: 0;
          transition: 
            transform 1000ms cubic-bezier(0.22, 1, 0.36, 1) 150ms,
            filter 1000ms ease 150ms,
            opacity 1000ms ease 150ms;
          will-change: transform, filter, opacity;
        }

        .app-card-entry.reveal .app-card-title {
          transform: translateY(0);
          filter: blur(0px);
          opacity: 1;
        }

        /* ══════════════════════════════════════
           3D FLIP CARD LOGIC
           ══════════════════════════════════════ */
        .app-card-wrapper {
          perspective: 1200px;
          height: 420px;
          width: 100%;
          cursor: pointer;
        }

        .app-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .app-card-wrapper:hover .app-card-inner {
          transform: rotateY(180deg);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .app-card-front, .app-card-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 12px;
          overflow: hidden;
          background: #111;
        }

        .app-card-front {
          /* front faces forward naturally */
        }

        .app-card-back {
          transform: rotateY(180deg);
        }

        /* Overlay for Front */
        .app-card-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.0) 0%,
            rgba(0,0,0,0.4) 60%,
            rgba(0,0,0,0.9) 100%
          );
          z-index: 1;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default ApplicationsSection;
