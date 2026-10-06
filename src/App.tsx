import { useState } from 'react';
import type { SplitFrameSpecimen } from './data/splitFrameData';
import { SPLIT_FRAME_SPECIMENS } from './data/splitFrameData';
import { Navigation } from './components/Navigation';
import { FeaturedSplitFrame } from './components/FeaturedSplitFrame';
import { UserPhotoModal } from './components/UserPhotoModal';
import { ContactModal } from './components/ContactModal';
import { sound } from './utils/audio';

export function App() {
  const [selectedSpecimen, setSelectedSpecimen] = useState<SplitFrameSpecimen | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Next / Prev navigation when inspecting in darkroom modal
  const handleModalNext = () => {
    if (!selectedSpecimen) return;
    const idx = SPLIT_FRAME_SPECIMENS.findIndex((s) => s.id === selectedSpecimen.id);
    if (idx !== -1) {
      const nextIdx = (idx + 1) % SPLIT_FRAME_SPECIMENS.length;
      setSelectedSpecimen(SPLIT_FRAME_SPECIMENS[nextIdx]);
    }
  };

  const handleModalPrev = () => {
    if (!selectedSpecimen) return;
    const idx = SPLIT_FRAME_SPECIMENS.findIndex((s) => s.id === selectedSpecimen.id);
    if (idx !== -1) {
      const prevIdx = (idx - 1 + SPLIT_FRAME_SPECIMENS.length) % SPLIT_FRAME_SPECIMENS.length;
      setSelectedSpecimen(SPLIT_FRAME_SPECIMENS[prevIdx]);
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
      <main className="flex-1 w-full pb-16">
        
        {/* Prominent Editorial Header Introduction */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-6 sm:pb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-900 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-[11px] sm:text-xs text-neutral-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Photographic Archives · Top 10 Specimen Split Frames</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white font-editorial tracking-tight">
              Vikram
            </h1>

            <p className="text-neutral-300 text-xs sm:text-sm md:text-base font-sans max-w-2xl font-light leading-relaxed">
              An unvarnished visual study of fleeting golden angles, street candids, and intimate nocturnes. Formatted into the Top 10 premier specimen split frames pairing visual specimens with personal rationale.
            </p>

            {/* Quick Instagram Badge */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <a
                href="https://www.instagram.com/rigzz.iii/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-pink-500/50 hover:bg-neutral-850 font-mono text-[11px] sm:text-xs transition-all"
              >
                <svg className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Instagram: <strong className="text-pink-300">@rigzz.iii</strong></span>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-5 text-xs font-mono text-neutral-400">
            <div className="text-center md:text-right">
              <span className="text-white text-xl font-bold block">10</span>
              <span className="uppercase text-[9px] sm:text-[10px] tracking-wider text-neutral-400">Top Curated Frames</span>
            </div>
            <div className="h-7 sm:h-8 w-[1px] bg-neutral-800" />
            <div className="text-center md:text-right">
              <span className="text-amber-400 text-xl font-bold block">35mm</span>
              <span className="uppercase text-[9px] sm:text-[10px] tracking-wider text-neutral-400">Optical Ratio</span>
            </div>
          </div>
        </section>

        {/* REFINED SPLIT FRAME ARCHIVE EXHIBITION */}
        {/* Left inner frame = Picture, Right inner frame = Why I took the pic & documentation */}
        <div id="split-frame" className="scroll-mt-20">
          <FeaturedSplitFrame
            onSelectPhotoModal={(specimen) => setSelectedSpecimen(specimen)}
          />
        </div>

      </main>

      {/* Fullscreen Darkroom Inspection Lightbox Modal */}
      <UserPhotoModal
        photo={selectedSpecimen}
        onClose={() => setSelectedSpecimen(null)}
        onNext={handleModalNext}
        onPrev={handleModalPrev}
      />

      {/* Direct Contact & Commission Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Exhibition Colophon Footer */}
      <footer className="w-full border-t border-neutral-900 bg-[#060608] py-8 sm:py-10 px-4 sm:px-6 font-mono text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-white font-medium">© 2026 VIKRAM · UNFILTERED ARCHIVES</p>
            <p className="text-neutral-500 text-[11px]">
              35mm Optical Studies & Visual Rationale Documentation
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
              className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
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
