import React, { useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'Home', href: '#/' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#missions' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Contact', href: '#contact' },
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

  const isHome = currentHash === '' || currentHash === '#/' || currentHash.startsWith('#home');
  const isDarkTheme = currentHash.startsWith('#blogs');
  const useWhiteText = isDarkTheme || (isHome && !scrolled);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-2 ${isHome && !scrolled
        ? 'bg-transparent border-transparent shadow-none'
        : isDarkTheme
          ? 'bg-[#0D0D0D] border-yellow shadow-[0_2px_15px_rgba(0,0,0,0.35)]'
          : 'bg-white/95 backdrop-blur-md border-yellow shadow-[0_2px_15px_rgba(0,0,0,0.05)]'
        } ${scrolled ? 'py-3' : 'py-4'}`}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.a
          href="#/"
          onClick={handleNavigate}
          data-nav-logo
          className={`text-2xl font-condensed font-extrabold tracking-tight relative group ${useWhiteText ? 'text-white' : 'text-black'
            }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          SKY<span className="text-yellow">VISION</span>
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
                className={`relative text-xs font-bold uppercase tracking-widest transition-colors duration-300 group ${isActive(link.href)
                  ? 'text-yellow'
                  : useWhiteText
                    ? 'text-white hover:text-yellow'
                    : 'text-black hover:text-yellow'
                  }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-yellow transition-all duration-400 ease-out ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
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
            className={`relative transition-colors group ${useWhiteText ? 'text-white hover:text-yellow' : 'text-black hover:text-yellow'
              }`}
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
                  className="absolute -top-1.5 -right-2 bg-yellow text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-[0_2px_8px_rgba(255,214,0,0.4)]"
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
            className="hidden sm:flex items-center gap-1.5 px-6 py-2.5 bg-yellow text-black text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:bg-yellow-hover"
            style={{ clipPath: 'polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <ion-icon name="rocket-outline" class="text-sm"></ion-icon>
            Get Quote
          </motion.a>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden transition-colors bg-transparent border-none ${useWhiteText ? 'text-white hover:text-yellow' : 'text-black hover:text-yellow'
              }`}
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`md:hidden overflow-hidden ${useWhiteText ? 'bg-[#0D0D0D] border-t border-gray-dark' : 'bg-white border-t border-gray-border'
              }`}
          >
            <ul className="flex flex-col px-6 py-6 space-y-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={handleNavigate}
                    className={`text-sm font-bold uppercase tracking-wider transition-colors block py-2 ${isActive(link.href)
                      ? 'text-yellow'
                      : useWhiteText
                        ? 'text-white hover:text-yellow'
                        : 'text-black hover:text-yellow'
                      }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.3 }}
                className={`pt-4 border-t ${useWhiteText ? 'border-gray-dark' : 'border-gray-border'}`}
              >
                <a
                  href="#contact"
                  onClick={handleNavigate}
                  className="w-full text-center block px-6 py-3 bg-yellow text-black text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:bg-yellow-hover"
                  style={{ clipPath: 'polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)' }}
                >
                  Get Quote
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
