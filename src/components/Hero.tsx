import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-blob blob1" />
      <div className="hero-blob blob2" />
      <div className="hero-blob blob3" />
      <div className="hero-content">
        <div className="badge">🔥 פיצה חמה ומשלוחים</div>
        <h1>ד"ר פיצה<br /><span className="highlight">ראשון לציון</span></h1>
        <p className="hero-sub">פיצרייה כשרה וותיקה במזרח ראשון לציון, עם מגשי פיצה, מאפים, קינוחים ושתייה לכל המשפחה.</p>
        <div className="hero-actions">
          <a href="#menu" className="btn btn-primary">לצפייה בתפריט</a>
          <a href="tel:039587775" className="btn btn-outline">03-9587775</a>
        </div>
      </div>
      <div className="hero-pizza">
        <div className="pizza-spin">🍕</div>
        <div className="floating-topping t1">🧀</div>
        <div className="floating-topping t2">🌶️</div>
        <div className="floating-topping t3">🍄</div>
        <div className="floating-topping t4">🫑</div>
        <div className="floating-topping t5">🫒</div>
      </div>
    </section>
  );
}
