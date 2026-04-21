import React from 'react';
import { products } from '../data/products';
import { ShopCard } from './ShopCard';

const Shop: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#03070c] text-white pt-32 pb-24 relative overflow-hidden font-sans antialiased">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00ffcc]/10 via-[#03070c]/0 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 relative">
           <span className="text-[#00ffcc] font-bold tracking-widest uppercase text-xs mb-3 block animate-pulse">Our Fleet</span>
           <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-2xl">Discover Drone Solutions</h1>
           <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">Mastering the skies with platforms designed for high performance, uncompromising reliability, and true scalability.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ShopCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Shop;
