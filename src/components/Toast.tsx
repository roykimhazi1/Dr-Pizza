import React from 'react';
import { ToastMessage } from '../types';

interface Props {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}

export default function Toast({ toasts, onDismiss }: Props) {
  if (toasts.length === 0) return null;
  return (
    <div className="toast-container" role="region" aria-live="polite" aria-label="התראות">
      {toasts.map(t => (
        <div key={t.id} className="toast" onClick={() => onDismiss(t.id)}>
          <span className="toast-emoji">{t.emoji}</span>
          <span className="toast-text">{t.text}</span>
          <button className="toast-close" aria-label="סגור">✕</button>
        </div>
      ))}
    </div>
  );
}
