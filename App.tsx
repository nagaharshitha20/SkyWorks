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
import Technology from './pages/Technology';
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
    const handleHashChange = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0);
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
        return <PageWrapper routeKey="#missions"><Shop /></PageWrapper>;

      case '#cart':
        return <PageWrapper routeKey="#cart"><Cart /></PageWrapper>;

      case '#about':
      case '#innovation':
        return <PageWrapper routeKey="#about"><About /></PageWrapper>;

      case '#technology':
        return <PageWrapper routeKey="#technology"><Technology /></PageWrapper>;

      case '#contact':
        return <PageWrapper routeKey="#contact"><Contact /></PageWrapper>;

      // Media / portfolio — scroll the homepage portfolio section
      case '#media':
        window.location.hash = '#/';
        return <PageWrapper routeKey="#/"><Home introFinished={introFinished} /></PageWrapper>;

      // Careers placeholder
      case '#careers':
        return (
          <PageWrapper routeKey="#careers">
            <div className="min-h-screen bg-[#03070c] text-white flex items-center justify-center flex-col gap-6">
              <h1 className="text-5xl font-black tracking-tighter">
                Careers <span className="text-[#00ffcc]">Coming Soon</span>
              </h1>
              <p className="text-gray-400 text-lg">We're building our team. Check back soon.</p>
            </div>
          </PageWrapper>
        );

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
        className={`w-full min-h-screen flex flex-col bg-[#03070c] selection:bg-[#00ffcc] selection:text-black ${!introFinished ? 'overflow-hidden h-screen' : ''}`}
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
