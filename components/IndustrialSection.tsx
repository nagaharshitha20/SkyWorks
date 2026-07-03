import React, { useEffect, useRef } from 'react';

/*
  ═══════════════════════════════════════════════════════════════════
  IndustrialSection — "Poster Roll Reveal" Animation
  ═══════════════════════════════════════════════════════════════════

  Concept: Each card looks like a white engineering blueprint rolled
  inside a yellow metal strip at the top. On scroll entry the card
  "unrolls" downward with gravity, a slight rolling edge shadow, and
  a subtle brightness highlight that travels with the unrolling paper.

  Content appears progressively:
    • Icon fades in at ~20% of unroll
    • Title slides up 8px + fades at ~45%
    • Description fades in at ~70%

  Technique:
    • scaleY(0→1) on the card body (transform-origin: top)
    • overflow:hidden on the wrapper clips the unrolling card
    • A pseudo-element "rolling edge" shadow descends with it
    • CSS custom property drives the synchronised content reveals
    • Pure CSS + IntersectionObserver — no animation libraries

  Cards stagger left→right with 150ms delay between each.
  Animation runs once; never replays on re-scroll.
  ─────────────────────────────────────────────────────────────────
*/

interface UseCase {
  icon: string;
  title: string;
  desc: string;
}

const USE_CASES: UseCase[] = [
  { icon: 'cube-outline', title: 'Logistics', desc: 'Fast last-mile autonomous drops.' },
  { icon: 'leaf-outline', title: 'Agriculture', desc: 'Precision spraying & monitoring.' },
  { icon: 'eye-outline', title: 'Surveillance', desc: 'Border and perimeter security.' },
  { icon: 'map-outline', title: 'Surveying', desc: 'High-accuracy topographic maps.' },
];

const IndustrialSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggeredRef = useRef(false);   // run once only

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          observer.disconnect();

          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            setTimeout(() => {
              card.classList.add('ia-card--reveal');
            }, i * 150);
          });
        }
      },
      { threshold: 0.20 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="ia-section py-20 sm:py-24 bg-[#F7F7F7]"
      aria-label="Industrial Applications"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header (untouched typography) ── */}
        <span className="section-eyebrow">— Versatility</span>
        <h2 className="text-[26px] sm:text-[34px] md:text-[46px] font-condensed font-extrabold text-black">
          Industrial Applications
        </h2>
        <div className="underline-accent" />

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {USE_CASES.map((uc, i) => (
            <div
              key={i}
              className="ia-card-wrapper"
              ref={(el) => { cardRefs.current[i] = el; }}
              aria-label={uc.title}
            >
              {/* Yellow roller strip — always visible, acts as the "mounted roller" */}
              <div className="ia-roller" aria-hidden="true" />

              {/* The card that unrolls downward */}
              <div className="ia-card card-light flex flex-col items-start group">
                {/* Rolling-edge highlight — travels with unroll */}
                <div className="ia-rolling-edge" aria-hidden="true" />

                {/* Icon */}
                <div className="ia-icon card-icon mb-5">
                  {/* @ts-ignore */}
                  <ion-icon name={uc.icon} class="text-xl" />
                </div>

                {/* Title */}
                <h3 className="ia-title text-sm font-bold uppercase tracking-wider text-black mb-2">
                  {uc.title}
                </h3>

                {/* Description */}
                <p className="ia-desc text-gray-mid text-sm leading-relaxed">
                  {uc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────── STYLES ─────────────── */}
      <style>{`

        /* ══════════════════════════════════════
           CARD WRAPPER
           Clips the unrolling card; lets the
           yellow roller strip show above it.
           ══════════════════════════════════════ */
        .ia-card-wrapper {
          position: relative;
          /* No overflow:hidden here — the roller sits outside the clip */
        }

        /* ══════════════════════════════════════
           YELLOW ROLLER STRIP
           Mimics the aluminium roller at the top.
           Always visible — even before reveal.
           ══════════════════════════════════════ */
        .ia-roller {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--yellow, #FFD600);
          z-index: 10;
          border-radius: 2px 2px 0 0;
          /* Tiny metallic sheen */
          box-shadow:
            0 1px 0 rgba(255,255,255,0.55),
            0 2px 6px rgba(255, 214, 0, 0.30);
        }

        /* ══════════════════════════════════════
           CARD BASE
           Sits below the roller. Initially
           collapsed (scaleY:0) with transform-
           origin at the TOP so it unrolls down.
           ══════════════════════════════════════ */
        .ia-card {
          position: relative;
          overflow: hidden;           /* clips the rolling-edge highlight */
          transform-origin: top center;
          transform: scaleY(0);
          opacity: 0;
          will-change: transform, opacity;

          /* card-light already supplies background + border + padding */
          /* We override border-top because the roller covers it */
          border-top: none !important;
          border-radius: 0 0 4px 4px !important;

          /*
            Transition for the card surface.
            cubic-bezier(0.22,1,0.36,1) = Apple-style spring feel
            with natural deceleration + tiny overshoot.
          */
          transition:
            transform 780ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity   120ms ease;
        }

        /* ══════════════════════════════════════
           REVEAL STATE (toggled by JS)
           ══════════════════════════════════════ */
        .ia-card--reveal .ia-card {
          transform: scaleY(1);
          opacity: 1;
        }

        /* ══════════════════════════════════════
           ROLLING EDGE HIGHLIGHT
           A thin bright strip that travels from
           top to bottom during unrolling.
           Uses the same timing so it stays at
           the "leading edge" of the paper.
           ══════════════════════════════════════ */
        .ia-rolling-edge {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.90) 0%,
            rgba(255, 255, 255, 0.00) 100%
          );
          /* Starts at the top. As scaleY grows from 0→1, this element
             appears to travel downward since the card expands from the top.
             We animate its opacity for the "leading brightness" effect. */
          pointer-events: none;
          z-index: 2;
          opacity: 0;
          transition: opacity 150ms ease;
        }

        .ia-card--reveal .ia-rolling-edge {
          /* Briefly visible during unroll, fades out after */
          animation: ia-edge-flash 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes ia-edge-flash {
          0%   { opacity: 0.90; }
          60%  { opacity: 0.55; }
          100% { opacity: 0; }
        }

        /* ══════════════════════════════════════
           CONTENT SEQUENTIAL REVEALS
           Each piece animates after the card
           has partially unrolled.
           ══════════════════════════════════════ */

        /* Icon — fades in at ~20% of 780ms = 156ms */
        .ia-icon {
          opacity: 0;
          transform: scale(0.92);
          transition:
            opacity  220ms ease 160ms,
            transform 260ms cubic-bezier(0.22, 1, 0.36, 1) 160ms;
        }

        .ia-card--reveal .ia-icon {
          opacity: 1;
          transform: scale(1);
        }

        /* Title — slides up 8px + fades at ~45% = 351ms */
        .ia-title {
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity  240ms ease 350ms,
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1) 350ms;
        }

        .ia-card--reveal .ia-title {
          opacity: 1;
          transform: translateY(0);
        }

        /* Description — fades at ~70% = 546ms */
        .ia-desc {
          opacity: 0;
          transition: opacity 260ms ease 545ms;
        }

        .ia-card--reveal .ia-desc {
          opacity: 1;
        }

        /* ══════════════════════════════════════
           HOVER — only active after reveal
           ══════════════════════════════════════ */
        .ia-card-wrapper:hover .ia-card {
          transform: scaleY(1) translateY(-6px);
          box-shadow:
            0 10px 28px rgba(0, 0, 0, 0.10),
            0 4px 10px rgba(0, 0, 0, 0.06) !important;
          transition:
            transform 250ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 250ms ease;
        }

        .ia-card-wrapper:hover .ia-roller {
          box-shadow:
            0 1px 0 rgba(255,255,255,0.70),
            0 2px 10px rgba(255, 214, 0, 0.50);
        }

        .ia-card-wrapper:hover .ia-icon {
          transform: scale(1.06);
          transition:
            transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* ══════════════════════════════════════
           ROLLING SHADOW UNDERLINE
           Simulates the paper edge casting a
           soft shadow on the wall beneath it
           during unrolling. Attached below
           the card via the wrapper pseudo.
           ══════════════════════════════════════ */
        .ia-card-wrapper::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 8%;
          right: 8%;
          height: 8px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.10) 0%, transparent 100%);
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          transition: opacity 400ms ease 600ms;
          z-index: 0;
        }

        .ia-card--reveal.ia-card-wrapper::after,
        .ia-card--reveal ~ .ia-card-wrapper::after {
          opacity: 1;
        }

        /* Apply shadow to the wrapper that received ia-card--reveal */
        .ia-card--reveal::after {
          opacity: 1;
        }

      `}</style>
    </section>
  );
};

export default IndustrialSection;
