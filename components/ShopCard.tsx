import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../data/products';

interface ShopCardProps {
    product: Product;
}

const CATEGORY_COLORS: Record<string, string> = {
    Delivery:     '#2563eb',
    Surveillance: '#7c3aed',
    Agriculture:  '#16a34a',
    Mapping:      '#ea580c',
};

function StarRating({ rating }: { rating: number }) {
    const full = Math.floor(rating);
    const hasHalf = rating - full >= 0.5;
    return (
        <div className="flex items-center gap-0.5" aria-label={`${rating} stars`}>
            {[1, 2, 3, 4, 5].map(i => (
                <span
                    key={i}
                    style={{
                        fontSize: '11px',
                        color: i <= full || (i === full + 1 && hasHalf) ? '#FFD600' : '#E5E7EB',
                    }}
                >★</span>
            ))}
        </div>
    );
}

export const ShopCard: React.FC<ShopCardProps> = ({ product }) => {
    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const h = e.currentTarget.getAttribute('href');
        if (h) window.location.hash = h;
    };

    const accentColor = CATEGORY_COLORS[product.category] || '#FFD600';

    return (
        <motion.div
            className="group relative flex flex-col bg-white border border-gray-border rounded-[4px] overflow-hidden cursor-pointer"
            whileHover={{
                y: -6,
                boxShadow: '0 20px 50px rgba(0,0,0,0.10)',
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
            }}
            style={{ willChange: 'transform' }}
        >
            {/* Top yellow accent bar */}
            <div className="h-[3px] bg-yellow w-full flex-shrink-0" />

            {/* ── Image — compact by default, enlarges on hover ── */}
            <a
                href={`#shop/${product.id}`}
                onClick={handleNavigate}
                className="relative block overflow-hidden bg-[#F7F7F7] flex-shrink-0 cursor-pointer"
                style={{ height: '180px' }}
            >
                {/* Category badge */}
                <div
                    className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest text-white"
                    style={{ backgroundColor: accentColor }}
                >
                    {product.category}
                </div>

                {/* Dark overlay (intensifies on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none group-hover:from-black/40 transition-all duration-500" />

                {/* Image — only scales on hover */}
                <img
                    src={product.imgSrc}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* HUD corner brackets — appear on hover */}
                {['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r',
                  'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'].map((cls, i) => (
                    <div
                        key={i}
                        className={`absolute w-3 h-3 z-20 pointer-events-none border-yellow/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${cls}`}
                    />
                ))}
            </a>

            {/* ── Content ── */}
            <div className="flex flex-col flex-grow p-5">

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2.5">
                    <StarRating rating={product.rating} />
                    <span className="text-[11px] font-bold text-black">{product.rating.toFixed(1)}</span>
                    <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
                </div>

                {/* Name */}
                <a
                    href={`#shop/${product.id}`}
                    onClick={handleNavigate}
                    className="cursor-pointer"
                >
                    <h3 className="text-base sm:text-lg font-condensed font-extrabold text-black uppercase mb-1 leading-tight group-hover:text-yellow transition-colors duration-200">
                        {product.name}
                    </h3>
                </a>

                {/* Tagline */}
                <p className="text-gray-mid text-xs leading-relaxed mb-4 flex-grow line-clamp-2">
                    {product.tagline}
                </p>

                {/* Spec chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.shortSpecs.map((spec, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-1 px-2 py-0.5 bg-[#F7F7F7] border border-gray-border rounded-sm"
                        >
                            <ion-icon name={spec.icon} class="text-yellow" style={{ fontSize: '10px' }} />
                            <span className="text-[9px] font-bold text-gray-mid uppercase tracking-wide">{spec.label}:</span>
                            <span className="text-[9px] font-extrabold text-black">{spec.value}</span>
                        </div>
                    ))}
                </div>

                {/* Divider + price */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-border mb-4">
                    <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Price</span>
                        <span className="font-condensed font-extrabold text-black text-sm">{product.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-green-600 uppercase tracking-wide">
                        <ion-icon name="checkmark-circle-outline" class="text-xs" />
                        Available
                    </div>
                </div>

                {/* Single CTA */}
                <a
                    href={`#shop/${product.id}`}
                    onClick={handleNavigate}
                    className="btn-primary w-full text-center cursor-pointer text-[11px]"
                    style={{ padding: '10px 16px' }}
                >
                    View & Buy
                </a>
            </div>
        </motion.div>
    );
};