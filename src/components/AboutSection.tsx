import React, { useEffect, useRef } from 'react';

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.about-card');
    if (!els) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.15 });
    els.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" id="about" ref={ref}>
      <div className="section-header">
        <h2>קצת <span className="highlight">עלינו</span></h2>
        <p>פיצרייה כשרה ומוכרת במזרח ראשון לציון — שירות חם, מחירים הוגנים.</p>
      </div>
      <div className="about-grid">
        <div className="about-card">
          <div className="about-icon">🏠</div>
          <h3>פיצרייה שכונתית</h3>
          <p>כתובת מוכרת ואהובה במזרח ראשון לציון. שנים של פיצות, מאפים ושירות ידידותי.</p>
        </div>
        <div className="about-card">
          <div className="about-icon">🥛</div>
          <h3>כשר בפיקוח</h3>
          <p>כל המוצרים שלנו כשרים בפיקוח רבנות ראשון לציון. אוכל שאפשר לאכול בבטחה ובשמחה.</p>
        </div>
        <div className="about-card">
          <div className="about-icon">🍕</div>
          <h3>תפריט מגוון</h3>
          <p>פיצות בכל הגדלים, מאפים מסורתיים, קינוחים משפחתיים ומגוון שתייה לכל אירוע.</p>
        </div>
        <div className="about-card">
          <div className="about-icon">⭐</div>
          <h3>8.9 באיזי</h3>
          <p>ציון גבוה מאות לקוחות מרוצים. מהיר, טעים ובמחיר שמתאים לכל כיס.</p>
        </div>
      </div>
    </section>
  );
}
