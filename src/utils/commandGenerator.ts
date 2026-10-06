import LZString from 'lz-string';
import { ENCHANTMENT_DEFS, UNVERIFIED_ENCHANT_IDS } from '../data/enchantments';
import { TOOL_DEFAULT_USES, ToolCapabilities } from '../data/toolStats';

export interface CustomItemsData {
  cracky_tool: string;
  cracky_speed: string;
  cracky_durability: string;
  choppy_tool: string;
  choppy_speed: string;
  choppy_durability: string;
  crumbly_tool: string;
  crumbly_speed: string;
  crumbly_durability: string;
  effect: string;
  effect_duration: string;
  satiation: string;
  poison: string;
  light_source: string;
}

export const createEmptyCustomItemsData = (): CustomItemsData => ({
  cracky_tool: '',
  cracky_speed: '',
  cracky_durability: '',
  choppy_tool: '',
  choppy_speed: '',
  choppy_durability: '',
  crumbly_tool: '',
  crumbly_speed: '',
  crumbly_durability: '',
  effect: '',
  effect_duration: '',
  satiation: '',
  poison: '',
  light_source: '',
});

export interface EnchantmentEntry {
  level: number;
  value: number;
}

export interface ItemGeneratorState {
  itemName: string;
  amount: string;
  wear: string;
  descriptionContent: string;
  shortDescriptionContent: string;
  itemColorHex: string;
  userToolCapabilities: ToolCapabilities;
  enchantments: Record<string, EnchantmentEntry>;
  toolRange: string | number;
  dugValue: string | number;
  includeSlash: boolean;
  commandMode?: 'giveme' | 'give';
  playerName?: string;
  toolRanksEnabled: boolean;
  customItemsData: CustomItemsData;
  customItemsVersionEnabled: boolean;
  enchantDescSuffix?: string;
}

export const getDefaultItemState = (): ItemGeneratorState => ({
  itemName: '',
  amount: '1',
  wear: '0',
  descriptionContent: '',
  shortDescriptionContent: '',
  itemColorHex: '',
  userToolCapabilities: {},
  enchantments: {},
  toolRange: '',
  dugValue: '',
  includeSlash: false,
  commandMode: 'giveme',
  playerName: '@s',
  toolRanksEnabled: true,
  customItemsData: createEmptyCustomItemsData(),
  customItemsVersionEnabled: false,
  enchantDescSuffix: '',
});

export const ESC_LITERAL_SEQUENCE = '\\u001b';
export const ESC_ACTUAL = '\u001b';
export const ESC_RESET_LITERAL = `${ESC_LITERAL_SEQUENCE}E`;
export const literalFormattingPattern = /\\u001b\((?:c|b|T)@/;
export const DEFAULT_TRANSLATION_ACTUAL = `${ESC_ACTUAL}(T@default)`;
export const translationCodeActualPattern = /\u001b\(T@[A-Za-z0-9_]+\)/;
export const HEX_PATTERN = /^#?([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
export const MAX_FLOAT_VALUE = 1.7976931348623157e308;

export function normalizeHexValue(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!HEX_PATTERN.test(trimmed)) return null;
  return trimmed.startsWith('#') ? trimmed.toUpperCase() : `#${trimmed.toUpperCase()}`;
}

export function toRoman(num: number | string): string {
  const n = parseInt(String(num), 10);
  if (isNaN(n) || n < 1) return String(num);
  const roman: Record<string, number> = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let cur = n;
  let str = '';
  for (const [k, v] of Object.entries(roman)) {
    const q = Math.floor(cur / v);
    cur -= q * v;
    str += k.repeat(q);
  }
  return str;
}

export function calculateToolLevel(uses: number | null | undefined): number {
  if (uses === null || uses === undefined) return 1;
  if (!Number.isFinite(uses)) return 16;
  if (uses <= 0) return 1;
  if (uses < 64) return 1;
  const baseLevel = Math.floor(Math.log2(uses)) - 6;
  if (!Number.isFinite(baseLevel)) return 16;
  return Math.max(1, Math.min(16, baseLevel));
}

export function formatUsesValue(uses: number | null | undefined): string {
  if (uses === null || uses === undefined) return '';
  if (!Number.isFinite(uses) || uses > MAX_FLOAT_VALUE) {
    return uses < 0 ? '-inf' : 'inf';
  }
  if (uses === 0) return '0';
  const sign = uses < 0 ? '-' : '';
  const absValue = Math.abs(uses);
  if (absValue >= 1e13) {
    const expString = absValue.toExponential(12);
    const [mantissaRaw, exponent] = expString.split('e');
    const mantissa = mantissaRaw.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
    if (mantissa === '1') {
      return `${sign}1e${exponent}`;
    }
    return `${sign}${mantissa}e${exponent}`;
  }
  if (Number.isInteger(uses)) {
    return `${uses}`;
  }
  let plain = `${absValue}`;
  if (plain.includes('e')) {
    return `${sign}${plain}`;
  }
  plain = plain.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
  return `${sign}${plain}`;
}

export const ESC = String.fromCharCode(0x1b);
export const ESC_RESET = `${ESC}E`;

// Updated pattern to use actual escape character
const colorPattern = new RegExp(`${ESC}\\([cb]@[^)]+\\)`, 'gi');
const actualFormattingPattern = new RegExp(`${ESC}[EF]`, 'gi');

export function cleanAndDeduplicateFormatting(text: string): string {
  if (!text) return '';
  let cleaned = text;
  // Replace consecutive duplicate actual escape color codes \u001b(c@#HEX1)\u001b(c@#HEX2)... with just the last one
  cleaned = cleaned.replace(/(?:\u001b\(c@#[0-9a-fA-F]+\)\s*)+(\u001b\(c@#[0-9a-fA-F]+\))/gi, '$1');
  // Replace stacked background codes
  cleaned = cleaned.replace(/(?:\u001b\(b@#[0-9a-fA-F]+\)\s*)+(\u001b\(b@#[0-9a-fA-F]+\))/gi, '$1');
  // Replace duplicate reset codes
  cleaned = cleaned.replace(/(?:\u001b[EF]\s*)+/g, '\u001bE');
  return cleaned;
}

export function applyColorCodeToText(
  text: string,
  hex: string,
  start: number,
  end: number,
  isBg = false
): { newText: string; newCursorPos: number } {
  const cleanHex = hex.startsWith('#') ? hex.toUpperCase() : `#${hex.toUpperCase()}`;
  const codeTag = isBg ? `${ESC}(b@${cleanHex})` : `${ESC}(c@${cleanHex})`;

  const safeStart = Math.max(0, Math.min(start, text.length));
  const safeEnd = Math.max(0, Math.min(end, text.length));
  const selected = text.substring(safeStart, safeEnd);
  let before = text.substring(0, safeStart);
  let after = text.substring(safeEnd);

  if (selected.length > 0) {
    const cleanSelected = selected
      .replace(colorPattern, '')
      .replace(actualFormattingPattern, '');

    before = before.replace(new RegExp(`${ESC}\\([cb]@[^)]+\\)$`, 'i'), '');
    after = after.replace(new RegExp(`^${ESC}[EF]`, 'i'), '');

    const replacement = `${codeTag}${cleanSelected}${ESC_RESET}`;
    const newText = cleanAndDeduplicateFormatting(before + replacement + after);
    const newCursorPos = before.length + replacement.length;
    return { newText, newCursorPos };
  } else {
    const hadBeforeColor = new RegExp(`${ESC}\\([cb]@[^)]+\\)$`, 'i').test(before);
    if (hadBeforeColor) {
      before = before.replace(new RegExp(`(?:${ESC}\\([cb]@[^)]+\\))+$`, 'gi'), '');
    }
    const hadAfterColor = new RegExp(`^${ESC}\\([cb]@[^)]+\\)`, 'i').test(after);
    if (hadAfterColor) {
      after = after.replace(new RegExp(`^(?:${ESC}\\([cb]@[^)]+\\))+`, 'gi'), '');
    }

    const replacement = codeTag;
    const newText = cleanAndDeduplicateFormatting(before + replacement + after);
    const newCursorPos = before.length + replacement.length;
    return { newText, newCursorPos };
  }
}

export function ensureLiteralFormattingReset(text: string): string {
  if (typeof text !== 'string' || !text) return text;
  const hasFormatting = literalFormattingPattern.test(text) || actualFormattingPattern.test(text);
  if (!hasFormatting) return text;
  const endsWithResetLiteral = /(\\u001b[EF])$/.test(text);
  const endsWithResetActual = /(\u001b[EF])$/.test(text);
  if (endsWithResetLiteral || endsWithResetActual) return text;
  return `${text}${ESC_RESET_LITERAL}`;
}

export function applyDefaultTranslationTag(text: string): string {
  if (typeof text !== 'string' || !text) return text;
  const normalized = text.replace(/\\u001b/g, ESC_ACTUAL);
  let result = '';
  let i = 0;
  let needsDefaultBeforeText = true;
  const isTranslationCode = (code: string) => translationCodeActualPattern.test(code);

  while (i < normalized.length) {
    const char = normalized[i];
    if (char === ESC_ACTUAL) {
      const nextChar = normalized[i + 1];
      if (nextChar === '(') {
        const closingIndex = normalized.indexOf(')', i);
        if (closingIndex === -1) {
          if (needsDefaultBeforeText) {
            result += DEFAULT_TRANSLATION_ACTUAL;
            needsDefaultBeforeText = false;
          }
          result += char;
          i += 1;
          continue;
        }
        const code = normalized.slice(i, closingIndex + 1);
        result += code;
        i = closingIndex + 1;
        if (isTranslationCode(code)) {
          needsDefaultBeforeText = false;
        } else {
          needsDefaultBeforeText = true;
        }
        continue;
      }
      result += normalized.slice(i, i + 2);
      i += 2;
      needsDefaultBeforeText = true;
      continue;
    }
    if (char === '\n') {
      result += char;
      needsDefaultBeforeText = true;
      i += 1;
      continue;
    }
    if (needsDefaultBeforeText) {
      result += DEFAULT_TRANSLATION_ACTUAL;
      needsDefaultBeforeText = false;
    }
    result += char;
    i += 1;
  }
  return result.replace(/\u001b/g, ESC_LITERAL_SEQUENCE);
}

export function generateCommand(state: ItemGeneratorState): {
  command: string;
  finalDesc: string;
  rawDesc: string;
} {
  const {
    itemName,
    amount,
    wear,
    descriptionContent,
    shortDescriptionContent,
    itemColorHex,
    userToolCapabilities,
    enchantments,
    toolRange,
    dugValue,
    includeSlash,
    toolRanksEnabled,
    customItemsData,
    customItemsVersionEnabled,
    enchantDescSuffix = '',
  } = state;

  const itemNameValue = (itemName || '').trim();
  if (!itemNameValue) {
    return { command: '', finalDesc: '', rawDesc: '' };
  }

  const metaParts: string[] = [];
  const enchantDescParts: string[] = [];
  const enchantLuaParts: string[] = [];

  // 1. Enchantments
  Object.entries(enchantments).forEach(([type, data]) => {
    const def = ENCHANTMENT_DEFS[type];
    if (!def) return;
    const { level, value } = data;
    enchantLuaParts.push(`["${type}"]={["value"]=${value}}`);
    const hasLevels = def.maxLevel > 1;
    const levelText = hasLevels ? toRoman(level) : '';
    const enchantName = def.name;
    const enchantLine = hasLevels
      ? `\u001b(c@#ffffff)\u001b(T@x_enchanting)${enchantName}\u001bE ${levelText}`
      : `\u001b(c@#ffffff)\u001b(T@x_enchanting)${enchantName}\u001bE`;
    enchantDescParts.push(enchantLine);
    metaParts.push(`is_${type}\u0002${value}`);
  });

  const hasEnchants = enchantLuaParts.length > 0;
  if (hasEnchants) {
    metaParts.push(`is_enchanted\u00021`);
    const xEnchantingData = `return {${enchantLuaParts.join(',')}}`;
    metaParts.push(`x_enchanting\u0002${xEnchantingData}`);
  }

  // 2. tool_capabilities
  const hasCustomCaps = Object.keys(userToolCapabilities || {}).length > 0;
  if (hasCustomCaps) {
    metaParts.push(`tool_capabilities\u0002${JSON.stringify(userToolCapabilities)}`);
  }

  // 3. Description logic
  let enchantDescString = '';
  if (hasEnchants) {
    const enchantHeaderText = `\u001b(c@#AE81FF)\u001b(T@x_enchanting)Enchanted\u001bE`;
    const enchantDescBlock = `${enchantHeaderText}\n${enchantDescParts.join('\n')}`;
    enchantDescString = `\n${enchantDescBlock}${enchantDescSuffix}`;
    metaParts.push(`enchant_description\u0002${enchantDescString}`);
  }

  const baseDescriptionRaw = typeof descriptionContent === 'string' ? descriptionContent : '';
  const cleanedBaseDesc = cleanAndDeduplicateFormatting(baseDescriptionRaw);
  const normalizedBaseDescription = cleanedBaseDesc ? ensureLiteralFormattingReset(cleanedBaseDesc) : cleanedBaseDesc;
  let finalDesc = normalizedBaseDescription;

  const hasRegisteredTool = Object.prototype.hasOwnProperty.call(TOOL_DEFAULT_USES, itemNameValue);
  const defaultUses = hasRegisteredTool ? TOOL_DEFAULT_USES[itemNameValue] : null;
  const canAutoToolRanks = toolRanksEnabled && hasRegisteredTool;
  let toolUsesValue: number | null = null;

  if (dugValue !== '' && dugValue !== null && dugValue !== undefined) {
    const numericUses = Number(dugValue);
    if (!Number.isNaN(numericUses)) {
      toolUsesValue = numericUses;
    }
  } else if (defaultUses !== null && defaultUses !== undefined) {
    toolUsesValue = defaultUses;
  }

  if (toolUsesValue !== null) {
    if (!Number.isFinite(toolUsesValue) || Math.abs(toolUsesValue) > MAX_FLOAT_VALUE) {
      toolUsesValue = toolUsesValue < 0 ? -Infinity : Infinity;
    }
  }

  const hasBaseDescription = typeof descriptionContent === 'string' && descriptionContent.trim().length > 0;
  const hasDugValueInput = dugValue !== '' && dugValue !== null && dugValue !== undefined;
  const shouldAppendToolInfoFromToolRanks = canAutoToolRanks && toolUsesValue !== null && hasBaseDescription;
  const shouldAppendToolInfoFromDug = hasDugValueInput && toolUsesValue !== null;
  const shouldAppendToolInfo = shouldAppendToolInfoFromToolRanks || shouldAppendToolInfoFromDug;

  if (shouldAppendToolInfo) {
    const levelValue = calculateToolLevel(toolUsesValue);
    const formattedUses = formatUsesValue(toolUsesValue);
    const levelText = `\u001b(c@#ffdf00)\u001b(T@toolranks)Level: \u001bF${levelValue}`;
    const usesText = `\u001b(c@#9d9d9d)\u001b(T@toolranks)Uses: \u001bF${formattedUses}`;
    finalDesc = (finalDesc ? `${finalDesc}\n` : '') + levelText + '\n' + usesText;
  }

  if (hasEnchants) {
    const enchantDescBlock = enchantDescString.startsWith('\n') ? enchantDescString.slice(1) : enchantDescString;
    finalDesc = (finalDesc ? finalDesc + '\n\n' : '') + enchantDescBlock;
  }

  if (finalDesc) {
    metaParts.push(`description\u0002${finalDesc}`);
  }

  // 4. Other fields
  if (shortDescriptionContent) {
    const cleanedShort = cleanAndDeduplicateFormatting(shortDescriptionContent);
    // Escape \u0002 and \u0003 for meta compatibility
    const escapedShort = cleanedShort.replace(/\u0002/g, '\\u0002').replace(/\u0003/g, '\\u0003');
    metaParts.push(`short_description\u0002${ensureLiteralFormattingReset(escapedShort)}`);
  }
  if (normalizedBaseDescription) {
    // Escape \u0002 and \u0003 for meta compatibility
    const escapedDesc = normalizedBaseDescription.replace(/\u0002/g, '\\u0002').replace(/\u0003/g, '\\u0003');
    metaParts.push(`description_override\u0002${escapedDesc}`);
  }
  if (dugValue !== '' && dugValue !== null && dugValue !== undefined) {
    metaParts.push(`dug\u0002${dugValue}`);
  }
  if (toolRange !== '' && toolRange !== null && toolRange !== undefined) {
    metaParts.push(`range\u0002${toolRange}`);
  }
  if (itemColorHex) {
    metaParts.push(`color\u0002${itemColorHex}`);
  }

  // 5. Custom Items
  Object.entries(customItemsData || {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      let outputValue = String(value);
      if (key === 'effect' && !['burning_players', 'lightning', 'smoke'].includes(outputValue)) {
        outputValue = outputValue.startsWith('potion_') ? outputValue : `potion_${outputValue}`;
      }
      metaParts.push(`custom_items:${key}\u0002${outputValue}`);
    }
  });

  if (customItemsVersionEnabled) {
    metaParts.push(`custom_items:version\u00021`);
  }

  // 6. Join with \u0001 ... \u0003
  let finalMeta = '';
  if (metaParts.length > 0) {
    finalMeta = `\u0001${metaParts.join('\u0003')}\u0003`;
  }

  const mode = state.commandMode || 'giveme';
  const player = (state.playerName || '@s').trim();
  const playerPart = mode === 'give' ? `${player} ` : '';
  const cmdBase = mode === 'give' ? 'give' : 'giveme';
  const commandPrefix = includeSlash ? `/${cmdBase}` : cmdBase;
  const wearValue = wear || '0';
  const amountValue = amount || '1';

  let command = '';
  if (finalMeta && finalMeta.length > 0) {
    const escapedMeta = finalMeta
      .replace(/"/g, '\\"')
      .replace(/\u0001/g, '\\u0001')
      .replace(/\u0002/g, '\\u0002')
      .replace(/\u0003/g, '\\u0003')
      .replace(/\u001b/g, '\\u001b')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t');
    command = `${commandPrefix} ${playerPart}${itemNameValue} ${amountValue} ${wearValue} "${escapedMeta}"`;
  } else {
    // If no metadata, do not output empty string "" quotes as that causes command syntax error in-game!
    command = `${commandPrefix} ${playerPart}${itemNameValue} ${amountValue} ${wearValue}`;
  }

  return {
    command,
    finalDesc,
    rawDesc: baseDescriptionRaw,
  };
}

export function parseAndImportCommand(commandText: string): ItemGeneratorState {
  const trimmed = commandText.trim();
  if (!trimmed) {
    throw new Error('Please enter a valid /giveme or /give command.');
  }

  const hasSlash = trimmed.startsWith('/');
  const withoutSlash = hasSlash ? trimmed.slice(1).trim() : trimmed;

  // Check command verb: give vs giveme
  const isGive = /^give\s+/i.test(withoutSlash);
  const isGiveme = /^giveme\s+/i.test(withoutSlash);

  if (!isGive && !isGiveme) {
    throw new Error('Invalid command verb. Expected /giveme or /give.');
  }

  const mode = isGive ? 'give' : 'giveme';
  const rest = withoutSlash.replace(/^(?:giveme|give)\s+/i, '').trim();

  let playerName = '@s';
  let remainingArgs = rest;

  if (isGive) {
    // First token is player name
    const spaceIdx = remainingArgs.indexOf(' ');
    if (spaceIdx === -1) {
      throw new Error('Incomplete /give command. Expected /give <player> <item> ...');
    }
    playerName = remainingArgs.slice(0, spaceIdx).trim();
    remainingArgs = remainingArgs.slice(spaceIdx + 1).trim();
  }

  // Look for metadata in quotes at the end if present
  let encodedMeta = '';
  const quoteStart = remainingArgs.indexOf('"');
  if (quoteStart !== -1 && remainingArgs.endsWith('"')) {
    encodedMeta = remainingArgs.slice(quoteStart + 1, -1);
    remainingArgs = remainingArgs.slice(0, quoteStart).trim();
  }

  // Tokenize remainingArgs: item [amount] [wear]
  const tokens = remainingArgs.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) {
    throw new Error('Missing item ID in command.');
  }

  const itemId = tokens[0];
  const amount = tokens[1] || '1';
  const wear = tokens[2] || '0';

  const nextState = getDefaultItemState();
  nextState.itemName = itemId;
  nextState.amount = amount;
  nextState.wear = wear;
  nextState.includeSlash = hasSlash;
  nextState.commandMode = mode;
  nextState.playerName = playerName;

  let decodedMeta = encodedMeta
    .replace(/\\u0001/g, '\u0001')
    .replace(/\\u0002/g, '\u0002')
    .replace(/\\u0003/g, '\u0003')
    .replace(/\\u001b/g, '\u001b')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"');

  if (decodedMeta.startsWith('\u0001')) {
    decodedMeta = decodedMeta.slice(1);
  }
  if (decodedMeta.endsWith('\u0003')) {
    decodedMeta = decodedMeta.slice(0, -1);
  }

  const segments = decodedMeta.split('\u0003');
  const metaMap: Record<string, string> = {};
  segments.forEach((seg) => {
    const sep = seg.indexOf('\u0002');
    if (sep !== -1) {
      metaMap[seg.slice(0, sep)] = seg.slice(sep + 1);
    }
  });

  // Color
  if (metaMap['color']) {
    nextState.itemColorHex = normalizeHexValue(metaMap['color']) || metaMap['color'];
  }

  // Tool capabilities
  if (metaMap['tool_capabilities']) {
    try {
      nextState.userToolCapabilities = JSON.parse(metaMap['tool_capabilities']);
    } catch {
      nextState.userToolCapabilities = {};
    }
  }

  // Enchantments
  const parsedEnchants: Record<string, EnchantmentEntry> = {};
  Object.keys(ENCHANTMENT_DEFS).forEach((type) => {
    if (metaMap[`is_${type}`]) {
      const val = parseFloat(metaMap[`is_${type}`]);
      let level = 1;
      const def = ENCHANTMENT_DEFS[type];
      if (def) {
        const found = Object.entries(def.levels).find(([, v]) => v === val);
        if (found) {
          level = parseInt(found[0], 10);
        }
      }
      parsedEnchants[type] = { level, value: val };
    }
  });
  nextState.enchantments = parsedEnchants;

  // Enchant description custom suffix
  if (metaMap['enchant_description'] && Object.keys(parsedEnchants).length > 0) {
    const rawEnchantDesc = metaMap['enchant_description'];
    const ESC = '\u001b';
    const enchantedHeader = `${ESC}(c@#AE81FF)${ESC}(T@x_enchanting)Enchanted${ESC}E`;
    const expectedLines: string[] = [];
    Object.keys(parsedEnchants).forEach((type) => {
      const def = ENCHANTMENT_DEFS[type];
      if (!def) return;
      const hasLevels = def.maxLevel > 1;
      const lvl = parsedEnchants[type].level;
      const levelText = hasLevels ? ' ' + toRoman(lvl) : '';
      expectedLines.push(`${ESC}(c@#ffffff)${ESC}(T@x_enchanting)${def.name}${ESC}E${levelText}`);
    });
    const standardDesc = '\n' + enchantedHeader + '\n' + expectedLines.join('\n');
    if (rawEnchantDesc.startsWith(standardDesc)) {
      nextState.enchantDescSuffix = rawEnchantDesc.slice(standardDesc.length);
    } else {
      let lastIdx = -1;
      expectedLines.forEach((line) => {
        const idx = rawEnchantDesc.indexOf(line);
        if (idx !== -1) {
          const endPos = idx + line.length;
          if (endPos > lastIdx) lastIdx = endPos;
        }
      });
      if (lastIdx !== -1 && lastIdx < rawEnchantDesc.length) {
        nextState.enchantDescSuffix = rawEnchantDesc.slice(lastIdx);
      }
    }
  }

  // Description & Short Description
  const convertToLiteralEscapes = (text: string) => {
    if (!text) return '';
    let result = '';
    const ESC = '\u001b';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === ESC) {
        const next = text[i + 1];
        if (next === '(') {
          const endIdx = text.indexOf(')', i + 2);
          if (endIdx !== -1) {
            const code = text.slice(i + 2, endIdx);
            if (code.startsWith('c@') || code.startsWith('b@') || code.startsWith('T@')) {
              result += '\\u001b(' + code + ')';
            }
            i = endIdx;
            continue;
          }
        } else if (next === 'E' || next === 'F') {
          result += '\\u001b' + next;
          i += 1;
          continue;
        }
        continue;
      }
      if (char === '\n') {
        result += '\\n';
      } else if (char === '\t') {
        result += '\\t';
      } else {
        result += char;
      }
    }
    return result;
  };

  const sanitizeImportedDescription = (text: string) => {
    if (!text) return '';
    let result = text;
    const ESC = '\u001b';
    const enchantDesc = metaMap['enchant_description'];
    if (enchantDesc) {
      result = result.split(enchantDesc).join('');
    }
    const toolranksMarker = `${ESC}(T@toolranks)`;
    result = result
      .split('\n')
      .filter((line) => !line.includes(toolranksMarker))
      .join('\n');
    result = result.replace(/\r/g, '');
    result = result.replace(/[ \t]+\n/g, '\n');
    result = result.replace(/^\n+|\n+$/g, '');
    return result;
  };

  let importedDesc = metaMap['description_override'] || sanitizeImportedDescription(metaMap['description'] || '');
  importedDesc = importedDesc.replace(/\u001b\(T@default\)/g, '');
  nextState.descriptionContent = convertToLiteralEscapes(importedDesc).replace(/\\n/g, '\n');

  if (metaMap['short_description']) {
    let shortDesc = metaMap['short_description'].replace(/\u001b\(T@default\)/g, '');
    nextState.shortDescriptionContent = convertToLiteralEscapes(shortDesc).replace(/\\n/g, '\n');
  }

  // Dug value & Tool range
  if (metaMap['dug'] !== undefined) {
    nextState.dugValue = metaMap['dug'];
  }
  if (metaMap['range'] !== undefined) {
    nextState.toolRange = metaMap['range'];
  }

  // Custom items
  const customItems = createEmptyCustomItemsData();
  let hasCi = false;
  Object.keys(customItems).forEach((key) => {
    const metaKey = `custom_items:${key}`;
    if (metaMap[metaKey] !== undefined) {
      let val = metaMap[metaKey];
      if (key === 'effect' && val.startsWith('potion_')) {
        val = val.slice(7);
      }
      (customItems as any)[key] = val;
      hasCi = true;
    }
  });
  nextState.customItemsData = customItems;
  nextState.customItemsVersionEnabled = metaMap['custom_items:version'] === '1' || hasCi;

  return nextState;
}

export function extractDescriptionFromCommand(commandText: string): string | null {
  if (!commandText) return null;
  const match = commandText.match(/^(?:\/)?giveme\s+\S+\s+\d+\s+\d+\s+"((?:[^"\\]|\\.)*)"$/);
  if (!match) return null;
  let decodedMeta = match[1]
    .replace(/\\u0001/g, '\u0001')
    .replace(/\\u0002/g, '\u0002')
    .replace(/\\u0003/g, '\u0003')
    .replace(/\\u001b/g, '\u001b')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"');

  if (decodedMeta.startsWith('\u0001')) decodedMeta = decodedMeta.slice(1);
  if (decodedMeta.endsWith('\u0003')) decodedMeta = decodedMeta.slice(0, -1);

  const segments = decodedMeta.split('\u0003');
  for (const seg of segments) {
    const sep = seg.indexOf('\u0002');
    if (sep !== -1 && seg.slice(0, sep) === 'description') {
      return seg.slice(sep + 1);
    }
  }
  return null;
}

export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function getBrightness(hexColor: string): number {
  const cleanHex = hexColor.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export interface PreviewHtmlResult {
  html: string;
  firstBackground: string;
}

export function buildTooltipPreviewHtml(
  itemName: string,
  generatedDescription: string,
  itemColorHex?: string
): PreviewHtmlResult {
  const ESC = '\u001b';
  const convertLiteralEscapes = (text: string) => {
    if (!text) return '';
    return text
      .replace(/\\u001b/g, ESC)
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r');
  };

  const normalized = convertLiteralEscapes(generatedDescription || '');

  let result = '';
  let firstBackground = '';
  let currentColor: string | null = null;
  let currentBackground: string | null = null;
  let currentTemplate: string | null = null;
  let spanOpen = false;

  const closeSpan = () => {
    if (spanOpen) {
      result += '</span>';
      spanOpen = false;
    }
  };

  const openSpan = () => {
    if (spanOpen) closeSpan();
    const classes: string[] = [];
    if (currentTemplate) classes.push(currentTemplate);
    const styles: string[] = [];
    if (currentColor) styles.push(`color: ${currentColor} !important`);
    if (currentBackground) styles.push(`background-color: ${currentBackground}`);

    const classAttr = classes.length ? ` class="${classes.join(' ')}"` : '';
    const styleAttr = styles.length ? ` style="${styles.join('; ')}"` : '';
    result += `<span${classAttr}${styleAttr}>`;
    spanOpen = true;
  };

  const ensureSpan = () => {
    if (!spanOpen) openSpan();
  };

  const applyTemplate = (tmpl: string) => {
    switch (tmpl) {
      case 'default':
        currentTemplate = 'font-semibold tracking-wide';
        break;
      case 'toolranks':
        currentTemplate = 'font-medium tracking-wide';
        break;
      case 'x_enchanting':
        currentTemplate = 'font-semibold text-purple-300';
        break;
      default:
        currentTemplate = null;
    }
  };

  // Header: Item Name
  if (itemName) {
    const titleStyle = itemColorHex ? ` style="color: ${itemColorHex}"` : ' class="text-white"';
    result += `<div class="font-bold text-base mb-1 text-shadow-sm"${titleStyle}>${escapeHtml(itemName)}</div>`;
  }

  for (let i = 0; i < normalized.length; ) {
    const char = normalized[i];
    if (char === ESC) {
      i += 1;
      const next = normalized[i];
      if (next === '(') {
        const endIndex = normalized.indexOf(')', i);
        if (endIndex === -1) break;
        const code = normalized.slice(i + 1, endIndex);
        i = endIndex + 1;
        if (code.startsWith('c@')) {
          currentColor = normalizeHexValue(code.slice(2));
          closeSpan();
        } else if (code.startsWith('b@')) {
          const bg = normalizeHexValue(code.slice(2));
          currentBackground = bg;
          if (!firstBackground && bg) firstBackground = bg;
          closeSpan();
        } else if (code.startsWith('T@')) {
          applyTemplate(code.slice(2));
          closeSpan();
        }
        continue;
      }
      if (next === 'E' || next === 'F') {
        i += 1;
        currentColor = null;
        currentBackground = null;
        currentTemplate = null;
        closeSpan();
        continue;
      }
      continue;
    }

    ensureSpan();
    if (char === '\n') {
      closeSpan();
      result += '<br/>';
      currentTemplate = null;
    } else if (char === '\t') {
      result += '&nbsp;&nbsp;&nbsp;&nbsp;';
    } else if (char === '\r') {
      // ignore
    } else {
      result += escapeHtml(char);
    }
    i += 1;
  }
  closeSpan();

  return { html: result, firstBackground };
}

// Compression & Share URL
export const SHARE_URL_PARAM = 'data';
export const SHARE_URL_VERSION = 2;

export function buildShareUrl(state: ItemGeneratorState): string {
  const defaults = getDefaultItemState();
  const payload: any = { v: SHARE_URL_VERSION };

  if (state.itemName && state.itemName !== defaults.itemName) payload.i = state.itemName;
  if (state.amount !== defaults.amount) payload.a = state.amount;
  if (state.wear !== defaults.wear) payload.w = state.wear;
  if (state.descriptionContent) payload.d = state.descriptionContent;
  if (state.shortDescriptionContent) payload.s = state.shortDescriptionContent;
  if (state.itemColorHex) payload.c = state.itemColorHex;
  if (state.userToolCapabilities && Object.keys(state.userToolCapabilities).length > 0) {
    payload.t = state.userToolCapabilities;
  }
  if (state.enchantments && Object.keys(state.enchantments).length > 0) {
    payload.e = state.enchantments;
  }
  if (state.toolRange !== defaults.toolRange && state.toolRange !== '') payload.r = state.toolRange;
  if (state.dugValue !== defaults.dugValue && state.dugValue !== '') payload.g = state.dugValue;
  if (state.includeSlash) payload.l = 1;
  if (!state.toolRanksEnabled) payload.k = 0;

  const compactCi: Record<string, any> = {};
  Object.entries(state.customItemsData || {}).forEach(([k, v]) => {
    if (v !== '' && v !== null && v !== undefined) compactCi[k] = v;
  });
  if (Object.keys(compactCi).length > 0) payload.m = compactCi;
  if (state.customItemsVersionEnabled) payload.x = 1;

  const json = JSON.stringify(payload);
  const compressed = LZString.compressToEncodedURIComponent(json);
  const url = new URL(window.location.href);
  url.searchParams.set(SHARE_URL_PARAM, compressed);
  return url.toString();
}

export function parseShareUrl(): ItemGeneratorState | null {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get(SHARE_URL_PARAM);
  if (!encoded) return null;

  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    const payload = JSON.parse(json);
    const defaults = getDefaultItemState();

    const state: ItemGeneratorState = {
      itemName: payload.i !== undefined ? String(payload.i) : defaults.itemName,
      amount: payload.a !== undefined ? String(payload.a) : defaults.amount,
      wear: payload.w !== undefined ? String(payload.w) : defaults.wear,
      descriptionContent: payload.d !== undefined ? payload.d : defaults.descriptionContent,
      shortDescriptionContent: payload.s !== undefined ? payload.s : defaults.shortDescriptionContent,
      itemColorHex: payload.c !== undefined ? payload.c : defaults.itemColorHex,
      userToolCapabilities: payload.t && typeof payload.t === 'object' ? payload.t : {},
      enchantments: payload.e && typeof payload.e === 'object' ? payload.e : {},
      toolRange: payload.r !== undefined ? payload.r : defaults.toolRange,
      dugValue: payload.g !== undefined ? payload.g : defaults.dugValue,
      includeSlash: payload.l === 1 || payload.l === true,
      toolRanksEnabled: payload.k === undefined ? defaults.toolRanksEnabled : payload.k === 1 || payload.k === true,
      customItemsData: payload.m && typeof payload.m === 'object' ? { ...defaults.customItemsData, ...payload.m } : defaults.customItemsData,
      customItemsVersionEnabled: payload.x === 1 || payload.x === true,
      enchantDescSuffix: '',
    };

    return state;
  } catch (e) {
    console.error('Failed to parse share url', e);
    return null;
  }
}
