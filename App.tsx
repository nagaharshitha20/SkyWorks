import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './components/HomePage';
import CinematicIntro from './components/CinematicIntro';
import { Header } from './components/Header';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { Footer } from './components/Footer';
import { products } from './data/products';
import { CartProvider } from './context/CartContext';
import { pageVariants } from './components/ui/motion';

// New Pages
import About from './pages/About';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';

// Wrapper that applies cinematic page transition
const PageWrapper: React.FC<{ routeKey: string; children: React.ReactNode }> = ({ routeKey, children }) => (
  <motion.div
    key={routeKey}
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
);

const LegalPage: React.FC<{ type: string }> = ({ type }) => {
  const title = type === '#privacy' ? 'Privacy Policy' : type === '#terms' ? 'Terms of Service' : 'Patents & Certifications';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  return (
    <div className="min-h-[60vh] flex-grow bg-white text-gray-mid pt-32 pb-24 px-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-condensed font-extrabold text-black mb-6 uppercase">{title}</h1>
      <div className="underline-accent mb-8" />
      <div className="space-y-6 text-sm leading-relaxed font-normal">
        <p>Last updated: June 13, 2026</p>
        <p>Welcome to SkyVision. Your privacy and trust are paramount to us. This document outlines our standard operating terms, data handling procedures, and patent disclosures for our autonomous aerial fleet operations.</p>
        <h2 className="text-xl font-bold text-black mt-8 uppercase">1. Operational Compliance</h2>
        <p>All flight logs, telemetry, and payload sensor data collected during missions are encrypted end-to-end and stored locally on secure enterprise servers. We do not distribute flight path data to third-party entities without explicit written authorization.</p>
        <h2 className="text-xl font-bold text-black mt-8 uppercase">2. Intellectual Property & Patents</h2>
        <p>Our proprietary AI flight stack, neural mesh obstacle avoidance systems, and lightweight carbon-composite frames are protected under active international utility patents. Unauthorized duplication of drone schematics, firmware source code, or flight control systems is strictly prohibited.</p>
        <h2 className="text-xl font-bold text-black mt-8 uppercase">3. Limitation of Liability</h2>
        <p>SkyVision drone units must be operated by certified UAV pilots in compliance with local aviation regulations. SkyVision is not liable for any damages resulting from pilot error, severe weather interference, or unauthorized modifications to flight hardware.</p>
      </div>
    </div>
  );
};

const parseHash = (hash: string) => {
  let page = '#/';
  let sectionId = '';

  if (!hash || hash === '' || hash === '#/') {
    return { page: '#/', sectionId: '' };
  }

  // Product detail page
  if (hash.startsWith('#shop/') || hash.startsWith('#missions/')) {
    return { page: hash, sectionId: '' };
  }

  // Standard page routes
  const pages = ['#shop', '#missions', '#services', '#cart', '#about', '#innovation', '#blogs', '#contact', '#privacy', '#terms', '#patents'];
  
  // Check if the hash matches one of these pages exactly
  if (pages.includes(hash)) {
    return { page: hash, sectionId: '' };
  }

  // Check if the hash represents a section on the home page
  const homeSections = ['#home', '#about-snapshot', '#products', '#solutions', '#portfolio'];
  if (homeSections.includes(hash)) {
    return { page: '#/', sectionId: hash.substring(1) };
  }

  // Check if the hash represents a section on the about page
  const aboutSections = ['#faq', '#careers', '#press'];
  if (aboutSections.includes(hash)) {
    return { page: '#about', sectionId: hash.substring(1) };
  }

  // Check if the hash represents a section on the contact page
  const contactSections = ['#downloads'];
  if (contactSections.includes(hash)) {
    return { page: '#contact', sectionId: hash.substring(1) };
  }

  // Default to home
  return { page: '#/', sectionId: '' };
};

function App() {
  const initialHash = window.location.hash;
  const isHomeRoute = initialHash === '#/' || initialHash === '';
  const [route, setRoute] = useState(initialHash);

  // Skip intro if: not on home route, OR already played this session
  const alreadyPlayed = sessionStorage.getItem('skyworks_intro_played') === '1';
  const [introFinished, setIntroFinished] = useState(!isHomeRoute || alreadyPlayed);

  const handleIntroComplete = () => {
    sessionStorage.setItem('skyworks_intro_played', '1');
    setIntroFinished(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [route]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const { page, sectionId } = parseHash(hash);

      setRoute(page);

      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    if (route.startsWith('#missions/')) {
      const productId = route.split('/')[1];
      const product = products.find(p => p.id === productId);
      return product
        ? <PageWrapper routeKey={route}><ProductDetail product={product} /></PageWrapper>
        : <PageWrapper routeKey="#missions"><Shop /></PageWrapper>;
    }
    // Legacy product detail routes
    if (route.startsWith('#shop/')) {
      const productId = route.split('/')[1];
      const product = products.find(p => p.id === productId);
      return product
        ? <PageWrapper routeKey={route}><ProductDetail product={product} /></PageWrapper>
        : <PageWrapper routeKey="#missions"><Shop /></PageWrapper>;
    }

    switch (route) {
      case '#missions':
      case '#shop':
      case '#services':
        return <PageWrapper routeKey="#missions"><Shop /></PageWrapper>;

      case '#cart':
        return <PageWrapper routeKey="#cart"><Cart /></PageWrapper>;

      case '#about':
      case '#innovation':
        return <PageWrapper routeKey="#about"><About /></PageWrapper>;

      case '#blogs':
        return <PageWrapper routeKey="#blogs"><Blogs /></PageWrapper>;

      case '#contact':
        return <PageWrapper routeKey="#contact"><Contact /></PageWrapper>;

      case '#privacy':
      case '#terms':
      case '#patents':
        return <PageWrapper routeKey={route}><LegalPage type={route} /></PageWrapper>;

      case '#/':
      case '':
        return <PageWrapper routeKey="#/"><Home introFinished={introFinished} /></PageWrapper>;

      default:
        window.location.hash = '#/';
        return <PageWrapper routeKey="#/"><Home introFinished={introFinished} /></PageWrapper>;
    }
  };

  return (
    <CartProvider>
      {/*
        The intro sits at z-index 9999 above all content.
        The homepage is always rendered so the navbar logo position is
        available via getBoundingClientRect() during the fly phase.
        Scroll is locked via overflow-hidden while the intro is active.
      */}
      <div
        className={`w-full min-h-screen flex flex-col bg-white text-gray-mid ${!introFinished ? 'overflow-hidden h-screen' : ''}`}
      >
        {/* Intro overlay — renders above everything */}
        {!introFinished && (
          <CinematicIntro onComplete={handleIntroComplete} />
        )}

        {/* Homepage — always rendered so navbar logo is in the DOM for measurement */}
        <div className="flex flex-col flex-grow">
          <Header />
          <main className="flex-grow w-full">
            <AnimatePresence mode="wait">
              {renderPage()}
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
