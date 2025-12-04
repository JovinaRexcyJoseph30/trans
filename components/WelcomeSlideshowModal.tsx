import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

declare global {
    interface Window {
        __app_id?: string;
    }
}

const WelcomeSlideshowModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Hardcoded count based on verified file system content
    const totalSlides = 10;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const getImageUrl = (index: number) => {
        // Construct dynamic path similar to Transport.tsx logic
        // Files are named popup_1.png, popup_2.png, etc.
        const imageNumber = index + 1;
        const baseUrl = typeof window.__app_id !== 'undefined'
            ? `/artifacts/${window.__app_id}/public`
            : '';

        return `${baseUrl}/data/popup images/popup_${imageNumber}.png`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-bold text-brand-navy">Welcome to JIT Transport</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Slideshow Container - Instagram Style (Square or 4:5) */}
                {/* Using aspect-[4/5] for better vertical mobile coverage, or aspect-square */}
                <div className="relative w-full aspect-[4/5] bg-[#adadad] flex items-center justify-center overflow-hidden">

                    {/* Image */}
                    <img
                        src={getImageUrl(currentSlide)}
                        alt={`Welcome Slide ${currentSlide + 1}`}
                        className="w-full h-full object-contain"
                    />

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${currentSlide === index
                                        ? 'bg-white w-4'
                                        : 'bg-white/40 hover:bg-white/60'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeSlideshowModal;
