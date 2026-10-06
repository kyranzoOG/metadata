import React, { useMemo } from 'react';
import { Eye, Info, Sparkles } from 'lucide-react';
import { buildTooltipPreviewHtml, getBrightness } from '../utils/commandGenerator';

interface TooltipPreviewProps {
  itemName: string;
  generatedDescription: string;
  itemColorHex: string;
}

export const TooltipPreview: React.FC<TooltipPreviewProps> = ({
  itemName,
  generatedDescription,
  itemColorHex,
}) => {
  const { html, firstBackground } = useMemo(() => {
    return buildTooltipPreviewHtml(itemName, generatedDescription, itemColorHex);
  }, [itemName, generatedDescription, itemColorHex]);

  const customBgStyle: React.CSSProperties = {};
  let isLightBg = false;

  if (firstBackground) {
    customBgStyle.backgroundColor = firstBackground;
    const brightness = getBrightness(firstBackground);
    isLightBg = brightness > 128;
  }

  const hasContent = itemName || generatedDescription;

  return (
    <div className="bg-[#080d08] border border-[#1b2b1b] rounded-2xl p-5 shadow-2xl backdrop-blur-xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#bef264]" />
          <span className="text-sm font-bold text-white tracking-tight">In-Game Tooltip Preview</span>
        </div>
        <span className="text-[11px] text-[#bef264] flex items-center gap-1 font-mono">
          <Sparkles className="w-3 h-3 text-[#bef264]" />
          Live
        </span>
      </div>

      {/* Tooltip Display Area */}
      <div className="flex-1 min-h-[140px] flex items-center justify-center p-3 rounded-xl bg-[#000000] border border-[#142214]">
        {hasContent ? (
          <div
            style={customBgStyle}
            className={`w-full max-w-md p-4 rounded-xl shadow-2xl border transition-all duration-200 font-sans text-xs sm:text-sm leading-relaxed ${
              firstBackground
                ? isLightBg
                  ? 'border-slate-400 text-slate-900'
                  : 'border-[#223322] text-white'
                : 'bg-[#0a100a]/95 border-[#203320] text-white shadow-[#bef264]/5 ring-1 ring-white/10'
            }`}
          >
            <div
              className="space-y-1 break-words font-mono text-[13px]"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        ) : (
          <div className="text-center py-6 px-4 text-[#8fa88f] text-xs">
            <Info className="w-6 h-6 mx-auto mb-2 text-[#405440]" />
            <p className="text-white font-medium">Tooltip preview will appear here</p>
            <p className="text-[11px] text-[#8fa88f] mt-1">
              Select an item ID, add enchantments, or customize tool capabilities
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-[#142214] flex items-center justify-between text-[11px] text-[#8fa88f]">
        <span>MultiCraft visual rendering</span>
        {itemColorHex && (
          <span className="flex items-center gap-1.5 font-mono text-white">
            <span
              className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
              style={{ backgroundColor: itemColorHex }}
            />
            {itemColorHex}
          </span>
        )}
      </div>
    </div>
  );
};
