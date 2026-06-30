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
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* --- TOP HORIZONTAL SECTION --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24 items-center">
          {/* Left: Cinematic Image Container */}
          <div className="lg:w-1/2 flex-shrink-0 relative group perspective-1000 w-full flex justify-center">
             <div className="absolute inset-0 bg-yellow-light/20 blur-[80px] rounded-full pointer-events-none"></div>
             <div className="relative rounded-[4px] border border-gray-border p-4 bg-gray-light shadow-sm w-full max-w-[500px]">
                <div className="relative h-[300px] sm:h-[400px] rounded-[2px] overflow-hidden bg-white flex items-center justify-center">
                   <img src={product.imgSrc} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
             </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:w-1/2 flex flex-col justify-center relative w-full">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-[2px] bg-yellow text-black mb-6 w-fit">
               <span className="text-[10px] font-bold tracking-widest uppercase">Enterprise Series</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-condensed font-extrabold mb-4 tracking-tight text-black uppercase">{product.name}</h1>
            <p className="text-xl sm:text-2xl text-yellow font-condensed font-extrabold mb-8 uppercase">{product.tagline}</p>
            <p className="text-gray-mid text-base leading-relaxed mb-10 font-normal">{product.longDescription}</p>

            <div className="bg-white p-8 rounded-[4px] border border-gray-border shadow-sm relative overflow-hidden group">
               <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                 <div>
                   <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-1">System Price</span>
                   <p className="text-3xl font-condensed font-extrabold text-black">{product.price}</p>
                 </div>
                 <button onClick={handleAddToCart} className="btn-primary w-full sm:w-auto text-center cursor-pointer">
                   {added ? 'Project Added ✓' : 'Add to Setup'}
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM GRID SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[4px] border border-gray-border p-8 md:p-12 shadow-sm relative overflow-hidden">
            <h2 className="text-2xl font-condensed font-extrabold mb-8 text-black flex items-center gap-3"><ion-icon name="color-wand-outline" class="text-yellow text-3xl"></ion-icon>Architecture & Features</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {product.features.map((feature, index) => (
                <div key={index} className="group">
                  <div className="h-1 w-12 bg-yellow rounded-full mb-4 transition-all duration-500"></div>
                  <h3 className="text-lg font-bold text-black mb-2">{feature.title}</h3>
                  <p className="text-gray-mid leading-relaxed text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[4px] border border-gray-border border-t-[3px] border-yellow p-8 md:p-12 shadow-sm relative overflow-hidden">
            <h2 className="text-2xl font-condensed font-extrabold mb-8 text-black flex items-center gap-3"><ion-icon name="cube-outline" class="text-yellow text-3xl"></ion-icon>Deployment Kit</h2>
            <ul className="space-y-4 relative z-10">
              {product.inTheBox.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-light border border-yellow flex items-center justify-center mt-0.5"><ion-icon name="checkmark" class="text-black text-xs"></ion-icon></span>
                  <span className="text-gray-mid text-sm font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 bg-gray-light rounded-[4px] border border-gray-border p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-condensed font-extrabold mb-8 text-black flex items-center gap-3"><ion-icon name="hardware-chip-outline" class="text-yellow text-3xl"></ion-icon>Technical Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {product.specs.map((spec, index) => (
                <div key={index} className="flex justify-between items-center bg-white border border-gray-border hover:border-yellow p-4 rounded-[4px] transition-all duration-300 group hover:-translate-y-1">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">{spec.key}</span>
                  <span className="font-condensed font-extrabold text-black text-sm text-right group-hover:text-yellow transition-colors">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );

  const renderShowcase = () => (
    <div className="w-full relative mt-16 pb-32">
      
      {/* 1. HERO SHOWCASE */}
      <div className="max-w-[1200px] mx-auto px-4 relative flex flex-col items-center">
         
         <div className="text-center w-full mb-10 z-20">
           <span className="inline-block border-b-2 border-yellow text-yellow font-bold tracking-[0.2em] uppercase pb-2 px-2 text-sm">
             {product.name}
           </span>
         </div>

         {/* Grid to replicate the floating side text */}
         <div className="relative w-full max-w-5xl flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            
            {/* Left Metrics */}
            <div className="hidden md:flex flex-col justify-center gap-16 w-1/4 text-left z-20">
               <div>
                  <h3 className="text-2xl font-condensed font-extrabold leading-tight text-black">{product.highlights[0]?.title}</h3>
                  <p className="text-gray-mid font-medium">{product.highlights[0]?.subtitle}</p>
               </div>
               <div>
                  <h3 className="text-2xl font-condensed font-extrabold leading-tight text-black">{product.highlights[1]?.title}</h3>
                  <p className="text-gray-mid font-medium">{product.highlights[1]?.subtitle}</p>
               </div>
            </div>

            {/* Centered Image */}
            <div className="w-full md:w-2/3 h-[400px] sm:h-[500px] flex justify-center relative z-10 perspective-1000">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-yellow-light/20 blur-[120px] rounded-full pointer-events-none"></div>
               <img src={product.imgSrc} alt={product.name} className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] filter contrast-125 hover:scale-105 transition-transform duration-700 ease-out" />
            </div>

            {/* Right Metrics */}
            <div className="hidden md:flex flex-col justify-center items-end gap-16 w-1/4 text-right z-20">
               <div>
                  <h3 className="text-2xl font-condensed font-extrabold leading-tight text-black">{product.highlights[2]?.title}</h3>
                  <p className="text-gray-mid font-medium">{product.highlights[2]?.subtitle}</p>
               </div>
               <div>
                  <h3 className="text-2xl font-condensed font-extrabold leading-tight text-black">{product.highlights[3]?.title}</h3>
                  <p className="text-gray-mid font-medium">{product.highlights[3]?.subtitle}</p>
               </div>
            </div>

            {/* Mobile Metrics fallback */}
            <div className="grid md:hidden grid-cols-2 gap-6 mt-8 w-full text-center">
               <div>
                  <h3 className="text-xl font-condensed font-extrabold text-black">{product.highlights[0]?.title}</h3>
                  <p className="text-gray-mid text-sm">{product.highlights[0]?.subtitle}</p>
               </div>
               <div>
                  <h3 className="text-xl font-condensed font-extrabold text-black">{product.highlights[1]?.title}</h3>
                  <p className="text-gray-mid text-sm">{product.highlights[1]?.subtitle}</p>
               </div>
               <div>
                  <h3 className="text-xl font-condensed font-extrabold text-black">{product.highlights[2]?.title}</h3>
                  <p className="text-gray-mid text-sm">{product.highlights[2]?.subtitle}</p>
               </div>
               <div>
                  <h3 className="text-xl font-condensed font-extrabold text-black">{product.highlights[3]?.title}</h3>
                  <p className="text-gray-mid text-sm">{product.highlights[3]?.subtitle}</p>
               </div>
            </div>
         </div>

         {/* Centered Quote & CTA Area */}
         <div className="text-center max-w-3xl mx-auto z-20 mb-24 px-4">
            <h2 className="text-3xl md:text-5xl font-condensed font-extrabold mb-6 tracking-tight leading-[1.2] text-black uppercase">
               "{product.tagline}"
            </h2>
            <p className="text-gray-mid text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed font-normal">
               Advanced aerial technology built for professionals. {product.longDescription.slice(0, 100)}...
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
               <button onClick={handleAddToCart} className="btn-primary w-full sm:w-auto text-center cursor-pointer">
                 {added ? 'Added ✓' : 'Buy Now'}
               </button>
               <button className="btn-secondary w-full sm:w-auto text-center cursor-pointer flex items-center justify-center gap-2">
                 Watch Demo <ion-icon name="play-circle" class="text-lg"></ion-icon>
               </button>
            </div>
         </div>
      </div>

      {/* 2. POWERFUL FEATURES SECTION */}
      <div className="w-full py-20 relative bg-gray-light border-y border-gray-border">
         <div className="text-center max-w-2xl mx-auto mb-16 px-4">
            <h2 className="text-3xl md:text-4xl font-condensed font-extrabold tracking-tight text-black uppercase">Powerful Features Built For Professionals</h2>
            <div className="underline-accent mx-auto" />
         </div>
         
         <div className="max-w-[1200px] mx-auto px-4 relative flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* Left Box Column */}
            <div className="flex flex-col gap-10 w-full md:w-1/3 z-20">
               <div className="card-light shadow-sm">
                  <h3 className="text-lg font-bold text-black mb-2 flex items-center gap-2">
                    <ion-icon name={product.features[0]?.icon || 'star'} class="text-yellow"></ion-icon> 
                    {product.features[0]?.title}
                  </h3>
                  <p className="text-xs text-gray-mid leading-relaxed">{product.features[0]?.description}</p>
               </div>
               <div className="card-light shadow-sm ml-0 md:ml-12">
                  <h3 className="text-lg font-bold text-black mb-2 flex items-center gap-2">
                    <ion-icon name={product.features[2]?.icon || 'star'} class="text-yellow"></ion-icon> 
                    {product.features[2]?.title}
                  </h3>
                  <p className="text-xs text-gray-mid leading-relaxed">{product.features[2]?.description}</p>
               </div>
            </div>

            {/* Center Secondary Image */}
            <div className="w-full md:w-1/3 h-[300px] flex justify-center items-center z-10 perspective-1000 md:-translate-y-10">
               <img src={product.imgSrc} alt="Feature View" className="w-[80%] md:w-[130%] max-w-none h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] transform md:-rotate-12 hover:rotate-0 transition-transform duration-700" />
            </div>

            {/* Right Box Column */}
            <div className="flex flex-col gap-10 w-full md:w-1/3 z-20 text-left md:text-right">
               <div className="card-light shadow-sm">
                  <h3 className="text-lg font-bold text-black mb-2 flex items-center gap-2 md:justify-end">
                    <ion-icon name={product.features[1]?.icon || 'star'} class="text-yellow"></ion-icon> 
                    {product.features[1]?.title}
                  </h3>
                  <p className="text-xs text-gray-mid leading-relaxed">{product.features[1]?.description}</p>
               </div>
               <div className="card-light shadow-sm mr-0 md:mr-12">
                  <h3 className="text-lg font-bold text-black mb-2 flex items-center gap-2 md:justify-end">
                    <ion-icon name={product.features[3]?.icon || 'star'} class="text-yellow"></ion-icon> 
                    {product.features[3]?.title}
                  </h3>
                  <p className="text-xs text-gray-mid leading-relaxed">{product.features[3]?.description}</p>
               </div>
            </div>
            
         </div>
      </div>

       {/* 3. CENTERED TECHNICAL SPECS */}
       <div className="text-center max-w-[1200px] mx-auto pt-20 px-4">
          <h2 className="text-3xl font-condensed font-extrabold tracking-tight mb-4 text-black uppercase">Technical Specifications For Drone</h2>
          <div className="underline-accent mx-auto mb-16" />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 text-center pb-20">
              {product.specs.map((spec, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <span className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">{spec.key}</span>
                  <span className="font-condensed font-extrabold text-black text-lg group-hover:text-yellow transition-colors">{spec.value}</span>
                </div>
              ))}
            </div>
       </div>

    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white text-gray-mid font-sans relative overflow-hidden">
      
      {/* Top Header / View Toggle Area */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-50 pt-24 md:pt-32 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-border pb-6">
        
        <button onClick={navigateBack} className="text-black hover:text-yellow transition-colors flex items-center gap-2 font-bold text-xs uppercase tracking-widest bg-transparent cursor-pointer border-none">
           <ion-icon name="arrow-back-outline" class="text-base"></ion-icon> Return
        </button>

        {/* Layout Toggle Pill */}
        <div className="flex bg-gray-light p-1 rounded-full border border-gray-border shadow-sm">
           <button 
             onClick={() => setLayoutMode('showcase')}
             className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${layoutMode === 'showcase' ? 'bg-yellow text-black font-bold shadow' : 'text-gray-mid hover:text-black'}`}
           >
             Showcase View
           </button>
           <button 
             onClick={() => setLayoutMode('horizontal')}
             className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${layoutMode === 'horizontal' ? 'bg-yellow text-black font-bold shadow' : 'text-gray-mid hover:text-black'}`}
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
