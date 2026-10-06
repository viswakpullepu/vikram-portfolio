import React from 'react';

export const Navigation: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080a]/90 backdrop-blur-md border-b border-neutral-800/80 px-3.5 sm:px-6 md:px-12 py-3 md:py-4 flex items-center justify-between select-none">
      
      {/* Photographer Name & Discipline */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div>
          <span
            className="text-sm sm:text-base md:text-lg font-bold tracking-widest text-neutral-100 uppercase"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            VIKRAM
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-400 block truncate">
            PHOTOGRAPHER · VISUAL ARCHIVES
          </span>
        </div>
      </div>

      {/* Right Controls & Social Links */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Email Direct Contact */}
        <a
          href="mailto:Theorygod287@gmail.com"
          className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-900/90 hover:bg-neutral-850 px-2.5 sm:px-3 py-1.5 rounded-lg border border-neutral-800 hover:border-amber-500/40 transition-all cursor-pointer"
          title="Email Theorygod287@gmail.com"
        >
          <svg className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          <span className="font-semibold text-amber-300">Theorygod287@gmail.com</span>
        </a>

        {/* Instagram Profile Link */}
        <a
          href="https://www.instagram.com/rigzz.iii/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-900/90 hover:bg-neutral-850 px-2.5 sm:px-3 py-1.5 rounded-lg border border-neutral-800 hover:border-pink-500/40 transition-all cursor-pointer"
          title="Vikram's Instagram @rigzz.iii"
        >
          <svg className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span className="font-semibold text-pink-300">@rigzz.iii</span>
        </a>
      </div>

    </header>
  );
};
