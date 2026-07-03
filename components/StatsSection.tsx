import React, { useEffect, useRef } from 'react';

const STATS = [
  { val: '50', suffix: '+', label: 'Projects Completed' },
  { val: '500', suffix: '+', label: 'Flight Hours' },
  { val: '10', suffix: '+', label: 'Clients Served' },
  { val: '99', suffix: '%', label: 'Reliability' },
];

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardRefs.current.forEach((card, i) => {
              if (!card) return;
              setTimeout(() => {
                card.classList.add('stats-card--reveal');
              }, i * 180);
            });
          } else {
            // Reset when leaving viewport for replay
            cardRefs.current.forEach((card) => {
              if (card) card.classList.remove('stats-card--reveal');
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white border-t-[3px] border-yellow py-14">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="stats-card-wrapper"
            ref={(el) => { cardRefs.current[i] = el; }}
          >
            {/* Yellow roller strip — always visible */}
            <div className="stats-roller" aria-hidden="true" />

            {/* The card that unrolls downward */}
            <div className="stats-card card-light py-10 px-6 text-center flex flex-col items-center justify-center cursor-pointer group">
              <span className="stats-val text-4xl md:text-5xl font-condensed font-extrabold text-black group-hover:text-yellow transition-colors duration-300 mb-2">
                {stat.val}<span className="text-yellow">{stat.suffix}</span>
              </span>
              <span className="stats-label text-[11px] font-bold uppercase tracking-[0.1em] text-gray-mid mt-2">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ─────────────── STYLES ─────────────── */}
      <style>{`
        /* ══════════════════════════════════════
           CARD WRAPPER
           ══════════════════════════════════════ */
        .stats-card-wrapper {
          position: relative;
        }

        /* ══════════════════════════════════════
           YELLOW ROLLER STRIP (Top Border)
           ══════════════════════════════════════ */
        .stats-roller {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--yellow, #FFD600);
          z-index: 10;
          border-radius: 4px 4px 0 0;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: 
            opacity 400ms ease,
            transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .stats-card--reveal .stats-roller {
          opacity: 1;
          transform: scaleX(1);
        }

        /* ══════════════════════════════════════
           CARD BASE
           ══════════════════════════════════════ */
        .stats-card {
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px) scale(0.96);
          will-change: transform, opacity;
          border-top: none !important;
          border-radius: 4px !important;

          /* White surface reveals downward smoothly */
          transition:
            transform 950ms cubic-bezier(0.22, 1, 0.36, 1) 100ms,
            opacity   700ms ease 100ms;
        }

        /* ══════════════════════════════════════
           REVEAL STATE
           ══════════════════════════════════════ */
        .stats-card--reveal .stats-card {
          transform: translateY(0) scale(1);
          opacity: 1;
        }

        /* ══════════════════════════════════════
           CONTENT SEQUENTIAL REVEALS
           ══════════════════════════════════════ */

        /* Title (Val) — fades in */
        .stats-val {
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity  400ms ease 300ms,
            transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 300ms;
        }

        .stats-card--reveal .stats-val {
          opacity: 1;
          transform: translateY(0);
        }

        /* Description (Label) — fades */
        .stats-label {
          opacity: 0;
          transition: opacity 400ms ease 500ms;
        }

        .stats-card--reveal .stats-label {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
