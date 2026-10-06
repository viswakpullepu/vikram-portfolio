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
    <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 pb-4 border-b border-neutral-800/80 gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-neutral-400">
              Curated Specimen Exhibition · Top 10 Specimen Frames
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-light text-white tracking-tight mt-1 font-editorial">
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
            <span className="text-white font-semibold">
              {String(currentSpecimen.order).padStart(2, '0')}
            </span>
            <span className="text-neutral-600 mx-1">/</span>
            <span>{String(SPLIT_FRAME_SPECIMENS.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* MASTER RECTANGULAR SPLIT FRAME */}
      {/* Whole Left Inner Frame = Picture Stage, Whole Right Inner Frame = Why I Took The Pic & Matter */}
      <div className="relative rounded-2xl bg-[#0b0c10] border border-neutral-800 shadow-2xl overflow-hidden transition-all duration-300 hover:border-neutral-700/80">
        
        {/* Subtle Archival Matte Bevel Inset */}
        <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl z-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[640px] xl:min-h-[700px]">
          
          {/* ======================================================== */}
          {/* LEFT INNER FRAME: OCCUPIED ENTIRELY BY THE PICTURE        */}
          {/* ======================================================== */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="lg:col-span-7 bg-[#050508] relative flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-neutral-800/80 group touch-pan-y"
          >
            {/* Ambient Radial Safelight / Tone Accent */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle at center, ${currentSpecimen.palette[1] || '#3a2010'} 0%, transparent 70%)`
              }}
            />

            {/* Photographic Image / Viewport Stage */}
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[420px] lg:min-h-full flex items-center justify-center p-3 sm:p-6">
              
              {currentSpecimen.imageUrl ? (
                /* Mounted Photograph */
                <img
                  key={currentSpecimen.id}
                  src={currentSpecimen.imageUrl}
                  alt={currentSpecimen.title}
                  className={`w-full h-full object-contain max-h-[380px] sm:max-h-[540px] xl:max-h-[660px] rounded-lg transition-transform duration-500 ease-out select-none ${
                    isImageZoomed ? 'scale-110 cursor-zoom-out' : 'cursor-pointer hover:scale-[1.01]'
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
              ) : (
                /* Pristine Template Darkroom Optical Framing Stage (Awaiting Image) */
                <div 
                  onClick={() => {
                    sound.playFocusTick();
                    onSelectPhotoModal && onSelectPhotoModal(currentSpecimen);
                  }}
                  className="w-full max-w-md aspect-[4/3] rounded-xl border border-dashed border-neutral-800 hover:border-amber-500/50 bg-neutral-950/60 p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
                >
                  {/* Optical Reticle / Crosshair Icon */}
                  <div className="w-16 h-16 rounded-full border border-neutral-700/80 group-hover:border-amber-400/80 flex items-center justify-center mb-4 transition-colors relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700 group-hover:bg-amber-400 transition-colors" />
                    <span className="absolute -top-1 w-2 h-[1px] bg-neutral-600" />
                    <span className="absolute -bottom-1 w-2 h-[1px] bg-neutral-600" />
                    <span className="absolute -left-1 h-2 w-[1px] bg-neutral-600" />
                    <span className="absolute -right-1 h-2 w-[1px] bg-neutral-600" />
                  </div>

                  <span className="font-cinzel text-xs text-neutral-300 group-hover:text-amber-300 uppercase tracking-[0.25em] mb-1.5 transition-colors">
                    Specimen Frame {String(currentSpecimen.order).padStart(2, '0')}
                  </span>
                  
                  <span className="font-mono text-[11px] text-neutral-500 max-w-xs leading-relaxed">
                    Left Inner Frame Reserved for Picture
                  </span>

                  <span className="mt-4 font-mono text-[10px] text-amber-400/80 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    Awaiting Photograph & Link
                  </span>
                </div>
              )}

              {/* Watermark Archival Registration Code */}
              <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-6 font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase bg-black/75 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 pointer-events-none max-w-[80%] truncate">
                REG · SPECIMEN #{String(currentSpecimen.order).padStart(2, '0')} · 35MM ARCHIVE
              </div>

              {/* Fullscreen Expand Action Trigger */}
              <button
                onClick={() => {
                  sound.playShutter();
                  if (onSelectPhotoModal) onSelectPhotoModal(currentSpecimen);
                }}
                className="absolute top-3 right-3 sm:top-5 sm:right-6 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 bg-neutral-900/85 hover:bg-neutral-800 text-neutral-200 hover:text-white p-2 rounded-full border border-neutral-700/80 backdrop-blur-md cursor-pointer"
                title="Inspect Frame in Fullscreen Modal"
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
          <div className="lg:col-span-5 bg-[#0e1015] p-5 sm:p-7 xl:p-10 flex flex-col justify-between">
            
            {/* Header Details */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-2">
                <span className="uppercase tracking-widest text-neutral-400">
                  {currentSpecimen.subtitle}
                </span>
                <span className="text-neutral-500">{currentSpecimen.date}</span>
              </div>

              {/* Specimen Title */}
              <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight font-editorial mb-1">
                {currentSpecimen.title}
              </h3>
              
              {/* Location Tag */}
              <p className="text-xs font-mono text-neutral-400 mb-6 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{currentSpecimen.location}</span>
              </p>

              {/* ==================================================== */}
              {/* PRIMARY HERO EMPHASIS: "WHY I TOOK THIS PHOTO"       */}
              {/* ==================================================== */}
              <div className="bg-neutral-900/90 rounded-xl p-5 border border-neutral-800 mb-6 shadow-inner relative overflow-hidden">
                {/* Glowing Left Indicator Ribbon */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 via-amber-500 to-red-600" />
                
                <div className="flex items-center gap-2 mb-2.5">
                  <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    Why I Took This Photo
                  </h4>
                </div>

                {currentSpecimen.whyITookThis ? (
                  <p className="text-neutral-100 text-sm sm:text-base leading-relaxed font-sans italic font-normal">
                    "{currentSpecimen.whyITookThis}"
                  </p>
                ) : (
                  <div className="py-2">
                    <p className="text-neutral-400 text-xs sm:text-sm font-sans italic leading-relaxed">
                      "Personal story, motive, and why this exact shot was taken will be provided here."
                    </p>
                    <span className="inline-block mt-2 font-mono text-[10px] text-amber-400/70 uppercase tracking-wider">
                      • Awaiting custom text
                    </span>
                  </div>
                )}
              </div>

              {/* SECONDARY DETAILS: "WHAT CAUGHT MY EYE" & "ATMOSPHERE" */}
              <div className="space-y-4 mb-6">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                    What Caught My Eye
                  </span>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {currentSpecimen.whatCaughtMyEye || 'Light direction, shadow interplay, subject posture, or sudden spontaneous impulse.'}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                    Atmosphere & Setting
                  </span>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {currentSpecimen.story || 'Ambient noise, weather conditions, time of day, and candid environmental setting.'}
                  </p>
                </div>
              </div>

              {/* TECHNICAL OPTICS BADGE */}
              <div className="pt-4 border-t border-neutral-800/80">
                <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                  <div className="bg-neutral-950/70 p-2.5 rounded border border-neutral-800/60">
                    <span className="text-[10px] text-neutral-500 block uppercase">Camera Body</span>
                    <span className="text-neutral-200 font-medium">{currentSpecimen.cameraInfo}</span>
                  </div>
                  <div className="bg-neutral-950/70 p-2.5 rounded border border-neutral-800/60">
                    <span className="text-[10px] text-neutral-500 block uppercase">Optical Parameters</span>
                    <span className="text-neutral-200 font-medium truncate block" title={currentSpecimen.lensInfo}>
                      {currentSpecimen.lensInfo}
                    </span>
                  </div>
                </div>

                {/* Color Harmonization Swatches */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase">Atmosphere Tones:</span>
                  <div className="flex items-center gap-1.5">
                    {currentSpecimen.palette.map((color, cIdx) => (
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
            <div className="mt-6 sm:mt-8 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3">
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
                className={`relative flex-shrink-0 w-14 sm:w-16 h-10 sm:h-12 rounded overflow-hidden border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/30 scale-105 z-10 bg-amber-500/10'
                    : 'border-neutral-800 bg-neutral-900/60 opacity-60 hover:opacity-100 hover:border-neutral-600'
                }`}
                title={`Frame ${specimen.order}. ${specimen.title}`}
              >
                {specimen.imageUrl ? (
                  <img
                    src={specimen.imageUrl}
                    alt={specimen.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-mono text-[10px] text-neutral-400 font-semibold">
                    #{String(specimen.order).padStart(2, '0')}
                  </span>
                )}
                <span className="absolute bottom-0.5 right-1 font-mono text-[8px] bg-black/80 text-white px-1 rounded">
                  {specimen.order}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
};
