import React, { useEffect, useRef } from 'react';

export default function HowToOrder() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.step, .stat');
    if (!els) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.15 });
    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="how-section" id="how" ref={ref}>
      <div className="section-header">
        <h2>איך <span className="highlight">מזמינים</span></h2>
        <p>האתר כרגע הוא דף תדמית ודמו להזמנה. להזמנה אמיתית מתקשרים לעסק.</p>
      </div>
      <div className="steps">
        <div className="step">
          <div className="step-icon" style={{ background: '#FFE0E0' }}>📋</div>
          <h3>1. בוחרים מהתפריט</h3>
          <p>עוברים על הפיצות, המבצעים, המאפים והקינוחים.</p>
        </div>
        <div className="step-arrow">←</div>
        <div className="step">
          <div className="step-icon" style={{ background: '#E0F5FF' }}>🛒</div>
          <h3>2. מוסיפים לסל</h3>
          <p>הסל עוזר לראות דוגמה להזמנה ולסכום משוער.</p>
        </div>
        <div className="step-arrow">←</div>
        <div className="step">
          <div className="step-icon" style={{ background: '#E8FFE0' }}>☎️</div>
          <h3>3. מתקשרים להזמנה</h3>
          <p>להזמנה, איסוף עצמי או בירור משלוחים: 03-9587775.</p>
        </div>
      </div>
    </section>
  );
}
