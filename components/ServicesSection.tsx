import React, { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────
   ServicesSection — Premium Aerospace Parallelogram Cards
   ─────────────────────────────────────────────────────────────────
   • True parallelogram via clip-path: polygon() — NO skew transforms
   • Images stay perfectly clipped to the parallelogram shape
   • Continuous slow zoom loop on images (in → out → repeat)
   • Hover: card lifts 8px, cyan glow border, image zoom boost
   • Animated dot-grid background + cyan radial glow
   • Staggered IntersectionObserver fade-up on enter
   ───────────────────────────────────────────────────────────────── */

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tag: string;
}

const SERVICES: ServiceCard[] = [
  {
    id: 'agri-survey',
    title: 'Agricultural Survey',
    description: 'NDVI-based precision crop health monitoring across thousands of acres with centimeter-level accuracy.',
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=900&auto=format&fit=crop',
    tag: 'Agri-Tech',
  },
  {
    id: 'drone-mapping',
    title: 'Drone Mapping',
    description: 'Survey-grade topographic and orthophoto maps generated with sub-5cm GSD resolution.',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b68904561?q=80&w=900&auto=format&fit=crop',
    tag: 'Geospatial',
  },
  {
    id: 'infra-inspect',
    title: 'Infrastructure Inspection',
    description: 'AI-assisted defect detection on bridges, pipelines, towers and power lines — zero downtime.',
    imageUrl: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=900&auto=format&fit=crop',
    tag: 'Industrial',
  },
  {
    id: 'surveillance',
    title: 'Surveillance',
    description: 'Long-endurance thermal and EO/IR persistent surveillance for perimeter and border security.',
    imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=900&auto=format&fit=crop',
    tag: 'Defense',
  },
  {
    id: 'precision-spray',
    title: 'Precision Spraying',
    description: 'Variable-rate pesticide and fertilizer application that reduces chemical usage by up to 40%.',
    imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=900&auto=format&fit=crop',
    tag: 'Agri-Tech',
  },
  {
    id: 'emergency-resp',
    title: 'Emergency Response',
    description: 'Rapid-deploy search-and-rescue, disaster assessment, and medical payload delivery in critical zones.',
    imageUrl: 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?q=80&w=900&auto=format&fit=crop',
    tag: 'Public Safety',
  },
];

const ServicesSection: React.FC = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Intersection Observer for staggered fade-up reveal ── */
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('svc-card--visible');
          } else {
            el.classList.remove('svc-card--visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const h = e.currentTarget.getAttribute('href');
    if (h) window.location.hash = h;
  };

  return (
    <section
      id="products"
      className="svc-section"
      aria-label="Our Services"
    >
      {/* ── ANIMATED GRID BACKGROUND ── */}


      <div className="w-full px-0 sm:px-0 lg:px-0">
        {/* ── SECTION HEADER ── */}
        <div className="svc-header px-4 sm:px-6 lg:px-8">
          <span className="svc-eyebrow">— Capabilities</span>
          <h2 className="svc-heading">Our Services</h2>
          <div className="svc-divider" />
          <p className="svc-subtext">
            Precision-engineered UAV solutions purpose-built for defence, agriculture,
            industry, and public safety — at scale.
          </p>
        </div>

        {/* ── CARD GRID ── */}
        <div className="svc-grid">
          {SERVICES.map((svc, idx) => (
            <div
              key={svc.id}
              className="svc-card"
              data-idx={idx}
              ref={(el) => { cardRefs.current[idx] = el; }}
              role="article"
              aria-label={svc.title}
            >
              {/* Parallelogram clip wrapper */}
              <div className="svc-card__inner">

                {/* ── IMAGE LAYER (clipped inside parallelogram) ── */}
                <div className="svc-card__img-wrap">
                  <img
                    src={svc.imageUrl}
                    alt={svc.title}
                    className="svc-card__img"
                    loading="lazy"
                  />
                </div>

                {/* ── DARK GRADIENT OVERLAY ── */}
                <div className="svc-card__overlay" aria-hidden="true" />

                {/* ── HUD corner bracket top-right ── */}
                <div className="svc-card__hud" aria-hidden="true" />

                {/* ── CONTENT (bottom-left) ── */}
                <div className="svc-card__content">
                  <span className="svc-card__tag">{svc.tag}</span>
                  <h3 className="svc-card__title">{svc.title}</h3>
                  <p className="svc-card__desc">{svc.description}</p>
                  <a
                    href="#contact"
                    onClick={handleNavigate}
                    className="svc-card__btn"
                    aria-label={`Learn more about ${svc.title}`}
                  >
                    Learn More
                    <svg
                      className="svc-card__btn-arrow"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 7H13M7 1L13 7L7 13"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="svc-cta-wrap">
        <a href="#missions" onClick={handleNavigate} className="svc-cta-btn">
          Explore Full Fleet
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* ─────────────────── STYLES ─────────────────── */}
      <style>{`
        /* ── Section container ── */
        .svc-section {
          position: relative;
          background: #FFFFFF;
          padding: 100px 0 80px;
          overflow: hidden;
          font-family: 'Space Grotesk', 'Barlow', sans-serif;
        }

        /* ── Section header ── */
        .svc-header {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 720px;
          margin: 0 auto 52px;
        }

        .svc-eyebrow {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #B8860B;
          margin-bottom: 14px;
          font-family: 'Space Grotesk', 'Barlow', sans-serif;
        }

        .svc-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(38px, 5.5vw, 68px);
          font-weight: 800;
          color: #0F172A;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          line-height: 1;
          margin: 0 0 6px;
          text-shadow: none;
        }

        .svc-divider {
          width: 52px;
          height: 2px;
          background: #FFD600;
          margin: 14px auto 20px;
          border-radius: 2px;
        }

        .svc-subtext {
          font-size: 15px;
          color: #475569;
          line-height: 1.78;
          font-weight: 400;
          margin: 0;
          font-family: 'Space Grotesk', 'Barlow', sans-serif;
        }

        /* ════════════════════════════════════════════════════
           CARD GRID — Standard layout, flush padding handled
           by section padding, not the grid itself.
           ════════════════════════════════════════════════════ */
        .svc-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        /* ── Individual Card wrapper ── */
        .svc-card {
          opacity: 0;
          transform: translateY(38px);
          transition:
            opacity 0.58s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 0.58s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }

        .svc-card--visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Desktop Staggering */
        @media (min-width: 640px) {
          .svc-card:nth-child(1) { transition-delay: 0ms; }
          .svc-card:nth-child(2) { transition-delay: 110ms; }
          .svc-card:nth-child(3) { transition-delay: 220ms; }
          .svc-card:nth-child(4) { transition-delay: 330ms; }
          .svc-card:nth-child(5) { transition-delay: 440ms; }
          .svc-card:nth-child(6) { transition-delay: 550ms; }
        }

        /* ════════════════════════════════════════════════════
           CARD INNER — Standard rectangle, matches site aesthetic
           ════════════════════════════════════════════════════ */
        .svc-card__inner {
          position: relative;
          height: 380px;
          width: 100%;
          background: #FFFFFF;
          overflow: hidden;
          cursor: pointer;
          border-radius: 12px;
          border: 1px solid rgba(15, 23, 42, 0.05);
          transition:
            transform 0.42s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.42s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          box-shadow:
            0 4px 16px rgba(15, 23, 42, 0.05),
            0 1px 4px rgba(15, 23, 42, 0.03);
        }

        .svc-card:nth-child(odd) .svc-card__inner {
          border-radius: 0 12px 12px 0;
        }

        .svc-card:nth-child(even) .svc-card__inner {
          border-radius: 12px 0 0 12px;
        }

        /* Hover: lift 8px + deepen shadow + yellow border glow */
        .svc-card:hover .svc-card__inner {
          transform: translateY(-8px);
          box-shadow:
            0 20px 48px rgba(15, 23, 42, 0.1),
            0 4px 12px rgba(15, 23, 42, 0.05),
            0 0 0 1px rgba(255, 214, 0, 0.50);
        }

        /* ── Image wrapper ── */
        .svc-card__img-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        /* Ken Burns: 100% → 108% → 100%, 14s loop */
        .svc-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          animation: svc-ken-burns 14s ease-in-out infinite;
          transform-origin: center center;
          will-change: transform;
        }

        @keyframes svc-ken-burns {
          0%   { transform: scale(1.00) translateY(0px); }
          30%  { transform: scale(1.04) translateY(-2px); }
          60%  { transform: scale(1.08) translateY(-3px); }
          80%  { transform: scale(1.05) translateY(-1px); }
          100% { transform: scale(1.00) translateY(0px); }
        }

        /* Hover: boost to 112% */
        .svc-card:hover .svc-card__img {
          animation: svc-ken-burns-hover 14s ease-in-out infinite;
        }

        @keyframes svc-ken-burns-hover {
          0%   { transform: scale(1.08) translateY(0px); }
          30%  { transform: scale(1.10) translateY(-2px); }
          60%  { transform: scale(1.12) translateY(-3px); }
          80%  { transform: scale(1.10) translateY(-1px); }
          100% { transform: scale(1.08) translateY(0px); }
        }

        /* White gradient overlay — light theme readability */
        .svc-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.00) 0%,
            rgba(255, 255, 255, 0.08) 28%,
            rgba(255, 255, 255, 0.55) 56%,
            rgba(255, 255, 255, 0.92) 78%,
            rgba(255, 255, 255, 0.98) 100%
          );
          z-index: 1;
          pointer-events: none;
          transition: background 0.42s ease;
        }

        .svc-card:hover .svc-card__overlay {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.00) 0%,
            rgba(255, 255, 255, 0.06) 25%,
            rgba(255, 255, 255, 0.48) 54%,
            rgba(255, 255, 255, 0.90) 76%,
            rgba(255, 255, 255, 0.97) 100%
          );
        }

        /* HUD bracket — yellow accent */
        .svc-card__hud {
          position: absolute;
          top: 18px;
          right: 24px;
          width: 16px;
          height: 16px;
          border-top: 2px solid rgba(255, 214, 0, 0.60);
          border-right: 2px solid rgba(255, 214, 0, 0.60);
          z-index: 4;
          pointer-events: none;
          transition: border-color 0.32s ease, box-shadow 0.32s ease;
        }

        .svc-card:hover .svc-card__hud {
          border-color: #FFD600;
          box-shadow: 2px -2px 8px rgba(255, 214, 0, 0.35);
        }

        /* ── Content block ── */
        .svc-card__content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          padding: 22px 30px 26px 30px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }

        .svc-card__tag {
          font-family: 'Barlow', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #92650A;
          background: rgba(255, 214, 0, 0.18);
          border: 1px solid rgba(255, 214, 0, 0.50);
          padding: 3px 8px 2px;
          border-radius: 2px;
          line-height: 1.6;
        }

        .svc-card__title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(18px, 2vw, 23px);
          font-weight: 800;
          color: #0F172A;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          line-height: 1.08;
          margin: 2px 0 0;
          text-shadow: none;
        }

        .svc-card__desc {
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          color: #475569;
          line-height: 1.65;
          margin: 0;
          font-weight: 400;
          max-width: 90%;
        }

        /* ── Learn More button ── */
        .svc-card__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Barlow', sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #92650A;
          text-decoration: none;
          margin-top: 8px;
          padding-bottom: 3px;
          border-bottom: 1.5px solid rgba(255, 214, 0, 0.55);
          transition:
            transform 0.38s cubic-bezier(0.4, 0, 0.2, 1),
            color 0.28s ease,
            border-color 0.28s ease;
        }

        .svc-card__btn-arrow {
          transition: transform 0.34s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          flex-shrink: 0;
        }

        .svc-card:hover .svc-card__btn {
          transform: translateX(6px);
          color: #7A5200;
          border-bottom-color: rgba(255, 214, 0, 0.90);
        }

        .svc-card:hover .svc-card__btn-arrow {
          transform: translateX(3px);
        }

        /* ── Bottom CTA ── */
        .svc-cta-wrap {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          margin-top: 54px;
        }

        .svc-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Grotesk', 'Barlow', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0F172A;
          text-decoration: none;
          border: 1px solid rgba(15, 23, 42, 0.14);
          padding: 14px 36px;
          border-radius: 3px;
          background: #FFFFFF;
          transition: all 0.32s ease;
        }

        .svc-cta-btn:hover {
          border-color: #FFD600;
          color: #7A5200;
          background: rgba(255, 214, 0, 0.10);
          box-shadow: 0 0 28px rgba(255, 214, 0, 0.20);
          transform: translateY(-2px);
        }

        .svc-cta-btn svg {
          transition: transform 0.30s ease;
          opacity: 0.7;
        }

        .svc-cta-btn:hover svg {
          transform: translateX(4px);
          opacity: 1;
        }

        /* ── Tablet (≤1024px) ── */
        @media (max-width: 1024px) {
          .svc-section { padding: 80px 0 64px; }
          .svc-card__inner { height: 360px; }
        }

        /* ── Tablet narrow (≤900px) ── */
        @media (max-width: 900px) {
        /* ── Mobile: 1 column ── */
        @media (max-width: 640px) {
          .svc-section {
            padding: 72px 0 56px;
          }
          .svc-header {
            margin-bottom: 40px;
            padding: 0 16px;
          }
          .svc-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 0;
          }
          .svc-card:nth-child(odd) .svc-card__inner,
          .svc-card:nth-child(even) .svc-card__inner {
            border-radius: 0;
          }
          .svc-card__inner {
            height: 280px;
          }
          .svc-card__content {
            padding: 18px 22px 22px;
          }
          .svc-card__desc {
            max-width: 96%;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
