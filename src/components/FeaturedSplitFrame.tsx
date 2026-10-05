import { useState, useEffect, useCallback } from 'react';
import { TOP_30_FEATURED, type FeaturedPhoto } from '../data/userPhotosData';
import { sound } from '../utils/audio';

interface FeaturedSplitFrameProps {
  onSelectPhotoModal?: (photo: FeaturedPhoto) => void;
}

export function FeaturedSplitFrame({ onSelectPhotoModal }: FeaturedSplitFrameProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
  const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);

  const currentPhoto: FeaturedPhoto = TOP_30_FEATURED[currentIndex];

  const handleNext = useCallback(() => {
    sound.playFocusTick(1.1);
    setCurrentIndex((prev) => (prev + 1) % TOP_30_FEATURED.length);
  }, []);

  const handlePrev = useCallback(() => {
    sound.playFocusTick(0.9);
    setCurrentIndex((prev) => (prev - 1 + TOP_30_FEATURED.length) % TOP_30_FEATURED.length);
  }, []);

  const handleSelectIndex = (idx: number) => {
    if (idx !== currentIndex) {
      sound.playFocusTick(1);
      setCurrentIndex(idx);
    }
  };

  // Autoplay timer
  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoplay, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-neutral-800/80 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">
              Curated Specimen Study · 30 Premier Works
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-1 font-editorial">
            The Split Frame Archive
          </h2>
        </div>

        {/* Counter and Autoplay Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              sound.playFocusTick(1.2);
              setIsAutoplay((prev) => !prev);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all flex items-center gap-2 border ${
              isAutoplay
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-neutral-200 hover:border-neutral-700'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isAutoplay ? 'bg-amber-400 animate-ping' : 'bg-neutral-600'}`} />
            {isAutoplay ? 'AUTOPLAY ON (6s)' : 'PLAY SLIDESHOW'}
          </button>

          <div className="font-mono text-sm tracking-wider text-neutral-400 bg-neutral-900/90 px-3 py-1.5 rounded-md border border-neutral-800">
            <span className="text-white font-semibold">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-neutral-600 mx-1">/</span>
            <span>{String(TOP_30_FEATURED.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* RECTANGULAR FRAME: Whole Left Inner Frame = Picture, Whole Right Inner Frame = Why I Took The Pic & Reasons */}
      <div className="relative rounded-2xl bg-[#0c0d11] border border-neutral-800 shadow-2xl overflow-hidden transition-all duration-300 hover:border-neutral-700/80">
        
        {/* Subtle Frame Matte Bevel */}
        <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl z-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] xl:min-h-[700px]">
          
          {/* ======================================================== */}
          {/* LEFT INNER FRAME: OCCUPIED ENTIRELY BY THE PICTURE        */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 bg-[#070709] relative flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-neutral-800/80 group">
            
            {/* Darkroom Safelight Glow Accent behind photo */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle at center, ${currentPhoto.palette[1] || '#402010'} 0%, transparent 70%)`
              }}
            />

            {/* Photographic Image */}
            <div className="relative w-full h-full min-h-[420px] lg:min-h-full flex items-center justify-center p-3 sm:p-6">
              <img
                key={currentPhoto.id}
                src={currentPhoto.url}
                alt={currentPhoto.title}
                className={`w-full h-full object-contain max-h-[580px] xl:max-h-[660px] rounded-lg transition-transform duration-500 ease-out select-none ${
                  isImageZoomed ? 'scale-110 cursor-zoom-out' : 'cursor-pointer hover:scale-[1.01]'
                }`}
                onClick={() => {
                  sound.playShutter();
                  if (onSelectPhotoModal) {
                    onSelectPhotoModal(currentPhoto);
                  } else {
                    setIsImageZoomed((prev) => !prev);
                  }
                }}
                loading="eager"
              />

              {/* Watermark / Archival Registration Number */}
              <div className="absolute bottom-5 left-8 font-mono text-[10px] tracking-widest text-white/40 uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 pointer-events-none">
                REG · {currentPhoto.filename} · SPECIMEN {String(currentIndex + 1).padStart(2, '0')}
              </div>

              {/* Quick Click to Expand Indicator */}
              <button
                onClick={() => {
                  sound.playShutter();
                  if (onSelectPhotoModal) onSelectPhotoModal(currentPhoto);
                }}
                className="absolute top-5 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white p-2 rounded-full border border-neutral-700/80 backdrop-blur-md"
                title="Inspect in Fullscreen Darkroom Modal"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT INNER FRAME: WHY I TOOK THE PIC & REASONS / STORY  */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 bg-[#0e1015] p-6 sm:p-8 xl:p-10 flex flex-col justify-between">
            
            {/* Top Details & Header */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-3">
                <span className="uppercase tracking-widest text-neutral-400">
                  {currentPhoto.subtitle}
                </span>
                <span className="text-neutral-500">{currentPhoto.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight font-editorial mb-1">
                {currentPhoto.title}
              </h3>
              
              <p className="text-xs font-mono text-neutral-400 mb-6 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {currentPhoto.location}
              </p>

              {/* PRIMARY EMPHASIS: "WHY I TOOK THIS PHOTO" */}
              <div className="bg-neutral-900/90 rounded-xl p-5 border border-neutral-800 mb-6 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-red-600" />
                
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    Why I Took This Photo
                  </h4>
                </div>

                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed font-sans italic font-normal">
                  "{currentPhoto.whyITookThis}"
                </p>
              </div>

              {/* SECONDARY STORY: "WHAT CAUGHT MY EYE" & THE BACKSTORY */}
              <div className="space-y-4 mb-6">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                    What Caught My Eye
                  </span>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {currentPhoto.whatCaughtMyEye}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                    Atmosphere & Moment
                  </span>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {currentPhoto.story}
                  </p>
                </div>
              </div>

              {/* Technical Optics Badge */}
              <div className="pt-4 border-t border-neutral-800/80">
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-neutral-950/60 p-2.5 rounded border border-neutral-800/60">
                    <span className="text-[10px] text-neutral-500 block uppercase">Camera Body</span>
                    <span className="text-neutral-200 font-medium">{currentPhoto.cameraInfo}</span>
                  </div>
                  <div className="bg-neutral-950/60 p-2.5 rounded border border-neutral-800/60">
                    <span className="text-[10px] text-neutral-500 block uppercase">Optical Parameters</span>
                    <span className="text-neutral-200 font-medium truncate block" title={currentPhoto.lensInfo}>
                      {currentPhoto.lensInfo}
                    </span>
                  </div>
                </div>

                {/* Color Harmonization Swatches */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase">Atmosphere Tones:</span>
                  <div className="flex items-center gap-1.5">
                    {currentPhoto.palette.map((color, cIdx) => (
                      <div
                        key={cIdx}
                        className="w-4 h-4 rounded-full border border-white/10 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Controls inside the right frame */}
            <div className="mt-8 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-all font-mono text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Prev</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-all font-mono text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
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
                  if (onSelectPhotoModal) onSelectPhotoModal(currentPhoto);
                }}
                className="font-mono text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
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

      {/* Interactive Bottom Filmstrip Scroller for all 30 photos */}
      <div className="mt-4 bg-neutral-950/70 p-3 rounded-xl border border-neutral-900">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
            Direct Specimen Selection (30 Curated Frames)
          </span>
          <span className="font-mono text-[10px] text-neutral-400">
            Click frame to inspect
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
          {TOP_30_FEATURED.map((photo, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={photo.id}
                onClick={() => handleSelectIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-12 rounded overflow-hidden border transition-all duration-200 ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/30 scale-105 z-10'
                    : 'border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-600'
                }`}
                title={`${idx + 1}. ${photo.title}`}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute bottom-0.5 right-1 font-mono text-[8px] bg-black/80 text-white px-1 rounded">
                  {idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
