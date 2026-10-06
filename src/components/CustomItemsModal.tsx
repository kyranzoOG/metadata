import React, { useState, useEffect } from 'react';
import { X, Sliders, RotateCcw, Check, Sparkles } from 'lucide-react';
import { EFFECT_LABELS } from '../data/enchantments';
import { CustomItemsData, createEmptyCustomItemsData } from '../utils/commandGenerator';

interface CustomItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: CustomItemsData;
  initialVersionEnabled: boolean;
  onSave: (data: CustomItemsData, versionEnabled: boolean) => void;
}

const TOOL_OPTIONS = [
  { value: '', label: 'Unset' },
  { value: 'default:pick_wood', label: 'Wooden Pickaxe' },
  { value: 'default:pick_stone', label: 'Stone Pickaxe' },
  { value: 'default:pick_steel', label: 'Steel Pickaxe' },
  { value: 'default:pick_gold', label: 'Gold Pickaxe' },
  { value: 'default:pick_diamond', label: 'Diamond Pickaxe' },
  { value: 'default:pick_ruby', label: 'Ruby Pickaxe' },
  { value: 'default:axe_wood', label: 'Wooden Axe' },
  { value: 'default:axe_stone', label: 'Stone Axe' },
  { value: 'default:axe_steel', label: 'Steel Axe' },
  { value: 'default:axe_gold', label: 'Gold Axe' },
  { value: 'default:axe_diamond', label: 'Diamond Axe' },
  { value: 'default:axe_ruby', label: 'Ruby Axe' },
  { value: 'default:shovel_wood', label: 'Wooden Shovel' },
  { value: 'default:shovel_stone', label: 'Stone Shovel' },
  { value: 'default:shovel_steel', label: 'Steel Shovel' },
  { value: 'default:shovel_gold', label: 'Gold Shovel' },
  { value: 'default:shovel_diamond', label: 'Diamond Shovel' },
  { value: 'default:shovel_ruby', label: 'Ruby Shovel' },
];

export const CustomItemsModal: React.FC<CustomItemsModalProps> = ({
  isOpen,
  onClose,
  initialData,
  initialVersionEnabled,
  onSave,
}) => {
  const [data, setData] = useState<CustomItemsData>(createEmptyCustomItemsData());
  const [versionEnabled, setVersionEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setData({ ...createEmptyCustomItemsData(), ...(initialData || {}) });
      setVersionEnabled(initialVersionEnabled);
    }
  }, [isOpen, initialData, initialVersionEnabled]);

  if (!isOpen) return null;

  const handleChange = (field: keyof CustomItemsData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setData(createEmptyCustomItemsData());
    setVersionEnabled(false);
  };

  const handleSave = () => {
    onSave(data, versionEnabled);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b100b] border border-[#213021] w-full max-w-2xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#1b271b] flex items-center justify-between bg-[#080d08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/20">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">Custom Items Properties</h2>
              <p className="text-[11px] text-[#8ea38e]">Configure custom_items mod tool bases, speeds, and potion buffs</p>
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
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* Tool Property Multipliers Table */}
          <div className="space-y-2.5">
            <span className="font-semibold text-white text-sm block">Tool Base &amp; Speed Multipliers</span>
            <div className="overflow-x-auto rounded-xl border border-[#1b271b] bg-[#070a07]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1b271b] bg-[#0a0f0a] text-[#8ea38e] text-[11px] font-semibold">
                    <th className="p-3">Group</th>
                    <th className="p-3">Base Tool</th>
                    <th className="p-3">Speed Multiplier</th>
                    <th className="p-3">Durability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#151f15]">
                  {/* Cracky */}
                  <tr>
                    <td className="p-3 font-semibold text-[#bef264]">
                      Cracky <span className="text-[#8ea38e] font-normal">(Stone/Ore)</span>
                    </td>
                    <td className="p-3">
                      <select
                        value={data.cracky_tool}
                        onChange={(e) => handleChange('cracky_tool', e.target.value)}
                        className="w-full bg-[#0e140e] border border-[#213021] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      >
                        {TOOL_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g. 1.5"
                        value={data.cracky_speed}
                        onChange={(e) => handleChange('cracky_speed', e.target.value)}
                        className="w-24 bg-[#0e140e] border border-[#213021] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        placeholder="e.g. 200"
                        value={data.cracky_durability}
                        onChange={(e) => handleChange('cracky_durability', e.target.value)}
                        className="w-24 bg-[#0e140e] border border-[#213021] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </td>
                  </tr>

                  {/* Choppy */}
                  <tr>
                    <td className="p-3 font-semibold text-[#bef264]">
                      Choppy <span className="text-[#8ea38e] font-normal">(Wood/Trees)</span>
                    </td>
                    <td className="p-3">
                      <select
                        value={data.choppy_tool}
                        onChange={(e) => handleChange('choppy_tool', e.target.value)}
                        className="w-full bg-[#0e140e] border border-[#213021] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      >
                        {TOOL_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g. 1.5"
                        value={data.choppy_speed}
                        onChange={(e) => handleChange('choppy_speed', e.target.value)}
                        className="w-24 bg-[#0e140e] border border-[#213021] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        placeholder="e.g. 200"
                        value={data.choppy_durability}
                        onChange={(e) => handleChange('choppy_durability', e.target.value)}
                        className="w-24 bg-[#0e140e] border border-[#213021] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </td>
                  </tr>

                  {/* Crumbly */}
                  <tr>
                    <td className="p-3 font-semibold text-[#bef264]">
                      Crumbly <span className="text-[#8ea38e] font-normal">(Dirt/Sand)</span>
                    </td>
                    <td className="p-3">
                      <select
                        value={data.crumbly_tool}
                        onChange={(e) => handleChange('crumbly_tool', e.target.value)}
                        className="w-full bg-[#0e140e] border border-[#213021] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      >
                        {TOOL_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g. 1.5"
                        value={data.crumbly_speed}
                        onChange={(e) => handleChange('crumbly_speed', e.target.value)}
                        className="w-24 bg-[#0e140e] border border-[#213021] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        placeholder="e.g. 200"
                        value={data.crumbly_durability}
                        onChange={(e) => handleChange('crumbly_durability', e.target.value)}
                        className="w-24 bg-[#0e140e] border border-[#213021] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Effects & Potion Properties */}
          <div className="p-4 rounded-xl bg-[#070a07] border border-[#1b271b] space-y-3.5">
            <span className="font-semibold text-white text-sm block">Status Effects &amp; Consumables</span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-white mb-1">
                  Potion / Visual Effect:
                </label>
                <select
                  value={data.effect}
                  onChange={(e) => handleChange('effect', e.target.value)}
                  className="w-full bg-[#0e140e] border border-[#213021] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                >
                  <option value="">None (Unset)</option>
                  {Object.entries(EFFECT_LABELS).map(([k, label]) => {
                    const cleanKey = k.replace(/^potion_/, '');
                    return (
                      <option key={cleanKey} value={cleanKey}>
                        {label.en}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">
                  Effect Duration (Seconds):
                </label>
                <input
                  type="number"
                  placeholder="e.g. 30"
                  value={data.effect_duration}
                  onChange={(e) => handleChange('effect_duration', e.target.value)}
                  className="w-full bg-[#0e140e] border border-[#213021] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">
                  Light Source Level (0 - 14):
                </label>
                <input
                  type="number"
                  min="0"
                  max="14"
                  placeholder="e.g. 12"
                  value={data.light_source}
                  onChange={(e) => handleChange('light_source', e.target.value)}
                  className="w-full bg-[#0e140e] border border-[#213021] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">
                  Satiation (Hunger Restored):
                </label>
                <input
                  type="number"
                  placeholder="e.g. 4"
                  value={data.satiation}
                  onChange={(e) => handleChange('satiation', e.target.value)}
                  className="w-full bg-[#0e140e] border border-[#213021] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">
                  Poison Severity (Damage):
                </label>
                <input
                  type="number"
                  placeholder="e.g. 2"
                  value={data.poison}
                  onChange={(e) => handleChange('poison', e.target.value)}
                  className="w-full bg-[#0e140e] border border-[#213021] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                />
              </div>
            </div>
          </div>

          {/* Version Flag */}
          <div className="p-3.5 rounded-xl bg-[#070a07] border border-[#1b271b] flex items-center justify-between">
            <div>
              <span className="font-semibold text-white block">Enable /ie In-Game Editing</span>
              <span className="text-[11px] text-[#8ea38e]">
                Appends <code className="text-[#bef264]">custom_items:version 1</code> tag so item properties can be updated live with /ie command
              </span>
            </div>
            <input
              type="checkbox"
              checked={versionEnabled}
              onChange={(e) => setVersionEnabled(e.target.checked)}
              className="w-4 h-4 rounded border-[#213021] bg-[#0e140e] text-[#bef264] focus:ring-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-[#1b271b] bg-[#080d08] flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[#8ea38e] hover:text-rose-300 hover:bg-rose-950/20 text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
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
              <span>Apply Properties</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
