import React, { useRef, useEffect, useState } from 'react';
import { Overlay } from './Overlay'; // Corrected import

const HomePage: React.FC = () => {
  const [scroll, setScroll] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const overlayEl = overlayRef.current;
      if (overlayEl) {
        // We are scrolling the window.
        const scrollY = window.scrollY;
        // Total scrollable height is the height of the overlay content minus the window height
        const scrollableHeight = overlayEl.scrollHeight - window.innerHeight;
        if (scrollableHeight > 0) {
            // Clamp scroll percentage between 0 and 100
            const scrollPercentage = Math.min(100, Math.max(0, (scrollY / scrollableHeight) * 100));
            setScroll(scrollPercentage);
        } else {
            setScroll(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call handler once to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 3D Model removed intentionally for now */}
      <Overlay ref={overlayRef} />
    </>
  );
};

export default HomePage;
