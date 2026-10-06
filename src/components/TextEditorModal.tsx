import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Palette,
  RotateCcw,
  Check,
  Code,
  Eye,
  CornerDownLeft,
  Type,
  Highlighter,
  Eraser,
  Wand2,
} from 'lucide-react';
import { buildTooltipPreviewHtml, applyColorCodeToText, cleanAndDeduplicateFormatting, ESC_RESET } from '../utils/commandGenerator';

interface TextEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialText: string;
  onSave: (text: string) => void;
  allowBackground?: boolean;
}

const COLOR_PALETTE = [
  { name: 'Pistachio', hex: '#BEF264' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Gold', hex: '#FFAA00' },
  { name: 'Yellow', hex: '#FFFF55' },
  { name: 'Aqua', hex: '#55FFFF' },
  { name: 'Emerald', hex: '#55FF55' },
  { name: 'Purple', hex: '#FF55FF' },
  { name: 'Red', hex: '#FF5555' },
  { name: 'Sky Blue', hex: '#5555FF' },
  { name: 'Light Gray', hex: '#AAAAAA' },
  { name: 'Dark Gray', hex: '#555555' },
  { name: 'Black', hex: '#000000' },
];

const BG_PALETTE = [
  { name: 'Pistachio Tint', hex: '#1C2911' },
  { name: 'Deep Slate', hex: '#111811' },
  { name: 'Dark Crimson', hex: '#2A0808' },
  { name: 'Midnight', hex: '#08112A' },
  { name: 'Charcoal', hex: '#1F1F1F' },
  { name: 'Gold Brown', hex: '#2A1F08' },
];

export const TextEditorModal: React.FC<TextEditorModalProps> = ({
  isOpen,
  onClose,
  title,
  initialText,
  onSave,
  allowBackground = true,
}) => {
  const [text, setText] = useState<string>('');
  const [customHex, setCustomHex] = useState<string>('#BEF264');
  const [customBgHex, setCustomBgHex] = useState<string>('#1C2911');
  const [activeColor, setActiveColor] = useState<string>('#BEF264');
  const [activeMode, setActiveMode] = useState<'text' | 'bg'>('text');
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setText(initialText || '');
      setActiveColor('#BEF264');
    }
  }, [isOpen, initialText]);

  if (!isOpen) return null;

  // Single robust color applicator: guarantees no duplicate or stacked codes!
  const handleApplyColor = (hex: string, isBg = false) => {
    const el = textareaRef.current;
    setActiveColor(hex.toUpperCase());

    const start = el ? el.selectionStart : text.length;
    const end = el ? el.selectionEnd : text.length;

    const { newText, newCursorPos } = applyColorCodeToText(text, hex, start, end, isBg);
    setText(newText);

    if (el) {
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(newCursorPos, newCursorPos);
      }, 15);
    }
  };

  // Color whole text helper
  const handleColorEntireText = (hex: string) => {
    const cleanHex = hex.startsWith('#') ? hex.toUpperCase() : `#${hex.toUpperCase()}`;
    const codeTag = `\\u001b(c@${cleanHex})`;
    const cleanRaw = text
      .replace(/\\u001b\([cb]@[^)]+\)/gi, '')
      .replace(/\\u001b[EF]/gi, '');
    const wrapped = cleanAndDeduplicateFormatting(`${codeTag}${cleanRaw}${ESC_RESET}`);
    setText(wrapped);
    setActiveColor(cleanHex);
  };

  const removeColorFromSelection = () => {
    const el = textareaRef.current;
    if (!el) {
      setText(
        text
          .replace(/\\u001b\([cb]@[^)]+\)/gi, '')
          .replace(/\\u001b[EF]/gi, '')
      );
      return;
    }

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = text.substring(start, end);
    let before = text.substring(0, start);
    let after = text.substring(end);

    if (selected.length > 0) {
      const cleanSelected = selected
        .replace(/\\u001b\([cb]@[^)]+\)/gi, '')
        .replace(/\\u001b[EF]/gi, '');

      before = before.replace(/\\u001b\([cb]@[^)]+\)$/i, '');
      after = after.replace(/^\\u001b[EF]/i, '');

      setText(cleanAndDeduplicateFormatting(before + cleanSelected + after));
      const pos = before.length + cleanSelected.length;
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(pos, pos);
      }, 15);
    } else {
      // Remove color code directly surrounding cursor
      before = before.replace(/\\u001b\([cb]@[^)]+\)$/i, '');
      after = after.replace(/^\\u001b[EF]/i, '');
      setText(cleanAndDeduplicateFormatting(before + after));
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(before.length, before.length);
      }, 15);
    }
  };

  const insertResetCode = () => {
    const el = textareaRef.current;
    const code = ESC_RESET;
    if (!el) {
      setText((prev) => prev.replace(/\\u001bE$/, '') + code);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const before = text.substring(0, start).replace(/\\u001bE$/, '');
    const after = text.substring(end);
    setText(before + code + after);
    setTimeout(() => {
      el.focus();
      const pos = before.length + code.length;
      el.setSelectionRange(pos, pos);
    }, 15);
  };

  const insertLineBreak = () => {
    const el = textareaRef.current;
    if (!el) {
      setText((prev) => prev + '\n');
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const before = text.substring(0, start);
    const after = text.substring(end);
    setText(before + '\n' + after);
    setTimeout(() => {
      el.focus();
      const pos = start + 1;
      el.setSelectionRange(pos, pos);
    }, 15);
  };

  const handleClearAllFormatting = () => {
    const stripped = text
      .replace(/\\u001b\([^\)]+\)/g, '')
      .replace(/\\u001b[EF]/g, '')
      .replace(/\u001b\([^\)]+\)/g, '')
      .replace(/\u001b[EF]/g, '');
    setText(stripped);
  };

  const handleSave = () => {
    onSave(text);
    onClose();
  };

  const { html: previewHtml } = buildTooltipPreviewHtml('', text);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#080d08] border border-[#1b2b1b] w-full max-w-2xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#142214] flex items-center justify-between bg-[#040804]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/20">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">{title}</h2>
              <p className="text-[11px] text-[#8fa88f]">
                Apply color formatting to words, lines, or entire descriptions
              </p>
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
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Visual Palette Suite */}
          <div className="p-4 rounded-xl bg-[#000000] border border-[#1a2b1a] space-y-3.5 shadow-inner">
            {/* Mode Switcher & Utility Tools */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 bg-[#080d08] p-0.5 rounded-lg border border-[#1f301f]">
                <button
                  type="button"
                  onClick={() => setActiveMode('text')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    activeMode === 'text'
                      ? 'bg-[#bef264] text-black shadow-sm font-bold'
                      : 'text-[#8fa88f] hover:text-white'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>Text Color</span>
                </button>
                {allowBackground && (
                  <button
                    type="button"
                    onClick={() => setActiveMode('bg')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      activeMode === 'bg'
                        ? 'bg-[#bef264] text-black shadow-sm font-bold'
                        : 'text-[#8fa88f] hover:text-white'
                    }`}
                  >
                    <Highlighter className="w-3.5 h-3.5" />
                    <span>Background</span>
                  </button>
                )}
              </div>

              {/* Utility Badges */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleColorEntireText(activeColor)}
                  disabled={!text.trim()}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-[#080d08] hover:bg-[#142214] text-[#bef264] hover:text-white border border-[#223822] transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Color the entire text with active color"
                >
                  <Wand2 className="w-3 h-3 text-[#bef264]" />
                  <span>Color All Text</span>
                </button>
                <button
                  type="button"
                  onClick={removeColorFromSelection}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-[#080d08] hover:bg-[#142214] text-[#8fa88f] hover:text-white border border-[#1f301f] transition-colors cursor-pointer flex items-center gap-1"
                  title="Remove color tag from selection or cursor"
                >
                  <Eraser className="w-3 h-3 text-[#bef264]" />
                  <span>Clear Color</span>
                </button>
                <button
                  type="button"
                  onClick={insertResetCode}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-[#080d08] hover:bg-[#142214] text-[#bef264] border border-[#1f301f] transition-colors cursor-pointer font-mono"
                  title="Insert format reset tag (\u001bE)"
                >
                  Reset (\u001bE)
                </button>
                <button
                  type="button"
                  onClick={insertLineBreak}
                  className="text-[11px] px-2 py-1 rounded-lg bg-[#080d08] hover:bg-[#142214] text-white border border-[#1f301f] transition-colors cursor-pointer flex items-center gap-1"
                  title="Insert a new line"
                >
                  <CornerDownLeft className="w-3 h-3 text-[#bef264]" />
                  <span>Newline</span>
                </button>
              </div>
            </div>

            {/* Color Swatches Grid */}
            {activeMode === 'text' ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8fa88f] text-[11px]">
                    Click color to apply to selection (or replaces active tag):
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#bef264] bg-[#080d08] px-2 py-0.5 rounded border border-[#1f301f]">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black"
                      style={{ backgroundColor: activeColor }}
                    />
                    <span>Active: {activeColor}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {COLOR_PALETTE.map((swatch) => (
                    <button
                      key={swatch.name}
                      type="button"
                      onClick={() => handleApplyColor(swatch.hex, false)}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer group ${
                        activeColor.toUpperCase() === swatch.hex.toUpperCase()
                          ? 'bg-[#142214] border-[#bef264] ring-1 ring-[#bef264]'
                          : 'bg-[#080d08] hover:bg-[#121c12] border-[#182618] hover:border-[#bef264]/40'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/50 shrink-0 shadow-sm flex items-center justify-center text-[9px] font-bold"
                        style={{ backgroundColor: swatch.hex }}
                      >
                        {activeColor.toUpperCase() === swatch.hex.toUpperCase() && (
                          <span className="text-black">✓</span>
                        )}
                      </span>
                      <span className="text-[11px] font-medium text-white truncate">{swatch.name}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Color Input */}
                <div className="flex items-center gap-3 pt-2 border-t border-[#142214]">
                  <span className="text-[11px] font-semibold text-[#8fa88f]">Custom Hex:</span>
                  <div className="flex items-center gap-2 bg-[#080d08] border border-[#1f301f] rounded-lg px-2.5 py-1">
                    <input
                      type="color"
                      value={customHex}
                      onChange={(e) => setCustomHex(e.target.value)}
                      className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                    />
                    <input
                      type="text"
                      value={customHex}
                      onChange={(e) => setCustomHex(e.target.value)}
                      className="w-20 bg-transparent font-mono text-xs text-white uppercase focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyColor(customHex, false)}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#bef264] text-black font-bold hover:bg-[#a3e635] cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <span className="text-[11px] font-semibold text-[#8fa88f] block">
                  Click to highlight text with background color:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {BG_PALETTE.map((swatch) => (
                    <button
                      key={swatch.name}
                      type="button"
                      onClick={() => handleApplyColor(swatch.hex, true)}
                      className="flex items-center gap-2 p-2 rounded-xl bg-[#080d08] hover:bg-[#121c12] border border-[#182618] hover:border-[#bef264]/40 transition-all text-left group cursor-pointer"
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 shrink-0 shadow-sm"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="text-[11px] font-medium text-white truncate">{swatch.name}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Bg Input */}
                <div className="flex items-center gap-3 pt-2 border-t border-[#142214]">
                  <span className="text-[11px] font-semibold text-[#8fa88f]">Custom Background:</span>
                  <div className="flex items-center gap-2 bg-[#080d08] border border-[#1f301f] rounded-lg px-2.5 py-1">
                    <input
                      type="color"
                      value={customBgHex}
                      onChange={(e) => setCustomBgHex(e.target.value)}
                      className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                    />
                    <input
                      type="text"
                      value={customBgHex}
                      onChange={(e) => setCustomBgHex(e.target.value)}
                      className="w-20 bg-transparent font-mono text-xs text-white uppercase focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyColor(customBgHex, true)}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#bef264] text-black font-bold hover:bg-[#a3e635] cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Textarea Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-white">Lore / Description Content:</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClearAllFormatting}
                  className="text-[11px] text-[#8fa88f] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  title="Strip all color escape codes"
                >
                  <span>Strip All Colors</span>
                </button>
                <span className="text-[#1f301f]">|</span>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-[11px] text-[#bef264] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {showPreview ? <Code className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
                </button>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter item description or lore text..."
              className="w-full font-mono text-xs sm:text-sm p-3.5 rounded-xl bg-[#000000] border border-[#1b2b1b] text-white placeholder-[#506850] focus:outline-none focus:ring-1 focus:ring-[#bef264] resize-y"
            />
          </div>

          {/* Live Preview Pane */}
          {showPreview && (
            <div className="space-y-1.5 animate-in fade-in duration-150">
              <span className="text-[11px] font-semibold text-[#8fa88f] uppercase tracking-wider">
                Live In-Game Tooltip Preview:
              </span>
              <div className="p-3.5 rounded-xl bg-[#000000] border border-[#142214] min-h-[50px] font-mono text-xs sm:text-sm leading-relaxed text-white">
                {text.trim() ? (
                  <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                ) : (
                  <span className="text-[#506850] italic">No description entered</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-[#142214] bg-[#040804] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setText('')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[#8fa88f] hover:text-white hover:bg-[#121c12] text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Text</span>
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
              <span>Apply Description</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
