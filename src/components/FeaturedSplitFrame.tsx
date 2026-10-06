import React, { useState, useEffect, useCallback } from 'react';
import { SPLIT_FRAME_SPECIMENS, type SplitFrameSpecimen } from '../data/splitFrameData';
import { sound } from '../utils/audio';

interface FeaturedSplitFrameProps {
  onSelectPhotoModal?: (specimen: SplitFrameSpecimen) => void;
}

export const FeaturedSplitFrame: React.FC<FeaturedSplitFrameProps> = ({ onSelectPhotoModal }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
  const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const currentSpecimen: SplitFrameSpecimen = SPLIT_FRAME_SPECIMENS[currentIndex];

  const handleNext = useCallback(() => {
    sound.playFocusTick(1.1);
    setCurrentIndex((prev) => (prev + 1) % SPLIT_FRAME_SPECIMENS.length);
  }, []);

  const handlePrev = useCallback(() => {
    sound.playFocusTick(0.9);
    setCurrentIndex((prev) => (prev - 1 + SPLIT_FRAME_SPECIMENS.length) % SPLIT_FRAME_SPECIMENS.length);
  }, []);

  const handleSelectIndex = (idx: number) => {
    if (idx !== currentIndex) {
      sound.playFocusTick(1);
      setCurrentIndex(idx);
    }
  };

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  // Slideshow Autoplay Timer (6 seconds)
  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoplay, handleNext]);

  // Keyboard Navigation (Left / Right Arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 pb-4 border-b border-neutral-800/80 gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-neutral-400">
              Curated Specimen Exhibition · Top 10 Specimen Frames
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal text-white tracking-tight mt-1 font-curved">
            The Split Frame Archive
          </h2>
        </div>

        {/* Slideshow Controller & Counter */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              sound.playFocusTick(1.2);
              setIsAutoplay((prev) => !prev);
            }}
            className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono tracking-wider transition-all flex items-center gap-2 border cursor-pointer ${
              isAutoplay
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-neutral-200 hover:border-neutral-700'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isAutoplay ? 'bg-amber-400 animate-ping' : 'bg-neutral-600'}`} />
            {isAutoplay ? 'AUTOPLAY ON (6s)' : 'PLAY SLIDESHOW'}
          </button>

          <div className="font-mono text-xs sm:text-sm tracking-wider text-neutral-400 bg-neutral-900/90 px-3 py-1.5 rounded-md border border-neutral-800">
            <span className="text-amber-300 font-semibold">
              {String(currentSpecimen.order).padStart(2, '0')}
            </span>
            <span className="text-neutral-600 mx-1">/</span>
            <span>{String(SPLIT_FRAME_SPECIMENS.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* FINE-ART LANDSCAPE PAPER SPREAD                          */}
      {/* Left Half = Heading & Picture | Right Half = Context     */}
      {/* ======================================================== */}
      <div className="relative rounded-2xl bg-[#0c0d12] border border-neutral-800/90 shadow-[0_20px_60px_rgba(0,0,0,0.85)] ring-1 ring-white/5 overflow-hidden transition-all duration-300">
        
        {/* Archival Paper Texture & Delicate Inner Bevel */}
        <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl z-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[660px]">
          
          {/* ======================================================== */}
          {/* LEFT HALF: THE PICTURE STAGE & HEADING                   */}
          {/* Top = Respective Heading | Below = The Photograph        */}
          {/* ======================================================== */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="lg:col-span-7 bg-[#07070a] p-4 sm:p-6 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-800/80 group touch-pan-y relative"
          >
            {/* Ambient Radial Safelight Accent */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle at 40% 50%, ${currentSpecimen.palette[1] || '#3a2010'} 0%, transparent 75%)`
              }}
            />

            {/* TOP OF LEFT HALF: RESPECTIVE HEADING WITH CURVED PHOTOGRAPHY FONT */}
            <div className="relative z-10 mb-3 sm:mb-5">
              {/* HEADING IN ATTRACTIVE CURVED DISPLAY SERIF */}
              <h3 className="font-curved text-3xl sm:text-4xl lg:text-[44px] font-normal text-white tracking-tight leading-tight capitalize">
                {currentSpecimen.title}
              </h3>
            </div>

            {/* CENTER / BODY: THE FRAMED PHOTOGRAPH */}
            <div className="relative w-full flex-1 min-h-[320px] sm:min-h-[440px] lg:min-h-[480px] flex items-center justify-center p-2 sm:p-4 bg-neutral-950/70 rounded-xl border border-neutral-900/90 shadow-inner overflow-hidden">
              
              {/* Corner Framing Reticles */}
              <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-amber-500/40 pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-amber-500/40 pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-amber-500/40 pointer-events-none" />

              {/* Mounted High-Resolution Photograph */}
              <img
                key={currentSpecimen.id}
                src={currentSpecimen.imageUrl}
                alt={currentSpecimen.title}
                className={`w-full h-full object-contain max-h-[380px] sm:max-h-[500px] lg:max-h-[540px] rounded-lg transition-transform duration-500 ease-out select-none shadow-2xl ${
                  isImageZoomed ? 'scale-110 cursor-zoom-out' : 'cursor-pointer hover:scale-[1.015]'
                }`}
                onClick={() => {
                  sound.playShutter();
                  if (onSelectPhotoModal) {
                    onSelectPhotoModal(currentSpecimen);
                  } else {
                    setIsImageZoomed((prev) => !prev);
                  }
                }}
                loading="eager"
              />


              {/* Fullscreen Expand Action Trigger */}
              <button
                onClick={() => {
                  sound.playShutter();
                  if (onSelectPhotoModal) onSelectPhotoModal(currentSpecimen);
                }}
                className="absolute top-4 right-4 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 bg-neutral-900/85 hover:bg-neutral-800 text-neutral-200 hover:text-white p-2 rounded-full border border-neutral-700/80 backdrop-blur-md cursor-pointer"
                title="Inspect Frame in Fullscreen Modal"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-neutral-500 px-1">
              <span>Specimen Frame #{String(currentSpecimen.order).padStart(2, '0')}</span>
              <span>Click photo to view full-bleed</span>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT HALF: DEDICATED TO THE CONTEXT & RATIONALE         */}
          {/* Top = Context Header | Below = "Why I Took This Photo"   */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 bg-[#0e1015] p-5 sm:p-7 xl:p-9 flex flex-col justify-between relative">
            
            {/* Top of Right Half */}
            <div className="my-auto">

              {/* PRIMARY SPOTLIGHT: "WHY I TOOK THIS PHOTO" */}
              <div className="bg-neutral-900/80 rounded-2xl p-6 sm:p-8 border border-neutral-800/90 shadow-xl relative overflow-hidden my-auto">
                {/* Gold Accent Indicator Ribbon */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600" />
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    Why I Took This Photo
                  </span>
                </div>

                {/* THE PERSONAL REASON IN THE CURVING PHOTOGRAPHY FONT */}
                <blockquote className="font-curved italic text-xl sm:text-2xl lg:text-3xl font-light text-amber-100/95 leading-relaxed tracking-wide">
                  "{currentSpecimen.whyITookThis}"
                </blockquote>
              </div>
            </div>

            {/* Bottom Controls inside the right frame */}
            <div className="mt-5 sm:mt-6 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="px-3.5 sm:px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-all font-mono text-xs flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Prev</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-3.5 sm:px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-all font-mono text-xs flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Next</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Direct Fullscreen Inspection Trigger */}
              <button
                onClick={() => {
                  sound.playShutter();
                  if (onSelectPhotoModal) onSelectPhotoModal(currentSpecimen);
                }}
                className="font-mono text-[11px] sm:text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 py-1.5 cursor-pointer"
              >
                <span>Full-Bleed Specimen</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Bottom Specimen Strip (Top 10 Frames) */}
      <div className="mt-4 bg-neutral-950/70 p-2.5 sm:p-3 rounded-xl border border-neutral-900">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="font-mono text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-widest truncate">
            Specimens (Top 10 Curated Frames)
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400">
            Select frame to view
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin touch-pan-x">
          {SPLIT_FRAME_SPECIMENS.map((specimen, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={specimen.id}
                onClick={() => handleSelectIndex(idx)}
                className={`relative flex-shrink-0 w-16 sm:w-20 h-11 sm:h-14 rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105 z-10 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                    : 'border-neutral-800 bg-neutral-900/60 opacity-60 hover:opacity-100 hover:border-neutral-600'
                }`}
                title={`Frame ${specimen.order}. ${specimen.title}`}
              >
                <img
                  src={specimen.imageUrl}
                  alt={specimen.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute bottom-0.5 right-1 font-mono text-[8px] bg-black/85 text-white px-1 rounded">
                  {String(specimen.order).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
};
