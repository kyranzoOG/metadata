import React, { useState } from 'react';
import { Copy, Check, Share2, Download, BookmarkPlus, Bookmark, Lock, Unlock, User } from 'lucide-react';
import { useToast } from './Toast';
import { SpecialText } from './SpecialText';

interface CommandBarProps {
  command: string;
  onCommandChange: (newCommand: string) => void;
  includeSlash: boolean;
  onToggleSlash: (val: boolean) => void;
  commandMode?: 'giveme' | 'give';
  onToggleCommandMode?: (mode: 'giveme' | 'give') => void;
  playerName?: string;
  onPlayerNameChange?: (name: string) => void;
  onShareUrl: () => void;
  onOpenImport: () => void;
  onOpenSaveModal: () => void;
  onOpenSavedModal: () => void;
  savedCount?: number;
}

export const CommandBar: React.FC<CommandBarProps> = ({
  command,
  onCommandChange,
  includeSlash,
  onToggleSlash,
  commandMode = 'giveme',
  onToggleCommandMode,
  playerName = '@s',
  onPlayerNameChange,
  onShareUrl,
  onOpenImport,
  onOpenSaveModal,
  onOpenSavedModal,
  savedCount = 0,
}) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const handleCopy = async () => {
    if (!command.trim()) {
      showToast('No command generated yet. Enter an Item ID first.', 'error');
      return;
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(command);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = command;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      showToast('Command copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Failed to copy command', 'error');
    }
  };

  const charCount = command.length;

  return (
    <div className="bg-[#080d08] border border-[#1b2b1b] rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#bef264]">&gt;_</span>
          <h2 className="text-sm font-bold text-white tracking-tight">Generated Command</h2>
        </div>

        {/* Command Configuration Toggles */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Command Mode: giveme vs give */}
          <div className="flex items-center bg-[#000000] p-0.5 rounded-lg border border-[#1f301f]">
            <button
              type="button"
              onClick={() => onToggleCommandMode && onToggleCommandMode('giveme')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                commandMode === 'giveme'
                  ? 'bg-[#bef264] text-black shadow-sm font-bold'
                  : 'text-[#8fa88f] hover:text-white'
              }`}
            >
              giveme (Self)
            </button>
            <button
              type="button"
              onClick={() => onToggleCommandMode && onToggleCommandMode('give')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                commandMode === 'give'
                  ? 'bg-[#bef264] text-black shadow-sm font-bold'
                  : 'text-[#8fa88f] hover:text-white'
              }`}
            >
              give (Player)
            </button>
          </div>

          {/* Player Name Input (when in give mode) */}
          {commandMode === 'give' && onPlayerNameChange && (
            <div className="flex items-center gap-1.5 bg-[#000000] border border-[#233823] rounded-lg px-2 py-1">
              <User className="w-3 h-3 text-[#bef264]" />
              <input
                type="text"
                value={playerName}
                onChange={(e) => onPlayerNameChange(e.target.value)}
                placeholder="@s"
                className="w-20 bg-transparent text-[11px] font-mono text-white focus:outline-none placeholder-[#506850]"
              />
            </div>
          )}

          {/* Slash toggle */}
          <button
            type="button"
            onClick={() => onToggleSlash(!includeSlash)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors cursor-pointer ${
              includeSlash
                ? 'bg-[#142214] border-[#bef264]/40 text-[#bef264] font-semibold'
                : 'bg-[#000000] border-[#1f301f] text-[#8fa88f] hover:text-white'
            }`}
          >
            <span>{includeSlash ? 'Prefix: /' : 'No slash'}</span>
          </button>

          {/* Locked / Editable toggle */}
          <button
            type="button"
            onClick={() => setIsEditable(!isEditable)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors cursor-pointer ${
              isEditable
                ? 'bg-[#142214] border-[#bef264]/40 text-[#bef264]'
                : 'bg-[#000000] border-[#1f301f] text-[#8fa88f] hover:text-white'
            }`}
          >
            {isEditable ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            <span>{isEditable ? 'Unlocked' : 'Locked'}</span>
          </button>
        </div>
      </div>

      <p className="text-xs text-[#8fa88f] mb-3">
        Copy and paste directly into in-game chat or server console to spawn the item with all configured <SpecialText font="multicraft">metadata</SpecialText>.
      </p>

      {/* Terminal Display Container */}
      <div className="rounded-xl overflow-hidden border border-[#1b2b1b] bg-[#000000] shadow-inner">
        {/* Terminal Header */}
        <div className="px-3.5 py-2 bg-[#040804] border-b border-[#142214] flex items-center justify-between text-xs font-mono text-[#8fa88f]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#bef264]/60 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#bef264]/30 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffffff]/20 inline-block" />
            </div>
            <span className="text-[11px] text-[#bef264] ml-1">
              terminal - {includeSlash ? '/' : ''}{commandMode}
            </span>
          </div>

          <span className="text-[11px] text-[#8fa88f]">{charCount} characters</span>
        </div>

        {/* Terminal Text Body */}
        <div className="p-3.5">
          <textarea
            rows={3}
            value={command}
            readOnly={!isEditable}
            onChange={(e) => onCommandChange(e.target.value)}
            placeholder="Command will be automatically generated as you configure items..."
            className={`w-full font-mono text-xs sm:text-sm bg-transparent border-0 resize-none focus:outline-none selection:bg-[#bef264]/30 selection:text-[#bef264] ${
              isEditable ? 'text-[#bef264] underline decoration-[#bef264]/40' : 'text-[#bef264]'
            }`}
          />
        </div>
      </div>

      {/* Bottom Action Button Bar */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#142214]">
        <div className="flex flex-wrap items-center gap-2">
          {/* Copy Command */}
          <button
            onClick={handleCopy}
            disabled={!command}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg ${
              copied
                ? 'bg-white text-black'
                : 'bg-[#bef264] hover:bg-[#a3e635] text-black shadow-[#bef264]/20 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Command'}</span>
          </button>

          {/* Share Link */}
          <button
            onClick={onShareUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#000000] hover:bg-[#121c12] border border-[#1f301f] text-white hover:text-[#bef264] text-xs font-medium transition-colors cursor-pointer"
            title="Create and copy a shareable URL to clipboard"
          >
            <Share2 className="w-3.5 h-3.5 text-[#bef264]" />
            <span>Share Link</span>
          </button>

          {/* Import Command */}
          <button
            onClick={onOpenImport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#000000] hover:bg-[#121c12] border border-[#1f301f] text-white hover:text-[#bef264] text-xs font-medium transition-colors cursor-pointer"
            title="Import an existing command into generator"
          >
            <Download className="w-3.5 h-3.5 text-[#bef264]" />
            <span>Import</span>
          </button>
        </div>

        {/* Preset Library Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSaveModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#000000] hover:bg-[#121c12] border border-[#1f301f] text-white hover:text-[#bef264] text-xs font-medium transition-colors cursor-pointer"
            title="Save this command as a reusable preset"
          >
            <BookmarkPlus className="w-3.5 h-3.5 text-[#bef264]" />
            <span>Save Preset</span>
          </button>

          <button
            onClick={onOpenSavedModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#000000] hover:bg-[#121c12] border border-[#1f301f] text-white hover:text-[#bef264] text-xs font-medium transition-colors cursor-pointer"
            title="View saved presets library"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#bef264]" />
            <span>Presets</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#bef264] text-black">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
