import { useState } from 'react';
import type { FeaturedPhoto, AlbumPhoto } from './data/userPhotosData';
import { TOP_30_FEATURED } from './data/userPhotosData';
import { Navigation } from './components/Navigation';
import { FeaturedSplitFrame } from './components/FeaturedSplitFrame';
import { RealLifePhotoAlbum } from './components/RealLifePhotoAlbum';
import { UserPhotoModal } from './components/UserPhotoModal';
import { ContactModal } from './components/ContactModal';
import { sound } from './utils/audio';

type InspectablePhoto = (FeaturedPhoto & { isAlbum?: false }) | (AlbumPhoto & { isAlbum: true });

export function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<InspectablePhoto | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Next/Prev navigation when inspecting in modal
  const handleModalNext = () => {
    if (!selectedPhoto) return;
    if (!('isAlbum' in selectedPhoto) || !selectedPhoto.isAlbum) {
      const idx = TOP_30_FEATURED.findIndex((p) => p.id === selectedPhoto.id);
      if (idx !== -1) {
        const nextIdx = (idx + 1) % TOP_30_FEATURED.length;
        setSelectedPhoto(TOP_30_FEATURED[nextIdx]);
      }
    }
  };

  const handleModalPrev = () => {
    if (!selectedPhoto) return;
    if (!('isAlbum' in selectedPhoto) || !selectedPhoto.isAlbum) {
      const idx = TOP_30_FEATURED.findIndex((p) => p.id === selectedPhoto.id);
      if (idx !== -1) {
        const prevIdx = (idx - 1 + TOP_30_FEATURED.length) % TOP_30_FEATURED.length;
        setSelectedPhoto(TOP_30_FEATURED[prevIdx]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-100 flex flex-col font-sans film-grain relative selection:bg-amber-500/30 selection:text-amber-100">
      
      {/* Top Header Navigation */}
      <Navigation
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onContactClick={() => {
          sound.playFocusTick();
          setIsContactOpen(true);
        }}
      />

      {/* Main Photographic Presentation */}
      <main className="flex-1 w-full pb-20">
        
        {/* Prominent Editorial Header Introduction at the Starting */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-900 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2.5 font-mono text-xs text-neutral-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Photographic Archives · 74 Raw Captures</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white font-editorial tracking-tight">
              Vikram
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base font-sans max-w-2xl font-light leading-relaxed">
              An unvarnished visual study of Indian streets, fleeting golden angles, raw CCD nocturnes, and unposed human warmth. Curated into 30 premier specimen split frames and an archival 44-print physical album.
            </p>

            {/* Quick Instagram & Stats Link Badge */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <a
                href="https://www.instagram.com/rigzz.iii/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-pink-500/50 hover:bg-neutral-850 font-mono text-xs transition-all"
              >
                <svg className="w-3.5 h-3.5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Follow on Instagram: <strong className="text-pink-300">@rigzz.iii</strong></span>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-6 text-xs font-mono text-neutral-400">
            <div className="text-center md:text-right">
              <span className="text-white text-xl font-bold block">30</span>
              <span className="uppercase text-[10px] tracking-wider text-neutral-400">Curated Split Frames</span>
            </div>
            <div className="h-8 w-[1px] bg-neutral-800" />
            <div className="text-center md:text-right">
              <span className="text-white text-xl font-bold block">44</span>
              <span className="uppercase text-[10px] tracking-wider text-neutral-400">Mounted Album Prints</span>
            </div>
          </div>
        </section>

        {/* SECTION 1: TOP 30 RECTANGULAR SPLIT FRAME */}
        {/* Left inner frame = Picture, Right inner frame = Why I took the pic & backstory */}
        <div id="split-frame" className="scroll-mt-20">
          <FeaturedSplitFrame
            onSelectPhotoModal={(photo) => setSelectedPhoto(photo)}
          />
        </div>

        {/* Section Divider: Transition from Exhibition Wall to Physical Library Desk */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-neutral-800/80" />
            <div className="absolute bg-[#08080a] px-6 py-2 border border-neutral-800 rounded-full font-mono text-[11px] text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Library Archive Table · Field Album Below</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: REAL-LIFE PHOTO ALBUM (REMAINING 44 PHOTOS) */}
        {/* Physical album binder, 2-page spreads, archival corner tabs, pencil notes, turning sound */}
        <div id="photo-album" className="scroll-mt-20">
          <RealLifePhotoAlbum
            onInspectPhoto={(photo) => setSelectedPhoto({ ...photo, isAlbum: true })}
          />
        </div>

      </main>

      {/* Fullscreen Darkroom Inspection Modal */}
      <UserPhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onNext={handleModalNext}
        onPrev={handleModalPrev}
      />

      {/* Direct Contact / Commission Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Exhibition & Album Colophon Footer */}
      <footer className="w-full border-t border-neutral-900 bg-[#060608] py-10 px-6 font-mono text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-white font-medium">© 2026 VIKRAM · UNFILTERED ARCHIVES</p>
            <p className="text-neutral-400 text-[11px]">
              Canon EOS 200D · Nikon D3300 · Canon IXUS 145 · Samsung S860
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/rigzz.iii/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1.5"
            >
              <span>Instagram @rigzz.iii</span>
            </a>
            <span className="text-neutral-800">·</span>
            <button
              onClick={() => {
                sound.playFocusTick();
                setIsContactOpen(true);
              }}
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Contact / Inquiries
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
