import React from 'react';

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-header">
        <h2>למה לקוחות <span className="highlight">אוהבים אותנו</span></h2>
      </div>
      <div className="testimonial-grid">
        <div className="testimonial-card">
          <p>"פיצה שכונתית טובה, שירות מהיר ומחירים נוחים."</p>
          <div className="reviewer"><span>⭐</span><strong>לקוחות איזי</strong></div>
        </div>
        <div className="testimonial-card">
          <p>"מבצעים משתלמים למשפחות ולערבים עם חברים."</p>
          <div className="reviewer"><span>🍕</span><strong>ד"ר פיצה</strong></div>
        </div>
        <div className="testimonial-card">
          <p>"כתובת מוכרת במזרח ראשון לציון לפיצה, מאפים וקינוחים."</p>
          <div className="reviewer"><span>📍</span><strong>מורדי הגטאות 42</strong></div>
        </div>
      </div>
    </section>
  );
}
