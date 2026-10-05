import React, { useState } from 'react';
import type { PhotoItem } from '../data/portfolioData';
import { VIKRAM_BIO } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { 
  MapPin, 
  Mail, 
  Check, 
  Heart, 
  Coffee, 
  ArrowUpRight 
} from 'lucide-react';

interface GalleryModeProps {
  photos: PhotoItem[];
  onSelectPhotoModal: (photo: PhotoItem) => void;
  onOpenContact: () => void;
}

export const GalleryMode: React.FC<GalleryModeProps> = ({ 
  photos, 
  onSelectPhotoModal, 
  onOpenContact 
}) => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('vikram.sengupta.photo@gmail.com');
    sound.playFocusTick(1.5);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] p-4 md:p-8 max-w-6xl mx-auto flex flex-col items-center select-none">
      
      {/* Warm Personal Header */}
      <div className="w-full text-center max-w-2xl mb-12 mt-6">
        <span className="text-xs font-mono tracking-widest text-amber-300/90 uppercase bg-amber-950/40 border border-amber-900/40 px-3.5 py-1 rounded-full mb-3 inline-block">
          Personal Field Work & Selected Frames · 2024—2026
        </span>

        <h1
          className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-100 mb-3"
          style={{ fontFamily: 'var(--font-cinzel)' }}
        >
          NOTICING WHAT GETS WALKED PAST
        </h1>

        <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed">
          "A camera isn’t for proving you were there; it’s for showing that you actually stopped, looked, and listened."
        </p>
      </div>

      {/* THE CONTACT GRID (All Curated Photographs) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => {
              sound.playShutter();
              onSelectPhotoModal(photo);
            }}
            className="group bg-[#0d0e12] rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all cursor-pointer flex flex-col shadow-xl transform hover:-translate-y-1 duration-300"
          >
            {/* Photo Viewport */}
            <div className="relative aspect-[4/5] overflow-hidden bg-black">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter group-hover:contrast-105"
              />

              {/* Ambient Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

              {/* Top Floating Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-neutral-300 border border-neutral-700/60 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-400" />
                  {photo.location.split(',')[0]}
                </span>
                <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-amber-300/90 border border-neutral-700/60">
                  {photo.category}
                </span>
              </div>

              {/* Bottom Details on Image */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block mb-1">
                  {photo.filmStock}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors" style={{ fontFamily: 'var(--font-cinzel)' }}>
                  {photo.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5">{photo.subtitle}</p>
              </div>

              {/* Hover Inspect Icon */}
              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Technical Footer */}
            <div className="p-3.5 bg-neutral-950 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-neutral-800">
              <span className="truncate max-w-[150px]">{photo.exif.camera}</span>
              <div className="flex items-center gap-2 text-neutral-300">
                <span className="text-cyan-400">{photo.exif.aperture}</span>
                <span>·</span>
                <span>{photo.exif.shutterSpeed}</span>
                <span>·</span>
                <span>{photo.exif.iso}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* A SINCERE, HUMAN LETTER TO THE RECRUITER / CREATIVE DIRECTOR */}
      <div className="w-full max-w-4xl bg-[#0e0f14] border border-neutral-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span>A Note to Creative Directors & Studios</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-cinzel)' }}>
          WHY I WANT TO BE YOUR INTERN
        </h2>

        {/* The Letter */}
        <div className="text-neutral-300 text-sm md:text-base leading-relaxed space-y-4 font-light border-l-2 border-amber-500/50 pl-5 mb-8">
          <p>
            {VIKRAM_BIO.letterToRecruiter}
          </p>
        </div>

        {/* Small Human Details (Coffee, Reading, Dreams) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-neutral-950/70 border border-neutral-800/80 rounded-2xl text-xs font-mono text-neutral-300 mb-8">
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase flex items-center gap-1 mb-1">
              <Coffee className="w-3 h-3 text-amber-400" /> Coffee Order
            </span>
            <span>{VIKRAM_BIO.personalDetails.coffeeOrder}</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase mb-1">Favorite Light</span>
            <span>{VIKRAM_BIO.personalDetails.favoriteLight}</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase mb-1">Currently Reading</span>
            <span>{VIKRAM_BIO.personalDetails.currentlyReading}</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase mb-1">Hungry to Learn</span>
            <span>{VIKRAM_BIO.personalDetails.whatIWantToLearn}</span>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={onOpenContact}
            className="flex items-center gap-2 bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs font-mono px-5 py-3 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-neutral-950" />
            <span>Let's Grab Coffee / Talk Internship</span>
          </button>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono px-4 py-3 rounded-xl border border-neutral-700 transition-colors cursor-pointer"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-neutral-400" />}
            <span>{copiedEmail ? 'Email Copied!' : 'Copy vikram.sengupta.photo@gmail.com'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
