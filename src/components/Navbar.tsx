import React from 'react';

interface Props {
  cartCount: number;
  onCartOpen: () => void;
}

export default function Navbar({ cartCount, onCartOpen }: Props) {
  return (
    <nav className="navbar">
      <div className="logo">🍕 ד"ר פיצה</div>
      <div className="nav-links">
        <a href="#menu">תפריט</a>
        <a href="#how">איך מזמינים</a>
        <a href="#contact">יצירת קשר</a>
      </div>
      <button className="cart-btn" onClick={onCartOpen}>
        🛒 סל <span className="cart-count">{cartCount}</span>
      </button>
    </nav>
  );
}
