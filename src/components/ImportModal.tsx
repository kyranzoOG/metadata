import React, { useState } from 'react';
import { X, Download, AlertCircle, Check } from 'lucide-react';
import { parseAndImportCommand, ItemGeneratorState } from '../utils/commandGenerator';
import { useToast } from './Toast';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (state: ItemGeneratorState) => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onImport }) => {
  const [commandText, setCommandText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleExecuteImport = () => {
    setError(null);
    try {
      const state = parseAndImportCommand(commandText);
      onImport(state);
      showToast('Command successfully imported!', 'success');
      setCommandText('');
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to parse command');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b100b] border border-[#213021] w-full max-w-xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#1b271b] flex items-center justify-between bg-[#080d08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/20">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">Import /giveme Command</h2>
              <p className="text-[11px] text-[#8ea38e]">Paste any existing command to restore its full item metadata</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8ea38e] hover:text-white hover:bg-[#162116] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-white mb-1.5">
              Paste MultiCraft / Minetest Command:
            </label>
            <textarea
              rows={4}
              value={commandText}
              onChange={(e) => {
                setCommandText(e.target.value);
                if (error) setError(null);
              }}
              placeholder={'/giveme default:sword_diamond 1 0 "\\u0001description\\u0002..."'}
              className="w-full font-mono text-xs sm:text-sm p-3.5 rounded-xl bg-[#060906] border border-[#213021] text-white focus:outline-none focus:ring-1 focus:ring-[#bef264] resize-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#220d0d] border border-rose-500/30 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-[#1b271b] bg-[#080d08] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-medium text-[#8ea38e] hover:text-white hover:bg-[#162116] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExecuteImport}
            disabled={!commandText.trim()}
            className="flex items-center gap-2 px-5 py-1.5 rounded-xl bg-[#bef264] hover:bg-[#a3e635] text-black text-xs font-bold shadow-lg shadow-[#bef264]/20 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Check className="w-4 h-4" />
            <span>Import &amp; Load</span>
          </button>
        </div>
      </div>
    </div>
  );
};
