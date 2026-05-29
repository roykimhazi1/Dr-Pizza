import React from 'react';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo">🍕 ד"ר פיצה</div>
          <p>פיצרייה כשרה בראשון לציון.<br />ראשון-חמישי 11:00-23:00, שבת 20:30-23:00.</p>
        </div>
        <div className="footer-links">
          <h4>קישורים מהירים</h4>
          <a href="#menu">תפריט</a>
          <a href="#how">איך מזמינים</a>
          <a href="tel:039587775">התקשרו עכשיו</a>
        </div>
        <div className="footer-contact">
          <h4>פרטי העסק</h4>
          <p>📞 03-9587775</p>
          <p>📍 מורדי הגטאות 42, ראשון לציון</p>
          <p>🥛 כשר רבנות מקומית</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 ד"ר פיצה. המחירים והשעות כפופים לאישור העסק.</p>
      </div>
    </footer>
  );
}
