import React, { forwardRef } from 'react';
import { gsap } from 'gsap';
import { ShopCard } from './ShopCard';
import { products } from '../data/products';
import { ImageSlider } from './ImageSlider';

const sliderImages = [
    'https://images.unsplash.com/photo-1527977966376-94a86254b6b1?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507553455322-388f6a9b433e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611117775522-30693a8083c5?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583521226274-9a3205a2f534?q=80&w=1200&auto=format&fit=crop'
];


const Section: React.FC<{ children: React.ReactNode, id?: string, className?: string }> = ({ children, id, className }) => (
  <section id={id} className={`h-screen w-full p-8 flex justify-center items-center text-center ${className || ''}`}>
    <div className="max-w-4xl text-sky-light">
      {children}
    </div>
  </section>
);

export const Overlay = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: targetId, offsetY: 70 },
        ease: 'power2.inOut'
      });
    }
  };

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetHash = e.currentTarget.getAttribute('href');
    if (targetHash) {
      window.location.hash = targetHash;
    }
  };
  
  const featuredProducts = products.slice(0, 3);

  return (
    <div
      ref={ref}
      className="w-full"
    >
      <Section className="hero-section">
        <div className="animate-fade-in-slow">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter">SKYVISION PRO</h1>
            <p className="text-xl text-sky-gray mt-4">Revolutionizing the Skies with Precision and Power.</p>
            <div className="mt-8 space-x-4">
                <a href="#showcase" onClick={handleScroll} className="px-6 py-3 bg-sky-light text-sky-dark rounded-full font-bold hover:bg-opacity-80 transition-all hover:shadow-[0_0_20px_theme(colors.sky-light)]">
                    Explore Features
                </a>
                <a href="#shop" onClick={handleNavigate} className="px-6 py-3 bg-transparent border-2 border-sky-gray text-sky-gray rounded-full font-bold hover:bg-sky-gray hover:text-sky-dark transition-all">
                    Shop Now
                </a>
            </div>
        </div>
      </Section>

      <Section id="showcase" className="showcase-section opacity-0">
        <div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Mission-Critical Performance.</h2>
          <p className="text-lg text-sky-gray mt-4 max-w-lg mx-auto">
            The SkyVision Pro delivers unparalleled flight stability, extended operational range, and a modular payload system. It's the ultimate tool for aerial cinematography, surveying, and industrial inspection.
          </p>
        </div>
      </Section>

      <Section id="exploded" className="exploded-section opacity-0">
         <div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Anatomy of a Pioneer.</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 mt-12 text-left">
            <div className="border-l-2 border-sky-blue pl-4">
              <h3 className="font-bold text-xl">SkyCore™ Flight AI</h3>
              <p className="text-sky-gray">For instantaneous response and tactical precision.</p>
            </div>
            <div className="border-l-2 border-sky-blue pl-4">
              <h3 className="font-bold text-xl">AeroThrust™ Motors</h3>
              <p className="text-sky-gray">Silent, powerful 900KV motors for stable flight in any condition.</p>
            </div>
            <div className="border-l-2 border-sky-blue pl-4">
              <h3 className="font-bold text-xl">Modular Payload Bay</h3>
              <p className="text-sky-gray">Swap cameras, sensors, and equipment in seconds.</p>
            </div>
            <div className="border-l-2 border-sky-blue pl-4">
              <h3 className="font-bold text-xl">Endurance™ Power System</h3>
              <p className="text-sky-gray">High-Efficiency LiPo 6S with predictive health monitoring.</p>
            </div>
          </div>
        </div>
      </Section>

      <section id="shop" className="h-auto min-h-screen w-full p-8 py-24 flex flex-col justify-center items-center text-center bg-sky-dark shop-section-content">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Find Your Drone.</h2>
          <p className="text-lg text-sky-gray mt-4 mb-12">Engineered for every mission. Ready for deployment.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ShopCard key={product.id} product={product} />
            ))}
          </div>
           <a href="#shop" onClick={handleNavigate} className="inline-block mt-12 px-8 py-3 bg-sky-light text-sky-dark rounded-full font-bold hover:bg-opacity-80 transition-all hover:shadow-[0_0_20px_theme(colors.sky-light)]">
                View Entire Fleet
            </a>
        </div>
      </section>

      {/* --- START: Content moved from Home.tsx --- */}
      <section className="py-20 lg:py-28 bg-sky-surface animated-section-home stats-section">
          <div className="max-w-7xl mx-auto px-8">
              <div className="grid md:grid-cols-3 gap-12 text-center">
                  <div className="flex flex-col items-center">
                      <ion-icon name="rocket-outline" className="text-5xl text-sky-blue mb-3"></ion-icon>
                      <h3 data-target="10+" className="stat-number text-4xl font-bold w-24">10+</h3>
                      <p className="text-sky-gray">Years of Innovation</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <ion-icon name="globe-outline" className="text-5xl text-sky-blue mb-3"></ion-icon>
                      <h3 data-target="50000+" className="stat-number text-4xl font-bold w-36">50,000+</h3>
                      <p className="text-sky-gray">Units Deployed Globally</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <ion-icon name="shield-checkmark-outline" className="text-5xl text-sky-blue mb-3"></ion-icon>
                      <h3 data-target="99.8%" className="stat-number text-4xl font-bold w-28">99.8%</h3>
                      <p className="text-sky-gray">Mission Success Rate</p>
                  </div>
              </div>
          </div>
      </section>

      <section className="py-20 lg:py-28 bg-sky-dark animated-section-home">
          <div className="max-w-7xl mx-auto px-8">
               <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Engineered for the Demanding</h2>
                  <p className="text-lg text-sky-gray mt-4 max-w-2xl mx-auto">Every component is meticulously designed for performance, reliability, and unparalleled image quality.</p>
              </div>
              <ImageSlider images={sliderImages} />
          </div>
      </section>
      {/* --- END: Content moved from Home.tsx --- */}
    </div>
  );
});

Overlay.displayName = 'Overlay';
