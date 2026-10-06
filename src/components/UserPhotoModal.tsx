import { useState, useEffect } from 'react';
import type { FeaturedPhoto, AlbumPhoto } from '../data/userPhotosData';
import { sound } from '../utils/audio';

type InspectablePhoto = (FeaturedPhoto & { isAlbum?: false }) | (AlbumPhoto & { isAlbum: true });

interface UserPhotoModalProps {
  photo: InspectablePhoto | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function UserPhotoModal({ photo, onClose, onNext, onPrev }: UserPhotoModalProps) {
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

  const isAlbum = 'isAlbum' in photo && photo.isAlbum;
  const featured = !isAlbum ? (photo as FeaturedPhoto) : null;
  const album = isAlbum ? (photo as AlbumPhoto) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/92 backdrop-blur-xl select-none animate-fadeIn">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 filter blur-3xl transition-colors duration-700"
        style={{
          background: featured && featured.palette[1]
            ? `radial-gradient(circle at 50% 50%, ${featured.palette[1]}, transparent 70%)`
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
          className="relative lg:w-7/12 aspect-auto min-h-[240px] sm:min-h-[360px] max-h-[46vh] lg:max-h-none bg-[#060608] flex items-center justify-center overflow-hidden p-2 sm:p-4 touch-pan-y flex-shrink-0"
        >
          <img
            src={photo.url}
            alt={featured?.title || album?.caption || 'Photograph'}
            className="w-full h-full object-contain max-h-[44vh] lg:max-h-[75vh] rounded-lg select-none"
          />

          {/* Previous / Next on modal */}
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
          <div className="absolute bottom-2 left-3 font-mono text-[9px] sm:text-[10px] text-white/50 uppercase bg-black/80 px-2 py-0.5 rounded border border-white/10 max-w-[70%] truncate">
            {photo.filename}
          </div>
        </div>

        {/* Right Section: Specimen Story, Reasons & Optics */}
        <div className="lg:w-5/12 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-visible lg:overflow-y-auto lg:max-h-[85vh] bg-[#0d0f14]">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
              <span className="bg-neutral-800 px-2.5 py-0.5 rounded text-neutral-300 font-semibold uppercase">
                {isAlbum ? 'Album Field Print' : 'Curated Top 30'}
              </span>
              <span>{photo.date}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight font-editorial mb-1">
              {featured?.title || album?.caption}
            </h2>
            <p className="text-xs font-mono text-neutral-400 mb-6">
              {photo.location}
            </p>

            {featured && (
              <div className="space-y-4">
                {/* Why I Took This */}
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                  <div className="flex items-center gap-2 mb-1.5 text-amber-400 font-mono text-xs uppercase font-semibold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Why I Took This Photo</span>
                  </div>
                  <p className="text-neutral-200 text-sm italic font-sans leading-relaxed">
                    "{featured.whyITookThis}"
                  </p>
                </div>

                {/* What Caught My Eye */}
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                    What Caught My Eye
                  </span>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {featured.whatCaughtMyEye}
                  </p>
                </div>

                {/* Narrative */}
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                    Atmosphere & Setting
                  </span>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {featured.story}
                  </p>
                </div>

                {/* Telemetry */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-neutral-800">
                  <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase block">Camera</span>
                    <span className="text-neutral-200">{featured.cameraInfo}</span>
                  </div>
                  <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase block">Lens & Optics</span>
                    <span className="text-neutral-200 truncate block">{featured.lensInfo}</span>
                  </div>
                </div>
              </div>
            )}

            {album && (
              <div className="space-y-4">
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                  <span className="text-amber-400 font-mono text-xs uppercase block mb-1">Handwritten Field Note</span>
                  <p className="font-handwritten text-2xl text-neutral-200 leading-snug">
                    "{album.caption}"
                  </p>
                </div>
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-400 space-y-2">
                  <p><span className="text-neutral-500">Archival Plate:</span> {album.filename}</p>
                  <p><span className="text-neutral-500">Field Location:</span> {album.location}</p>
                  <p><span className="text-neutral-500">Capture Date:</span> {album.date}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>ARCHIVAL SPECIMEN #{photo.id.toUpperCase()}</span>
            <span>PRESS ESC TO CLOSE</span>
          </div>
        </div>

      </div>
    </div>
  );
}
