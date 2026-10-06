import React, { useState, useEffect } from 'react';
import { X, Pipette, RotateCcw, Check, Sparkles, Shield } from 'lucide-react';
import { PRESET_COLORS } from '../data/enchantments';
import { normalizeHexValue } from '../utils/commandGenerator';

interface ItemColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentColorHex: string;
  onSave: (colorHex: string) => void;
}

const CURATED_TINTS = [
  { name: 'Pistachio Glow', hex: '#BEF264' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Diamond Cyan', hex: '#55FFFF' },
  { name: 'Ruby Crimson', hex: '#E63946' },
  { name: 'Gold Armor', hex: '#FFD700' },
  { name: 'Emerald Gem', hex: '#2EC4B6' },
  { name: 'Amethyst', hex: '#9B5DE5' },
  { name: 'Nether Fire', hex: '#FF5400' },
  { name: 'Steel Blue', hex: '#457B9D' },
  { name: 'Deep Forest', hex: '#2D6A4F' },
  { name: 'Shadow Obsidian', hex: '#1D1E2C' },
  { name: 'Copper Bronze', hex: '#C67D5A' },
];

export const ItemColorModal: React.FC<ItemColorModalProps> = ({
  isOpen,
  onClose,
  currentColorHex,
  onSave,
}) => {
  const [color, setColor] = useState<string>('#BEF264');

  useEffect(() => {
    if (isOpen) {
      setColor(currentColorHex || '#BEF264');
    }
  }, [isOpen, currentColorHex]);

  if (!isOpen) return null;

  const handleApplyColor = (hex: string) => {
    const normalized = normalizeHexValue(hex);
    if (normalized) {
      setColor(normalized);
    }
  };

  const handleSave = () => {
    onSave(color);
    onClose();
  };

  const handleClear = () => {
    onSave('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#080d08] border border-[#1b2b1b] w-full max-w-md rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#142214] flex items-center justify-between bg-[#040804]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/20">
              <Pipette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">Item Tint Color</h2>
              <p className="text-[11px] text-[#8fa88f]">Tint leather armor, tools, and custom items with RGB metadata</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8fa88f] hover:text-white hover:bg-[#142214] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Visual Showcase Card */}
          <div className="p-4 rounded-xl bg-[#000000] border border-[#1a2b1a] flex items-center gap-4">
            <div className="relative group">
              <div
                className="w-16 h-16 rounded-xl border-2 border-white/20 shadow-2xl flex items-center justify-center transition-all duration-300"
                style={{ backgroundColor: color }}
              >
                <Shield className="w-8 h-8 text-black/60 drop-shadow-md" />
              </div>
            </div>

            <div className="flex-1">
              <span className="text-[11px] font-semibold text-[#8fa88f] block mb-1">
                Active Hex Tint:
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color.startsWith('#') && color.length === 7 ? color : '#BEF264'}
                  onChange={(e) => handleApplyColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  onBlur={() => handleApplyColor(color)}
                  placeholder="#BEF264"
                  className="w-28 font-mono text-sm px-2.5 py-1 rounded-lg bg-[#080d08] border border-[#1f301f] text-white uppercase focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                />
              </div>
            </div>
          </div>

          {/* Curated Tints */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-[#8fa88f] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#bef264]" />
              Popular Game Armor Tints:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {CURATED_TINTS.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => handleApplyColor(t.hex)}
                  className={`p-2 rounded-xl bg-[#000000] border text-left transition-all cursor-pointer group flex flex-col items-center gap-1.5 ${
                    color.toUpperCase() === t.hex.toUpperCase()
                      ? 'border-[#bef264] ring-1 ring-[#bef264]'
                      : 'border-[#182618] hover:border-[#bef264]/40'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full border border-black/50 shadow-sm transition-transform group-hover:scale-110"
                    style={{ backgroundColor: t.hex }}
                  />
                  <span className="text-[10px] text-[#8fa88f] text-center font-medium truncate w-full">
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Extended Swatches */}
          <div className="space-y-1.5 pt-2 border-t border-[#142214]">
            <span className="text-[10px] font-semibold text-[#8fa88f] block">Extended MultiCraft Palette:</span>
            <div className="grid grid-cols-8 gap-1.5">
              {PRESET_COLORS.slice(0, 16).map((hex) => (
                <button
                  key={hex}
                  type="button"
                  onClick={() => handleApplyColor(hex)}
                  title={hex}
                  className={`h-6 rounded-md border transition-transform cursor-pointer ${
                    color.toUpperCase() === hex.toUpperCase()
                      ? 'border-white scale-110 ring-1 ring-[#bef264]'
                      : 'border-black/50 hover:scale-105'
                  }`}
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-[#142214] bg-[#040804] flex items-center justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[#8fa88f] hover:text-white hover:bg-[#121c12] text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Remove Tint</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl text-xs font-medium text-[#8fa88f] hover:text-white hover:bg-[#121c12] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-1.5 rounded-xl bg-[#bef264] hover:bg-[#a3e635] text-black text-xs font-bold shadow-lg shadow-[#bef264]/20 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Apply Color</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
