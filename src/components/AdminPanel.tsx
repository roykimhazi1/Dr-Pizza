import React, { useState, useCallback } from 'react';
import { MenuItem, AdminOverride } from '../types';

// Demo password — replace with real auth when backend is ready
const ADMIN_PASSWORD = 'pizza123';
const ADMIN_STORAGE_KEY = 'dr_pizza_admin_overrides';

const CATEGORY_LABELS: Record<string, string> = {
  pizza:   '🍕 פיצות',
  special: '🫓 מיוחדים',
  dessert: '🍮 קינוחים',
  drink:   '🥤 שתייה',
};

interface Props {
  allItems: MenuItem[];
  onExit: () => void;
  onSave: () => void;
}

export default function AdminPanel({ allItems, onExit, onSave }: Props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [overrides, setOverrides] = useState<Record<number, AdminOverride>>(() => {
    try {
      const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });
  const [savedMessage, setSavedMessage] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setPasswordError('סיסמה שגויה. נסה שוב.');
    }
  };

  const toggleHidden = useCallback((id: number) => {
    setOverrides(prev => {
      const current = prev[id]?.hidden ?? false;
      return { ...prev, [id]: { ...prev[id], hidden: !current } };
    });
  }, []);

  const setPrice = useCallback((id: number, value: string) => {
    const price = Number(value);
    if (!isNaN(price) && price >= 0) {
      setOverrides(prev => ({ ...prev, [id]: { ...prev[id], price } }));
    }
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(overrides));
    } catch { /* ignore */ }
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
    onSave();
  };

  const handleReset = () => {
    if (!window.confirm('לאפס את כל השינויים לתפריט המקורי?')) return;
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    setOverrides({});
    onSave();
  };

  if (!authenticated) {
    return (
      <div className="admin-panel admin-login-screen">
        <div className="admin-login-box">
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔐</div>
          <h2>כניסה למנהל</h2>
          <p className="admin-login-sub">ניהול תפריט ד"ר פיצה</p>
          <form onSubmit={handleLogin} className="order-form">
            <div className="form-group">
              <label htmlFor="admin-pw">סיסמת מנהל</label>
              <input
                id="admin-pw"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={passwordError ? 'input-error' : ''}
                autoFocus
              />
              {passwordError && <span className="field-error">{passwordError}</span>}
            </div>
            <button type="submit" className="btn btn-primary full-width">כניסה</button>
            <button
              type="button"
              className="btn btn-outline full-width"
              onClick={onExit}
              style={{ marginTop: 12 }}
            >
              ← חזרה לאתר
            </button>
          </form>
        </div>
      </div>
    );
  }

  const grouped = allItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const hiddenCount = Object.values(overrides).filter(ov => ov.hidden).length;

  return (
    <div className="admin-panel">
      <div className="admin-navbar">
        <div className="logo">🛠️ ניהול תפריט</div>
        <div className="admin-nav-actions">
          {savedMessage && <span className="save-badge">✅ נשמר בהצלחה</span>}
          {hiddenCount > 0 && (
            <span className="hidden-badge">{hiddenCount} פריטים מוסתרים</span>
          )}
          <button className="btn btn-primary" onClick={handleSave}>שמור שינויים</button>
          <button className="btn btn-outline" onClick={handleReset}>איפוס לברירת מחדל</button>
          <button className="btn btn-outline" onClick={onExit}>← חזרה לאתר</button>
        </div>
      </div>

      <div className="admin-content">
        <p className="admin-hint">
          שנה מחירים והסתר/הצג פריטים. לחץ <strong>שמור שינויים</strong> להחיל על התפריט.
        </p>

        {allItems.length === 0 ? (
          <p className="admin-hint" style={{ textAlign: 'center', padding: '3rem' }}>⏳ טוען נתונים...</p>
        ) : (
          Object.entries(grouped).map(([cat, catItems]) => (
            <div key={cat} className="admin-category">
              <h3 className="admin-cat-title">{CATEGORY_LABELS[cat] ?? cat}</h3>
              <div className="admin-table">
                <div className="admin-row admin-header-row">
                  <span>פריט</span>
                  <span>מחיר (₪)</span>
                  <span>מוצג בתפריט</span>
                </div>
                {catItems.map(item => {
                  const ov = overrides[item.id] ?? {};
                  const isHidden = ov.hidden ?? false;
                  const price = ov.price ?? item.price;
                  return (
                    <div key={item.id} className={`admin-row${isHidden ? ' admin-row-hidden' : ''}`}>
                      <span className="admin-item-name">
                        <span>{item.emoji}</span>
                        <span>{item.name}</span>
                      </span>
                      <span>
                        <input
                          type="number"
                          value={price}
                          min={0}
                          step={1}
                          onChange={e => setPrice(item.id, e.target.value)}
                          className="admin-price-input"
                        />
                      </span>
                      <span>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={!isHidden}
                            onChange={() => toggleHidden(item.id)}
                          />
                          <span className="toggle-slider" />
                        </label>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
