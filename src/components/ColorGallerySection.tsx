import React, { useState } from 'react';
import { COLOR_PHOTO_SPECIMENS, type ColorPhotoItem } from '../data/colorPhotosData';
import { sound } from '../utils/audio';

export const ColorGallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<ColorPhotoItem | null>(null);

  const handleOpenPhoto = (item: ColorPhotoItem) => {
    sound.playShutter();
    setSelectedPhoto(item);
  };

  const handleCloseModal = () => {
    sound.playFocusTick();
    setSelectedPhoto(null);
  };

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIdx = COLOR_PHOTO_SPECIMENS.findIndex(p => p.id === selectedPhoto.id);
    const nextIdx = (currentIdx + 1) % COLOR_PHOTO_SPECIMENS.length;
    sound.playFocusTick(1.1);
    setSelectedPhoto(COLOR_PHOTO_SPECIMENS[nextIdx]);
  };

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const currentIdx = COLOR_PHOTO_SPECIMENS.findIndex(p => p.id === selectedPhoto.id);
    const prevIdx = (currentIdx - 1 + COLOR_PHOTO_SPECIMENS.length) % COLOR_PHOTO_SPECIMENS.length;
    sound.playFocusTick(0.9);
    setSelectedPhoto(COLOR_PHOTO_SPECIMENS[prevIdx]);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-neutral-800/80">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-4 border-b border-neutral-800/60 gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">
              The Chromatic Archive · Natural Spectrum
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight mt-1 font-curved">
            Color Studies & Sunlit Works
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-sans max-w-2xl mt-2 font-light leading-relaxed">
            Fleeting golden light, sacred rituals, tranquil waters, and vibrant flora. The full daylight spectrum complementing the monochrome split-frame studies.
          </p>
        </div>

        <div className="font-mono text-xs text-neutral-500">
          <span>{COLOR_PHOTO_SPECIMENS.length} Curated Color Frames</span>
        </div>
      </div>

      {/* Responsive Curated Masonry-Style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {COLOR_PHOTO_SPECIMENS.map((photo) => (
          <div
            key={photo.id}
            onClick={() => handleOpenPhoto(photo)}
            className="group relative bg-[#13151b] rounded-2xl overflow-hidden border border-neutral-800/90 hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col cursor-pointer active:scale-[0.99]"
          >
            {/* Image Container with Neutral Gallery Mount */}
            <div className="relative w-full aspect-[4/5] bg-[#1a1c24] overflow-hidden p-2.5 flex items-center justify-center">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Category pill on image */}
              <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-md border border-white/10">
                {photo.category}
              </div>

              {/* Fullscreen icon indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/80 text-white p-2 rounded-full border border-white/20 backdrop-blur-md">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </div>

            {/* Caption Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#111318]">
              <div>
                <h3 className="text-xl sm:text-2xl font-normal text-white font-curved tracking-wide group-hover:text-amber-200 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-neutral-400 font-sans mt-1 leading-relaxed line-clamp-2">
                  {photo.description}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>Plate #{String(photo.order).padStart(2, '0')}</span>
                <span className="text-amber-400/80 group-hover:text-amber-300">View Full-Bleed →</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Lightbox Modal for Color Photos */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#12141a] border border-neutral-700/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/80 hover:bg-black text-white border border-neutral-700 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image Viewport */}
            <div className="relative flex-1 min-h-[300px] max-h-[72vh] bg-[#090a0e] p-2 sm:p-4 flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain max-h-[70vh] rounded-lg select-none"
              />

              {/* Prev / Next controls */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-black text-white border border-neutral-700 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-black text-white border border-neutral-700 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Modal Caption */}
            <div className="p-4 sm:p-6 bg-[#111319] border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs uppercase text-amber-400 font-semibold tracking-wider">
                  {selectedPhoto.category} · Plate #{String(selectedPhoto.order).padStart(2, '0')}
                </span>
                <h3 className="text-2xl sm:text-3xl font-normal text-white font-curved mt-0.5">
                  {selectedPhoto.title}
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm font-sans mt-1">
                  {selectedPhoto.description}
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="self-end sm:self-center px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs border border-neutral-700 cursor-pointer"
              >
                Close Frame
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
