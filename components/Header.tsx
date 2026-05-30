import React, { useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'Home',       href: '#/'         },
  { label: 'Missions',   href: '#missions'  },
  { label: 'Technology', href: '#technology'},
  { label: 'Innovation', href: '#innovation'},
  { label: 'Media',      href: '#media'     },
  { label: 'Careers',    href: '#careers'   },
  { label: 'Contact',    href: '#contact'   },
];

export const Header: React.FC = () => {
  const { cart } = useContext(CartContext);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetHash = e.currentTarget.getAttribute('href');
    if (targetHash) {
      window.location.hash = targetHash;
      setMobileOpen(false);
    }
  };

  const isActive = (href: string) => {
    if (href === '#/') return currentHash === '' || currentHash === '#/';
    return currentHash.startsWith(href);
  };

  // Magnetic button effect
  const magnetRef = useRef<HTMLAnchorElement>(null);
  const handleMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = magnetRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };
  const resetMagnet = () => {
    if (magnetRef.current) magnetRef.current.style.transform = '';
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#03070c]/90 backdrop-blur-xl border-b border-[#00ffcc]/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          : 'py-4 bg-transparent'
      }`}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-8">
        {/* Logo */}
        <motion.a
          href="#/"
          onClick={handleNavigate}
          data-nav-logo
          className="text-2xl font-black tracking-tighter text-white relative group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          SKY<span className="text-[#00ffcc]">VISION</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] group-hover:w-full transition-all duration-500 ease-out" />
        </motion.a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center space-x-7">
          {NAV_LINKS.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i + 0.3, duration: 0.5 }}
            >
              <a
                href={link.href}
                onClick={handleNavigate}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${
                  isActive(link.href) ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#00ffcc] transition-all duration-400 ease-out ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center space-x-5">
          {/* Cart */}
          <motion.a
            href="#cart"
            onClick={handleNavigate}
            className="relative text-gray-400 hover:text-[#00ffcc] transition-colors group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ion-icon name="cart-outline" className="text-2xl"></ion-icon>
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-2 bg-[#00ffcc] text-black text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-[0_0_10px_#00ffcc]"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>

          {/* CTA — magnetic */}
          <motion.a
            ref={magnetRef}
            href="#contact"
            onClick={handleNavigate}
            onMouseMove={handleMagnet}
            onMouseLeave={resetMagnet}
            className="hidden sm:flex items-center px-5 py-2 bg-[#00ffcc]/10 border border-[#00ffcc]/60 text-[#00ffcc] rounded-full text-sm font-bold transition-all duration-300 hover:bg-[#00ffcc] hover:text-black hover:shadow-[0_0_24px_rgba(0,255,204,0.4)] hover:border-transparent"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <ion-icon name="rocket-outline" class="mr-1.5 text-sm"></ion-icon>
            Get Quote
          </motion.a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(v => !v)}
          >
            <ion-icon name={mobileOpen ? 'close' : 'menu'} class="text-2xl"></ion-icon>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden overflow-hidden bg-[#03070c]/95 backdrop-blur-xl border-t border-white/5"
          >
            <ul className="flex flex-col px-6 py-6 space-y-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                >
                  <a
                    href={link.href}
                    onClick={handleNavigate}
                    className={`text-lg font-semibold tracking-wide transition-colors ${
                      isActive(link.href) ? 'text-[#00ffcc]' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
