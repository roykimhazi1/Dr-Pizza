import React from 'react';
import { CartItem } from '../types';

interface Props {
  open: boolean;
  cart: CartItem[];
  onClose: () => void;
  onChangeQty: (id: number, delta: number) => void;
  onCheckout: () => void;
}

export default function CartSidebar({ open, cart, onClose, onChangeQty, onCheckout }: Props) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      <div className={`cart-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <aside className={`cart-sidebar${open ? ' open' : ''}`}>
        <div className="cart-header">
          <h3>🛒 הסל שלך</h3>
          <button className="close-cart" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-icon">🍕</div>
              <p>הסל ריק כרגע</p>
              <p>הוסיפו פריטים מהתפריט כדי להתחיל.</p>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.id}>
                <span className="ci-emoji">{item.emoji}</span>
                <div className="ci-info">
                  <strong>{item.name}</strong>
                  <span>₪{item.price * item.qty}</span>
                </div>
                <div className="ci-controls">
                  <button className="ci-btn" onClick={() => onChangeQty(item.id, -1)}>−</button>
                  <span className="ci-qty">{item.qty}</span>
                  <button className="ci-btn" onClick={() => onChangeQty(item.id, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>סה"כ:</span>
              <strong>₪{total}</strong>
            </div>
            <button className="btn btn-primary full-width" onClick={onCheckout}>סיימתי לבחור 🍕</button>
          </div>
        )}
      </aside>
    </>
  );
}
