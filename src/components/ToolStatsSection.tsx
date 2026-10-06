import React, { useState } from 'react';
import { Table, ChevronDown, ChevronUp, Search, Zap } from 'lucide-react';
import { TOOL_TABLES_DATA, ToolStatRow, ToolCapabilities, DEFAULT_TOOL_CAPS_DICT, BASE_TOOL_CAPS_DICT } from '../data/toolStats';
import { useToast } from './Toast';
import { SpecialText } from './SpecialText';

interface ToolStatsSectionProps {
  onApplyToolPreset: (toolName: string, caps: ToolCapabilities) => void;
}

type TabKey = 'pick' | 'axe' | 'shovel' | 'sword' | 'other';

const TAB_CONFIG: { key: TabKey; label: string; icon: string }[] = [
  { key: 'pick', label: 'Pickaxes', icon: '⛏️' },
  { key: 'axe', label: 'Axes', icon: '🪓' },
  { key: 'shovel', label: 'Shovels', icon: '🪵' },
  { key: 'sword', label: 'Swords', icon: '⚔️' },
  { key: 'other', label: 'Other Tools', icon: '🪄' },
];

export const ToolStatsSection: React.FC<ToolStatsSectionProps> = ({ onApplyToolPreset }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('pick');
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const currentRows: ToolStatRow[] = TOOL_TABLES_DATA[activeTab] || [];

  const filteredRows = currentRows.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.displayName.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.key.toLowerCase().includes(q)
    );
  });

  const handleApplyRow = (row: ToolStatRow) => {
    let caps = DEFAULT_TOOL_CAPS_DICT[row.key] || BASE_TOOL_CAPS_DICT;
    if (!caps) {
      const parseVal = (arr: string[]) => (arr && arr[0] && arr[0] !== '—' ? parseFloat(arr[0]) : null);
      const parseIntVal = (arr: string[]) => (arr && arr[0] && arr[0] !== '—' ? parseInt(arr[0], 10) : null);

      caps = {
        damage_groups: { fleshy: parseVal(row.damage) },
        full_punch_interval: parseVal(row.attackSpeed),
        punch_attack_uses: parseIntVal(row.punchUses),
        max_drop_level: parseIntVal(row.maxDropLevel),
        groupcaps: {},
      };

      const groupMap: Record<string, string> = {
        Choppy: 'choppy',
        Cracky: 'cracky',
        Crumbly: 'crumbly',
        Snappy: 'snappy',
        伐採: 'choppy',
        採掘: 'cracky',
        掘削: 'crumbly',
        草刈: 'snappy',
      };

      row.groupBadges.forEach((badge) => {
        const gKey = groupMap[badge.displayName] || groupMap[badge.key] || groupMap[badge.text];
        if (gKey && caps.groupcaps) {
          const t1 = parseVal(row.t1);
          const t2 = parseVal(row.t2);
          const t3 = parseVal(row.t3);
          caps.groupcaps[gKey] = {
            maxlevel: parseIntVal(row.maxLevel),
            uses: parseIntVal(row.uses),
            times: [null, t1, t2, t3],
          };
        }
      });
    }

    onApplyToolPreset(row.displayName || row.name, caps);
    showToast(`Loaded preset from ${row.displayName}!`, 'success');
  };

  return (
    <div className="bg-[#0b100b] border border-[#1b271b] rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Accordion Toggle Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-[#101710] select-none transition-colors border-b border-[#182418]"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/20">
            <Table className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Tool Stats Reference &amp; Preset Table
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#182618] text-[#bef264] border border-[#2b3d2b]">
              Official MultiCraft Stats
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#8ea38e]">
          <span>{isOpen ? 'Hide Table' : 'Show Table'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div className="p-5 space-y-4 animate-in fade-in duration-200">
          <p className="text-xs text-[#8ea38e] leading-relaxed">
            Reference standard in-game <SpecialText font="multicraft">tool attributes</SpecialText> including <SpecialText font="italic">digging speeds</SpecialText> across levels, <SpecialText font="bold">durability uses</SpecialText>, attack damage, and punch intervals. Click <SpecialText font="chalkboard">Apply Preset</SpecialText> on any row to import capabilities.
          </p>

          {/* Controls: Tabs & Filter Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            {/* Category Tabs with counts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {TAB_CONFIG.map((t) => {
                const count = (TOOL_TABLES_DATA[t.key] || []).length;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveTab(t.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeTab === t.key
                        ? 'bg-[#bef264] text-black shadow-md font-bold'
                        : 'bg-[#0f160f] text-[#8ea38e] hover:text-white hover:bg-[#182318] border border-[#213021]'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      activeTab === t.key ? 'bg-black/20 text-black' : 'bg-[#182618] text-[#bef264]'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8ea38e]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools in category..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#060906] border border-[#213021] rounded-xl text-xs text-white placeholder-[#546a54] focus:outline-none focus:ring-1 focus:ring-[#bef264]"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-[#1b271b] bg-[#050805]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#182418] bg-[#0a0f0a] text-[#8ea38e] text-[11px] font-semibold">
                  <th className="p-3 whitespace-nowrap">Tool Name</th>
                  <th className="p-3 whitespace-nowrap">Group</th>
                  <th className="p-3 text-center whitespace-nowrap">Time L1</th>
                  <th className="p-3 text-center whitespace-nowrap">Time L2</th>
                  <th className="p-3 text-center whitespace-nowrap">Time L3</th>
                  <th className="p-3 text-center whitespace-nowrap">Max Lv</th>
                  <th className="p-3 text-center whitespace-nowrap">Durability</th>
                  <th className="p-3 text-center whitespace-nowrap">Max Drop</th>
                  <th className="p-3 text-center whitespace-nowrap">Damage</th>
                  <th className="p-3 text-center whitespace-nowrap">Punch Uses</th>
                  <th className="p-3 text-center whitespace-nowrap">Speed</th>
                  <th className="p-3 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#131d13]">
                {filteredRows.length > 0 ? (
                  filteredRows.map((row) => (
                    <tr
                      key={row.key}
                      className="hover:bg-[#0d140d] transition-colors group"
                    >
                      <td className="p-3 font-semibold text-white whitespace-nowrap">
                        {row.displayName}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {row.groupBadges.map((b, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#182618] text-[#bef264] border border-[#2b3d2b]"
                            >
                              {b.displayName || b.text}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-center font-mono text-white whitespace-nowrap">
                        {row.t1[0] || '—'}
                      </td>
                      <td className="p-3 text-center font-mono text-white whitespace-nowrap">
                        {row.t2[0] || '—'}
                      </td>
                      <td className="p-3 text-center font-mono text-white whitespace-nowrap">
                        {row.t3[0] || '—'}
                      </td>
                      <td className="p-3 text-center font-mono text-white whitespace-nowrap">
                        {row.maxLevel[0] || '—'}
                      </td>
                      <td className="p-3 text-center font-mono text-[#bef264] font-bold whitespace-nowrap">
                        {row.uses[0] || '—'}
                      </td>
                      <td className="p-3 text-center font-mono text-white whitespace-nowrap">
                        {row.maxDropLevel[0] || '—'}
                      </td>
                      <td className="p-3 text-center font-mono text-white font-bold whitespace-nowrap">
                        {row.damage[0] || '—'}
                      </td>
                      <td className="p-3 text-center font-mono text-white whitespace-nowrap">
                        {row.punchUses[0] || '—'}
                      </td>
                      <td className="p-3 text-center font-mono text-[#bef264] whitespace-nowrap">
                        {row.attackSpeed[0] ? `${row.attackSpeed[0]}s` : '—'}
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleApplyRow(row)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#142014] hover:bg-[#bef264] text-[#bef264] hover:text-black border border-[#283d28] text-[11px] font-bold transition-all cursor-pointer"
                          title={`Apply ${row.displayName} capabilities`}
                        >
                          <Zap className="w-3 h-3" />
                          <span>Apply</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="p-8 text-center text-[#8ea38e]">
                      No tools found matching &quot;{searchQuery}&quot;
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
