import React, { useState } from 'react';
import { MenuItem, FilterCategory } from '../types';
import MenuCard from './MenuCard';

interface Props {
  items: MenuItem[];
  loading: boolean;
  onAdd: (item: MenuItem) => void;
}

const TABS: { label: string; value: FilterCategory }[] = [
  { label: 'הכל',     value: 'all'     },
  { label: 'פיצות',   value: 'pizza'   },
  { label: 'מיוחדים', value: 'special' },
  { label: 'קינוחים', value: 'dessert' },
  { label: 'שתייה',   value: 'drink'   },
];

export default function MenuSection({ items, loading, onAdd }: Props) {
  const [filter, setFilter] = useState<FilterCategory>('all');

  const visible = filter === 'all' ? items : items.filter(i => i.category === filter);

  return (
    <section className="menu-section" id="menu">
      <div className="section-header">
        <h2>התפריט של <span className="highlight">ד"ר פיצה</span></h2>
        <p>בחרו פיצה, מאפה, קינוח או שתייה והוסיפו לסל לדוגמה.</p>
      </div>

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

      <div className="menu-grid" id="menuGrid">
        {loading ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', padding: '2rem', color: '#888' }}>טוען תפריט...</p>
        ) : (
          visible.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} onAdd={onAdd} />
          ))
        )}
      </div>
    </section>
  );
}
