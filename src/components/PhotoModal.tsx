import React, { useState, useEffect } from 'react';
import type { PhotoItem } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  MapPin, 
  SplitSquareVertical
} from 'lucide-react';

interface PhotoModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose, onNext, onPrev }) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // Split slider 0-100%
  const [isComparing, setIsComparing] = useState<boolean>(true);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!photo) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-xl select-none animate-in fade-in duration-300">
      
      {/* Background ambient color bleed from photo palette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 filter blur-3xl transition-colors duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${photo.colorPalette[1] || '#ff0044'}, transparent 70%)`,
        }}
      />

      {/* Main Modal Shell */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#0c0d12] border border-neutral-700/80 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] flex flex-col lg:flex-row">
        
        {/* Close Button Top Right */}
        <button
          onClick={() => {
            sound.playFocusTick();
            onClose();
          }}
          className="absolute top-4 right-4 z-40 p-2.5 rounded-full bg-black/70 hover:bg-black text-white/70 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Section: Interactive Image Viewport with RAW vs Grade Comparison */}
        <div
          onMouseMove={handleMouseMove}
          className="relative lg:w-7/12 aspect-[4/3] lg:aspect-auto min-h-[380px] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* 2.5D Parallax Layered Container */}
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            style={{
              transform: `scale(1.03) translate(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* The Final Color-Graded Negative (Base layer) */}
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
            />

            {/* RAW Unprocessed Overlay (Clipped by Split-Slider) */}
            {isComparing && (
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none select-none"
                style={{
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                }}
              >
                <img
                  src={photo.rawUrl}
                  alt="RAW Flat Capture"
                  className="absolute inset-0 w-full h-full object-contain filter grayscale contrast-90 brightness-95"
                />
                
                {/* RAW Badge */}
                <div className="absolute top-4 left-4 bg-black/80 border border-neutral-600 text-neutral-300 font-mono text-[10px] px-2.5 py-1 rounded shadow">
                  RAW FLAT NEGATIVE
                </div>
              </div>
            )}

            {/* Graded Badge */}
            {isComparing && (
              <div className="absolute top-4 right-14 bg-black/80 border border-amber-500/60 text-amber-300 font-mono text-[10px] px-2.5 py-1 rounded shadow">
                FINAL GELATIN SILVER / C-41
              </div>
            )}

            {/* Split Slider Divider Line */}
            {isComparing && (
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none z-20"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Center Handle Handle Bar */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-2 border-neutral-900 pointer-events-auto cursor-ew-resize">
                  <SplitSquareVertical className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>

          {/* Interactive Split Slider Input Range (Invisible overlay covering width) */}
          {isComparing && (
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          )}

          {/* Comparison Mode Toggle */}
          <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2">
            <button
              onClick={() => {
                sound.playFocusTick();
                setIsComparing((prev) => !prev);
              }}
              className="bg-black/75 hover:bg-black/90 backdrop-blur-md border border-neutral-700 text-xs font-mono text-neutral-200 px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <SplitSquareVertical className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isComparing ? 'Disable Split Comparison' : 'Compare RAW vs Final'}</span>
            </button>
          </div>

          {/* Previous / Next Arrow Controls */}
          <button
            onClick={() => {
              sound.playFocusTick();
              onPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-neutral-700 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              sound.playFocusTick();
              onNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-neutral-700 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right Section: Comprehensive Specimen Dossier & EXIF Telemetry */}
        <div className="lg:w-5/12 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[88vh] bg-[#0c0d12]">
          
          <div>
            {/* Header / Category */}
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
              <span className="bg-neutral-800/80 px-2.5 py-0.5 rounded text-neutral-300 font-semibold">
                {photo.category}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-400" />
                {photo.location} · {photo.year}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-cinzel)' }}>
              {photo.title}
            </h2>
            <p className="text-xs font-mono text-cyan-400 mt-0.5 mb-5">{photo.subtitle}</p>

            {/* Narrative Story */}
            <div className="space-y-4 text-sm text-neutral-300 font-light leading-relaxed mb-6">
              <p>"{photo.story}"</p>
              
              <div className="p-3.5 bg-neutral-900/80 border-l-2 border-amber-400 rounded-r-xl text-xs font-mono text-amber-200/90 space-y-1">
                <span className="font-bold block text-amber-300">WHAT I LEARNED ON THIS FRAME:</span>
                <p>{photo.curatorInsight}</p>
                <div className="pt-2 text-[11px] text-neutral-400 border-t border-neutral-800">
                  <span className="text-amber-400/90 font-semibold">Field Note: </span>
                  {photo.fieldNote.whatWentWrong}
                </div>
              </div>
            </div>

            {/* EXIF Data Telemetry Grid */}
            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                Optical Telemetry & Exposure Log
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                  <div className="text-neutral-500 text-[10px]">CAMERA CHASSIS</div>
                  <div className="text-white font-semibold truncate">{photo.exif.camera}</div>
                </div>

                <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                  <div className="text-neutral-500 text-[10px]">PRIME OPTICS</div>
                  <div className="text-white font-semibold truncate">{photo.exif.lens}</div>
                </div>

                <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                  <div className="text-neutral-500 text-[10px]">APERTURE</div>
                  <div className="text-cyan-300 font-semibold">{photo.exif.aperture}</div>
                </div>

                <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                  <div className="text-neutral-500 text-[10px]">SHUTTER SPEED</div>
                  <div className="text-cyan-300 font-semibold">{photo.exif.shutterSpeed}</div>
                </div>

                <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                  <div className="text-neutral-500 text-[10px]">FILM EMULSION / ISO</div>
                  <div className="text-amber-300 font-semibold truncate">{photo.filmStock}</div>
                </div>

                <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                  <div className="text-neutral-500 text-[10px]">CAPTURE FORMAT</div>
                  <div className="text-neutral-300 font-semibold">{photo.exif.format}</div>
                </div>
              </div>
            </div>

            {/* Chromatic Palette Swatches */}
            <div>
              <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-2">
                Color Dominance Swatches
              </div>
              <div className="flex h-5 rounded-lg overflow-hidden border border-neutral-800">
                {photo.colorPalette.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 hover:flex-[1.5] transition-all cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Stamp */}
          <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>ARCHIVAL SPECIMEN #{photo.id.toUpperCase()}</span>
            <span>PRESS ESC TO CLOSE</span>
          </div>

        </div>

      </div>

    </div>
  );
};
