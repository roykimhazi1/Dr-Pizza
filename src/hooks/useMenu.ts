import { useState, useEffect } from 'react';
import { MenuItem, AdminOverride } from '../types';

const CATEGORY_CONFIG: Record<string, { filter: MenuItem['category']; tagColor: string; accentColor: string; emoji: string }> = {
  'דוקטור פיצה': { filter: 'pizza',   tagColor: '#FF3B30', accentColor: '#FF9500', emoji: '🍕' },
  'מיוחדים':     { filter: 'special',  tagColor: '#34C759', accentColor: '#34C759', emoji: '🫓' },
  'קינוחים':     { filter: 'dessert',  tagColor: '#FF9500', accentColor: '#8E5E3C', emoji: '🍮' },
  'שתייה':       { filter: 'drink',    tagColor: '#FFCC00', accentColor: '#007AFF', emoji: '🥤' },
};

function resolveEmoji(name: string, fallback: string): string {
  if (name.includes('שוקולד'))                                               return '🍫';
  if (name.includes('מלבי') || name.includes('בוואריה') || name.includes('קדאיף')) return '🍮';
  if (name.includes('זיווה') || name.includes('גבינ'))                       return '🧀';
  if (name.includes('מלאווח') || name.includes('פוקאצ'))                    return '🫓';
  if (name.includes('מנרלים') || name.includes('מים'))                       return '💧';
  if (name.includes('בירה'))                                                  return '🍺';
  return fallback;
}

function resolveTag(name: string, filter: MenuItem['category']): string {
  if (filter !== 'pizza') {
    return { special: 'מיוחד', dessert: 'קינוח', drink: 'שתייה' }[filter];
  }
  if (name.includes('מבצע') || name.includes('1+1')) return 'מבצע';
  if (name.includes('משפחתי'))                       return 'משפחתי';
  return 'קלאסי';
}

interface RawMenu {
  menu: Array<{
    category: string;
    items: Array<{ item_name: string; item_description: string; item_price: number }>;
  }>;
}

const ADMIN_STORAGE_KEY = 'dr_pizza_admin_overrides';

function loadOverrides(): Record<number, AdminOverride> {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function useMenu(version = 0) {
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/menu_data/menu_items.json')
      .then(r => {
        if (!r.ok) throw new Error('שגיאה בטעינת התפריט');
        return r.json();
      })
      .then((data: RawMenu) => {
        const overrides = loadOverrides();
        let id = 0;
        const mapped = data.menu.flatMap(cat => {
          const cfg = CATEGORY_CONFIG[cat.category] ?? CATEGORY_CONFIG['שתייה'];
          return cat.items.map(item => {
            const itemId = ++id;
            const ov = overrides[itemId] ?? {};
            return {
              id:          itemId,
              name:        item.item_name,
              category:    cfg.filter,
              emoji:       resolveEmoji(item.item_name, cfg.emoji),
              price:       ov.price ?? item.item_price,
              desc:        item.item_description ?? '',
              tagLabel:    resolveTag(item.item_name, cfg.filter),
              tagColor:    cfg.tagColor,
              accentColor: cfg.accentColor,
              hidden:      ov.hidden ?? false,
            };
          });
        });
        setAllItems(mapped);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message ?? 'שגיאה לא ידועה');
        setLoading(false);
      });
  }, [version]);

  return { items: allItems.filter(i => !i.hidden), allItems, loading, error };
}
