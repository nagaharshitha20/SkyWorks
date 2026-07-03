import React, { useEffect, useRef } from 'react';

const FEATURES = [
  { icon: 'color-wand-outline', title: 'Tailor-Made Configurations', desc: 'No generic templates. Every hull, sensor, and battery configuration is mapped to your distinct ROI requirements.' },
  { icon: 'battery-charging-outline', title: 'Unmatched Endurance', desc: 'Featuring solid-state batteries and ultra-lightweight composite frames for 45% longer flight times than market standards.' },
  { icon: 'shield-checkmark-outline', title: 'Enterprise Reliability', desc: 'Redundant flight controllers and encrypted comm-links guarantee your fleet stays airborne and secure.' },
  { icon: 'rocket-outline', title: 'Locally Sourced & Supported', desc: 'Proudly engineered and assembled in India, guaranteeing rapid part replacements and localized customer support.' },
];

const WhyPartnerSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Observer for individual cards
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('wp-card--reveal');
          } else {
            entry.target.classList.remove('wp-card--reveal');
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((card) => {
      if (card) cardObserver.observe(card);
    });

    // 2. Observer for the header
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          } else {
            entry.target.classList.remove('reveal');
          }
        });
      },
      { threshold: 0.15 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);

    return () => {
      cardObserver.disconnect();
      headerObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 bg-[#F7F7F7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* We keep simple CSS animation for the header to avoid mixing libraries, 
            or we can just fade it up when the section reveals. */}
        <div ref={headerRef} className="wp-header opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <span className="section-eyebrow">— The Advantage</span>
          <h2 className="text-[26px] sm:text-[34px] md:text-[46px] font-condensed font-extrabold text-black">
            Why Partner with SkyVision
          </h2>
          <div className="underline-accent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mt-10">
          {FEATURES.map((ft, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="wp-card card-light flex items-start space-x-4 sm:space-x-5 group"
            >
              <div className="wp-icon card-icon flex-shrink-0">
                <ion-icon name={ft.icon} className="text-xl"></ion-icon>
              </div>
              <div className="flex-1">
                <h3 className="wp-title text-sm font-bold text-black uppercase tracking-wider mb-2">
                  {ft.title}
                </h3>
                {/* Smooth Reveal Effect for description */}
                <div className="wp-desc text-gray-mid text-sm leading-relaxed min-h-[60px]">
                  {ft.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Section Header Reveal */
        .wp-header.reveal {
          opacity: 1;
          transform: translateY(0);
        }

        /* ══════════════════════════════════════
           CARD BASE REVEAL
           ══════════════════════════════════════ */
        .wp-card {
          opacity: 0;
          transform: translateY(40px) scale(0.96);
          box-shadow: 0 4px 10px rgba(0,0,0,0);
          will-change: transform, opacity;
          transition:
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 900ms ease,
            box-shadow 900ms ease;
        }

        .wp-card--reveal {
          opacity: 1;
          transform: translateY(0) scale(1);
          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.08); /* subtle shadow increase */
        }

        /* ══════════════════════════════════════
           ICON & TITLE SEQUENTIAL FADE
           ══════════════════════════════════════ */
        .wp-icon {
          opacity: 0;
          transform: scale(0.8);
          transition: 
            opacity 400ms ease 800ms,
            transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 800ms;
        }
        
        .wp-card--reveal .wp-icon {
          opacity: 1;
          transform: scale(1);
        }

        .wp-title {
          opacity: 0;
          transform: translateY(4px);
          transition: 
            opacity 400ms ease 950ms,
            transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 950ms;
        }

        .wp-card--reveal .wp-title {
          opacity: 1;
          transform: translateY(0);
        }

        .wp-desc {
          opacity: 0;
          transition: opacity 600ms ease;
        }

        .wp-card--reveal .wp-desc {
          opacity: 1;
          transition-delay: 500ms;
        }

        /* Desktop Staggering */
        @media (min-width: 640px) {
          .wp-card:nth-child(1) { transition-delay: 0ms; }
          .wp-card:nth-child(2) { transition-delay: 150ms; }
          .wp-card:nth-child(3) { transition-delay: 300ms; }
          .wp-card:nth-child(4) { transition-delay: 450ms; }

          .wp-card:nth-child(1) .wp-icon, .wp-card:nth-child(1) .wp-title, .wp-card:nth-child(1) .wp-desc { transition-delay: calc(400ms + 0ms); }
          .wp-card:nth-child(2) .wp-icon, .wp-card:nth-child(2) .wp-title, .wp-card:nth-child(2) .wp-desc { transition-delay: calc(400ms + 150ms); }
          .wp-card:nth-child(3) .wp-icon, .wp-card:nth-child(3) .wp-title, .wp-card:nth-child(3) .wp-desc { transition-delay: calc(400ms + 300ms); }
          .wp-card:nth-child(4) .wp-icon, .wp-card:nth-child(4) .wp-title, .wp-card:nth-child(4) .wp-desc { transition-delay: calc(400ms + 450ms); }
        }
      `}</style>
    </section>
  );
};

export default WhyPartnerSection;
