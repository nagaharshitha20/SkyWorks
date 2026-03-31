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

  const navLinkClasses = "text-sky-gray hover:text-sky-light transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-sky-blue after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100";
  const activeNavLinkClasses = "text-sky-light font-medium";

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 md:px-8 animate-fade-in bg-sky-dark/80 backdrop-blur-lg border-b border-sky-light/10">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <a href="/#" onClick={handleNavigate} className="text-2xl font-bold tracking-tighter text-sky-light">
          SKYVISION
        </a>
        <ul className="hidden md:flex items-center space-x-8">
          <li><a href="#shop" onClick={handleNavigate} className={currentHash.startsWith('#shop') ? activeNavLinkClasses : navLinkClasses}>Shop</a></li>
          <li><a href="#technology" onClick={handleNavigate} className={currentHash.startsWith('#technology') ? activeNavLinkClasses : navLinkClasses}>Technology</a></li>
          <li><a href="#about" onClick={handleNavigate} className={currentHash.startsWith('#about') ? activeNavLinkClasses : navLinkClasses}>About</a></li>
          <li><a href="#careers" onClick={handleNavigate} className={currentHash.startsWith('#careers') ? activeNavLinkClasses : navLinkClasses}>Careers</a></li>
          <li><a href="#contact" onClick={handleNavigate} className={currentHash.startsWith('#contact') ? activeNavLinkClasses : navLinkClasses}>Contact</a></li>
        </ul>
        <div className="flex items-center space-x-4">
          <a href="#cart" onClick={handleNavigate} className={`relative text-sky-gray hover:text-sky-light transition-colors group`}>
            <ion-icon name="cart-outline" className="text-3xl"></ion-icon>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-sky-blue text-sky-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                {itemCount}
              </span>
            )}
          </a>
          <a href="#shop" onClick={handleNavigate} className="hidden sm:block px-5 py-2 border border-sky-light text-sky-light rounded-full hover:bg-sky-light hover:text-sky-dark transition-colors font-medium hover:shadow-[0_0_15px_rgba(0,191,255,0.6)]">
            Our Fleet
          </a>
        </div>
      </nav>
    </header>
  );
};