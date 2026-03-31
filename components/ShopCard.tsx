import React, { useRef, MouseEvent, ReactNode, ElementType } from 'react';
import { Product } from '../data/products';

// New Component: AnimatedBorderCard
// Creates a dynamic, cursor-following glow effect on a card's border.
interface AnimatedBorderCardProps {
    children: ReactNode;
    className?: string;
    innerClassName?: string;
    as?: ElementType;
    [key: string]: any; // Pass through other props like href, onClick
}

const AnimatedBorderCard: React.FC<AnimatedBorderCardProps> = ({ children, className = '', innerClassName = '', as: Component = 'div', ...props }) => {
    const cardRef = useRef<HTMLElement>(null);

    // This function tracks the mouse position relative to the card and updates CSS variables.
    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <Component
            ref={cardRef}
            onMouseMove={handleMouseMove}
            // The main container. It has a general shadow on hover, and its child creates the dynamic glow.
            className={`group relative bg-transparent p-[2px] rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,191,255,0.3)] ${className}`}
            {...props}
        >
            {/* The glowing effect, controlled by CSS variables updated on mouse move. This is the "border". */}
            {/* Wide, diffuse glow */}
            <div 
                className="absolute inset-[-2px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                    background: `
                        radial-gradient(
                            350px circle at var(--mouse-x) var(--mouse-y),
                            rgba(0, 191, 255, 0.4),
                            transparent 70%
                        )
                    `
                }}
            />
             {/* Tighter, brighter glow for a neon core */}
             <div 
                className="absolute inset-[-2px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                    background: `
                        radial-gradient(
                            150px circle at var(--mouse-x) var(--mouse-y),
                            rgba(0, 191, 255, 0.6),
                            transparent 70%
                        )
                    `
                }}
            />
            {/* The actual content container, which sits on top of the glow effect. */}
            <div className={`relative bg-sky-surface w-full h-full rounded-[6px] z-10 ${innerClassName}`}>
                 {children}
            </div>
        </Component>
    );
};


// Updated ShopCard Component to use the new hover effect
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
        <AnimatedBorderCard 
            as="a"
            href={`#shop/${product.id}`} 
            onClick={handleNavigate} 
            className="flex flex-col" // Ensures the card fills its grid space properly
            innerClassName="p-6 flex flex-col items-center flex-grow" // Padding is now on the inner container
        >
            <div className="w-full h-48 rounded-md mb-4 overflow-hidden">
                <img 
                    src={product.imgSrc} 
                    alt={product.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
            </div>
            <div className="flex flex-col flex-grow w-full text-center">
                <h3 className="text-xl font-bold text-sky-light">{product.name}</h3>
                <p className="text-sky-gray mb-4 text-sm flex-grow">{product.tagline}</p>
                <p className="text-lg font-semibold text-sky-light mb-4">{product.price}</p>
                <div className="mt-auto w-full px-5 py-2 border border-sky-blue text-sky-blue rounded-full group-hover:bg-sky-blue group-hover:text-sky-dark transition-colors font-medium">
                    View Details
                </div>
            </div>
        </AnimatedBorderCard>
    );
};