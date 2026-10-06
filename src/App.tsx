import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  Hash,
  Activity,
  Wrench,
  FileText,
  Bookmark,
  Pipette,
  Sparkles,
  Sliders,
  AlignLeft,
  X,
  Layers,
  ChevronRight,
  Shield,
  Eye,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import { ToastProvider, useToast } from './components/Toast';
import { Header } from './components/Header';
import { CommandBar } from './components/CommandBar';
import { TooltipPreview } from './components/TooltipPreview';
import { ToolCapsModal } from './components/ToolCapsModal';
import { TextEditorModal } from './components/TextEditorModal';
import { ItemColorModal } from './components/ItemColorModal';
import { EnchantmentModal } from './components/EnchantmentModal';
import { CustomItemsModal } from './components/CustomItemsModal';
import { SavedCommandsModal, SavedCommandEntry } from './components/SavedCommandsModal';
import { SaveCommandModal } from './components/SaveCommandModal';
import { ImportModal } from './components/ImportModal';
import { ToolStatsSection } from './components/ToolStatsSection';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Credits } from './components/Credits';
import { SpecialText } from './components/SpecialText';
import { searchItems, getItemDisplayName, ItemEntry } from './utils/itemSearch';
import {
  ItemGeneratorState,
  getDefaultItemState,
  generateCommand,
  buildShareUrl,
  parseShareUrl,
  toRoman,
} from './utils/commandGenerator';
import { ToolCapabilities } from './data/toolStats';

const LOCAL_STORAGE_KEY = 'metadata_generator_state';
const NAMED_COMMANDS_KEY = 'metadata_generator_named_commands';

function MetadataGeneratorApp() {
  const { showToast } = useToast();

  // Primary State
  const [state, setState] = useState<ItemGeneratorState>(() => {
    const fromUrl = parseShareUrl();
    if (fromUrl) return fromUrl;
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...getDefaultItemState(), ...parsed };
      }
    } catch {
      // ignore
    }
    return {
      ...getDefaultItemState(),
      itemName: 'default:pick_diamond',
    };
  });

  const [manualCommand, setManualCommand] = useState<string | null>(null);

  // Saved Commands Library
  const [savedCommands, setSavedCommands] = useState<SavedCommandEntry[]>(() => {
    try {
      const saved = localStorage.getItem(NAMED_COMMANDS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Search & Autocomplete
  const [itemQuery, setItemQuery] = useState(state.itemName);
  const [suggestions, setSuggestions] = useState<ItemEntry[]>([]);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [hintsVisible, setHintsVisible] = useState(true);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSuggestOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Modals
  const [toolCapsOpen, setToolCapsOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const [shortDescOpen, setShortDescOpen] = useState(false);
  const [itemColorOpen, setItemColorOpen] = useState(false);
  const [enchantOpen, setEnchantOpen] = useState(false);
  const [customItemsOpen, setCustomItemsOpen] = useState(false);
  const [savedModalOpen, setSavedModalOpen] = useState(false);
  const [saveNameModalOpen, setSaveNameModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);

  useEffect(() => {
    setItemQuery(state.itemName);
  }, [state.itemName]);

  const handleItemQueryChange = (val: string) => {
    setItemQuery(val);
    setState((prev) => ({ ...prev, itemName: val }));
    setManualCommand(null);

    if (val.trim().length > 0) {
      const results = searchItems(val, 10);
      setSuggestions(results);
      setIsSuggestOpen(results.length > 0);
    } else {
      setSuggestions([]);
      setIsSuggestOpen(false);
    }
  };

  const handleSelectSuggestion = (item: ItemEntry) => {
    setItemQuery(item.id);
    setState((prev) => ({ ...prev, itemName: item.id }));
    setManualCommand(null);
    setIsSuggestOpen(false);
  };

  const handleClearItemInput = () => {
    setItemQuery('');
    setState((prev) => ({ ...prev, itemName: '' }));
    setManualCommand(null);
    setSuggestions([]);
    setIsSuggestOpen(false);
  };

  // Generate Command & Preview
  const { command: generatedCmd, finalDesc } = useMemo(() => {
    return generateCommand(state);
  }, [state]);

  const activeCommand = manualCommand !== null ? manualCommand : generatedCmd;

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const handleSaveNamedCommand = (name: string) => {
    const newEntry: SavedCommandEntry = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      command: activeCommand,
      createdAt: Date.now(),
    };
    const updated = [newEntry, ...savedCommands];
    setSavedCommands(updated);
    try {
      localStorage.setItem(NAMED_COMMANDS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    showToast(`Saved preset "${name}"!`, 'success');
  };

  const handleDeleteSavedCommand = (id: string) => {
    const updated = savedCommands.filter((c) => c.id !== id);
    setSavedCommands(updated);
    try {
      localStorage.setItem(NAMED_COMMANDS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    showToast('Preset deleted', 'info');
  };

  const handleClearAllSaved = () => {
    if (window.confirm('Delete all saved presets?')) {
      setSavedCommands([]);
      localStorage.removeItem(NAMED_COMMANDS_KEY);
      showToast('All presets cleared', 'info');
    }
  };

  const handleLoadSavedCommand = (entry: SavedCommandEntry) => {
    setManualCommand(entry.command);
    showToast(`Loaded "${entry.name}"`, 'success');
  };

  const handleShareUrl = async () => {
    try {
      const shareUrl = buildShareUrl(state);
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        showToast('Shareable URL copied to clipboard!', 'success');
      } else {
        window.prompt('Copy shareable URL:', shareUrl);
      }
    } catch {
      showToast('Failed to generate share link', 'error');
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Reset all item attributes to default?')) {
      const fresh = getDefaultItemState();
      setState(fresh);
      setItemQuery('');
      setManualCommand(null);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      showToast('Settings reset to default', 'info');
    }
  };

  const handleApplyToolStats = (toolName: string, caps: ToolCapabilities) => {
    setState((prev) => ({
      ...prev,
      userToolCapabilities: caps,
    }));
    setManualCommand(null);
  };

  // Health % calculation
  const numericWear = parseInt(state.wear, 10) || 0;
  const healthPercent = Math.max(0, Math.min(100, Math.round((1 - numericWear / 65535) * 100)));

  // Module statuses for the 6 cards in screenshot
  const hasCustomCaps = Object.keys(state.userToolCapabilities || {}).length > 0;
  const hasDescription = !!(state.descriptionContent && state.descriptionContent.trim());
  const hasShortDesc = !!(state.shortDescriptionContent && state.shortDescriptionContent.trim());
  const hasColor = !!state.itemColorHex;
  const enchantCount = Object.keys(state.enchantments || {}).length;
  const hasCustomItems = Object.values(state.customItemsData || {}).some((v) => v !== '' && v !== null);

  return (
    <div className="min-h-screen bg-[#050705] text-white flex flex-col font-sans selection:bg-[#bef264]/30 selection:text-[#bef264]">
      {/* Top Header */}
      <Header
        toolRanksEnabled={state.toolRanksEnabled}
        onToggleToolRanks={(val) => {
          setState((prev) => ({ ...prev, toolRanksEnabled: val }));
          setManualCommand(null);
        }}
        savedCount={savedCommands.length}
        onOpenSavedModal={() => setSavedModalOpen(true)}
        onResetAll={handleResetAll}
        hintsVisible={hintsVisible}
        onToggleHints={() => setHintsVisible(!hintsVisible)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* SECTION 1: Basic Item Configuration (matching screenshot) */}
        <section className="bg-[#080d08] border border-[#1b2b1b] rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl relative z-30">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1.5 rounded-lg bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/20">
              <Layers className="w-4 h-4" />
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Basic Item Configuration
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Item ID or Name */}
            <div ref={searchContainerRef} className="md:col-span-6 relative z-[100]">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-white">Item ID or Name</label>
                <span className="text-[11px] font-mono text-[#8fa88f]">5,660 items searchable</span>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8fa88f]" />
                <input
                  type="text"
                  value={itemQuery}
                  onChange={(e) => handleItemQueryChange(e.target.value)}
                  onFocus={() => {
                    if (suggestions.length > 0) setIsSuggestOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setIsSuggestOpen(false);
                  }}
                  placeholder="default:pick_diamond"
                  className="w-full pl-9 pr-8 py-2 bg-[#000000] border border-[#1f301f] rounded-xl text-xs sm:text-sm text-white font-mono placeholder-[#506850] focus:outline-none focus:ring-1 focus:ring-[#bef264]"
                />
                {itemQuery && (
                  <button
                    type="button"
                    onClick={handleClearItemInput}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8fa88f] hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {hintsVisible && (
                <p className="text-[11px] text-[#8fa88f] mt-1.5">
                  Enter a technical item identifier or type common names to search the Minetest item catalog.
                </p>
              )}

              {/* Autocomplete Dropdown */}
              {isSuggestOpen && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#000000] border-2 border-[#bef264]/40 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto divide-y divide-[#142214] animate-in fade-in duration-100">
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectSuggestion(item)}
                      className="w-full px-3.5 py-2 text-left hover:bg-[#121c12] transition-colors flex items-center justify-between text-xs cursor-pointer group"
                    >
                      <span className="font-semibold text-white group-hover:text-[#bef264]">
                        {item.name}
                      </span>
                      <code className="text-[11px] font-mono text-[#8fa88f] group-hover:text-white">
                        {item.id}
                      </code>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Amount */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Hash className="w-3.5 h-3.5 text-[#bef264]" />
                <label className="text-xs font-semibold text-white">Amount</label>
              </div>

              <input
                type="number"
                min="1"
                max="99"
                value={state.amount}
                onChange={(e) => {
                  setState((prev) => ({ ...prev, amount: e.target.value }));
                  setManualCommand(null);
                }}
                className="w-full py-2 px-3 bg-[#000000] border border-[#1f301f] rounded-xl text-xs sm:text-sm text-white font-mono text-center focus:outline-none focus:ring-1 focus:ring-[#bef264]"
              />

              {hintsVisible && (
                <p className="text-[11px] text-[#8fa88f] mt-1.5">Stack quantity (1 - 99)</p>
              )}
            </div>

            {/* Wear (Durability) */}
            <div className="md:col-span-4">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#bef264]" />
                  <label className="text-xs font-semibold text-white">Wear (Durability)</label>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#bef264]">
                  {healthPercent}% health
                </span>
              </div>

              <input
                type="number"
                min="0"
                max="65535"
                value={state.wear}
                onChange={(e) => {
                  setState((prev) => ({ ...prev, wear: e.target.value }));
                  setManualCommand(null);
                }}
                placeholder="0"
                className="w-full py-2 px-3 bg-[#000000] border border-[#1f301f] rounded-xl text-xs sm:text-sm text-white font-mono text-center focus:outline-none focus:ring-1 focus:ring-[#bef264]"
              />

              {/* Quick Preset Pills (from screenshot) */}
              <div className="flex items-center gap-1 mt-2">
                {[
                  { label: 'Full (0)', val: '0' },
                  { label: '75%', val: '16383' },
                  { label: '50%', val: '32767' },
                  { label: '25%', val: '49151' },
                  { label: '1 hp', val: '65534' },
                ].map((pill) => (
                  <button
                    key={pill.label}
                    type="button"
                    onClick={() => {
                      setState((prev) => ({ ...prev, wear: pill.val }));
                      setManualCommand(null);
                    }}
                    className={`flex-1 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer border ${
                      state.wear === pill.val
                        ? 'bg-[#bef264] text-black border-[#bef264] font-bold'
                        : 'bg-[#000000] text-[#8fa88f] border-[#1f301f] hover:text-white hover:bg-[#142214]'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              {hintsVisible && (
                <p className="text-[11px] text-[#8fa88f] mt-1.5">
                  <SpecialText font="bold">0</SpecialText> is undamaged. <SpecialText font="bold">65535</SpecialText> is fully broken.
                </p>
              )}
            </div>

            {/* Quick Actions & Configuration Module Table */}
            <div className="md:col-span-12 mt-2 pt-4 border-t border-[#182618]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#bef264]" />
                  <span className="text-xs font-bold text-white tracking-tight">Configuration & Preferences</span>
                </div>
                <span className="text-[11px] text-[#8fa88f]">
                  Quick options for <SpecialText font="multicraft">MultiCraft</SpecialText> item generation
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                {/* 1. Tool Ranks Toggle */}
                <button
                  type="button"
                  onClick={() => setState((prev) => ({ ...prev, toolRanksEnabled: !prev.toolRanksEnabled }))}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between group ${
                    state.toolRanksEnabled
                      ? 'bg-[#121c12] border-[#bef264]/40 hover:border-[#bef264] shadow-sm'
                      : 'bg-[#000000] border-[#182618] hover:border-[#2a3e2a]'
                  }`}
                  title="Automatically calculate and append Tool Ranks (Level & Uses) for tools"
                >
                  <div>
                    <span className="text-xs font-bold text-white block group-hover:text-[#bef264] transition-colors">
                      Tool Ranks
                    </span>
                    <span className="text-[10px] text-[#8fa88f]">
                      {state.toolRanksEnabled ? 'Level & Uses active' : 'Disabled'}
                    </span>
                  </div>
                  <span
                    className={`w-3 h-3 rounded-full border border-black/40 transition-all ${
                      state.toolRanksEnabled ? 'bg-[#bef264] shadow-[0_0_8px_#bef264]' : 'bg-[#2b3a2b]'
                    }`}
                  />
                </button>

                {/* 2. Hints Toggle */}
                <button
                  type="button"
                  onClick={() => setHintsVisible(!hintsVisible)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between group ${
                    hintsVisible
                      ? 'bg-[#121c12] border-[#bef264]/40 hover:border-[#bef264] shadow-sm'
                      : 'bg-[#000000] border-[#182618] hover:border-[#2a3e2a]'
                  }`}
                  title="Toggle guidance hints below input fields"
                >
                  <div>
                    <span className="text-xs font-bold text-white block group-hover:text-[#bef264] transition-colors">
                      Field Hints
                    </span>
                    <span className="text-[10px] text-[#8fa88f]">{hintsVisible ? 'Visible' : 'Hidden'}</span>
                  </div>
                  <HelpCircle className={`w-4 h-4 ${hintsVisible ? 'text-[#bef264]' : 'text-[#445844]'}`} />
                </button>

                {/* 3. Saved Presets Library */}
                <button
                  type="button"
                  onClick={() => setSavedModalOpen(true)}
                  className="p-3 rounded-xl border bg-[#000000] border-[#182618] hover:border-[#bef264]/40 hover:bg-[#0c140c] text-left transition-all cursor-pointer flex items-center justify-between group"
                  title="Open library of saved commands"
                >
                  <div>
                    <span className="text-xs font-bold text-white block group-hover:text-[#bef264] transition-colors">
                      Saved Presets
                    </span>
                    <span className="text-[10px] text-[#8fa88f]">
                      {savedCommands.length} command{savedCommands.length !== 1 ? 's' : ''} stored
                    </span>
                  </div>
                  <Bookmark className="w-4 h-4 text-[#bef264] group-hover:scale-110 transition-transform" />
                </button>

                {/* 4. Reset Defaults */}
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="p-3 rounded-xl border bg-[#000000] border-[#182618] hover:border-rose-900/60 hover:bg-[#160c0c] text-left transition-all cursor-pointer flex items-center justify-between group"
                  title="Reset all settings to default"
                >
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors block">
                      Reset All
                    </span>
                    <span className="text-[10px] text-[#8fa88f]">Restore factory defaults</span>
                  </div>
                  <RotateCcw className="w-4 h-4 text-[#8fa88f] group-hover:text-rose-400 group-hover:-rotate-90 transition-all" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Metadata Modules (rearranged exactly like screenshot 3x2 grid) */}
        <section className="bg-[#080d08] border border-[#1b2b1b] rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/20">
                <Sliders className="w-4 h-4" />
              </span>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">Metadata Modules</h2>
            </div>
            <span className="text-xs text-[#8ea38e]">Click any card to configure attributes</span>
          </div>

          <p className="text-xs text-[#8ea38e] mb-4">
            Combine any number of <SpecialText font="bold">metadata</SpecialText> properties. The command and tooltip preview will immediately reflect all active <SpecialText font="chalkboard">modules</SpecialText>.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Card 1: Tool Stats */}
            <div
              onClick={() => setToolCapsOpen(true)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group hover:border-[#bef264]/60 ${
                hasCustomCaps
                  ? 'bg-[#121c12] border-[#bef264]/40 shadow-lg shadow-[#bef264]/5'
                  : 'bg-[#070a07] border-[#182418] hover:bg-[#0c120c]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0f160f] border border-[#213021] flex items-center justify-center mb-2.5 text-[#8ea38e] group-hover:text-[#bef264] group-hover:border-[#bef264]/40 transition-colors">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-[#bef264] transition-colors">
                Tool Stats
              </span>
              <span className="text-[11px] text-[#8ea38e] mt-0.5">
                {hasCustomCaps ? (
                  <span className="text-[#bef264] font-semibold">Configured</span>
                ) : (
                  'Default'
                )}
              </span>
            </div>

            {/* Card 2: Description */}
            <div
              onClick={() => setDescOpen(true)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group hover:border-[#bef264]/60 ${
                hasDescription
                  ? 'bg-[#121c12] border-[#bef264]/40 shadow-lg shadow-[#bef264]/5'
                  : 'bg-[#070a07] border-[#182418] hover:bg-[#0c120c]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0f160f] border border-[#213021] flex items-center justify-center mb-2.5 text-[#8ea38e] group-hover:text-[#bef264] group-hover:border-[#bef264]/40 transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-[#bef264] transition-colors">
                Description
              </span>
              <span className="text-[11px] text-[#8ea38e] mt-0.5 truncate max-w-[120px]">
                {hasDescription ? (
                  <span className="text-[#bef264] font-semibold">Configured</span>
                ) : (
                  'None'
                )}
              </span>
            </div>

            {/* Card 3: Short Desc */}
            <div
              onClick={() => setShortDescOpen(true)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group hover:border-[#bef264]/60 ${
                hasShortDesc
                  ? 'bg-[#121c12] border-[#bef264]/40 shadow-lg shadow-[#bef264]/5'
                  : 'bg-[#070a07] border-[#182418] hover:bg-[#0c120c]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0f160f] border border-[#213021] flex items-center justify-center mb-2.5 text-[#8ea38e] group-hover:text-[#bef264] group-hover:border-[#bef264]/40 transition-colors">
                <AlignLeft className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-[#bef264] transition-colors">
                Short Desc
              </span>
              <span className="text-[11px] text-[#8ea38e] mt-0.5">
                {hasShortDesc ? (
                  <span className="text-[#bef264] font-semibold">Configured</span>
                ) : (
                  'None'
                )}
              </span>
            </div>

            {/* Card 4: Item Color */}
            <div
              onClick={() => setItemColorOpen(true)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group hover:border-[#bef264]/60 ${
                hasColor
                  ? 'bg-[#121c12] border-[#bef264]/40 shadow-lg shadow-[#bef264]/5'
                  : 'bg-[#070a07] border-[#182418] hover:bg-[#0c120c]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0f160f] border border-[#213021] flex items-center justify-center mb-2.5 text-[#8ea38e] group-hover:text-[#bef264] group-hover:border-[#bef264]/40 transition-colors">
                {hasColor ? (
                  <span
                    className="w-5 h-5 rounded-full border border-white/30 shadow-sm"
                    style={{ backgroundColor: state.itemColorHex }}
                  />
                ) : (
                  <Pipette className="w-5 h-5" />
                )}
              </div>
              <span className="text-xs font-bold text-white group-hover:text-[#bef264] transition-colors">
                Item Color
              </span>
              <span className="text-[11px] text-[#8ea38e] mt-0.5">
                {hasColor ? (
                  <span className="text-[#bef264] font-mono font-semibold">{state.itemColorHex}</span>
                ) : (
                  'Default'
                )}
              </span>
            </div>

            {/* Card 5: Enchantments */}
            <div
              onClick={() => setEnchantOpen(true)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group hover:border-[#bef264]/60 ${
                enchantCount > 0
                  ? 'bg-[#121c12] border-[#bef264]/40 shadow-lg shadow-[#bef264]/5'
                  : 'bg-[#070a07] border-[#182418] hover:bg-[#0c120c]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0f160f] border border-[#213021] flex items-center justify-center mb-2.5 text-[#8ea38e] group-hover:text-[#bef264] group-hover:border-[#bef264]/40 transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-[#bef264] transition-colors">
                Enchantments
              </span>
              <div className="mt-0.5">
                {enchantCount > 0 ? (
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-[#1c2e1c] text-[#bef264] border border-[#2d472d]">
                    {enchantCount} Active
                  </span>
                ) : (
                  <span className="text-[11px] text-[#8ea38e]">None</span>
                )}
              </div>
            </div>

            {/* Card 6: Custom Items */}
            <div
              onClick={() => setCustomItemsOpen(true)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group hover:border-[#bef264]/60 ${
                hasCustomItems
                  ? 'bg-[#121c12] border-[#bef264]/40 shadow-lg shadow-[#bef264]/5'
                  : 'bg-[#070a07] border-[#182418] hover:bg-[#0c120c]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0f160f] border border-[#213021] flex items-center justify-center mb-2.5 text-[#8ea38e] group-hover:text-[#bef264] group-hover:border-[#bef264]/40 transition-colors">
                <Sliders className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-[#bef264] transition-colors">
                Custom Items
              </span>
              <span className="text-[11px] text-[#8ea38e] mt-0.5">
                {hasCustomItems ? (
                  <span className="text-[#bef264] font-semibold">Active</span>
                ) : (
                  'None'
                )}
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 3: Official Tool Stats Reference Table (matching screenshot position) */}
        <section>
          <ToolStatsSection onApplyToolPreset={handleApplyToolStats} />
        </section>

        {/* SECTION 4: Generated Command & In-Game Tooltip Preview (bottom section like screenshot) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <CommandBar
              command={activeCommand}
              onCommandChange={(newCmd) => setManualCommand(newCmd)}
              includeSlash={state.includeSlash}
              onToggleSlash={(val) => {
                setState((prev) => ({ ...prev, includeSlash: val }));
                setManualCommand(null);
              }}
              commandMode={state.commandMode || 'giveme'}
              onToggleCommandMode={(mode) => {
                setState((prev) => ({ ...prev, commandMode: mode }));
                setManualCommand(null);
              }}
              playerName={state.playerName || '@s'}
              onPlayerNameChange={(name) => {
                setState((prev) => ({ ...prev, playerName: name }));
                setManualCommand(null);
              }}
              onShareUrl={handleShareUrl}
              onOpenImport={() => setImportModalOpen(true)}
              onOpenSaveModal={() => setSaveNameModalOpen(true)}
              onOpenSavedModal={() => setSavedModalOpen(true)}
              savedCount={savedCommands.length}
            />
          </div>

          <div className="lg:col-span-4">
            <TooltipPreview
              itemName={getItemDisplayName(state.itemName) || state.itemName}
              generatedDescription={finalDesc}
              itemColorHex={state.itemColorHex}
            />
          </div>
        </section>
      </main>

      {/* Modals */}
      <ToolCapsModal
        isOpen={toolCapsOpen}
        onClose={() => setToolCapsOpen(false)}
        caps={state.userToolCapabilities}
        toolRange={state.toolRange}
        dugValue={state.dugValue}
        onSave={(newCaps, newRange, newDug) => {
          setState((prev) => ({
            ...prev,
            userToolCapabilities: newCaps,
            toolRange: newRange,
            dugValue: newDug,
          }));
          setManualCommand(null);
          showToast('Tool capabilities updated!', 'success');
        }}
      />

      <TextEditorModal
        isOpen={descOpen}
        onClose={() => setDescOpen(false)}
        title="Description (Lore) Editor"
        initialText={state.descriptionContent}
        allowBackground={true}
        onSave={(newText) => {
          setState((prev) => ({ ...prev, descriptionContent: newText }));
          setManualCommand(null);
          showToast('Description updated!', 'success');
        }}
      />

      <TextEditorModal
        isOpen={shortDescOpen}
        onClose={() => setShortDescOpen(false)}
        title="Short Description Editor"
        initialText={state.shortDescriptionContent}
        allowBackground={false}
        onSave={(newText) => {
          setState((prev) => ({ ...prev, shortDescriptionContent: newText }));
          setManualCommand(null);
          showToast('Short description updated!', 'success');
        }}
      />

      <ItemColorModal
        isOpen={itemColorOpen}
        onClose={() => setItemColorOpen(false)}
        currentColorHex={state.itemColorHex}
        onSave={(colorHex) => {
          setState((prev) => ({ ...prev, itemColorHex: colorHex }));
          setManualCommand(null);
          showToast(colorHex ? `Tint color set to ${colorHex}` : 'Color tint cleared', 'success');
        }}
      />

      <EnchantmentModal
        isOpen={enchantOpen}
        onClose={() => setEnchantOpen(false)}
        enchantments={state.enchantments}
        onSave={(enchants) => {
          setState((prev) => ({ ...prev, enchantments: enchants }));
          setManualCommand(null);
          showToast('Enchantments updated!', 'success');
        }}
      />

      <CustomItemsModal
        isOpen={customItemsOpen}
        onClose={() => setCustomItemsOpen(false)}
        initialData={state.customItemsData}
        initialVersionEnabled={state.customItemsVersionEnabled}
        onSave={(ciData, vEnabled) => {
          setState((prev) => ({
            ...prev,
            customItemsData: ciData,
            customItemsVersionEnabled: vEnabled,
          }));
          setManualCommand(null);
          showToast('Custom item properties updated!', 'success');
        }}
      />

      <SavedCommandsModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
        savedCommands={savedCommands}
        onLoadCommand={handleLoadSavedCommand}
        onDeleteCommand={handleDeleteSavedCommand}
        onClearAll={handleClearAllSaved}
      />

      <SaveCommandModal
        isOpen={saveNameModalOpen}
        onClose={() => setSaveNameModalOpen(false)}
        defaultName={getItemDisplayName(state.itemName) || state.itemName || 'Custom Item'}
        onSave={handleSaveNamedCommand}
      />

      <ImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImport={(importedState) => {
          setState(importedState);
          setManualCommand(null);
        }}
      />
    </div>
  );
}

function HashRedirectHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.hash) {
      const hashPath = window.location.hash.replace(/^#/, '');
      if (hashPath === '/credits' || hashPath === '/editor') {
        navigate(hashPath, { replace: true });
      }
    }
  }, [navigate]);
  return null;
}

export default function App() {
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <BrowserRouter basename={basename}>
      <HashRedirectHandler />
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/editor" replace />} />
          <Route path="/editor" element={<MetadataGeneratorApp />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="*" element={<Navigate to="/editor" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
