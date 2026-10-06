import React, { useState, useEffect } from 'react';
import { X, Wrench, RotateCcw, Check, Sparkles } from 'lucide-react';
import { ToolCapabilities, TOOL_TABLES_DATA, DEFAULT_TOOL_CAPS_DICT, BASE_TOOL_CAPS_DICT } from '../data/toolStats';

interface ToolCapsModalProps {
  isOpen: boolean;
  onClose: () => void;
  caps: ToolCapabilities;
  toolRange: string | number;
  dugValue: string | number;
  onSave: (newCaps: ToolCapabilities, newRange: string | number, newDug: string | number) => void;
}

type TabType = 'weapon' | 'cracky' | 'choppy' | 'crumbly' | 'snappy' | 'drop_level';

export const ToolCapsModal: React.FC<ToolCapsModalProps> = ({
  isOpen,
  onClose,
  caps,
  toolRange,
  dugValue,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('weapon');

  const [fleshyDamage, setFleshyDamage] = useState<string>('');
  const [fullPunchInterval, setFullPunchInterval] = useState<string>('');
  const [weaponUses, setWeaponUses] = useState<string>('');
  const [maxDropLevel, setMaxDropLevel] = useState<string>('');
  const [rangeInput, setRangeInput] = useState<string>('');
  const [dugInput, setDugInput] = useState<string>('');

  const [groupData, setGroupData] = useState<
    Record<
      string,
      {
        maxlevel: string;
        uses: string;
        time1: string;
        time2: string;
        time3: string;
      }
    >
  >({
    cracky: { maxlevel: '', uses: '', time1: '', time2: '', time3: '' },
    choppy: { maxlevel: '', uses: '', time1: '', time2: '', time3: '' },
    crumbly: { maxlevel: '', uses: '', time1: '', time2: '', time3: '' },
    snappy: { maxlevel: '', uses: '', time1: '', time2: '', time3: '' },
  });

  const [selectedPreset, setSelectedPreset] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;

    setFleshyDamage(caps.damage_groups?.fleshy !== undefined && caps.damage_groups?.fleshy !== null ? String(caps.damage_groups.fleshy) : '');
    setFullPunchInterval(caps.full_punch_interval !== undefined && caps.full_punch_interval !== null ? String(caps.full_punch_interval) : '');
    setWeaponUses(caps.punch_attack_uses !== undefined && caps.punch_attack_uses !== null ? String(caps.punch_attack_uses) : '');
    setMaxDropLevel(caps.max_drop_level !== undefined && caps.max_drop_level !== null ? String(caps.max_drop_level) : '');
    setRangeInput(toolRange !== undefined && toolRange !== null ? String(toolRange) : '');
    setDugInput(dugValue !== undefined && dugValue !== null ? String(dugValue) : '');

    const newGroups: typeof groupData = {
      cracky: { maxlevel: '', uses: '', time1: '', time2: '', time3: '' },
      choppy: { maxlevel: '', uses: '', time1: '', time2: '', time3: '' },
      crumbly: { maxlevel: '', uses: '', time1: '', time2: '', time3: '' },
      snappy: { maxlevel: '', uses: '', time1: '', time2: '', time3: '' },
    };

    ['cracky', 'choppy', 'crumbly', 'snappy'].forEach((g) => {
      const gCap = caps.groupcaps?.[g];
      if (gCap) {
        newGroups[g] = {
          maxlevel: gCap.maxlevel !== undefined && gCap.maxlevel !== null ? String(gCap.maxlevel) : '',
          uses: gCap.uses !== undefined && gCap.uses !== null ? String(gCap.uses) : '',
          time1: gCap.times?.[1] !== undefined && gCap.times?.[1] !== null ? String(gCap.times[1]) : '',
          time2: gCap.times?.[2] !== undefined && gCap.times?.[2] !== null ? String(gCap.times[2]) : '',
          time3: gCap.times?.[3] !== undefined && gCap.times?.[3] !== null ? String(gCap.times[3]) : '',
        };
      }
    });

    setGroupData(newGroups);
  }, [isOpen, caps, toolRange, dugValue]);

  if (!isOpen) return null;

  const allToolPresets: { key: string; name: string; category: string; data: ToolCapabilities }[] = [];
  Object.entries(TOOL_TABLES_DATA).forEach(([catKey, rows]) => {
    rows.forEach((r) => {
      const matchingCaps = DEFAULT_TOOL_CAPS_DICT[r.key] || BASE_TOOL_CAPS_DICT;
      allToolPresets.push({
        key: r.key,
        name: r.displayName || r.name,
        category: catKey.toUpperCase(),
        data: matchingCaps || {},
      });
    });
  });

  const handleApplyPreset = (presetKey: string) => {
    const found = allToolPresets.find((p) => p.key === presetKey);
    if (!found || !found.data) return;

    const d = found.data;
    if (d.damage_groups?.fleshy !== undefined) setFleshyDamage(String(d.damage_groups.fleshy));
    if (d.full_punch_interval !== undefined) setFullPunchInterval(String(d.full_punch_interval));
    if (d.punch_attack_uses !== undefined) setWeaponUses(String(d.punch_attack_uses));
    if (d.max_drop_level !== undefined) setMaxDropLevel(String(d.max_drop_level));

    if (d.groupcaps) {
      setGroupData((prev) => {
        const next = { ...prev };
        ['cracky', 'choppy', 'crumbly', 'snappy'].forEach((g) => {
          if (d.groupcaps?.[g]) {
            const gc = d.groupcaps[g];
            next[g] = {
              maxlevel: gc.maxlevel !== undefined && gc.maxlevel !== null ? String(gc.maxlevel) : '',
              uses: gc.uses !== undefined && gc.uses !== null ? String(gc.uses) : '',
              time1: gc.times?.[1] !== undefined && gc.times?.[1] !== null ? String(gc.times[1]) : '',
              time2: gc.times?.[2] !== undefined && gc.times?.[2] !== null ? String(gc.times[2]) : '',
              time3: gc.times?.[3] !== undefined && gc.times?.[3] !== null ? String(gc.times[3]) : '',
            };
          }
        });
        return next;
      });
    }
  };

  const handleResetCurrentTab = () => {
    if (activeTab === 'weapon') {
      setFleshyDamage('');
      setFullPunchInterval('');
      setWeaponUses('');
    } else if (activeTab === 'drop_level') {
      setMaxDropLevel('');
      setRangeInput('');
      setDugInput('');
    } else {
      setGroupData((prev) => ({
        ...prev,
        [activeTab]: { maxlevel: '', uses: '', time1: '', time2: '', time3: '' },
      }));
    }
  };

  const handleSave = () => {
    const parseNum = (v: string) => (v.trim() === '' ? null : parseFloat(v));
    const parseIntNum = (v: string) => (v.trim() === '' ? null : parseInt(v, 10));

    const updatedCaps: ToolCapabilities = {};

    const fleshy = parseNum(fleshyDamage);
    const punchInterval = parseNum(fullPunchInterval);
    const pUses = parseIntNum(weaponUses);

    if (fleshy !== null) updatedCaps.damage_groups = { fleshy };
    if (punchInterval !== null) updatedCaps.full_punch_interval = punchInterval;
    if (pUses !== null) updatedCaps.punch_attack_uses = pUses;

    const mdl = parseIntNum(maxDropLevel);
    if (mdl !== null) updatedCaps.max_drop_level = mdl;

    const groupcaps: Record<string, any> = {};
    ['cracky', 'choppy', 'crumbly', 'snappy'].forEach((g) => {
      const gState = groupData[g];
      const maxlvl = parseIntNum(gState.maxlevel);
      const uses = parseIntNum(gState.uses);
      const t1 = parseNum(gState.time1);
      const t2 = parseNum(gState.time2);
      const t3 = parseNum(gState.time3);

      const hasTimes = t1 !== null || t2 !== null || t3 !== null;
      if (maxlvl !== null || uses !== null || hasTimes) {
        groupcaps[g] = {
          maxlevel: maxlvl,
          uses: uses,
          times: hasTimes ? [null, t1, t2, t3] : null,
        };
      }
    });

    if (Object.keys(groupcaps).length > 0) {
      updatedCaps.groupcaps = groupcaps;
    }

    onSave(updatedCaps, rangeInput.trim(), dugInput.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b100b] border border-[#213021] w-full max-w-2xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-[#1b271b] flex items-center justify-between bg-[#080d08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/20">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">Tool Capabilities &amp; Stats</h2>
              <p className="text-[11px] text-[#8ea38e]">Configure combat damage, harvest levels, and mining speeds</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8ea38e] hover:text-white hover:bg-[#162116] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Preset Selector */}
          <div className="bg-[#070a07] border border-[#1b271b] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Sparkles className="w-4 h-4 text-[#bef264]" />
              <span>Load Tool Preset:</span>
            </div>
            <div className="flex items-center gap-2 flex-1 max-w-xs">
              <select
                value={selectedPreset}
                onChange={(e) => {
                  setSelectedPreset(e.target.value);
                  handleApplyPreset(e.target.value);
                }}
                className="w-full bg-[#0e140e] border border-[#213021] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
              >
                <option value="">Choose preset tool...</option>
                {allToolPresets.map((p) => (
                  <option key={p.key} value={p.key}>
                    [{p.category}] {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-[#1b271b] pb-2 overflow-x-auto text-xs">
            {(
              [
                { id: 'weapon', label: '⚔️ Weapon / Combat' },
                { id: 'cracky', label: '⛏️ Cracky (Mining)' },
                { id: 'choppy', label: '🪓 Choppy (Wood)' },
                { id: 'crumbly', label: '🪵 Crumbly (Digging)' },
                { id: 'snappy', label: '🌿 Snappy (Shearing)' },
                { id: 'drop_level', label: '⚙️ Other & Globals' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#bef264] text-black shadow-sm font-semibold'
                    : 'text-[#8ea38e] hover:text-white hover:bg-[#131d13]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panels */}
          {activeTab === 'weapon' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Fleshy Damage
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={fleshyDamage}
                    onChange={(e) => setFleshyDamage(e.target.value)}
                    placeholder="e.g. 7"
                    className="w-full bg-[#060906] border border-[#213021] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                  />
                  <p className="text-[11px] text-[#8ea38e] mt-1">Direct hit damage on players and mobs</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Attack Speed (Interval)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={fullPunchInterval}
                    onChange={(e) => setFullPunchInterval(e.target.value)}
                    placeholder="e.g. 0.8"
                    className="w-full bg-[#060906] border border-[#213021] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                  />
                  <p className="text-[11px] text-[#8ea38e] mt-1">Punch interval in seconds</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Weapon Punch Uses
                  </label>
                  <input
                    type="number"
                    value={weaponUses}
                    onChange={(e) => setWeaponUses(e.target.value)}
                    placeholder="e.g. 150"
                    className="w-full bg-[#060906] border border-[#213021] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                  />
                  <p className="text-[11px] text-[#8ea38e] mt-1">Strikes before weapon breaks</p>
                </div>
              </div>
            </div>
          )}

          {['cracky', 'choppy', 'crumbly', 'snappy'].includes(activeTab) && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Max Harvest Level
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={groupData[activeTab].maxlevel}
                    onChange={(e) =>
                      setGroupData((prev) => ({
                        ...prev,
                        [activeTab]: { ...prev[activeTab], maxlevel: e.target.value },
                      }))
                    }
                    placeholder="e.g. 3"
                    className="w-full bg-[#060906] border border-[#213021] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                  />
                  <p className="text-[11px] text-[#8ea38e] mt-1">Max block tier minable (1-3+)</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Durability Uses
                  </label>
                  <input
                    type="number"
                    value={groupData[activeTab].uses}
                    onChange={(e) =>
                      setGroupData((prev) => ({
                        ...prev,
                        [activeTab]: { ...prev[activeTab], uses: e.target.value },
                      }))
                    }
                    placeholder="e.g. 60"
                    className="w-full bg-[#060906] border border-[#213021] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                  />
                  <p className="text-[11px] text-[#8ea38e] mt-1">Blocks minable before wear breaks</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  Dig Time per Tier (Seconds)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] text-[#8ea38e] font-mono uppercase">Tier 1</span>
                    <input
                      type="number"
                      step="0.05"
                      value={groupData[activeTab].time1}
                      onChange={(e) =>
                        setGroupData((prev) => ({
                          ...prev,
                          [activeTab]: { ...prev[activeTab], time1: e.target.value },
                        }))
                      }
                      placeholder="e.g. 2.0"
                      className="w-full bg-[#060906] border border-[#213021] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#bef264] mt-1"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8ea38e] font-mono uppercase">Tier 2</span>
                    <input
                      type="number"
                      step="0.05"
                      value={groupData[activeTab].time2}
                      onChange={(e) =>
                        setGroupData((prev) => ({
                          ...prev,
                          [activeTab]: { ...prev[activeTab], time2: e.target.value },
                        }))
                      }
                      placeholder="e.g. 1.2"
                      className="w-full bg-[#060906] border border-[#213021] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#bef264] mt-1"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8ea38e] font-mono uppercase">Tier 3</span>
                    <input
                      type="number"
                      step="0.05"
                      value={groupData[activeTab].time3}
                      onChange={(e) =>
                        setGroupData((prev) => ({
                          ...prev,
                          [activeTab]: { ...prev[activeTab], time3: e.target.value },
                        }))
                      }
                      placeholder="e.g. 0.8"
                      className="w-full bg-[#060906] border border-[#213021] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#bef264] mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'drop_level' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Max Drop Level
                  </label>
                  <input
                    type="number"
                    value={maxDropLevel}
                    onChange={(e) => setMaxDropLevel(e.target.value)}
                    placeholder="e.g. 1"
                    className="w-full bg-[#060906] border border-[#213021] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                  />
                  <p className="text-[11px] text-[#8ea38e] mt-1">Maximum drop collected from nodes</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Tool Reach Range
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={rangeInput}
                    onChange={(e) => setRangeInput(e.target.value)}
                    placeholder="e.g. 4.0"
                    className="w-full bg-[#060906] border border-[#213021] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                  />
                  <p className="text-[11px] text-[#8ea38e] mt-1">Reach range in blocks (default 4.0)</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Dug Uses Override
                  </label>
                  <input
                    type="number"
                    value={dugInput}
                    onChange={(e) => setDugInput(e.target.value)}
                    placeholder="e.g. 1024"
                    className="w-full bg-[#060906] border border-[#213021] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                  />
                  <p className="text-[11px] text-[#8ea38e] mt-1">Calculates tool level &amp; rank in lore</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-[#1b271b] bg-[#080d08] flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetCurrentTab}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[#8ea38e] hover:text-rose-300 hover:bg-rose-950/20 text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Tab</span>
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
              <span>Apply Capabilities</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
