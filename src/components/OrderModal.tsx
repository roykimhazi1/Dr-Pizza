import React, { useState } from 'react';
import { CartItem } from '../types';

interface Props {
  open: boolean;
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onConfirm: () => void;
}

type Step = 'form' | 'success';

export default function OrderModal({ open, cart, total, onClose, onConfirm }: Props) {
  const [step, setStep] = useState<Step>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Partial<Record<'name' | 'phone', string>>>({});

  if (!open) return null;

  const validate = (): boolean => {
    const e: Partial<Record<'name' | 'phone', string>> = {};
    if (!name.trim()) e.name = 'נא להזין שם מלא';
    const cleaned = phone.replace(/[-\s]/g, '');
    if (!cleaned || !/^0\d{8,9}$/.test(cleaned)) e.phone = 'מספר טלפון לא תקין';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onConfirm();
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setName(''); setPhone(''); setAddress(''); setNotes('');
    setErrors({});
    onClose();
  };

  return (
    <div
      className="modal-overlay open"
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {step === 'form' ? (
        <div className="modal modal-order">
          <button className="modal-close-btn" onClick={handleClose} aria-label="סגור">✕</button>
          <div className="modal-pizza">🍕</div>
          <h2>סיום הזמנה</h2>

          <div className="order-summary">
            {cart.map(item => (
              <div key={item.id} className="order-row">
                <span>{item.emoji} {item.name} ×{item.qty}</span>
                <span>₪{item.price * item.qty}</span>
              </div>
            ))}
            <div className="order-total-row">
              <strong>סה"כ</strong>
              <strong className="order-total-price">₪{total}</strong>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="order-form" noValidate>
            <div className="form-group">
              <label htmlFor="order-name">שם מלא *</label>
              <input
                id="order-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="ישראל ישראלי"
                className={errors.name ? 'input-error' : ''}
                autoComplete="name"
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="order-phone">טלפון *</label>
              <input
                id="order-phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="050-0000000"
                className={errors.phone ? 'input-error' : ''}
                dir="ltr"
                autoComplete="tel"
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="order-address">כתובת למשלוח</label>
              <input
                id="order-address"
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="רחוב, מספר בית, עיר"
                autoComplete="street-address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="order-notes">הערות להזמנה</label>
              <textarea
                id="order-notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="בקשות מיוחדות, אלרגיות..."
                rows={2}
              />
            </div>
            <button type="submit" className="btn btn-primary full-width">שלח הזמנה 🍕</button>
          </form>
        </div>
      ) : (
        <div className="modal modal-success">
          <div className="success-icon">✅</div>
          <h2>ההזמנה נשלחה!</h2>
          <p>שלום <strong>{name}</strong>, קיבלנו את ההזמנה שלך.</p>
          <p className="modal-sub">ניצור קשר בקרוב לאישור סופי.</p>
          <p className="modal-sub">לבירור מיידי: <strong>03-9587775</strong></p>
          <div className="modal-actions">
            <a href="tel:039587775" className="btn btn-primary">📞 03-9587775</a>
            <button className="btn btn-outline" onClick={handleClose}>סגור</button>
          </div>
        </div>
      )}
    </div>
  );
}
