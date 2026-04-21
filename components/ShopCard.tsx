import React from 'react';
import { Product } from '../data/products';

interface ShopCardProps {
    product: Product;
}

export const ShopCard: React.FC<ShopCardProps> = ({ product }) => {
    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetHash = e.currentTarget.getAttribute('href');
        if (targetHash) {
            window.location.hash = targetHash;
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#0a111a] to-[#04080e] rounded-[1.5rem] overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(0,255,204,0.1)] flex flex-col relative border border-white/5 h-full">
           {/* subtle inner neon border on hover */}
           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem] ring-1 ring-inset ring-[#00ffcc]/30 z-30"></div>
           
           <a href={`#shop/${product.id}`} onClick={handleNavigate} className="h-56 overflow-hidden relative block z-20 cursor-pointer">
             <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10"></div>
             <img src={product.imgSrc} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
           </a>
           
           <div className="p-6 flex flex-col flex-grow bg-transparent z-20">
             <div className="flex flex-col items-center mb-4 text-center">
               <span className="text-[9px] font-black text-[#00ffcc] tracking-[0.2em] uppercase bg-[#00ffcc]/5 border border-[#00ffcc]/20 px-3 py-1 rounded-full mb-3 shadow-[0_0_10px_rgba(0,255,204,0.1)]">Advanced Platform</span>
               <h3 className="text-2xl font-bold text-white">{product.name}</h3>
             </div>
             <p className="text-gray-400 text-sm mb-6 flex-grow text-center font-medium leading-relaxed">{product.tagline}</p>
             <p className="text-center font-black text-white text-lg mb-4">{product.price}</p>
             
             <a href={`#shop/${product.id}`} onClick={handleNavigate} className="inline-flex justify-center items-center w-full px-5 py-3 bg-white/5 border border-white/10 text-white rounded-lg text-sm font-bold hover:bg-[#00ffcc] hover:text-black transition-all duration-300 focus:outline-none shadow-sm shadow-[#00ffcc]/5 group-hover:shadow-[#00ffcc]/20 cursor-pointer mt-auto tracking-wide">
               Configure & Buy
             </a>
           </div>
        </div>
    );
};