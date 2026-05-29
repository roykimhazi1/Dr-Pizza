import React, { useEffect, useRef } from 'react';
import { MenuItem } from '../types';

interface Props {
  item: MenuItem;
  index: number;
  onAdd: (item: MenuItem) => void;
}

export default function MenuCard({ item, index, onAdd }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    const t = setTimeout(() => {
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 60);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div className="pizza-card" ref={ref} data-id={item.id}>
      <div className="card-emoji">
        {item.emoji}
        <span className="card-tag" style={{ background: item.tagColor }}>{item.tagLabel}</span>
      </div>
      <div className="card-body">
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        <div className="card-footer">
          <span className="price" style={{ color: item.accentColor }}>₪{item.price}</span>
          <button
            className="add-btn"
            style={{ background: `linear-gradient(135deg, ${item.accentColor}, ${item.tagColor})` }}
            onClick={() => onAdd(item)}
          >+</button>
        </div>
      </div>
    </div>
  );
}
