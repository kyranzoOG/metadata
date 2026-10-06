import React from 'react';
import { X, Bookmark, Play, Copy, Trash2, Calendar, FileText } from 'lucide-react';
import { useToast } from './Toast';

export interface SavedCommandEntry {
  id: string;
  name: string;
  command: string;
  createdAt: number;
}

interface SavedCommandsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCommands: SavedCommandEntry[];
  onLoadCommand: (entry: SavedCommandEntry) => void;
  onDeleteCommand: (id: string) => void;
  onClearAll: () => void;
}

export const SavedCommandsModal: React.FC<SavedCommandsModalProps> = ({
  isOpen,
  onClose,
  savedCommands,
  onLoadCommand,
  onDeleteCommand,
  onClearAll,
}) => {
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleCopy = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      showToast('Command copied to clipboard!', 'success');
    } catch {
      showToast('Failed to copy command', 'error');
    }
  };

  const formatDate = (ts: number) => {
    try {
      return new Date(ts).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b100b] border border-[#213021] w-full max-w-2xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#1b271b] flex items-center justify-between bg-[#080d08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/20">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">Saved Commands Library</h2>
              <p className="text-[11px] text-[#8ea38e]">Load or copy previously saved item configurations</p>
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
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {savedCommands.length > 0 ? (
            savedCommands.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-xl bg-[#070a07] border border-[#1b271b] hover:border-[#283b28] transition-all flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{entry.name}</span>
                    <span className="flex items-center gap-1 text-[11px] text-[#8ea38e]">
                      <Calendar className="w-3 h-3" />
                      {formatDate(entry.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onLoadCommand(entry);
                        onClose();
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#bef264] hover:bg-[#a3e635] text-black text-xs font-bold shadow-sm transition-colors cursor-pointer"
                      title="Load into editor"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Load</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(entry.command)}
                      className="p-1.5 rounded-lg text-[#8ea38e] hover:text-white hover:bg-[#162116] transition-colors cursor-pointer"
                      title="Copy command"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteCommand(entry.id)}
                      className="p-1.5 rounded-lg text-[#8ea38e] hover:text-rose-300 hover:bg-rose-950/20 transition-colors cursor-pointer"
                      title="Delete saved command"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="font-mono text-xs text-[#bef264] bg-[#0c120c] p-2.5 rounded-lg border border-[#182418] truncate">
                  {entry.command}
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-[#8ea38e] text-xs">
              <FileText className="w-8 h-8 mx-auto mb-2 text-[#3b4d3b]" />
              <p className="font-medium text-white">No saved commands yet</p>
              <p className="text-[11px] text-[#8ea38e] mt-1">
                Click &quot;Save Preset&quot; in the command bar to store your custom items.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-[#1b271b] bg-[#080d08] flex items-center justify-between">
          {savedCommands.length > 0 ? (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-rose-300 hover:underline transition-colors cursor-pointer"
            >
              Clear All Saved
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-medium text-[#8ea38e] hover:text-white hover:bg-[#162116] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
