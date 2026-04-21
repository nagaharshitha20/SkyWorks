import React, { useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';
import { CartContext } from '../context/CartContext';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'showcase' | 'horizontal'>('showcase');

  useEffect(() => {
    window.scrollTo(0, 0);
    setAdded(false);
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => {
      window.location.hash = '#cart';
    }, 500);
  };

  const navigateBack = () => {
    const previous = window.history.state;
    if (previous) {
       window.history.back();
    } else {
       window.location.hash = '#shop';
    }
  };

  const renderHorizontal = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 animate-fade-in-up">
        {/* --- TOP HORIZONTAL SECTION --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">
          {/* Left: Cinematic Image Container */}
          <div className="lg:w-1/2 flex-shrink-0 relative group perspective-1000">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#00ffcc]/20 to-[#3b82f6]/20 blur-[80px] rounded-full group-hover:blur-[100px] group-hover:from-[#00ffcc]/30 transition-all duration-700 pointer-events-none"></div>
             <div className="relative rounded-[2.5rem] p-1 bg-gradient-to-br from-white/10 via-transparent to-[#00ffcc]/30 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transform transition-transform duration-700 ease-out group-hover:scale-[1.02]">
               <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-[2.4rem] overflow-hidden bg-[#02050a]">
                  <img src={product.imgSrc} alt={product.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-transparent to-transparent opacity-80 pointer-events-none"></div>
               </div>
             </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:w-1/2 flex flex-col justify-center relative">
            <div className="absolute -left-10 h-full w-[1px] bg-gradient-to-b from-transparent via-[#00ffcc]/20 to-transparent hidden lg:block"></div>
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 w-fit h-fit">
               <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse"></span>
               <span className="text-[10px] font-bold tracking-widest text-[#00ffcc] uppercase">Enterprise Series</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-2xl text-white">{product.name}</h1>
            <p className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 font-light mb-8 max-w-xl leading-relaxed">{product.tagline}</p>
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-10 font-medium">{product.longDescription}</p>

            <div className="mt-auto bg-gradient-to-br from-[#0a111a] to-[#04080e] p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#00ffcc_50%,transparent_100%)] animate-[spin_6s_linear_infinite] opacity-10 group-hover:opacity-30 transition-opacity duration-500"></div>
               <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                 <div>
                   <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase block mb-1">System Price</span>
                   <p className="text-3xl font-black text-white">{product.price}</p>
                 </div>
                 <button onClick={handleAddToCart} className={`relative px-8 py-4 rounded-full font-black uppercase text-sm tracking-widest transition-all duration-300 w-full sm:w-auto overflow-hidden ${added ? 'bg-green-500 text-black shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'bg-[#00ffcc] text-black hover:scale-105 shadow-[0_0_30px_rgba(0,255,204,0.3)] hover:shadow-[0_0_50px_rgba(0,255,204,0.6)]'}`}>
                   <span className="relative z-10">{added ? 'Project Added ✓' : 'Add to Setup'}</span>
                   {!added && <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full hover:animate-[shimmer_1s_forwards]"></div>}
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM GRID SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#050910] rounded-[2.5rem] border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ffcc]/5 blur-[50px] rounded-full"></div>
            <h2 className="text-2xl font-extrabold mb-8 text-white flex items-center gap-3"><ion-icon name="color-wand-outline" class="text-[#00ffcc] text-3xl"></ion-icon>Architecture & Features</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {product.features.map((feature, index) => (
                <div key={index} className="group">
                  <div className="h-1 w-12 bg-[#00ffcc]/30 rounded-full mb-4 group-hover:bg-[#00ffcc] group-hover:w-20 transition-all duration-500"></div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#050910] rounded-[2.5rem] border border-[#00ffcc]/10 p-8 md:p-12 shadow-[0_0_40px_rgba(0,255,204,0.05)] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-full h-[50%] bg-gradient-to-t from-[#00ffcc]/5 to-transparent pointer-events-none"></div>
            <h2 className="text-2xl font-extrabold mb-8 text-white flex items-center gap-3"><ion-icon name="cube-outline" class="text-[#00ffcc] text-3xl"></ion-icon>Deployment Kit</h2>
            <ul className="space-y-4 relative z-10">
              {product.inTheBox.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 flex items-center justify-center mt-0.5"><ion-icon name="checkmark" class="text-[#00ffcc] text-xs"></ion-icon></span>
                  <span className="text-gray-300 text-sm font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 bg-gradient-to-br from-[#0a111a] to-[#04080e] rounded-[2.5rem] border border-white/5 p-8 md:p-12 shadow-2xl focus-within:border-[#00ffcc]/30 transition-colors duration-500">
            <h2 className="text-2xl font-extrabold mb-8 text-white flex items-center gap-3"><ion-icon name="hardware-chip-outline" class="text-[#00ffcc] text-3xl"></ion-icon>Technical Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {product.specs.map((spec, index) => (
                <div key={index} className="flex justify-between items-center bg-white/5 border border-white/5 hover:border-[#00ffcc]/40 p-4 rounded-2xl transition-all duration-300 group hover:bg-white/10 hover:-translate-y-1">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">{spec.key}</span>
                  <span className="font-extrabold text-white text-sm text-right group-hover:text-[#00ffcc] transition-colors">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );

  const renderShowcase = () => (
    <div className="w-full relative mt-16 animate-fade-in-up pb-32">
      
      {/* 1. HERO SHOWCASE */}
      <div className="max-w-6xl mx-auto px-4 relative flex flex-col items-center">
         
         <div className="text-center w-full mb-10 z-20">
           <span className="inline-block border-b-2 border-gray-500 text-gray-300 font-bold tracking-[0.2em] uppercase pb-2 px-2 text-sm">
             {product.name}
           </span>
         </div>

         {/* Grid to replicate the floating side text exactly */}
         <div className="relative w-full max-w-5xl flex flex-col md:flex-row justify-between items-center mb-16">
            
            {/* Left Metrics */}
            <div className="hidden md:flex flex-col justify-center gap-16 w-1/4 text-left z-20">
               <div>
                  <h3 className="text-2xl font-extrabold leading-tight">{product.highlights[0]?.title}</h3>
                  <p className="text-gray-400 font-medium">{product.highlights[0]?.subtitle}</p>
               </div>
               <div>
                  <h3 className="text-2xl font-extrabold leading-tight">{product.highlights[1]?.title}</h3>
                  <p className="text-gray-400 font-medium">{product.highlights[1]?.subtitle}</p>
               </div>
            </div>

            {/* Centered Image */}
            <div className="w-full md:w-2/3 h-[400px] sm:h-[500px] flex justify-center relative z-10 perspective-1000">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-[#3b82f6]/20 blur-[120px] rounded-full pointer-events-none"></div>
               <img src={product.imgSrc} alt={product.name} className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] filter contrast-125 hover:scale-105 transition-transform duration-700 ease-out" />
            </div>

            {/* Right Metrics */}
            <div className="hidden md:flex flex-col justify-center items-end gap-16 w-1/4 text-right z-20">
               <div>
                  <h3 className="text-2xl font-extrabold leading-tight">{product.highlights[2]?.title}</h3>
                  <p className="text-gray-400 font-medium">{product.highlights[2]?.subtitle}</p>
               </div>
               <div>
                  <h3 className="text-2xl font-extrabold leading-tight">{product.highlights[3]?.title}</h3>
                  <p className="text-gray-400 font-medium">{product.highlights[3]?.subtitle}</p>
               </div>
            </div>

            {/* Mobile Metrics fallback (displays under image on small screens) */}
            <div className="flex md:hidden grid-cols-2 gap-6 mt-8 w-full text-center">
               <div className="w-1/2">
                  <h3 className="text-xl font-extrabold">{product.highlights[0]?.title}</h3>
                  <p className="text-gray-400 text-sm">{product.highlights[0]?.subtitle}</p>
               </div>
               <div className="w-1/2">
                  <h3 className="text-xl font-extrabold">{product.highlights[3]?.title}</h3>
                  <p className="text-gray-400 text-sm">{product.highlights[3]?.subtitle}</p>
               </div>
            </div>
         </div>

         {/* Centered Quote & CTA Area */}
         <div className="text-center max-w-3xl mx-auto z-20 mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.2]">
               "{product.tagline}"
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
               Advanced aerial technology built for professionals. {product.longDescription.slice(0, 100)}...
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
               <button onClick={handleAddToCart} className="w-full sm:w-auto px-8 py-3 bg-[#1e40af] hover:bg-[#2563eb] border border-[#3b82f6] shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white font-bold rounded text-sm transition-all duration-300">
                 {added ? 'Added ✓' : 'Buy Now'}
               </button>
               <button className="w-full sm:w-auto px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 font-medium rounded text-sm transition-all duration-300 flex items-center justify-center gap-2">
                 Watch Demo <ion-icon name="play-circle"></ion-icon>
               </button>
            </div>
         </div>
      </div>

      {/* 2. POWERFUL FEATURES SECTION */}
      <div className="w-full py-20 relative">
         <div className="text-center max-w-2xl mx-auto mb-16 px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Powerful Feature Built For Professional.</h2>
         </div>
         
         <div className="max-w-7xl mx-auto px-4 relative flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* Left Box Column */}
            <div className="flex flex-col gap-10 w-full md:w-1/3 z-20">
               <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 shadow-xl relative hover:border-[#3b82f6]/50 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <ion-icon name={product.features[0]?.icon || 'star'} class="text-gray-400"></ion-icon> 
                    {product.features[0]?.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{product.features[0]?.description}</p>
               </div>
               <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 shadow-xl relative hover:border-[#3b82f6]/50 transition-colors ml-0 md:ml-12">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <ion-icon name={product.features[2]?.icon || 'star'} class="text-gray-400"></ion-icon> 
                    {product.features[2]?.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{product.features[2]?.description}</p>
               </div>
            </div>

            {/* Center Secondary Image */}
            <div className="w-full md:w-1/3 h-[300px] flex justify-center items-center z-10 perspective-1000 md:-translate-y-10">
               <img src={product.imgSrc} alt="Feature View" className="w-[80%] md:w-[130%] max-w-none h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transform md:-rotate-12 hover:rotate-0 transition-transform duration-700" />
            </div>

            {/* Right Box Column */}
            <div className="flex flex-col gap-10 w-full md:w-1/3 z-20 text-left md:text-right">
               <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 shadow-xl relative hover:border-[#3b82f6]/50 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 md:justify-end">
                    <ion-icon name={product.features[1]?.icon || 'star'} class="text-green-500"></ion-icon> 
                    {product.features[1]?.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{product.features[1]?.description}</p>
               </div>
               <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 shadow-xl relative hover:border-[#3b82f6]/50 transition-colors mr-0 md:mr-12">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 md:justify-end">
                    <ion-icon name={product.features[3]?.icon || 'star'} class="text-red-400"></ion-icon> 
                    {product.features[3]?.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{product.features[3]?.description}</p>
               </div>
            </div>
            
         </div>
      </div>

       {/* 3. CENTERED TECHNICAL SPECS */}
       <div className="text-center max-w-5xl mx-auto pt-20 px-4 border-t border-white/5">
          <h2 className="text-3xl font-extrabold tracking-tight mb-16">Technical Specifications For Drone</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 text-center pb-20">
              {product.specs.map((spec, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <span className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">{spec.key}</span>
                  <span className="font-bold text-white text-lg group-hover:text-gray-300 transition-colors">{spec.value}</span>
                </div>
              ))}
            </div>
       </div>

    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-white selection:bg-[#3b82f6] selection:text-black font-sans relative overflow-hidden">
      
      {/* Background Decorators */}
      {layoutMode === 'horizontal' && (
         <>
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00ffcc]/10 via-[#03070c]/0 to-transparent pointer-events-none"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-10 pointer-events-none"></div>
         </>
      )}
      {layoutMode === 'showcase' && (
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e3a8a]/20 via-transparent to-transparent pointer-events-none"></div>
      )}

      {/* Top Header / View Toggle Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50 pt-24 md:pt-32 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5 pb-6">
        
        <button onClick={navigateBack} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-bold text-xs uppercase tracking-widest bg-transparent">
           <ion-icon name="arrow-back-outline" class="text-base"></ion-icon> Return
        </button>

        {/* Layout Toggle Pill */}
        <div className="flex bg-[#0f172a] p-1 rounded-full border border-white/10 shadow-lg">
           <button 
             onClick={() => setLayoutMode('showcase')}
             className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${layoutMode === 'showcase' ? 'bg-[#1e40af] text-white shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
           >
             Showcase View
           </button>
           <button 
             onClick={() => setLayoutMode('horizontal')}
             className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${layoutMode === 'horizontal' ? 'bg-[#1e40af] text-white shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
           >
             Horizontal View
           </button>
        </div>
      </div>

      {/* Render Active Layout */}
      {layoutMode === 'horizontal' ? renderHorizontal() : renderShowcase()}

    </div>
  );
};

export default ProductDetail;
