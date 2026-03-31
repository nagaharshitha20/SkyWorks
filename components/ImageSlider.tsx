import React, { useState, useEffect, useCallback } from 'react';

interface ImageSliderProps {
    images: string[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, images.length]);

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, images.length]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };
    
    useEffect(() => {
        const timer = setTimeout(goToNext, 5000); // Auto-play every 5 seconds
        return () => clearTimeout(timer);
    }, [currentIndex, goToNext]);


    return (
        <div className="h-[500px] w-full m-auto relative group">
            <div className="w-full h-full rounded-lg overflow-hidden relative">
                <div className="w-full h-full flex transition-transform ease-out duration-700" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((url, index) => (
                        <img key={index} src={url} alt={`Slide ${index}`} className="w-full h-full object-cover flex-shrink-0" />
                    ))}
                </div>
            </div>
            {/* Left Arrow */}
            <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer transition hover:bg-black/60">
                <ion-icon name="chevron-back-outline" onClick={goToPrevious}></ion-icon>
            </div>
            {/* Right Arrow */}
            <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer transition hover:bg-black/60">
                <ion-icon name="chevron-forward-outline" onClick={goToNext}></ion-icon>
            </div>
            <div className="flex top-4 justify-center py-4 absolute bottom-2 left-1/2 -translate-x-1/2">
                {images.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`text-2xl cursor-pointer p-1 transition-all ${currentIndex === slideIndex ? 'text-sky-blue' : 'text-sky-gray/50 hover:text-sky-gray'}`}
                    >
                       <ion-icon name="ellipse"></ion-icon>
                    </div>
                ))}
            </div>
        </div>
    );
};