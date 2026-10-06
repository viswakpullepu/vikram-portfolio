import { useState } from 'react';
import type { SplitFrameSpecimen } from './data/splitFrameData';
import { SPLIT_FRAME_SPECIMENS } from './data/splitFrameData';
import { Navigation } from './components/Navigation';
import { FeaturedSplitFrame } from './components/FeaturedSplitFrame';
import { ColorGallerySection } from './components/ColorGallerySection';
import { UserPhotoModal } from './components/UserPhotoModal';

export function App() {
  const [selectedSpecimen, setSelectedSpecimen] = useState<SplitFrameSpecimen | null>(null);

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
      <Navigation />

      {/* Main Photographic Presentation */}
      <main className="flex-1 w-full pb-16">
        
        {/* Prominent Editorial Header Introduction with Vikram's Profile Picture */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-6 sm:pb-8 border-b border-neutral-900">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-7">
            
            {/* Vikram's Authentic Profile Portrait */}
            <div className="relative flex-shrink-0 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 bg-gradient-to-tr from-amber-500/50 via-neutral-700 to-pink-500/40 shadow-2xl">
                <img
                  src="photos/vikram_profile.jpg"
                  alt="Vikram - Photographer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-xs shadow-md" title="Photographer">
                📷
              </div>
            </div>

            <div className="space-y-4 text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 font-mono text-[11px] sm:text-xs text-amber-400 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Street Photographer · Artist Manifesto</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white font-curved tracking-tight">
                Vikram
              </h1>

              {/* Bold & Stylish Artist Manifesto */}
              <div className="space-y-3.5 max-w-3xl pt-1">
                <p className="font-curved italic text-xl sm:text-2xl lg:text-[28px] font-light text-amber-100/95 leading-relaxed tracking-wide">
                  "I am <span className="font-semibold text-white not-italic font-curved">Vikram</span>, a street photographer driven by <strong className="font-semibold text-amber-300 not-italic">curiosity rather than perfection</strong>. My work is not about creating flawless images; it is about capturing <strong className="font-semibold text-white not-italic">honest moments</strong> that often go unnoticed in the rush of everyday life."
                </p>

                <p className="text-neutral-300 text-xs sm:text-sm md:text-base font-sans font-light leading-relaxed border-l-2 border-amber-500/50 pl-4 py-1 bg-neutral-900/40 rounded-r-lg">
                  While many photographers search for the extraordinary, I am drawn to the ordinary — the fleeting expressions, quiet interactions, imperfect details, and stories hidden in plain sight. I believe <strong className="font-medium text-amber-200">every street has a voice</strong>, and <strong className="font-medium text-white">every frame is an opportunity</strong> to preserve a piece of it.
                </p>
              </div>

              {/* Quick Instagram Badge */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                <a
                  href="https://www.instagram.com/rigzz.iii/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-pink-500/50 hover:bg-neutral-850 font-mono text-[11px] sm:text-xs transition-all shadow-sm"
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

          </div>
        </section>

        {/* REFINED SPLIT FRAME ARCHIVE EXHIBITION */}
        {/* Left inner frame = Picture, Right inner frame = Why I took the pic & documentation */}
        <div id="split-frame" className="scroll-mt-20">
          <FeaturedSplitFrame
            onSelectPhotoModal={(specimen) => setSelectedSpecimen(specimen)}
          />
        </div>

        {/* CURATED COLORFUL WORKS GALLERY SECTION (LOWER SECTION) */}
        <div id="color-gallery" className="scroll-mt-20">
          <ColorGallerySection />
        </div>

      </main>

      {/* Fullscreen Darkroom Inspection Lightbox Modal */}
      <UserPhotoModal
        photo={selectedSpecimen}
        onClose={() => setSelectedSpecimen(null)}
        onNext={handleModalNext}
        onPrev={handleModalPrev}
      />

      {/* Exhibition Colophon Footer */}
      <footer className="w-full border-t border-neutral-900 bg-[#060608] py-8 sm:py-10 px-4 sm:px-6 font-mono text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-white font-medium">© 2026 VIKRAM · UNFILTERED ARCHIVES</p>
            <p className="text-neutral-500 text-[11px]">
              Photographic Works & Visual Archive
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
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
