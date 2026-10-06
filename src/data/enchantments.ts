export interface EnchantmentDefinition {
  name: string;
  japanese?: string;
  maxLevel: number;
  levels: Record<number, number>;
}

export const ENCHANTMENT_DEFS: Record<string, EnchantmentDefinition> = {
            sharpness: { name: 'Sharpness', japanese: 'シャープネス', maxLevel: 5, levels: { 1: 1.25, 2: 2.5, 3: 3.75, 4: 5, 5: 6.25 } },
            unbreaking: { name: 'Unbreaking', japanese: 'アンブレイキング', maxLevel: 3, levels: { 1: 100, 2: 200, 3: 300 } },
            efficiency: { name: 'Efficiency', japanese: '効率性', maxLevel: 5, levels: { 1: 25, 2: 30, 3: 35, 4: 40, 5: 45 } },
            fortune: { name: 'Fortune', japanese: 'フォーチューン', maxLevel: 3, levels: { 1: 1, 2: 2, 3: 3 } },
            silk_touch: { name: 'Silk Touch', japanese: 'シルク・タッチ', maxLevel: 1, levels: { 1: 1 } },
            knockback: { name: 'Knockback', japanese: 'ノックバック', maxLevel: 2, levels: { 1: 105, 2: 190 } },
            curse_of_vanishing: { name: 'Curse of Vanishing', japanese: 'バニシングの呪い', maxLevel: 1, levels: { 1: 1 } },
            looting: { name: 'Looting', japanese: '略奪', maxLevel: 3, levels: { 1: 1, 2: 2, 3: 3 } },
            power: { name: 'Power', japanese: 'パワー', maxLevel: 5, levels: { 1: 50, 2: 75, 3: 100, 4: 125, 5: 150 } },
            punch: { name: 'Punch', japanese: 'パンチ', maxLevel: 2, levels: { 1: 3, 2: 6 } },
            infinity: { name: 'Infinity', japanese: 'インフィニティ', maxLevel: 1, levels: { 1: 1 } },
        };

export const UNVERIFIED_ENCHANT_IDS: string[] = ['looting', 'power', 'punch', 'infinity'];

export const EFFECT_LABELS: Record<string, { en: string; ja?: string; ru?: string; fr?: string }> = {
            burning_players: { en: 'Burning Players', ja: '燃焼プレイヤー', ru: 'Горящие игроки', fr: 'Joueurs en feu' },
            lightning: { en: 'Lightning', ja: '雷', ru: 'Молния', fr: 'Foudre' },
            smoke: { en: 'Smoke', ja: '煙', ru: 'Smoke', fr: 'Smoke' },
            potion_fire_resistance: { en: 'Potion Fire Resistance', ja: '火炎耐性ポーション', ru: 'Зелье огнестойкости', fr: 'Potion de résistance au feu' },
            blindness: { en: 'Blindness', ja: '盲目', ru: 'Слепота', fr: 'Cécité' },
            breath: { en: 'Breath', ja: '呼吸', ru: 'Дыхание', fr: 'Respiration' },
            fire_resistance: { en: 'Fire Resistance', ja: '火炎耐性', ru: 'Огнестойкость', fr: 'Résistance au feu' },
            gravreset: { en: 'Grav Reset', ja: '重力リセット', ru: 'Сброс гравитации', fr: 'Réinitialisation de gravité' },
            hunger: { en: 'Hunger', ja: '空腹', ru: 'Голод', fr: 'Faim' },
            invisible: { en: 'Invisible', ja: '透明化', ru: 'Невидимость', fr: 'Invisibilité' },
            jumpminus: { en: 'Jump Minus', ja: 'ジャンプ低下', ru: 'Понижение прыжка', fr: 'Saut réduit' },
            jumpplus: { en: 'Jump Plus', ja: 'ジャンプ上昇', ru: 'Saut amélioré', fr: 'Saut augmenté' },
            nightvision: { en: 'Night Vision', ja: '暗視', ru: 'Ночное зрение', fr: 'Vision nocturne' },
            nograv: { en: 'No Grav', ja: '無重力', ru: 'Без гравитации', fr: 'Sans gravité' },
            poison: { en: 'Poison', ja: '毒', ru: 'Яд', fr: 'Poison' },
            regen: { en: 'Regen', ja: '再生', ru: 'Регенерация', fr: 'Régénération' },
            regen2: { en: 'Regen II', ja: '再生 II', ru: 'Регенерация II', fr: 'Régénération II' },
            speedminus: { en: 'Speed Minus', ja: '速度低下', ru: 'Снижение скорости', fr: 'Vitesse réduite' },
            speedplus: { en: 'Speed Plus', ja: '速度上昇', ru: 'Увеличение скорости', fr: 'Vitesse augmentée' }
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
