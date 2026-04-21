import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const Header: React.FC = () => {
  const { cart } = useContext(CartContext);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetHash = e.currentTarget.getAttribute('href');
    if (targetHash) {
      window.location.hash = targetHash;
    }
  };

  const currentHash = window.location.hash;

  const navLinkClasses = "text-sky-gray hover:text-[#00ffcc] transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#00ffcc] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 font-medium";
  const activeNavLinkClasses = "text-[#00ffcc] font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#00ffcc] after:scale-x-100";

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 md:px-8 animate-fade-in bg-[#050505]/80 backdrop-blur-lg border-b border-[#00ffcc]/10">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <a href="#/" onClick={handleNavigate} className="text-2xl font-bold tracking-tighter text-white">
          SKY<span className="text-[#00ffcc]">VISION</span>
        </a>
        <ul className="hidden md:flex items-center space-x-8">
          <li><a href="#/" onClick={handleNavigate} className={currentHash === '' || currentHash === '#/' ? activeNavLinkClasses : navLinkClasses}>Home</a></li>
          <li><a href="#shop" onClick={handleNavigate} className={currentHash.startsWith('#shop') ? activeNavLinkClasses : navLinkClasses}>Products</a></li>
          <li><a href="#solutions" onClick={handleNavigate} className={currentHash.startsWith('#solutions') ? activeNavLinkClasses : navLinkClasses}>Solutions</a></li>
          <li><a href="#portfolio" onClick={handleNavigate} className={currentHash.startsWith('#portfolio') ? activeNavLinkClasses : navLinkClasses}>Portfolio</a></li>
          <li><a href="#about" onClick={handleNavigate} className={currentHash.startsWith('#about') ? activeNavLinkClasses : navLinkClasses}>About</a></li>
          <li><a href="#contact" onClick={handleNavigate} className={currentHash.startsWith('#contact') ? activeNavLinkClasses : navLinkClasses}>Contact</a></li>
        </ul>
        <div className="flex items-center space-x-6">
          <a href="#cart" onClick={handleNavigate} className={`relative text-sky-gray hover:text-[#00ffcc] transition-colors group`}>
            <ion-icon name="cart-outline" className="text-3xl"></ion-icon>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#00ffcc] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_#00ffcc]">
                {itemCount}
              </span>
            )}
          </a>
          <a href="#contact" onClick={handleNavigate} className="hidden sm:block px-6 py-2 bg-[#00ffcc]/10 border border-[#00ffcc] text-[#00ffcc] rounded-full transition-all duration-300 font-semibold hover:bg-[#00ffcc] hover:text-black hover:shadow-[0_0_20px_#00ffcc]">
            Get Quote
          </a>
        </div>
      </nav>
    </header>
  );
};
