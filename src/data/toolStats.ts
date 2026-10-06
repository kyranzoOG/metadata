export interface ToolStatRow {
  name: string;
  key: string;
  displayName: string;
  groupBadges: { key: string; text: string; displayName: string }[];
  groupRaw: string[];
  t1: string[];
  t2: string[];
  t3: string[];
  maxLevel: string[];
  uses: string[];
  maxDropLevel: string[];
  damage: string[];
  punchUses: string[];
  attackSpeed: string[];
}

export interface ToolCapabilities {
  damage_groups?: { fleshy?: number | null; [key: string]: any };
  full_punch_interval?: number | null;
  punch_attack_uses?: number | null;
  max_drop_level?: number | null;
  groupcaps?: {
    [group: string]: {
      maxlevel?: number | null;
      uses?: number | null;
      times?: (number | null)[] | null;
    };
  };
  [key: string]: any;
}

export const TOOL_TABLES_DATA: Record<string, ToolStatRow[]> = {
  "axe": [
    {
      "name": "木の斧",
      "key": "木の斧",
      "groupBadges": [
        {
          "key": "伐採",
          "text": "伐採",
          "displayName": "Choppy"
        }
      ],
      "groupRaw": [
        "伐採"
      ],
      "t1": [
        "2.5"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "1"
      ],
      "uses": [
        "20"
      ],
      "maxDropLevel": [
        "0"
      ],
      "damage": [
        "2"
      ],
      "punchUses": [
        "20"
      ],
      "attackSpeed": [
        "1.0"
      ],
      "displayName": "Wooden Axe"
    },
    {
      "name": "石の斧",
      "key": "石の斧",
      "groupBadges": [
        {
          "key": "伐採",
          "text": "伐採",
          "displayName": "Choppy"
        }
      ],
      "groupRaw": [
        "伐採"
      ],
      "t1": [
        "4"
      ],
      "t2": [
        "3"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "1"
      ],
      "uses": [
        "40"
      ],
      "maxDropLevel": [
        "0"
      ],
      "damage": [
        "3"
      ],
      "punchUses": [
        "40"
      ],
      "attackSpeed": [
        "1.2"
      ],
      "displayName": "Stone Axe"
    },
    {
      "name": "銅の斧",
      "key": "銅の斧",
      "groupBadges": [
        {
          "key": "伐採",
          "text": "伐採",
          "displayName": "Choppy"
        }
      ],
      "groupRaw": [
        "伐採"
      ],
      "t1": [
        "3.5"
      ],
      "t2": [
        "2.5"
      ],
      "t3": [
        "1.75"
      ],
      "maxLevel": [
        "2"
      ],
      "uses": [
        "30"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "3"
      ],
      "punchUses": [
        "90"
      ],
      "attackSpeed": [
        "1.1"
      ],
      "displayName": "Copper Axe"
    },
    {
      "name": "鉄の斧",
      "key": "鉄の斧",
      "groupBadges": [
        {
          "key": "伐採",
          "text": "伐採",
          "displayName": "Choppy"
        }
      ],
      "groupRaw": [
        "伐採"
      ],
      "t1": [
        "3.25"
      ],
      "t2": [
        "2.0"
      ],
      "t3": [
        "1.5"
      ],
      "maxLevel": [
        "2"
      ],
      "uses": [
        "40"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "4"
      ],
      "punchUses": [
        "120"
      ],
      "attackSpeed": [
        "1.0"
      ],
      "displayName": "Steel Axe"
    },
    {
      "name": "金の斧",
      "key": "金の斧",
      "groupBadges": [
        {
          "key": "伐採",
          "text": "伐採",
          "displayName": "Choppy"
        }
      ],
      "groupRaw": [
        "伐採"
      ],
      "t1": [
        "3.0"
      ],
      "t2": [
        "1.75"
      ],
      "t3": [
        "1.25"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "40"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "5"
      ],
      "punchUses": [
        "360"
      ],
      "attackSpeed": [
        "0.9"
      ],
      "displayName": "Gold Axe"
    },
    {
      "name": "ルビーの斧",
      "key": "ルビーの斧",
      "groupBadges": [
        {
          "key": "伐採",
          "text": "伐採",
          "displayName": "Choppy"
        }
      ],
      "groupRaw": [
        "伐採"
      ],
      "t1": [
        "2.9"
      ],
      "t2": [
        "1.65"
      ],
      "t3": [
        "1.15"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "0"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "6"
      ],
      "punchUses": [
        "0"
      ],
      "attackSpeed": [
        "0.9"
      ],
      "displayName": "Ruby Axe"
    },
    {
      "name": "ダイヤモンドの斧",
      "key": "ダイヤモンドの斧",
      "groupBadges": [
        {
          "key": "伐採",
          "text": "伐採",
          "displayName": "Choppy"
        }
      ],
      "groupRaw": [
        "伐採"
      ],
      "t1": [
        "2.5"
      ],
      "t2": [
        "1.5"
      ],
      "t3": [
        "1.0"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "80"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "6"
      ],
      "punchUses": [
        "720"
      ],
      "attackSpeed": [
        "0.9"
      ],
      "displayName": "Diamond Axe"
    },
    {
      "name": "エメラルドの斧",
      "key": "エメラルドの斧",
      "groupBadges": [
        {
          "key": "伐採",
          "text": "伐採",
          "displayName": "Choppy"
        }
      ],
      "groupRaw": [
        "伐採"
      ],
      "t1": [
        "2.5"
      ],
      "t2": [
        "1.5"
      ],
      "t3": [
        "1.0"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "60"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "6"
      ],
      "punchUses": [
        "540"
      ],
      "attackSpeed": [
        "0.9"
      ],
      "displayName": "Emerald Axe"
    },
    {
      "name": "チャロイトの斧",
      "key": "チャロイトの斧",
      "groupBadges": [
        {
          "key": "伐採",
          "text": "伐採",
          "displayName": "Choppy"
        }
      ],
      "groupRaw": [
        "伐採"
      ],
      "t1": [
        "2.5"
      ],
      "t2": [
        "1.5"
      ],
      "t3": [
        "1"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "50"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "6"
      ],
      "punchUses": [
        "450"
      ],
      "attackSpeed": [
        "0.8"
      ],
      "displayName": "Charoite Axe"
    },
    {
      "name": "dragonhide axe",
      "key": "dragonhide axe",
      "groupBadges": [
        {
          "key": "伐採",
          "text": "伐採",
          "displayName": "Choppy"
        }
      ],
      "groupRaw": [
        "伐採"
      ],
      "t1": [
        "1.2"
      ],
      "t2": [
        "0.8"
      ],
      "t3": [
        "0.6"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "40"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "6"
      ],
      "punchUses": [
        "360"
      ],
      "attackSpeed": [
        "0.6"
      ],
      "displayName": "Dragonhide Axe"
    },
    {
      "name": "fire/ice_draconic_steel axe",
      "key": "fire/ice_draconic_steel axe",
      "groupBadges": [
        {
          "key": "伐採",
          "text": "伐採",
          "displayName": "Choppy"
        }
      ],
      "groupRaw": [
        "伐採"
      ],
      "t1": [
        "0.6"
      ],
      "t2": [
        "0.3"
      ],
      "t3": [
        "0.15"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "200"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "55"
      ],
      "punchUses": [
        "1800"
      ],
      "attackSpeed": [
        "3"
      ],
      "displayName": "Fire/Ice Draconic Steel Axe"
    }
  ],
  "pick": [
    {
      "name": "木のつるはし",
      "key": "木のつるはし",
      "groupBadges": [
        {
          "key": "砕き",
          "text": "砕き",
          "displayName": "砕き"
        }
      ],
      "groupRaw": [
        "砕き"
      ],
      "t1": [
        "2.5"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "1"
      ],
      "uses": [
        "20"
      ],
      "maxDropLevel": [
        "0"
      ],
      "damage": [
        "2"
      ],
      "punchUses": [
        "20"
      ],
      "attackSpeed": [
        "1.2"
      ],
      "displayName": "Wooden Pickaxe"
    },
    {
      "name": "石のつるはし",
      "key": "石のつるはし",
      "groupBadges": [
        {
          "key": "砕き",
          "text": "砕き",
          "displayName": "砕き"
        }
      ],
      "groupRaw": [
        "砕き"
      ],
      "t1": [
        "2.5"
      ],
      "t2": [
        "2"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "1"
      ],
      "uses": [
        "40"
      ],
      "maxDropLevel": [
        "0"
      ],
      "damage": [
        "3"
      ],
      "punchUses": [
        "40"
      ],
      "attackSpeed": [
        "1.3"
      ],
      "displayName": "Stone Pickaxe"
    },
    {
      "name": "銅のつるはし",
      "key": "銅のつるはし",
      "groupBadges": [
        {
          "key": "砕き",
          "text": "砕き",
          "displayName": "砕き"
        }
      ],
      "groupRaw": [
        "砕き"
      ],
      "t1": [
        "4.5"
      ],
      "t2": [
        "2.5"
      ],
      "t3": [
        "2.25"
      ],
      "maxLevel": [
        "2"
      ],
      "uses": [
        "30"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "4"
      ],
      "punchUses": [
        "90"
      ],
      "attackSpeed": [
        "1.1"
      ],
      "displayName": "Copper Pickaxe"
    },
    {
      "name": "鉄のつるはし",
      "key": "鉄のつるはし",
      "groupBadges": [
        {
          "key": "砕き",
          "text": "砕き",
          "displayName": "砕き"
        }
      ],
      "groupRaw": [
        "砕き"
      ],
      "t1": [
        "4.0"
      ],
      "t2": [
        "2.0"
      ],
      "t3": [
        "1.75"
      ],
      "maxLevel": [
        "2"
      ],
      "uses": [
        "40"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "4"
      ],
      "punchUses": [
        "120"
      ],
      "attackSpeed": [
        "1.0"
      ],
      "displayName": "Steel Pickaxe"
    },
    {
      "name": "金のつるはし",
      "key": "金のつるはし",
      "groupBadges": [
        {
          "key": "砕き",
          "text": "砕き",
          "displayName": "砕き"
        }
      ],
      "groupRaw": [
        "砕き"
      ],
      "t1": [
        "2.4"
      ],
      "t2": [
        "1.8"
      ],
      "t3": [
        "1.5"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "40"
      ],
      "maxDropLevel": [
        "3"
      ],
      "damage": [
        "4"
      ],
      "punchUses": [
        "360"
      ],
      "attackSpeed": [
        "0.9"
      ],
      "displayName": "Gold Pickaxe"
    },
    {
      "name": "ルビーのつるはし",
      "key": "ルビーのつるはし",
      "groupBadges": [
        {
          "key": "砕き",
          "text": "砕き",
          "displayName": "砕き"
        }
      ],
      "groupRaw": [
        "砕き"
      ],
      "t1": [
        "2.3"
      ],
      "t2": [
        "1.7"
      ],
      "t3": [
        "1.4"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "0"
      ],
      "maxDropLevel": [
        "3"
      ],
      "damage": [
        "5"
      ],
      "punchUses": [
        "0"
      ],
      "attackSpeed": [
        "0.9"
      ],
      "displayName": "Ruby Pickaxe"
    },
    {
      "name": "ダイヤモンドのつるはし",
      "key": "ダイヤモンドのつるはし",
      "groupBadges": [
        {
          "key": "砕き",
          "text": "砕き",
          "displayName": "砕き"
        }
      ],
      "groupRaw": [
        "砕き"
      ],
      "t1": [
        "2"
      ],
      "t2": [
        "1.5"
      ],
      "t3": [
        "1"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "60"
      ],
      "maxDropLevel": [
        "3"
      ],
      "damage": [
        "5"
      ],
      "punchUses": [
        "540"
      ],
      "attackSpeed": [
        "0.9"
      ],
      "displayName": "Diamond Pickaxe"
    },
    {
      "name": "エメラルドのつるはし",
      "key": "エメラルドのつるはし",
      "groupBadges": [
        {
          "key": "砕き",
          "text": "砕き",
          "displayName": "砕き"
        }
      ],
      "groupRaw": [
        "砕き"
      ],
      "t1": [
        "2"
      ],
      "t2": [
        "1.5"
      ],
      "t3": [
        "1"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "80"
      ],
      "maxDropLevel": [
        "3"
      ],
      "damage": [
        "5"
      ],
      "punchUses": [
        "720"
      ],
      "attackSpeed": [
        "0.9"
      ],
      "displayName": "Emerald Pickaxe"
    },
    {
      "name": "チャロイトのつるはし",
      "key": "チャロイトのつるはし",
      "groupBadges": [
        {
          "key": "砕き",
          "text": "砕き",
          "displayName": "砕き"
        }
      ],
      "groupRaw": [
        "砕き"
      ],
      "t1": [
        "2"
      ],
      "t2": [
        "1.5"
      ],
      "t3": [
        "1"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "50"
      ],
      "maxDropLevel": [
        "3"
      ],
      "damage": [
        "5"
      ],
      "punchUses": [
        "450"
      ],
      "attackSpeed": [
        "0.9"
      ],
      "displayName": "Charoite Pickaxe"
    },
    {
      "name": "dragonhide pick",
      "key": "dragonhide pick",
      "groupBadges": [
        {
          "key": "砕き",
          "text": "砕き",
          "displayName": "砕き"
        }
      ],
      "groupRaw": [
        "砕き"
      ],
      "t1": [
        "1.2"
      ],
      "t2": [
        "0.8"
      ],
      "t3": [
        "0.6"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "40"
      ],
      "maxDropLevel": [
        "3"
      ],
      "damage": [
        "4"
      ],
      "punchUses": [
        "360"
      ],
      "attackSpeed": [
        "0.6"
      ],
      "displayName": "Dragonhide Pickaxe"
    },
    {
      "name": "fire/ice_draconic_steel pick",
      "key": "fire/ice_draconic_steel pick",
      "groupBadges": [
        {
          "key": "砕き",
          "text": "砕き",
          "displayName": "砕き"
        },
        {
          "key": "整地",
          "text": "整地",
          "displayName": "整地"
        }
      ],
      "groupRaw": [
        "砕き",
        "整地"
      ],
      "t1": [
        "0.6",
        "0.8"
      ],
      "t2": [
        "0.4",
        "0.5"
      ],
      "t3": [
        "0.3",
        "0.4"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "200"
      ],
      "maxDropLevel": [
        "3"
      ],
      "damage": [
        "35"
      ],
      "punchUses": [
        "1800"
      ],
      "attackSpeed": [
        "4"
      ],
      "displayName": "Fire/Ice Draconic Steel Pickaxe"
    }
  ],
  "shovel": [
    {
      "name": "木のシャベル",
      "key": "木のシャベル",
      "groupBadges": [
        {
          "key": "整地",
          "text": "整地",
          "displayName": "整地"
        }
      ],
      "groupRaw": [
        "整地"
      ],
      "t1": [
        "3.0"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "1"
      ],
      "uses": [
        "20"
      ],
      "maxDropLevel": [
        "0"
      ],
      "damage": [
        "2"
      ],
      "punchUses": [
        "20"
      ],
      "attackSpeed": [
        "1.2"
      ],
      "displayName": "Wooden Shovel"
    },
    {
      "name": "石のシャベル",
      "key": "石のシャベル",
      "groupBadges": [
        {
          "key": "整地",
          "text": "整地",
          "displayName": "整地"
        }
      ],
      "groupRaw": [
        "整地"
      ],
      "t1": [
        "2.0"
      ],
      "t2": [
        "1.75"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "1"
      ],
      "uses": [
        "40"
      ],
      "maxDropLevel": [
        "0"
      ],
      "damage": [
        "2"
      ],
      "punchUses": [
        "40"
      ],
      "attackSpeed": [
        "1.4"
      ],
      "displayName": "Stone Shovel"
    },
    {
      "name": "銅のシャベル",
      "key": "銅のシャベル",
      "groupBadges": [
        {
          "key": "整地",
          "text": "整地",
          "displayName": "整地"
        }
      ],
      "groupRaw": [
        "整地"
      ],
      "t1": [
        "1.9"
      ],
      "t2": [
        "1.6"
      ],
      "t3": [
        "1.2"
      ],
      "maxLevel": [
        "2"
      ],
      "uses": [
        "50"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "3"
      ],
      "punchUses": [
        "150"
      ],
      "attackSpeed": [
        "1.2"
      ],
      "displayName": "Copper Shovel"
    },
    {
      "name": "鉄のシャベル",
      "key": "鉄のシャベル",
      "groupBadges": [
        {
          "key": "整地",
          "text": "整地",
          "displayName": "整地"
        }
      ],
      "groupRaw": [
        "整地"
      ],
      "t1": [
        "1.8"
      ],
      "t2": [
        "1.5"
      ],
      "t3": [
        "1.1"
      ],
      "maxLevel": [
        "2"
      ],
      "uses": [
        "60"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "3"
      ],
      "punchUses": [
        "120"
      ],
      "attackSpeed": [
        "1.0"
      ],
      "displayName": "Steel Shovel"
    },
    {
      "name": "金のシャベル",
      "key": "金のシャベル",
      "groupBadges": [
        {
          "key": "整地",
          "text": "整地",
          "displayName": "整地"
        }
      ],
      "groupRaw": [
        "整地"
      ],
      "t1": [
        "1.5"
      ],
      "t2": [
        "1.2"
      ],
      "t3": [
        "1.0"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "40"
      ],
      "maxDropLevel": [
        "3"
      ],
      "damage": [
        "3"
      ],
      "punchUses": [
        "360"
      ],
      "attackSpeed": [
        "1.0"
      ],
      "displayName": "Gold Shovel"
    },
    {
      "name": "ルビーのシャベル",
      "key": "ルビーのシャベル",
      "groupBadges": [
        {
          "key": "整地",
          "text": "整地",
          "displayName": "整地"
        }
      ],
      "groupRaw": [
        "整地"
      ],
      "t1": [
        "1.4"
      ],
      "t2": [
        "1.1"
      ],
      "t3": [
        "1.0"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "0"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "4"
      ],
      "punchUses": [
        "0"
      ],
      "attackSpeed": [
        "1.0"
      ],
      "displayName": "Ruby Shovel"
    },
    {
      "name": "ダイヤモンドのシャベル",
      "key": "ダイヤモンドのシャベル",
      "groupBadges": [
        {
          "key": "整地",
          "text": "整地",
          "displayName": "整地"
        }
      ],
      "groupRaw": [
        "整地"
      ],
      "t1": [
        "1.3"
      ],
      "t2": [
        "1.0"
      ],
      "t3": [
        "0.9"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "60"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "3"
      ],
      "punchUses": [
        "180"
      ],
      "attackSpeed": [
        "1.1"
      ],
      "displayName": "Diamond Shovel"
    },
    {
      "name": "エメラルドのシャベル",
      "key": "エメラルドのシャベル",
      "groupBadges": [
        {
          "key": "整地",
          "text": "整地",
          "displayName": "整地"
        }
      ],
      "groupRaw": [
        "整地"
      ],
      "t1": [
        "1.3"
      ],
      "t2": [
        "1.0"
      ],
      "t3": [
        "0.9"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "80"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "4"
      ],
      "punchUses": [
        "720"
      ],
      "attackSpeed": [
        "1.0"
      ],
      "displayName": "Emerald Shovel"
    },
    {
      "name": "チャロイトのシャベル",
      "key": "チャロイトのシャベル",
      "groupBadges": [
        {
          "key": "整地",
          "text": "整地",
          "displayName": "整地"
        }
      ],
      "groupRaw": [
        "整地"
      ],
      "t1": [
        "1.3"
      ],
      "t2": [
        "1"
      ],
      "t3": [
        "0.9"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "50"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "4"
      ],
      "punchUses": [
        "450"
      ],
      "attackSpeed": [
        "0.9"
      ],
      "displayName": "Charoite Shovel"
    },
    {
      "name": "dragonhide shovel",
      "key": "dragonhide shovel",
      "groupBadges": [
        {
          "key": "整地",
          "text": "整地",
          "displayName": "整地"
        }
      ],
      "groupRaw": [
        "整地"
      ],
      "t1": [
        "0.8"
      ],
      "t2": [
        "0.6"
      ],
      "t3": [
        "0.4"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "40"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "4"
      ],
      "punchUses": [
        "360"
      ],
      "attackSpeed": [
        "0.6"
      ],
      "displayName": "Dragonhide Shovel"
    },
    {
      "name": "fire/ice_draconic_steel shovel",
      "key": "fire/ice_draconic_steel shovel",
      "groupBadges": [
        {
          "key": "整地",
          "text": "整地",
          "displayName": "整地"
        }
      ],
      "groupRaw": [
        "整地"
      ],
      "t1": [
        "0.6"
      ],
      "t2": [
        "0.4"
      ],
      "t3": [
        "0.2"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "200"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "30"
      ],
      "punchUses": [
        "1800"
      ],
      "attackSpeed": [
        "5.5"
      ],
      "displayName": "Fire/Ice Draconic Steel Shovel"
    }
  ],
  "sword": [
    {
      "name": "木の剣",
      "key": "木の剣",
      "groupBadges": [],
      "groupRaw": [
        "—"
      ],
      "t1": [
        "—"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "—"
      ],
      "uses": [
        "—"
      ],
      "maxDropLevel": [
        "0"
      ],
      "damage": [
        "3"
      ],
      "punchUses": [
        "—"
      ],
      "attackSpeed": [
        "1.0"
      ],
      "displayName": "Wooden Sword"
    },
    {
      "name": "石の剣",
      "key": "石の剣",
      "groupBadges": [],
      "groupRaw": [
        "—"
      ],
      "t1": [
        "—"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "—"
      ],
      "uses": [
        "—"
      ],
      "maxDropLevel": [
        "0"
      ],
      "damage": [
        "4"
      ],
      "punchUses": [
        "—"
      ],
      "attackSpeed": [
        "1.2"
      ],
      "displayName": "Stone Sword"
    },
    {
      "name": "銅の剣",
      "key": "銅の剣",
      "groupBadges": [],
      "groupRaw": [
        "—"
      ],
      "t1": [
        "—"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "—"
      ],
      "uses": [
        "—"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "5"
      ],
      "punchUses": [
        "—"
      ],
      "attackSpeed": [
        "0.9"
      ],
      "displayName": "Copper Sword"
    },
    {
      "name": "鉄の剣",
      "key": "鉄の剣",
      "groupBadges": [],
      "groupRaw": [
        "—"
      ],
      "t1": [
        "—"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "—"
      ],
      "uses": [
        "—"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "6"
      ],
      "punchUses": [
        "—"
      ],
      "attackSpeed": [
        "0.8"
      ],
      "displayName": "Steel Sword"
    },
    {
      "name": "金の剣",
      "key": "金の剣",
      "groupBadges": [],
      "groupRaw": [
        "—"
      ],
      "t1": [
        "—"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "—"
      ],
      "uses": [
        "—"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "7"
      ],
      "punchUses": [
        "—"
      ],
      "attackSpeed": [
        "0.7"
      ],
      "displayName": "Gold Sword"
    },
    {
      "name": "ルビーの剣",
      "key": "ルビーの剣",
      "groupBadges": [],
      "groupRaw": [
        "—"
      ],
      "t1": [
        "—"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "—"
      ],
      "uses": [
        "—"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "7"
      ],
      "punchUses": [
        "0"
      ],
      "attackSpeed": [
        "0.7"
      ],
      "displayName": "Ruby Sword"
    },
    {
      "name": "ダイヤモンドの剣",
      "key": "ダイヤモンドの剣",
      "groupBadges": [],
      "groupRaw": [
        "—"
      ],
      "t1": [
        "—"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "—"
      ],
      "uses": [
        "—"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "8"
      ],
      "punchUses": [
        "—"
      ],
      "attackSpeed": [
        "0.7"
      ],
      "displayName": "Diamond Sword"
    },
    {
      "name": "エメラルドの剣",
      "key": "エメラルドの剣",
      "groupBadges": [],
      "groupRaw": [
        "—"
      ],
      "t1": [
        "—"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "—"
      ],
      "uses": [
        "—"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "8"
      ],
      "punchUses": [
        "—"
      ],
      "attackSpeed": [
        "0.7"
      ],
      "displayName": "Emerald Sword"
    },
    {
      "name": "チャロイトの剣",
      "key": "チャロイトの剣",
      "groupBadges": [
        {
          "key": "切断",
          "text": "切断",
          "displayName": "切断"
        }
      ],
      "groupRaw": [
        "切断"
      ],
      "t1": [
        "—"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "—"
      ],
      "uses": [
        "—"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "8"
      ],
      "punchUses": [
        "450"
      ],
      "attackSpeed": [
        "0.6"
      ],
      "displayName": "Charoite Sword"
    },
    {
      "name": "dragonhide sword",
      "key": "dragonhide sword",
      "groupBadges": [
        {
          "key": "切断",
          "text": "切断",
          "displayName": "切断"
        }
      ],
      "groupRaw": [
        "切断"
      ],
      "t1": [
        "0.8"
      ],
      "t2": [
        "0.6"
      ],
      "t3": [
        "0.4"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "40"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "12"
      ],
      "punchUses": [
        "360"
      ],
      "attackSpeed": [
        "0.1"
      ],
      "displayName": "Dragonhide Sword"
    },
    {
      "name": "fire/ice_draconic_steel sword",
      "key": "fire/ice_draconic_steel sword",
      "groupBadges": [
        {
          "key": "切断",
          "text": "切断",
          "displayName": "切断"
        }
      ],
      "groupRaw": [
        "切断"
      ],
      "t1": [
        "0.2"
      ],
      "t2": [
        "0.15"
      ],
      "t3": [
        "0.1"
      ],
      "maxLevel": [
        "3"
      ],
      "uses": [
        "200"
      ],
      "maxDropLevel": [
        "1"
      ],
      "damage": [
        "60"
      ],
      "punchUses": [
        "1800"
      ],
      "attackSpeed": [
        "1.2"
      ],
      "displayName": "Fire/Ice Draconic Steel Sword"
    }
  ],
  "other": [
    {
      "name": "魔法の棒",
      "key": "魔法の棒",
      "groupBadges": [],
      "groupRaw": [
        "—"
      ],
      "t1": [
        "—"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "—"
      ],
      "uses": [
        "—"
      ],
      "maxDropLevel": [
        "—"
      ],
      "damage": [
        "—"
      ],
      "punchUses": [
        "—"
      ],
      "attackSpeed": [
        "1.0"
      ],
      "displayName": "Magical Stick"
    },
    {
      "name": "グラップリングフック",
      "key": "グラップリングフック",
      "groupBadges": [],
      "groupRaw": [
        "—"
      ],
      "t1": [
        "—"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "—"
      ],
      "uses": [
        "—"
      ],
      "maxDropLevel": [
        "0"
      ],
      "damage": [
        "5"
      ],
      "punchUses": [
        "—"
      ],
      "attackSpeed": [
        "2.0"
      ],
      "displayName": "Grappling Hook"
    },
    {
      "name": "ハンマー",
      "key": "ハンマー",
      "groupBadges": [],
      "groupRaw": [
        "—"
      ],
      "t1": [
        "—"
      ],
      "t2": [
        "—"
      ],
      "t3": [
        "—"
      ],
      "maxLevel": [
        "—"
      ],
      "uses": [
        "—"
      ],
      "maxDropLevel": [
        "0"
      ],
      "damage": [
        "6"
      ],
      "punchUses": [
        "—"
      ],
      "attackSpeed": [
        "1.5"
      ],
      "displayName": "Hammer"
    }
  ]
};

export const TOOL_NAME_EN_MAP: Record<string, string> = {
  "木の斧": "Wooden Axe",
  "石の斧": "Stone Axe",
  "銅の斧": "Copper Axe",
  "鉄の斧": "Steel Axe",
  "金の斧": "Gold Axe",
  "ルビーの斧": "Ruby Axe",
  "ダイヤモンドの斧": "Diamond Axe",
  "エメラルドの斧": "Emerald Axe",
  "チャロイトの斧": "Charoite Axe",
  "dragonhide axe": "Dragonhide Axe",
  "fire/ice_draconic_steel axe": "Fire/Ice Draconic Steel Axe",
  "木のつるはし": "Wooden Pickaxe",
  "石のつるはし": "Stone Pickaxe",
  "銅のつるはし": "Copper Pickaxe",
  "鉄のつるはし": "Steel Pickaxe",
  "金のつるはし": "Gold Pickaxe",
  "ルビーのつるはし": "Ruby Pickaxe",
  "ダイヤモンドのつるはし": "Diamond Pickaxe",
  "エメラルドのつるはし": "Emerald Pickaxe",
  "チャロイトのつるはし": "Charoite Pickaxe",
  "dragonhide pick": "Dragonhide Pickaxe",
  "fire/ice_draconic_steel pick": "Fire/Ice Draconic Steel Pickaxe",
  "木のシャベル": "Wooden Shovel",
  "石のシャベル": "Stone Shovel",
  "銅のシャベル": "Copper Shovel",
  "鉄のシャベル": "Steel Shovel",
  "金のシャベル": "Gold Shovel",
  "ルビーのシャベル": "Ruby Shovel",
  "ダイヤモンドのシャベル": "Diamond Shovel",
  "エメラルドのシャベル": "Emerald Shovel",
  "チャロイトのシャベル": "Charoite Shovel",
  "dragonhide shovel": "Dragonhide Shovel",
  "fire/ice_draconic_steel shovel": "Fire/Ice Draconic Steel Shovel",
  "木の剣": "Wooden Sword",
  "石の剣": "Stone Sword",
  "銅の剣": "Copper Sword",
  "鉄の剣": "Steel Sword",
  "金の剣": "Gold Sword",
  "ルビーの剣": "Ruby Sword",
  "ダイヤモンドの剣": "Diamond Sword",
  "エメラルドの剣": "Emerald Sword",
  "チャロイトの剣": "Charoite Sword",
  "dragonhide sword": "Dragonhide Sword",
  "fire/ice_draconic_steel sword": "Fire/Ice Draconic Steel Sword",
  "魔法の棒": "Magical Stick",
  "グラップリングフック": "Grappling Hook",
  "ハンマー": "Hammer"
};

export const TOOL_CATEGORY_MAP: Record<string, 'axe' | 'pickaxe' | 'shovel' | 'sword' | 'other'> = {
  '木の斧': 'axe', '石の斧': 'axe', '銅の斧': 'axe', '鉄の斧': 'axe', '金の斧': 'axe', 'ルビーの斧': 'axe', 'ダイヤモンドの斧': 'axe', 'エメラルドの斧': 'axe', 'チャロイトの斧': 'axe', 'dragonhide axe': 'axe', 'fire/ice_draconic_steel axe': 'axe',
  '木のつるはし': 'pickaxe', '石のつるはし': 'pickaxe', '銅のつるはし': 'pickaxe', '鉄のつるはし': 'pickaxe', '金のつるはし': 'pickaxe', 'ルビーのつるはし': 'pickaxe', 'ダイヤモンドのつるはし': 'pickaxe', 'エメラルドのつるはし': 'pickaxe', 'チャロイトのつるはし': 'pickaxe', 'dragonhide pick': 'pickaxe', 'fire/ice_draconic_steel pick': 'pickaxe',
  '木のシャベル': 'shovel', '石のシャベル': 'shovel', '銅のシャベル': 'shovel', '鉄のシャベル': 'shovel', '金のシャベル': 'shovel', 'ルビーのシャベル': 'shovel', 'ダイヤモンドのシャベル': 'shovel', 'エメラルドのシャベル': 'shovel', 'チャロイトのシャベル': 'shovel', 'dragonhide shovel': 'shovel', 'fire/ice_draconic_steel shovel': 'shovel',
  '木の剣': 'sword', '石の剣': 'sword', '銅の剣': 'sword', '鉄の剣': 'sword', '金の剣': 'sword', 'ルビーの剣': 'sword', 'ダイヤモンドの剣': 'sword', 'エメラルドの剣': 'sword', 'チャロイトの剣': 'sword', 'dragonhide sword': 'sword', 'fire/ice_draconic_steel sword': 'sword',
  '魔法の棒': 'other', 'グラップリングフック': 'other', 'ハンマー': 'other'
};

export const BASE_TOOL_CAPS_DICT: ToolCapabilities = {
            damage_groups: { fleshy: 1.0 },
            full_punch_interval: 0.5,
            punch_attack_uses: null,
            groupcaps: {
                cracky: { maxlevel: 0, times: [null, 3.0, 2.0, 1.0], uses: 30 },
                choppy: { maxlevel: 0, times: [null, 3.0, 2.0, 1.0], uses: 30 },
                crumbly: { maxlevel: 0, times: [null, 3.0, 2.0, 1.0], uses: 30 },
                snappy: { maxlevel: 0, times: [null, 3.0, 2.0, 1.0], uses: 30 }
            },
            max_drop_level: 0
        };

export const TOOL_DEFAULT_USES: Record<string, number> = {
            // ---ツール---
            "admin_equipment:super_tool": 0,
            "compass:4": 0,
            "default:axe_copper": 0,
            "default:axe_diamond": 0,
            "default:axe_emerald": 0,
            "default:axe_gold": 0,
            "default:axe_ruby": 0,
            "default:axe_steel": 0,
            "default:axe_stone": 0,
            "default:axe_wood": 0,
            "default:pick_copper": 0,
            "default:pick_diamond": 0,
            "default:pick_emerald": 0,
            "default:pick_gold": 0,
            "default:pick_ruby": 0,
            "default:pick_steel": 0,
            "default:pick_stone": 0,
            "default:pick_wood": 0,
            "default:shovel_copper": 0,
            "default:shovel_diamond": 0,
            "default:shovel_emerald": 0,
            "default:shovel_gold": 0,
            "default:shovel_ruby": 0,
            "default:shovel_steel": 0,
            "default:shovel_stone": 0,
            "default:shovel_wood": 0,
            "default:sword_copper": 0,
            "default:sword_diamond": 0,
            "default:sword_emerald": 0,
            "default:sword_gold": 0,
            "default:sword_ruby": 0,
            "default:sword_steel": 0,
            "default:sword_stone": 0,
            "default:sword_wood": 0,
            "draconis:axe_dragonhide_fire_red": 0,
            "draconis:axe_dragonhide_ice_sapphire": 0,
            "draconis:axe_fire_draconic_steel": 0,
            "draconis:axe_ice_draconic_steel": 0,
            "draconis:pick_dragonhide_fire_red": 0,
            "draconis:pick_dragonhide_ice_sapphire": 0,
            "draconis:pick_fire_draconic_steel": 0,
            "draconis:pick_ice_draconic_steel": 0,
            "draconis:shovel_dragonhide_fire_red": 0,
            "draconis:shovel_dragonhide_ice_sapphire": 0,
            "draconis:shovel_fire_draconic_steel": 0,
            "draconis:shovel_ice_draconic_steel": 0,
            "draconis:sword_dragonhide_fire_red": 0,
            "draconis:sword_dragonhide_ice_sapphire": 0,
            "draconis:sword_fire_draconic_steel": 0,
            "draconis:sword_ice_draconic_steel": 0,
            "farming:hoe_copper": 0,
            "farming:hoe_diamond": 0,
            "farming:hoe_emerald": 0,
            "farming:hoe_gold": 0,
            "farming:hoe_ruby": 0,
            "farming:hoe_steel": 0,
            "farming:hoe_stone": 0,
            "farming:hoe_wood": 0,
            "fire:flint_and_steel": 0,
            "fishing:fishing_rod_charged": 0,
            "mesecons_fpga:programmer": 0,
            "mobs:nametag": 0,
            "mobs:saddle": 0,
            "mobs:shears": 0,
            "mobs_water:net": 0,
            "mobs_witch:magical_stick": 0,
            "nextgen_bows:arrow": 0,
            "nextgen_bows:arrow_steel": 0,
            "nextgen_bows:bow_wood": 0,
            "nextgen_bows:crossbow_wood": 0,
            "screwdriver:screwdriver": 0,
            "spyglass:gold": 0,
            "spyglass:steel": 0,
            "summer_weapons:weapon_hook": 0,
            "terraform:brush": 0,
            "terraform:fixlight": 0,
            "terraform:light": 0,
            "terraform:teleport": 0,
            "terraform:undo": 0,
            "watch:0": 0,
            "weather_lite:barometer_soon": 0,
            "workbench:hammer": 0,
            "worldedit:brush": 0,
            "worldedit:wand": 0,
            // ---鎧---
            "3d_armor_stand:armor_stand": 0,
            "3d_armor_stand:armor_stand_birch_wood": 0,
            "3d_armor_stand:armor_stand_jungle_wood": 0,
            "3d_armor_stand:armor_stand_pine_wood": 0,
            "3d_armor_stand:armor_stand_cherry_blossom": 0,
            "3d_armor_stand:armor_stand_ice": 0,
            "3d_armor_stand:armor_stand_acacia_wood": 0,
            "advanced_hats:academic_cap": 0,
            "advanced_hats:beach_hat": 0,
            "advanced_hats:chefs_hat": 0,
            "advanced_hats:construction_helmet": 0,
            "advanced_hats:cowboy_hat": 0,
            "advanced_hats:cylinder_hat": 0,
            "advanced_hats:diving_mask": 0,
            "advanced_hats:flower_hat": 0,
            "advanced_hats:hunters_hat": 0,
            "advanced_hats:jesters_hat": 0,
            "advanced_hats:landsknects_hat": 0,
            "advanced_hats:panama_hat": 0,
            "advanced_hats:pirate_hat": 0,
            "advanced_hats:plague_doctor_mask": 0,
            "advanced_hats:shaperon": 0,
            "advanced_hats:straw_hat": 0,
            "advanced_hats:witch_hat": 0,
            "armor:boots_chain": 0,
            "armor:boots_diamond": 0,
            "armor:boots_emerald": 0,
            "armor:boots_gold": 0,
            "armor:boots_gold_chain": 0,
            "armor:boots_leather": 0,
            "armor:boots_ruby": 0,
            "armor:boots_steel": 0,
            "armor:chestplate_chain": 0,
            "armor:chestplate_diamond": 0,
            "armor:chestplate_emerald": 0,
            "armor:chestplate_gold": 0,
            "armor:chestplate_gold_chain": 0,
            "armor:chestplate_leather": 0,
            "armor:chestplate_ruby": 0,
            "armor:chestplate_steel": 0,
            "armor:helmet_chain": 0,
            "armor:helmet_diamond": 0,
            "armor:helmet_emerald": 0,
            "armor:helmet_gold": 0,
            "armor:helmet_gold_chain": 0,
            "armor:helmet_leather": 0,
            "armor:helmet_ruby": 0,
            "armor:helmet_steel": 0,
            "armor:leggings_chain": 0,
            "armor:leggings_diamond": 0,
            "armor:leggings_emerald": 0,
            "armor:leggings_gold": 0,
            "armor:leggings_gold_chain": 0,
            "armor:leggings_leather": 0,
            "armor:leggings_ruby": 0,
            "armor:leggings_steel": 0,
            "backpack:large": 0,
            "backpack:medium": 0,
            "backpack:small": 0,
            "cape:default": 0,
            "draconis:boots_fire_draconic_steel": 0,
            "draconis:boots_ice_draconic_steel": 0,
            "draconis:chestplate_fire_draconic_steel": 0,
            "draconis:chestplate_ice_draconic_steel": 0,
            "draconis:helmet_fire_draconic_steel": 0,
            "draconis:helmet_ice_draconic_steel": 0,
            "draconis:leggings_fire_draconic_steel": 0,
            "draconis:leggings_ice_draconic_steel": 0,
            "football:goalkeeper_uniform_1": 0,
            "football:goalkeeper_uniform_2": 0,
            "football:uniform_1": 0,
            "football:uniform_2": 0,
            "ice_hockey:goalkeeper_uniform_1": 0,
            "ice_hockey:goalkeeper_uniform_2": 0,
            "ice_hockey:skates": 0,
            "ice_hockey:uniform_1": 0,
            "ice_hockey:uniform_2": 0,
            "mobs_animals:chestplate_turtle": 0,
            "mobs_animals:chestplate_turtle_desert": 0,
            "mobs_horse:armor_caparison": 0,
            "mobs_horse:armor_chain": 0,
            "mobs_horse:armor_diamond": 0,
            "mobs_horse:armor_emerald": 0,
            "mobs_horse:armor_gold": 0,
            "mobs_horse:armor_gold_chain": 0,
            "mobs_horse:armor_ruby": 0,
            "mobs_horse:armor_steel": 0,
            "mobs_horse:horseshoe_diamond": 0,
            "mobs_horse:horseshoe_emerald": 0,
            "mobs_horse:horseshoe_gold": 0,
            "mobs_horse:horseshoe_ruby": 0,
            "mobs_horse:horseshoe_steel": 0,
            "mobs_water:boots_crocodile": 0,
            "mobs_water:chestplate_crocodile": 0,
            "mobs_water:helmet_crocodile": 0,
            "mobs_water:leggings_crocodile": 0,
            "wings:fly": 0,
            "wings:soft_fall": 0
        };

export const DEFAULT_TOOL_CAPS_DICT: Record<string, ToolCapabilities> = {
            "default:pick_wood": { "damage_groups": { "fleshy": 2 }, "full_punch_interval": 1.2, "groupcaps": { "cracky": { "maxlevel": 1, "times": [null, 2.5, null, null], "uses": 20 } }, "max_drop_level": 0, "punch_attack_uses": 20 },
            "default:pick_stone": { "damage_groups": { "fleshy": 3 }, "full_punch_interval": 1.3, "groupcaps": { "cracky": { "maxlevel": 1, "times": [null, 2.5, 2.0, null], "uses": 40 } }, "max_drop_level": 0, "punch_attack_uses": 40 },
            "default:pick_copper": { "damage_groups": { "fleshy": 4 }, "full_punch_interval": 1.1, "groupcaps": { "cracky": { "maxlevel": 2, "times": [null, 4.5, 2.5, 2.25], "uses": 30 } }, "max_drop_level": 1, "punch_attack_uses": 90 },
            "default:pick_steel": { "damage_groups": { "fleshy": 4 }, "full_punch_interval": 1.0, "groupcaps": { "cracky": { "maxlevel": 2, "times": [null, 4.0, 2.0, 1.75], "uses": 40 } }, "max_drop_level": 1, "punch_attack_uses": 120 },
            "default:pick_gold": { "damage_groups": { "fleshy": 4 }, "full_punch_interval": 0.9, "groupcaps": { "cracky": { "maxlevel": 3, "times": [null, 2.4, 1.8, 1.5], "uses": 40 } }, "max_drop_level": 3, "punch_attack_uses": 360 },
            "default:pick_ruby": { "damage_groups": { "fleshy": 5 }, "full_punch_interval": 0.8, "groupcaps": { "cracky": { "maxlevel": 3, "times": [null, 2.3, 1.6, 1.4], "uses": 0 } }, "max_drop_level": 1, "punch_attack_uses": 0 },
            "default:pick_diamond": { "damage_groups": { "fleshy": 5 }, "full_punch_interval": 0.8, "groupcaps": { "cracky": { "maxlevel": 3, "times": [null, 1.5, 1.4, 1.3], "uses": 60 } }, "max_drop_level": 1, "punch_attack_uses": 720 },
            "default:pick_emerald": { "damage_groups": { "fleshy": 5 }, "full_punch_interval": 0.8, "groupcaps": { "cracky": { "maxlevel": 3, "times": [null, 1.5, 1.3, 1.2], "uses": 80 } }, "max_drop_level": 1, "punch_attack_uses": 600 },
            "default:axe_wood": { "damage_groups": { "fleshy": 2 }, "full_punch_interval": 1.0, "groupcaps": { "choppy": { "maxlevel": 1, "times": [null, 2.5, null, null], "uses": 20 } }, "max_drop_level": 0, "punch_attack_uses": 20 },
            "default:axe_stone": { "damage_groups": { "fleshy": 3 }, "full_punch_interval": 1.2, "groupcaps": { "choppy": { "maxlevel": 1, "times": [null, 4.0, 3.0, null], "uses": 40 } }, "max_drop_level": 0, "punch_attack_uses": 40 },
            "default:axe_copper": { "damage_groups": { "fleshy": 3 }, "full_punch_interval": 1.1, "groupcaps": { "choppy": { "maxlevel": 2, "times": [null, 3.5, 2.5, 1.75], "uses": 30 } }, "max_drop_level": 1, "punch_attack_uses": 90 },
            "default:axe_steel": { "damage_groups": { "fleshy": 4 }, "full_punch_interval": 1.0, "groupcaps": { "choppy": { "maxlevel": 2, "times": [null, 3.25, 2.0, 1.5], "uses": 40 } }, "max_drop_level": 1, "punch_attack_uses": 120 },
            "default:axe_gold": { "damage_groups": { "fleshy": 5 }, "full_punch_interval": 0.9, "groupcaps": { "choppy": { "maxlevel": 3, "times": [null, 3.0, 1.75, 1.25], "uses": 40 } }, "max_drop_level": 1, "punch_attack_uses": 360 },
            "default:axe_ruby": { "damage_groups": { "fleshy": 6 }, "full_punch_interval": 0.9, "groupcaps": { "choppy": { "maxlevel": 3, "times": [null, 2.9, 1.65, 1.15], "uses": 0 } }, "max_drop_level": 1, "punch_attack_uses": 0 },
            "default:axe_diamond": { "damage_groups": { "fleshy": 6 }, "full_punch_interval": 0.9, "groupcaps": { "choppy": { "maxlevel": 3, "times": [null, 2.5, 1.5, 1.0], "uses": 80 } }, "max_drop_level": 1, "punch_attack_uses": 720 },
            "default:axe_emerald": { "damage_groups": { "fleshy": 6 }, "full_punch_interval": 0.9, "groupcaps": { "choppy": { "maxlevel": 3, "times": [null, 2.5, 1.5, 1.0], "uses": 60 } }, "max_drop_level": 1, "punch_attack_uses": 540 },
            "default:shovel_wood": { "damage_groups": { "fleshy": 2 }, "full_punch_interval": 1.2, "groupcaps": { "crumbly": { "maxlevel": 1, "times": [null, 3.0, null, null], "uses": 20 } }, "max_drop_level": 0, "punch_attack_uses": 20 },
            "default:shovel_stone": { "damage_groups": { "fleshy": 2 }, "full_punch_interval": 1.4, "groupcaps": { "crumbly": { "maxlevel": 1, "times": [null, 2.0, 1.75, null], "uses": 40 } }, "max_drop_level": 0, "punch_attack_uses": 40 },
            "default:shovel_copper": { "damage_groups": { "fleshy": 3 }, "full_punch_interval": 1.2, "groupcaps": { "crumbly": { "maxlevel": 2, "times": [null, 1.9, 1.6, 1.2], "uses": 50 } }, "max_drop_level": 1, "punch_attack_uses": 150 },
            "default:shovel_steel": { "damage_groups": { "fleshy": 3 }, "full_punch_interval": 1.0, "groupcaps": { "crumbly": { "maxlevel": 2, "times": [null, 1.8, 1.5, 1.1], "uses": 60 } }, "max_drop_level": 1, "punch_attack_uses": 120 },
            "default:shovel_gold": { "damage_groups": { "fleshy": 3 }, "full_punch_interval": 1.0, "groupcaps": { "crumbly": { "maxlevel": 3, "times": [null, 1.5, 1.2, 1.0], "uses": 40 } }, "max_drop_level": 3, "punch_attack_uses": 360 },
            "default:shovel_ruby": { "damage_groups": { "fleshy": 4 }, "full_punch_interval": 1.0, "groupcaps": { "crumbly": { "maxlevel": 3, "times": [null, 1.4, 1.1, 1.0], "uses": 0 } }, "max_drop_level": 1, "punch_attack_uses": 0 },
            "default:shovel_diamond": { "damage_groups": { "fleshy": 3 }, "full_punch_interval": 1.1, "groupcaps": { "crumbly": { "maxlevel": 3, "times": [null, 1.3, 1.0, 0.9], "uses": 60 } }, "max_drop_level": 1, "punch_attack_uses": 180 },
            "default:shovel_emerald": { "damage_groups": { "fleshy": 4 }, "full_punch_interval": 1.0, "groupcaps": { "crumbly": { "maxlevel": 3, "times": [null, 1.3, 1.0, 0.9], "uses": 80 } }, "max_drop_level": 1, "punch_attack_uses": 720 },
            "default:sword_wood": { "damage_groups": { "fleshy": 3 }, "full_punch_interval": 1.0, "groupcaps": {}, "max_drop_level": 0, "punch_attack_uses": 20 },
            "default:sword_stone": { "damage_groups": { "fleshy": 4 }, "full_punch_interval": 1.2, "groupcaps": {}, "max_drop_level": 0, "punch_attack_uses": 40 },
            "default:sword_copper": { "damage_groups": { "fleshy": 5 }, "full_punch_interval": 0.9, "groupcaps": {}, "max_drop_level": 1, "punch_attack_uses": null },
            "default:sword_steel": { "damage_groups": { "fleshy": 6 }, "full_punch_interval": 0.8, "groupcaps": {}, "max_drop_level": 1, "punch_attack_uses": null },
            "default:sword_gold": { "damage_groups": { "fleshy": 7 }, "full_punch_interval": 0.7, "groupcaps": {}, "max_drop_level": 1, "punch_attack_uses": null },
            "default:sword_ruby": { "damage_groups": { "fleshy": 7 }, "full_punch_interval": 0.7, "groupcaps": {}, "max_drop_level": 1, "punch_attack_uses": 0 },
            "default:sword_diamond": { "damage_groups": { "fleshy": 8 }, "full_punch_interval": 0.7, "groupcaps": {}, "max_drop_level": 1, "punch_attack_uses": null },
            "default:sword_emerald": { "damage_groups": { "fleshy": 8 }, "full_punch_interval": 0.7, "groupcaps": {}, "max_drop_level": 1, "punch_attack_uses": null },
        };
