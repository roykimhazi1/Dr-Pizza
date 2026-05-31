import React, { useState } from 'react';
import { MenuItem, FilterCategory } from '../types';
import MenuCard from './MenuCard';

interface Props {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
  onAdd: (item: MenuItem) => void;
}

const TABS: { label: string; value: FilterCategory }[] = [
  { label: 'הכל',     value: 'all'     },
  { label: 'פיצות',   value: 'pizza'   },
  { label: 'מיוחדים', value: 'special' },
  { label: 'קינוחים', value: 'dessert' },
  { label: 'שתייה',   value: 'drink'   },
];

export default function MenuSection({ items, loading, error, onAdd }: Props) {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [search, setSearch] = useState('');

  const visible = items.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch = !search.trim() ||
      item.name.includes(search) ||
      item.desc.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="menu-section" id="menu">
      <div className="section-header">
        <h2>התפריט של <span className="highlight">ד"ר פיצה</span></h2>
        <p>בחרו פיצה, מאפה, קינוח או שתייה והוסיפו לסל.</p>
      </div>

      <div className="menu-controls">
        <div className="filter-tabs">
          {TABS.map(tab => (
            <button
              key={tab.value}
              className={`tab${filter === tab.value ? ' active' : ''}`}
              onClick={() => setFilter(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="search-wrap">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 חיפוש בתפריט..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')} aria-label="נקה חיפוש">✕</button>
          )}
        </div>
      </div>

      <div className="menu-grid" id="menuGrid">
        {loading ? (
          <p className="menu-status">⏳ טוען תפריט...</p>
        ) : error ? (
          <p className="menu-status menu-error">⚠️ {error}</p>
        ) : visible.length === 0 ? (
          <p className="menu-status">לא נמצאו פריטים תואמים לחיפוש.</p>
        ) : (
          visible.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} onAdd={onAdd} />
          ))
        )}
      </div>
    </section>
  );
}
