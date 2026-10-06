import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Code2 } from 'lucide-react';

interface HeaderProps {
  toolRanksEnabled?: boolean;
  onToggleToolRanks?: (enabled: boolean) => void;
  savedCount?: number;
  onOpenSavedModal?: () => void;
  onResetAll?: () => void;
  onToggleHints?: () => void;
  hintsVisible?: boolean;
}

export const Header: React.FC<HeaderProps> = () => {
  const location = useLocation();
  const isEditor = location.pathname === '/' || location.pathname === '/editor';
  const isCredits = location.pathname === '/credits';

  const baseUrl = import.meta.env.BASE_URL || '/';
  const logoSrc = `${baseUrl}assets/metadata_logo.png`.replace(/([^:]\/)\/+/g, '$1');
  const textSrc = `${baseUrl}assets/metadata_text.png`.replace(/([^:]\/)\/+/g, '$1');

  return (
    <header className="border-b border-[#1b251b] bg-[#080b08]/95 backdrop-blur-md sticky top-0 z-40 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Title & Branding */}
        <div className="flex items-center gap-6">
          <Link to="/editor" className="flex items-center gap-3 group transition-opacity hover:opacity-90">
            <img
              src={logoSrc}
              alt="MultiCraft Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(190,242,100,0.3)]"
            />
            <div className="flex items-center gap-2">
              <img
                src={textSrc}
                alt="MultiCraft Item Metadata Generator"
                className="h-8 object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Global Navigation Bar */}
        <nav className="flex items-center gap-2">
          <Link
            to="/editor"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isEditor
                ? 'bg-[#182618] text-[#bef264] border border-[#bef264]/40 shadow-[0_0_12px_rgba(190,242,100,0.2)]'
                : 'text-[#8ea38e] hover:text-white hover:bg-[#121a12] border border-transparent'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </Link>

          <Link
            to="/credits"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isCredits
                ? 'bg-[#182618] text-[#bef264] border border-[#bef264]/40 shadow-[0_0_12px_rgba(190,242,100,0.2)]'
                : 'text-[#8ea38e] hover:text-white hover:bg-[#121a12] border border-transparent'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Credits</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
