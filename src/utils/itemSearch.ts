import itemsData from '../data/items.json';

export interface ItemEntry {
  id: string;
  name: string;
}

const allItems: ItemEntry[] = itemsData as ItemEntry[];

export function searchItems(query: string, maxResults = 12): ItemEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return allItems.slice(0, maxResults);

  const startsWithId: ItemEntry[] = [];
  const startsWithName: ItemEntry[] = [];
  const containsId: ItemEntry[] = [];
  const containsName: ItemEntry[] = [];

  for (const item of allItems) {
    const idLower = item.id.toLowerCase();
    const nameLower = item.name.toLowerCase();

    if (idLower === q || nameLower === q) {
      startsWithId.unshift(item);
    } else if (idLower.startsWith(q)) {
      startsWithId.push(item);
    } else if (nameLower.startsWith(q)) {
      startsWithName.push(item);
    } else if (idLower.includes(q)) {
      containsId.push(item);
    } else if (nameLower.includes(q)) {
      containsName.push(item);
    }

    if (startsWithId.length + startsWithName.length >= maxResults * 2) {
      break;
    }
  }

  const combined = [
    ...startsWithId,
    ...startsWithName,
    ...containsId,
    ...containsName,
  ];

  // deduplicate
  const seen = new Set<string>();
  const results: ItemEntry[] = [];
  for (const item of combined) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      results.push(item);
      if (results.length >= maxResults) break;
    }
  }

  return results;
}

export function getItemDisplayName(itemId: string): string {
  const found = allItems.find((i) => i.id === itemId);
  return found ? found.name : itemId;
}
