import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { SpecialText } from './SpecialText';
import { ArrowLeft, Sparkles, Award, Heart, Terminal, ExternalLink } from 'lucide-react';

export const Credits: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050705] text-white flex flex-col font-sans selection:bg-[#bef264]/30 selection:text-[#bef264]">
      {/* Universal Top Navigation Bar */}
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in duration-200">
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <Link
            to="/editor"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0e160e] hover:bg-[#182618] text-[#8fa88f] hover:text-[#bef264] border border-[#1b2b1b] hover:border-[#bef264]/40 text-xs font-semibold transition-all cursor-pointer group shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Editor</span>
          </Link>

          <span className="text-[11px] font-mono uppercase tracking-wider text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/20 px-2.5 py-0.5 rounded-full">
            Project Attributions
          </span>
        </div>

        {/* Hero Card */}
        <section className="bg-[#080d08] border border-[#1b2b1b] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#bef264]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3.5 mb-6">
            <div className="p-1.5 rounded-xl bg-[#bef264]/10 border border-[#bef264]/30 flex items-center justify-center">
              <img
                src={`${import.meta.env.BASE_URL || '/'}assets/metadata_logo.png`.replace(/([^:]\/)\/+/g, '$1')}
                alt="MultiCraft Logo"
                className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(190,242,100,0.3)]"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Credits & Contributors
              </h1>
              <p className="text-xs text-[#8fa88f] mt-0.5">
                The history and people behind the MultiCraft Metadata Generator
              </p>
            </div>
          </div>

          {/* Primary Statement */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#030603] border border-[#172517] space-y-4 leading-relaxed text-sm sm:text-base text-gray-200 shadow-inner">
            <p>
              MultiCraft Metadata Editor was originally created by{' '}
              <SpecialText font="multicraft" className="text-base sm:text-lg">
                multi_nono
              </SpecialText>{' '}
              and later modified by{' '}
              <SpecialText font="multicraft" className="text-base sm:text-lg">
                dark
              </SpecialText>
              .
            </p>
            <p>
              <SpecialText font="multicraft" className="text-base sm:text-lg">
                kyranzo
              </SpecialText>{' '}
              then rewritten the project in typescript to make it significantly faster.
            </p>
          </div>
        </section>

        {/* Typography & Font Showcase */}
        <section className="bg-[#080d08] border border-[#1b2b1b] rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-4 h-4 text-[#bef264]" />
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Font Styles & Text Highlights
            </h2>
          </div>
          <p className="text-xs text-[#8fa88f]">
            Curated typography styles used across the generator to emphasize special terms and commands:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#030603] border border-[#182618] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#8fa88f] block mb-0.5">MultiCraft Official Font</span>
                <SpecialText font="multicraft" className="text-sm sm:text-base">
                  MultiCraft Pixel
                </SpecialText>
              </div>
              <span className="text-[10px] font-mono text-[#8fa88f] bg-[#0c120c] px-2 py-1 rounded border border-[#1b2b1b]">
                In-game Pixel
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#030603] border border-[#182618] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#8fa88f] block mb-0.5">Chalkboard Handwritten</span>
                <SpecialText font="chalkboard" className="text-base sm:text-lg">
                  Chalkboard Script
                </SpecialText>
              </div>
              <span className="text-[10px] font-mono text-[#8fa88f] bg-[#0c120c] px-2 py-1 rounded border border-[#1b2b1b]">
                Architects Daughter
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#030603] border border-[#182618] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#8fa88f] block mb-0.5">Bold Impact Display</span>
                <SpecialText font="bold" className="text-sm sm:text-base">
                  Heavy Bold Montserrat
                </SpecialText>
              </div>
              <span className="text-[10px] font-mono text-[#8fa88f] bg-[#0c120c] px-2 py-1 rounded border border-[#1b2b1b]">
                900 Weight
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#030603] border border-[#182618] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#8fa88f] block mb-0.5">Italic Editorial Serif</span>
                <SpecialText font="italic" className="text-base sm:text-lg">
                  Playfair Display Italic
                </SpecialText>
              </div>
              <span className="text-[10px] font-mono text-[#8fa88f] bg-[#0c120c] px-2 py-1 rounded border border-[#1b2b1b]">
                Serif Italic
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#030603] border border-[#182618] flex items-center justify-between sm:col-span-2">
              <div>
                <span className="text-[11px] text-[#8fa88f] block mb-0.5">Skinny Minimal Thin</span>
                <SpecialText font="skinny" className="text-sm sm:text-base">
                  Skinny Clean Montserrat Thin
                </SpecialText>
              </div>
              <span className="text-[10px] font-mono text-[#8fa88f] bg-[#0c120c] px-2 py-1 rounded border border-[#1b2b1b]">
                200 Light
              </span>
            </div>
          </div>
        </section>

        {/* References Footer */}
        <div className="pt-2 text-center text-xs text-[#506850]">
          <p>MultiCraft is an open-source sandbox game engine compatible with Minetest.</p>
        </div>
      </main>
    </div>
  );
};
