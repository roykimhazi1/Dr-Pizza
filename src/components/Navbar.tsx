import React, { useState } from 'react';

interface Props {
  cartCount: number;
  onCartOpen: () => void;
  onAdminOpen: () => void;
}

export default function Navbar({ cartCount, onCartOpen, onAdminOpen }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="logo">🍕 ד"ר פיצה</div>
        <div className="nav-links">
          <a href="#menu">תפריט</a>
          <a href="#how">איך מזמינים</a>
          <a href="#about">אודות</a>
          <a href="#contact">יצירת קשר</a>
        </div>
        <div className="nav-actions">
          <button className="cart-btn" onClick={onCartOpen}>
            🛒 סל <span className="cart-count">{cartCount}</span>
          </button>
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="פתח תפריט ניווט"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={close} />
          <div className="mobile-menu">
            <a href="#menu" onClick={close}>תפריט</a>
            <a href="#how" onClick={close}>איך מזמינים</a>
            <a href="#about" onClick={close}>אודות</a>
            <a href="#contact" onClick={close}>יצירת קשר</a>
            <button
              className="mobile-admin-btn"
              onClick={() => { close(); onAdminOpen(); }}
            >
              🛠️ ניהול תפריט
            </button>
          </div>
        </>
      )}
    </>
  );
}
