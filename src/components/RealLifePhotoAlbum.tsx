import { useState, useCallback, useEffect } from 'react';
import { REMAINING_ALBUM_PHOTOS, type AlbumPhoto } from '../data/userPhotosData';
import { sound } from '../utils/audio';

interface RealLifePhotoAlbumProps {
  onInspectPhoto?: (photo: AlbumPhoto) => void;
}

interface AlbumSinglePageProps {
  photo?: AlbumPhoto;
  pageNumber: number;
  isRightPage: boolean;
  onPhotoClick?: (photo: AlbumPhoto) => void;
  onTurnPage?: () => void;
  canTurn?: boolean;
}

function AlbumSinglePage({
  photo,
  pageNumber,
  isRightPage,
  onPhotoClick,
  onTurnPage,
  canTurn,
}: AlbumSinglePageProps) {
  return (
    <div 
      className={`album-page-cream p-5 sm:p-7 lg:p-9 flex flex-col justify-between h-full relative select-none transition-shadow ${
        canTurn ? 'cursor-pointer hover:brightness-[0.99]' : ''
      }`}
      style={{
        boxShadow: isRightPage
          ? 'inset -5px 0 12px rgba(0,0,0,0.05), 3px 0 0 -1px #e8decb, 6px 0 0 -2px #ded1bc, 9px 0 0 -3px #cfbfab'
          : 'inset 5px 0 12px rgba(0,0,0,0.05), -3px 0 0 -1px #e8decb, -6px 0 0 -2px #ded1bc, -9px 0 0 -3px #cfbfab',
      }}
      onClick={() => {
        if (canTurn && onTurnPage) {
          onTurnPage();
        }
      }}
    >
      
      {/* Header */}
      <div className="flex items-center justify-between text-neutral-600 text-xs font-mono pb-3 border-b border-neutral-300/70">
        {!isRightPage ? (
          <>
            <span className="tracking-wider text-[10px] uppercase text-neutral-500">
              FIELD SPECIMEN {String(pageNumber).padStart(2, '0')}
            </span>
            <span className="font-handwritten text-lg text-neutral-700">
              p. {pageNumber}
            </span>
          </>
        ) : (
          <>
            <span className="font-handwritten text-lg text-neutral-700">
              p. {pageNumber}
            </span>
            <span className="tracking-wider text-[10px] uppercase text-neutral-500">
              FIELD SPECIMEN {String(pageNumber).padStart(2, '0')}
            </span>
          </>
        )}
      </div>

      {/* Mounted Photo Container */}
      {photo ? (
        <div className="my-auto py-3 flex flex-col items-center">
          
          <div 
            className="relative p-2.5 sm:p-3 bg-white photo-mount-shadow rounded-sm transition-transform duration-300 hover:scale-[1.02] cursor-pointer group max-w-sm w-full"
            style={{
              transform: `rotate(${photo.tiltDeg}deg)`
            }}
            onClick={(e) => {
              e.stopPropagation();
              onPhotoClick && onPhotoClick(photo);
            }}
          >
            {/* 4 Archival Corner Mounting Tabs */}
            <div className="mount-corner-tl" />
            <div className="mount-corner-tr" />
            <div className="mount-corner-bl" />
            <div className="mount-corner-br" />

            {/* Photo Image */}
            <div className="relative overflow-hidden aspect-[4/3] bg-neutral-200">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              {/* Gloss Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none opacity-60" />
            </div>

            {/* Photo Stamp & Inspect */}
            <div className="pt-2 flex items-center justify-between text-[9px] font-mono text-neutral-400">
              <span>{photo.filename}</span>
              <span className="text-amber-700 group-hover:text-amber-900 font-semibold uppercase tracking-wider">
                Click to inspect ↗
              </span>
            </div>
          </div>

          {/* Handwritten Caption */}
          <div className="mt-4 text-center px-4 max-w-xs pointer-events-none">
            <p className="font-handwritten text-xl sm:text-2xl text-neutral-800 leading-tight">
              "{photo.caption}"
            </p>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-neutral-500 font-mono text-[9px] tracking-wider uppercase">
              <span>{photo.location}</span>
              <span>·</span>
              <span>{photo.date}</span>
            </div>
          </div>

        </div>
      ) : (
        <div className="my-auto text-center text-neutral-400 font-mono text-xs">
          Endsheet Blank
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-neutral-500 text-[9px] font-mono pt-3 border-t border-neutral-300/70">
        {!isRightPage ? (
          <>
            <span>VIKRAM ARCHIVES</span>
            <span className="font-handwritten text-sm text-neutral-600">silver gelatin study</span>
          </>
        ) : (
          <>
            <span className="font-handwritten text-sm text-neutral-600">unfiltered archive</span>
            <span>VIKRAM</span>
          </>
        )}
      </div>

      {/* Interactive Dog-Ear Corner Curl to Turn Page */}
      {canTurn && onTurnPage && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onTurnPage();
          }}
          className={`page-corner-curl ${isRightPage ? 'page-corner-curl-br' : 'page-corner-curl-bl'}`}
          title={isRightPage ? 'Turn page forward' : 'Turn page back'}
        />
      )}

    </div>
  );
}

export function RealLifePhotoAlbum({ onInspectPhoto }: RealLifePhotoAlbumProps) {
  const totalSpreads = Math.ceil(REMAINING_ALBUM_PHOTOS.length / 2); // 22 spreads
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<'forward' | 'backward' | null>(null);
  const [isContactSheetOpen, setIsContactSheetOpen] = useState<boolean>(false);
  const [inspectedPhoto, setInspectedPhoto] = useState<AlbumPhoto | null>(null);
  const [mobileActiveSide, setMobileActiveSide] = useState<'left' | 'right'>('left');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Current spread pages
  const currentLeftPhoto: AlbumPhoto | undefined = REMAINING_ALBUM_PHOTOS[currentSpread * 2];
  const currentRightPhoto: AlbumPhoto | undefined = REMAINING_ALBUM_PHOTOS[currentSpread * 2 + 1];

  // Next spread pages (for forward turn animation)
  const nextLeftPhoto: AlbumPhoto | undefined = REMAINING_ALBUM_PHOTOS[(currentSpread + 1) * 2];
  const nextRightPhoto: AlbumPhoto | undefined = REMAINING_ALBUM_PHOTOS[(currentSpread + 1) * 2 + 1];

  // Prev spread pages (for backward turn animation)
  const prevLeftPhoto: AlbumPhoto | undefined = REMAINING_ALBUM_PHOTOS[(currentSpread - 1) * 2];
  const prevRightPhoto: AlbumPhoto | undefined = REMAINING_ALBUM_PHOTOS[(currentSpread - 1) * 2 + 1];

  const handleNextPage = useCallback(() => {
    if (isFlipping || currentSpread >= totalSpreads - 1) return;
    sound.playPageTurn();
    setIsFlipping('forward');
    setTimeout(() => {
      setCurrentSpread((prev) => prev + 1);
      setIsFlipping(null);
    }, 950);
  }, [currentSpread, totalSpreads, isFlipping]);

  const handlePrevPage = useCallback(() => {
    if (isFlipping || currentSpread <= 0) return;
    sound.playPageTurn();
    setIsFlipping('backward');
    setTimeout(() => {
      setCurrentSpread((prev) => prev - 1);
      setIsFlipping(null);
    }, 950);
  }, [currentSpread, isFlipping]);

  // Mobile sequential navigation
  const handleMobileNext = useCallback(() => {
    if (isFlipping) return;
    if (mobileActiveSide === 'left') {
      sound.playPageTurn();
      setMobileActiveSide('right');
    } else {
      if (currentSpread < totalSpreads - 1) {
        handleNextPage();
        setMobileActiveSide('left');
      }
    }
  }, [isFlipping, mobileActiveSide, currentSpread, totalSpreads, handleNextPage]);

  const handleMobilePrev = useCallback(() => {
    if (isFlipping) return;
    if (mobileActiveSide === 'right') {
      sound.playPageTurn();
      setMobileActiveSide('left');
    } else {
      if (currentSpread > 0) {
        handlePrevPage();
        setMobileActiveSide('right');
      }
    }
  }, [isFlipping, mobileActiveSide, currentSpread, handlePrevPage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    
    // Swipe left = next, Swipe right = prev
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        handleMobileNext();
      } else {
        handleMobilePrev();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  const handleJumpSpread = (spreadIdx: number) => {
    if (isFlipping || spreadIdx === currentSpread || spreadIdx < 0 || spreadIdx >= totalSpreads) return;
    sound.playPageTurn();
    setCurrentSpread(spreadIdx);
    setMobileActiveSide('left');
    setIsContactSheetOpen(false);
  };

  const handlePhotoClick = (photo: AlbumPhoto) => {
    sound.playShutter();
    if (onInspectPhoto) {
      onInspectPhoto(photo);
    } else {
      setInspectedPhoto(photo);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight' && e.shiftKey) {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' && e.shiftKey) {
        handlePrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextPage, handlePrevPage]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-800/80 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">
              Tactile Physical Keepsake · Remaining 44 Photos
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight mt-1 font-editorial">
            The Archival Field Album
          </h2>
          <p className="text-neutral-400 text-sm mt-1 max-w-xl font-sans">
            Hand-mounted silver-gelatin & CCD contact prints on heavy cardstock. Complete with archival corner tabs, pencil field notes, and real-paper diagonal corner peeling.
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playFocusTick(1.1);
              setIsContactSheetOpen((prev) => !prev);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 font-mono text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>{isContactSheetOpen ? 'Close Index' : 'Contact Sheet Index'}</span>
          </button>

          <div className="font-mono text-xs text-neutral-400 bg-neutral-900/90 px-3.5 py-1.5 rounded-lg border border-neutral-800">
            <span>Spread </span>
            <span className="text-white font-semibold">{currentSpread + 1}</span>
            <span className="text-neutral-600 mx-1">/</span>
            <span>{totalSpreads}</span>
          </div>
        </div>
      </div>

      {/* QUICK CONTACT SHEET INDEX ACCORDION */}
      {isContactSheetOpen && (
        <div className="mb-8 p-5 bg-neutral-950 rounded-2xl border border-neutral-800 animate-fadeIn">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              Album Contact Sheet · Select any spread to open
            </span>
            <span className="font-mono text-xs text-neutral-500">
              44 Mounted Prints · 22 Double Spreads
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5 max-h-72 overflow-y-auto pr-1">
            {Array.from({ length: totalSpreads }).map((_, sIdx) => {
              const pA = REMAINING_ALBUM_PHOTOS[sIdx * 2];
              const pB = REMAINING_ALBUM_PHOTOS[sIdx * 2 + 1];
              const isActive = sIdx === currentSpread;
              return (
                <button
                  key={sIdx}
                  onClick={() => handleJumpSpread(sIdx)}
                  className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400'
                      : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex gap-1 h-12 w-full mb-1">
                    {pA && <img src={pA.url} alt="" className="w-1/2 h-full object-cover rounded-sm" />}
                    {pB && <img src={pB.url} alt="" className="w-1/2 h-full object-cover rounded-sm" />}
                  </div>
                  <span className="font-mono text-[9px] text-neutral-400 block truncate">
                    Spread {sIdx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* THE PHYSICAL ALBUM BOOK CONTAINER WITH REAL-PAPER FLIP   */}
      {/* ======================================================== */}
      <div className="relative select-none perspective-book">
        
        {/* Physical Album Binder Hardcover */}
        <div className="album-hardcover p-3 sm:p-6 lg:p-8 rounded-3xl relative">
          
          {/* Antiqued Brass Corner Hardware on the 4 Cover Corners */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-600/60 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-600/60 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-600/60 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-600/60 rounded-br-xl pointer-events-none" />

          {/* Foil Debossed Binder Header */}
          <div className="text-center pb-3 sm:pb-4 pt-1 border-b border-amber-900/20">
            <span className="font-cinzel tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-sm text-amber-200/50 uppercase">
              Vikram · Archival Field Album · 2024—2026
            </span>
          </div>

          {/* Mobile Spread Switcher Tabs (< md screens) */}
          <div className="flex md:hidden items-center justify-between bg-black/50 px-2.5 py-1.5 rounded-xl mt-3 border border-neutral-800">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  sound.playPageTurn();
                  setMobileActiveSide('left');
                }}
                className={`px-2.5 py-1 rounded-lg font-mono text-[10px] transition-all cursor-pointer ${
                  mobileActiveSide === 'left'
                    ? 'bg-amber-500/25 text-amber-200 border border-amber-500/60 font-semibold shadow-sm'
                    : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                Left (p. {currentSpread * 2 + 1})
              </button>
              <button
                onClick={() => {
                  sound.playPageTurn();
                  setMobileActiveSide('right');
                }}
                className={`px-2.5 py-1 rounded-lg font-mono text-[10px] transition-all cursor-pointer ${
                  mobileActiveSide === 'right'
                    ? 'bg-amber-500/25 text-amber-200 border border-amber-500/60 font-semibold shadow-sm'
                    : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                Right (p. {currentSpread * 2 + 2})
              </button>
            </div>
            <span className="font-mono text-[9px] text-neutral-400 flex items-center gap-1">
              <span>Swipe ← →</span>
            </span>
          </div>

          {/* TWO-PAGE SPREAD BOOK STAGE (3D PRESERVED) */}
          <div className="relative mt-3 sm:mt-4 rounded-xl shadow-2xl overflow-hidden preserve-3d">
            
            {/* MOBILE SINGLE-PAGE VIEW (< md screens) */}
            <div 
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="block md:hidden relative bg-[#f6f1e8] text-neutral-900 min-h-[460px] rounded-lg overflow-hidden shadow-xl touch-pan-y"
            >
              <AlbumSinglePage
                photo={mobileActiveSide === 'left' ? currentLeftPhoto : currentRightPhoto}
                pageNumber={mobileActiveSide === 'left' ? currentSpread * 2 + 1 : currentSpread * 2 + 2}
                isRightPage={mobileActiveSide === 'right'}
                onPhotoClick={handlePhotoClick}
                onTurnPage={mobileActiveSide === 'left' ? handleMobileNext : handleMobilePrev}
                canTurn={true}
              />
            </div>

            {/* DESKTOP TWO-PAGE SPREAD BOOK GRID (md: and up) */}
            <div className="hidden md:grid md:grid-cols-2 relative bg-[#f6f1e8] text-neutral-900 min-h-[580px] lg:min-h-[640px]">
              
              {/* Spine Center Gutter Crease & Shadow */}
              <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-16 pointer-events-none z-30 album-gutter-shadow" />
              
              {/* Center Stitched Thread Accent */}
              <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-neutral-400/40 z-30" />

              {/* ---------------------------------------------------- */}
              {/* BASE STATIONARY LEFT PAGE                            */}
              {/* ---------------------------------------------------- */}
              <div className="relative h-full border-b md:border-b-0 md:border-r border-neutral-300/80">
                <AlbumSinglePage
                  photo={
                    isFlipping === 'backward'
                      ? prevLeftPhoto
                      : currentLeftPhoto
                  }
                  pageNumber={
                    isFlipping === 'backward'
                      ? (currentSpread - 1) * 2 + 1
                      : currentSpread * 2 + 1
                  }
                  isRightPage={false}
                  onPhotoClick={handlePhotoClick}
                  onTurnPage={handlePrevPage}
                  canTurn={currentSpread > 0 && !isFlipping}
                />

                {/* Left Page Turn Button (Bottom Left) */}
                {currentSpread > 0 && !isFlipping && (
                  <button
                    onClick={handlePrevPage}
                    className="absolute bottom-4 left-4 font-mono text-[11px] text-neutral-600 hover:text-black flex items-center gap-1 transition-colors group z-20 cursor-pointer"
                    title="Turn to previous page"
                  >
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Turn Page Back</span>
                  </button>
                )}

                {/* Cast Shadow during Forward Page Turn Landing on Left Page */}
                {isFlipping === 'forward' && (
                  <div className="absolute inset-0 bg-black/60 pointer-events-none z-30 animate-landing-shadow origin-left" />
                )}

                {/* Uncover reveal shadow on Left Page during Backward Turn */}
                {isFlipping === 'backward' && (
                  <div className="absolute inset-0 bg-black/35 pointer-events-none z-30 animate-uncover-reveal" />
                )}
              </div>

              {/* ---------------------------------------------------- */}
              {/* BASE STATIONARY RIGHT PAGE                           */}
              {/* ---------------------------------------------------- */}
              <div className="relative h-full">
                <AlbumSinglePage
                  photo={
                    isFlipping === 'forward'
                      ? nextRightPhoto
                      : currentRightPhoto
                  }
                  pageNumber={
                    isFlipping === 'forward'
                      ? (currentSpread + 1) * 2 + 2
                      : currentSpread * 2 + 2
                  }
                  isRightPage={true}
                  onPhotoClick={handlePhotoClick}
                  onTurnPage={handleNextPage}
                  canTurn={currentSpread < totalSpreads - 1 && !isFlipping}
                />

                {/* Right Page Turn Button (Bottom Right) */}
                {currentSpread < totalSpreads - 1 && !isFlipping && (
                  <button
                    onClick={handleNextPage}
                    className="absolute bottom-4 right-4 font-mono text-[11px] text-neutral-600 hover:text-black flex items-center gap-1 transition-colors group z-20 cursor-pointer"
                    title="Turn to next page"
                  >
                    <span>Turn Page Forward</span>
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}

                {/* Cast Shadow during Backward Page Turn Landing on Right Page */}
                {isFlipping === 'backward' && (
                  <div className="absolute inset-0 bg-black/60 pointer-events-none z-30 animate-landing-shadow origin-right" />
                )}

                {/* Uncover reveal shadow on Right Page during Forward Turn */}
                {isFlipping === 'forward' && (
                  <div className="absolute inset-0 bg-black/35 pointer-events-none z-30 animate-uncover-reveal" />
                )}
              </div>

            </div>

            {/* ==================================================== */}
            {/* 3D FLIPPING LEAF (FORWARD TURN ANIMATION)            */}
            {/* Leaves from right half, hinged at center spine       */}
            {/* ==================================================== */}
            {isFlipping === 'forward' && (
              <div 
                className="hidden md:block absolute top-0 bottom-0 right-0 w-1/2 preserve-3d origin-left-spine z-40 animate-page-flip-forward pointer-events-none shadow-2xl"
              >
                {/* FRONT FACE OF FLIPPING LEAF (Current Right Page) */}
                <div className="absolute inset-0 backface-hidden bg-[#f6f1e8] shadow-2xl border-l border-neutral-300 overflow-hidden">
                  <AlbumSinglePage
                    photo={currentRightPhoto}
                    pageNumber={currentSpread * 2 + 2}
                    isRightPage={true}
                  />
                  {/* Dynamic Curvature Specular Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-cylinder-shine-forward" />
                  {/* Spine Crease Deep Shadow */}
                  <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* BACK FACE OF FLIPPING LEAF (Next Left Page, Rotated 180deg) */}
                <div 
                  className="absolute inset-0 backface-hidden bg-[#f6f1e8] shadow-2xl border-r border-neutral-300 overflow-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <AlbumSinglePage
                    photo={nextLeftPhoto}
                    pageNumber={(currentSpread + 1) * 2 + 1}
                    isRightPage={false}
                  />
                  {/* Dynamic Curvature Specular Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/35 to-transparent pointer-events-none animate-cylinder-shine-forward" />
                  {/* Spine Crease Deep Shadow */}
                  <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* 3D FLIPPING LEAF (BACKWARD TURN ANIMATION)           */}
            {/* Leaves from left half, hinged at center spine        */}
            {/* ==================================================== */}
            {isFlipping === 'backward' && (
              <div 
                className="hidden md:block absolute top-0 bottom-0 left-0 w-1/2 preserve-3d origin-right-spine z-40 animate-page-flip-backward pointer-events-none shadow-2xl"
              >
                {/* FRONT FACE OF FLIPPING LEAF (Current Left Page) */}
                <div className="absolute inset-0 backface-hidden bg-[#f6f1e8] shadow-2xl border-r border-neutral-300 overflow-hidden">
                  <AlbumSinglePage
                    photo={currentLeftPhoto}
                    pageNumber={currentSpread * 2 + 1}
                    isRightPage={false}
                  />
                  {/* Dynamic Curvature Specular Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-white/10 to-transparent pointer-events-none animate-cylinder-shine-backward" />
                  {/* Spine Crease Deep Shadow */}
                  <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* BACK FACE OF FLIPPING LEAF (Prev Right Page, Rotated 180deg) */}
                <div 
                  className="absolute inset-0 backface-hidden bg-[#f6f1e8] shadow-2xl border-l border-neutral-300 overflow-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <AlbumSinglePage
                    photo={prevRightPhoto}
                    pageNumber={(currentSpread - 1) * 2 + 2}
                    isRightPage={true}
                  />
                  {/* Dynamic Curvature Specular Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-cylinder-shine-backward" />
                  {/* Spine Crease Deep Shadow */}
                  <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
                </div>
              </div>
            )}

          </div>

          {/* Album Bottom Scrubber & Turn Page Buttons */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 px-1 sm:px-2">
            
            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              {/* Prev Page Button */}
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    handleMobilePrev();
                  } else {
                    handlePrevPage();
                  }
                }}
                disabled={(currentSpread === 0 && mobileActiveSide === 'left') || isFlipping !== null}
                className={`flex-1 sm:flex-initial px-3.5 sm:px-5 py-2.5 rounded-xl font-mono text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  (currentSpread === 0 && mobileActiveSide === 'left') || isFlipping !== null
                    ? 'bg-neutral-900/40 text-neutral-600 border border-neutral-900 cursor-not-allowed'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 shadow-md active:scale-95'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Turn Back</span>
              </button>

              {/* Next Page Button */}
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    handleMobileNext();
                  } else {
                    handleNextPage();
                  }
                }}
                disabled={(currentSpread >= totalSpreads - 1 && mobileActiveSide === 'right') || isFlipping !== null}
                className={`flex-1 sm:flex-initial px-3.5 sm:px-5 py-2.5 rounded-xl font-mono text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  (currentSpread >= totalSpreads - 1 && mobileActiveSide === 'right') || isFlipping !== null
                    ? 'bg-neutral-900/40 text-neutral-600 border border-neutral-900 cursor-not-allowed'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 shadow-md active:scale-95'
                }`}
              >
                <span>Turn Forward</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Interactive Spread Slider */}
            <div className="flex items-center gap-3 w-full sm:w-80">
              <span className="font-mono text-[10px] text-neutral-400">01</span>
              <input
                type="range"
                min={0}
                max={totalSpreads - 1}
                value={currentSpread}
                disabled={isFlipping !== null}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val !== currentSpread && !isFlipping) {
                    handleJumpSpread(val);
                  }
                }}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:opacity-50"
              />
              <span className="font-mono text-[10px] text-neutral-400">{String(totalSpreads).padStart(2, '0')}</span>
            </div>

          </div>

        </div>

      </div>

      {/* INSPECT MODAL (LIGHTBOX FOR ALBUM PHOTO) */}
      {inspectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none"
          onClick={() => setInspectedPhoto(null)}
        >
          <div 
            className="max-w-4xl w-full bg-[#101014] rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl relative p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInspectedPhoto(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white bg-neutral-900 p-2 rounded-full border border-neutral-800 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-2/3 max-h-[560px] flex items-center justify-center bg-black/60 rounded-xl p-2 border border-neutral-800">
                <img
                  src={inspectedPhoto.url}
                  alt={inspectedPhoto.caption}
                  className="max-h-[500px] w-auto object-contain rounded"
                />
              </div>
              <div className="w-full md:w-1/3 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-amber-500 uppercase tracking-widest block mb-1">
                    Archival Album Specimen
                  </span>
                  <h3 className="text-xl font-light text-white font-editorial mb-3">
                    {inspectedPhoto.caption}
                  </h3>
                  <div className="space-y-2 text-xs font-mono text-neutral-400 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                    <p><span className="text-neutral-500">File:</span> {inspectedPhoto.filename}</p>
                    <p><span className="text-neutral-500">Date:</span> {inspectedPhoto.date}</p>
                    <p><span className="text-neutral-500">Location:</span> {inspectedPhoto.location}</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
                  <button
                    onClick={() => setInspectedPhoto(null)}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-mono text-xs border border-neutral-700 cursor-pointer"
                  >
                    Return to Album
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
