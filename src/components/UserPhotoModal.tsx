import React, { useState, useEffect } from 'react';
import type { SplitFrameSpecimen } from '../data/splitFrameData';
import { sound } from '../utils/audio';

interface UserPhotoModalProps {
  photo: SplitFrameSpecimen | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const UserPhotoModal: React.FC<UserPhotoModalProps> = ({
  photo,
  onClose,
  onNext,
  onPrev,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0 && onNext) {
        sound.playFocusTick();
        onNext();
      } else if (deltaX > 0 && onPrev) {
        sound.playFocusTick();
        onPrev();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/92 backdrop-blur-xl select-none animate-fadeIn">
      {/* Background ambient radial tone glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 filter blur-3xl transition-colors duration-700"
        style={{
          background: photo.palette[1]
            ? `radial-gradient(circle at 50% 50%, ${photo.palette[1]}, transparent 70%)`
            : 'radial-gradient(circle at 50% 50%, #4a2818, transparent 70%)',
        }}
      />

      {/* Main Shell */}
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto lg:overflow-hidden bg-[#0c0e12] border border-neutral-700/80 rounded-2xl sm:rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] flex flex-col lg:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playFocusTick();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-black text-white/80 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Section: Full Bleed Specimen Viewport with Touch Swiping */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative lg:w-7/12 aspect-auto min-h-[260px] sm:min-h-[380px] max-h-[46vh] lg:max-h-none bg-[#050508] flex items-center justify-center overflow-hidden p-2 sm:p-6 touch-pan-y flex-shrink-0"
        >
          {photo.imageUrl ? (
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-full object-contain max-h-[44vh] lg:max-h-[75vh] rounded-lg select-none"
            />
          ) : (
            <div className="w-full max-w-sm aspect-[4/3] rounded-xl border border-dashed border-neutral-800 bg-neutral-950/60 p-6 flex flex-col items-center justify-center text-center">
              <span className="font-cinzel text-xs text-neutral-300 uppercase tracking-[0.25em] mb-1">
                Specimen #{String(photo.order).padStart(2, '0')}
              </span>
              <span className="font-mono text-[11px] text-neutral-500">
                Awaiting Specimen Photograph & Link
              </span>
            </div>
          )}

          {/* Previous / Next buttons */}
          {onPrev && (
            <button
              onClick={() => {
                sound.playFocusTick();
                onPrev();
              }}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/75 hover:bg-black text-white/80 hover:text-white border border-neutral-700 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {onNext && (
            <button
              onClick={() => {
                sound.playFocusTick();
                onNext();
              }}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/75 hover:bg-black text-white/80 hover:text-white border border-neutral-700 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Registration stamp */}
          <div className="absolute bottom-2 left-3 font-mono text-[9px] sm:text-[10px] text-white/50 uppercase bg-black/80 px-2.5 py-0.5 rounded border border-white/10 max-w-[70%] truncate">
            SPECIMEN #{String(photo.order).padStart(2, '0')} · DARKROOM ARCHIVE
          </div>
        </div>

        {/* Right Section: Specimen Story, Reasons & Optics */}
        <div className="lg:w-5/12 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-visible lg:overflow-y-auto lg:max-h-[85vh] bg-[#0d0f14]">
          <div>


            <h2 className="text-3xl md:text-4xl font-normal text-white tracking-tight font-curved mb-4 capitalize">
              {photo.title}
            </h2>

            <div className="space-y-4">
              {/* Why I Took This */}
              <div className="p-4 sm:p-5 bg-neutral-900/90 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 mb-2 text-amber-400 font-mono text-xs uppercase font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Why I Took This Photo</span>
                </div>
                <blockquote className="text-amber-100/95 text-lg sm:text-xl font-curved italic font-light leading-relaxed">
                  "{photo.whyITookThis}"
                </blockquote>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>SPECIMEN #{String(photo.order).padStart(2, '0')}</span>
            <span>PRESS ESC TO CLOSE</span>
          </div>
        </div>

      </div>
    </div>
  );
};
