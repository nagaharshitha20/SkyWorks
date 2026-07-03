import React, { useEffect, useRef } from 'react';

const PARTNER_POINTS = [
  { num: '01', title: 'PASSIONATE', desc: 'Passionate about technology and innovation' },
  { num: '02', title: 'GREAT CONNECT', desc: 'Great connect with Government with Private Enterprise' },
  { num: '03', title: 'PEOPLE CHAMPION', desc: 'People champion with a customer-centric approach' },
  { num: '04', title: 'ALIGNED', desc: 'Aligned with our values and aspiration' }
];

const PartnerSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Observer for individual numbered points
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        });
      },
      { rootMargin: '0px 0px -15% 0px' } // Triggers slightly above bottom of viewport
    );

    itemRefs.current.forEach((item) => {
      if (item) itemObserver.observe(item);
    });

    // 2. Observer for the whole section to handle reset on leave and image reveal on enter
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Section completely left viewport -> reset everything for replay
            itemRefs.current.forEach((item) => {
              if (item) item.classList.remove('reveal');
            });
            if (imageRef.current) imageRef.current.classList.remove('reveal');
          } else {
            // Section entered viewport -> reveal the sticky image
            if (imageRef.current) imageRef.current.classList.add('reveal');
          }
        });
      },
      { threshold: 0 } // Triggers as soon as any part of the section enters/leaves
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    return () => {
      itemObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start relative">
          
          {/* LEFT COLUMN - Scrollable content */}
          <div className="w-full lg:w-[45%] flex flex-col pt-6 pb-8 z-10 relative">
            
            {/* Heading */}
            <div className="mb-14">
              <span className="section-eyebrow block mb-3">— PARTNER WITH US</span>
              <h2 className="text-[34px] sm:text-[42px] md:text-[52px] font-condensed font-extrabold text-black leading-[1.05] tracking-tight">
                Who Can Become<br />a Partner?
              </h2>
              <div className="w-12 h-[3px] bg-yellow mt-6" />
            </div>

            {/* Points with clean, small gap */}
            <div className="flex flex-col gap-12 lg:gap-14">
              {PARTNER_POINTS.map((pt, i) => (
                <div 
                  key={i}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className="partner-item flex items-start gap-8"
                >
                  <div className="text-[48px] sm:text-[56px] font-extrabold font-condensed text-gray-200 leading-none">
                    {pt.num}
                  </div>
                  <div className="flex flex-col pt-2 min-h-[70px]">
                    <h3 className="text-black font-bold text-sm tracking-widest uppercase mb-2">
                      {pt.title}
                    </h3>
                    <p className="text-gray-mid text-sm max-w-[260px] leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Sticky Image */}
          <div className="w-full lg:w-[55%] flex justify-end lg:sticky lg:top-[25vh] z-0">
            <div 
              ref={imageRef} 
              className="partner-image-wrapper relative w-full aspect-[1.25/1] max-w-[700px] rounded-[18px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            >
              <img 
                src="https://images.unsplash.com/photo-1524143986875-3b098d78b363?q=80&w=1200&auto=format&fit=crop" 
                alt="SkyVision Drone Partner" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        /* ══════════════════════════════════════
           NUMBERED ITEMS REVEAL
           ══════════════════════════════════════ */
        .partner-item {
          opacity: 0;
          transform: translateY(35px) scale(0.97);
          filter: blur(6px);
          will-change: transform, opacity, filter;
          transition: 
            opacity 900ms ease,
            filter 900ms ease,
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .partner-item:nth-child(1) { transition-delay: 0ms; }
        .partner-item:nth-child(2) { transition-delay: 150ms; }
        .partner-item:nth-child(3) { transition-delay: 300ms; }
        .partner-item:nth-child(4) { transition-delay: 450ms; }

        .partner-item.reveal {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }

        /* ══════════════════════════════════════
           IMAGE REVEAL
           ══════════════════════════════════════ */
        .partner-image-wrapper {
          opacity: 0;
          transform: translateX(40px) scale(0.97);
          will-change: transform, opacity;
          transition: 
            opacity 1000ms ease,
            transform 1000ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .partner-image-wrapper.reveal {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      `}</style>
    </section>
  );
};

export default PartnerSection;
