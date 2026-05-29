import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function OrderModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="modal-overlay open">
      <div className="modal">
        <div className="modal-pizza">🍕</div>
        <h2>הסל מוכן!</h2>
        <p>זה עדיין דמו. להזמנה אמיתית התקשרו אל <strong>03-9587775</strong>.</p>
        <p className="modal-sub">בהמשך אפשר לחבר את האתר למערכת הזמנות אמיתית.</p>
        <button className="btn btn-primary" onClick={onClose}>הבנתי</button>
      </div>
    </div>
  );
}
