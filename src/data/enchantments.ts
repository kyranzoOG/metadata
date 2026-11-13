export interface EnchantmentDefinition {
  name: string;
  maxLevel: number;
  levels: Record<number, number>;
}

export const ENCHANTMENT_DEFS: Record<string, EnchantmentDefinition> = {
  sharpness: { name: 'Sharpness', maxLevel: 5, levels: { 1: 1.25, 2: 2.5, 3: 3.75, 4: 5, 5: 6.25 } },
  unbreaking: { name: 'Unbreaking', maxLevel: 3, levels: { 1: 100, 2: 200, 3: 300 } },
  efficiency: { name: 'Efficiency', maxLevel: 5, levels: { 1: 25, 2: 30, 3: 35, 4: 40, 5: 45 } },
  fortune: { name: 'Fortune', maxLevel: 3, levels: { 1: 1, 2: 2, 3: 3 } },
  silk_touch: { name: 'Silk Touch', maxLevel: 1, levels: { 1: 1 } },
  knockback: { name: 'Knockback', maxLevel: 2, levels: { 1: 105, 2: 190 } },
  curse_of_vanishing: { name: 'Curse of Vanishing', maxLevel: 1, levels: { 1: 1 } },
  looting: { name: 'Looting', maxLevel: 3, levels: { 1: 1, 2: 2, 3: 3 } },
  power: { name: 'Power', maxLevel: 5, levels: { 1: 50, 2: 75, 3: 100, 4: 125, 5: 150 } },
  punch: { name: 'Punch', maxLevel: 2, levels: { 1: 3, 2: 6 } },
  infinity: { name: 'Infinity', maxLevel: 1, levels: { 1: 1 } },
};

export const UNVERIFIED_ENCHANT_IDS: string[] = ['looting', 'power', 'punch', 'infinity'];

export const EFFECT_LABELS: Record<string, { en: string }> = {
  burning_players: { en: 'Burning Players' },
  lightning: { en: 'Lightning' },
  smoke: { en: 'Smoke' },
  potion_fire_resistance: { en: 'Potion Fire Resistance' },
  blindness: { en: 'Blindness' },
  breath: { en: 'Breath' },
  fire_resistance: { en: 'Fire Resistance' },
  gravreset: { en: 'Grav Reset' },
  hunger: { en: 'Hunger' },
  invisible: { en: 'Invisible' },
  jumpminus: { en: 'Jump Minus' },
  jumpplus: { en: 'Jump Plus' },
  nightvision: { en: 'Night Vision' },
  nograv: { en: 'No Grav' },
  poison: { en: 'Poison' },
  regen: { en: 'Regen' },
  regen2: { en: 'Regen II' },
  speedminus: { en: 'Speed Minus' },
  speedplus: { en: 'Speed Plus' },
};

export const PRESET_COLORS: string[] = [
            '#FFFFFF', '#D9DDE3', '#A4A9B1', '#4C5461', '#000000',
            '#FEE2E2', '#FCA5A5', '#F87171', '#EF4444', '#BE123C',
            '#FFEDD5', '#FDBA74', '#FB923C', '#F97316', '#C2410C',
            '#FEF3C7', '#FDE68A', '#FBBF24', '#F59E0B', '#D97706',
            '#DCFCE7', '#BBF7D0', '#4ADE80', '#22C55E', '#15803D',
            '#CCFBF1', '#5EEAD4', '#2DD4BF', '#14B8A6', '#0F766E',
            '#E0F2FE', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8',
            '#F5F3FF', '#DDD6FE', '#C4B5FD', '#A855F7', '#7C3AED'
        ];
