import React, { useState, useEffect } from 'react';
import { X, Sparkles, Plus, Trash2, RotateCcw, Check, AlertTriangle } from 'lucide-react';
import { ENCHANTMENT_DEFS, UNVERIFIED_ENCHANT_IDS } from '../data/enchantments';
import { EnchantmentEntry, toRoman } from '../utils/commandGenerator';

interface EnchantmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  enchantments: Record<string, EnchantmentEntry>;
  onSave: (enchants: Record<string, EnchantmentEntry>) => void;
}

export const EnchantmentModal: React.FC<EnchantmentModalProps> = ({
  isOpen,
  onClose,
  enchantments: initialEnchants,
  onSave,
}) => {
  const [activeEnchants, setActiveEnchants] = useState<Record<string, EnchantmentEntry>>({});
  const [selectedType, setSelectedType] = useState<string>('sharpness');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  useEffect(() => {
    if (isOpen) {
      setActiveEnchants({ ...initialEnchants });
    }
  }, [isOpen, initialEnchants]);

  if (!isOpen) return null;

  const currentDef = ENCHANTMENT_DEFS[selectedType];
  const maxLevel = currentDef ? currentDef.maxLevel : 1;
  const isUnverified = UNVERIFIED_ENCHANT_IDS.includes(selectedType);

  const handleAddEnchantment = () => {
    if (!currentDef) return;
    const lvl = Math.min(Math.max(1, selectedLevel), maxLevel);
    const value = currentDef.levels[lvl] !== undefined ? currentDef.levels[lvl] : lvl;

    setActiveEnchants((prev) => ({
      ...prev,
      [selectedType]: { level: lvl, value },
    }));
  };

  const handleRemoveEnchantment = (type: string) => {
    setActiveEnchants((prev) => {
      const next = { ...prev };
      delete next[type];
      return next;
    });
  };

  const handleClearAll = () => {
    setActiveEnchants({});
  };

  const handleSave = () => {
    onSave(activeEnchants);
    onClose();
  };

  const activeCount = Object.keys(activeEnchants).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b100b] border border-[#213021] w-full max-w-2xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#1b271b] flex items-center justify-between bg-[#080d08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">Item Enchantments</h2>
              <p className="text-[11px] text-[#8ea38e]">Apply damage buffs, efficiency, silk touch, and curses</p>
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
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Add Enchantment Control Bar */}
          <div className="p-4 rounded-xl bg-[#070a07] border border-[#1b271b] space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Enchantment Type:
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setSelectedLevel(1);
                  }}
                  className="w-full bg-[#0e140e] border border-[#213021] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                >
                  {Object.entries(ENCHANTMENT_DEFS).map(([key, def]) => (
                    <option key={key} value={key}>
                      {def.name} (Max {toRoman(def.maxLevel)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Tier / Level ({toRoman(selectedLevel)}):
                </label>
                {maxLevel > 1 ? (
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: maxLevel }, (_, i) => i + 1).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSelectedLevel(lvl)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          selectedLevel === lvl
                            ? 'bg-[#bef264] text-black shadow-md'
                            : 'bg-[#0e140e] border border-[#213021] text-[#8ea38e] hover:text-white hover:bg-[#141e14]'
                        }`}
                      >
                        {toRoman(lvl)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-2 rounded-xl bg-[#0e140e] border border-[#213021] text-xs font-mono text-[#8ea38e]">
                    Single Fixed Level (I)
                  </div>
                )}
              </div>
            </div>

            {isUnverified && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#221c08] border border-amber-500/30 text-amber-200 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  Notice: <strong className="font-semibold">{currentDef?.name}</strong> may not be natively supported on all server modpacks.
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={handleAddEnchantment}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#bef264] hover:bg-[#a3e635] text-black text-xs font-bold shadow-lg shadow-[#bef264]/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add / Update Enchantment</span>
            </button>
          </div>

          {/* Active Enchantments List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-2">
                <span>Active Applied Enchantments</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/20">
                  {activeCount}
                </span>
              </span>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs text-rose-300 hover:underline transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {activeCount > 0 ? (
              <div className="space-y-2">
                {Object.entries(activeEnchants).map(([type, data]) => {
                  const def = ENCHANTMENT_DEFS[type];
                  return (
                    <div
                      key={type}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#070a07] border border-[#1b271b] hover:border-[#283b28] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#bef264] shadow-[0_0_8px_#bef264]" />
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {def?.name || type} {def && def.maxLevel > 1 ? toRoman(data.level) : ''}
                          </div>
                          <div className="text-[11px] font-mono text-[#8ea38e]">
                            Meta: <code className="text-[#bef264]">is_{type}={data.value}</code>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveEnchantment(type)}
                        className="p-1.5 rounded-lg text-[#8ea38e] hover:text-rose-300 hover:bg-rose-950/20 transition-colors cursor-pointer"
                        title="Remove enchantment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center rounded-xl border border-dashed border-[#1b271b] text-[#8ea38e] text-xs">
                No enchantments applied yet.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-[#1b271b] bg-[#080d08] flex items-center justify-between">
          <button
            type="button"
            onClick={handleClearAll}
            disabled={activeCount === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[#8ea38e] hover:text-rose-300 hover:bg-rose-950/20 text-xs font-medium transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl text-xs font-medium text-[#8ea38e] hover:text-white hover:bg-[#162116] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-1.5 rounded-xl bg-[#bef264] hover:bg-[#a3e635] text-black text-xs font-bold shadow-lg shadow-[#bef264]/20 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Apply Enchantments</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
