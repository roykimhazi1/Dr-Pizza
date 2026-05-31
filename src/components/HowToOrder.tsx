import React, { useEffect, useRef } from 'react';

export default function HowToOrder() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.step');
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
        <p>שלושה צעדים פשוטים לפיצה חמה בבית.</p>
      </div>
      <div className="steps">
        <div className="step">
          <div className="step-icon" style={{ background: '#FFE0E0' }}>📋</div>
          <h3>1. בוחרים מהתפריט</h3>
          <p>עוברים על הפיצות, המבצעים, המאפים והקינוחים — יש הרבה ממה לבחור.</p>
        </div>
        <div className="step-arrow">←</div>
        <div className="step">
          <div className="step-icon" style={{ background: '#E0F5FF' }}>🛒</div>
          <h3>2. מוסיפים לסל</h3>
          <p>בחרו כמויות, ראו את הסכום הכולל ועדכנו את הסל בקלות.</p>
        </div>
        <div className="step-arrow">←</div>
        <div className="step">
          <div className="step-icon" style={{ background: '#E8FFE0' }}>📝</div>
          <h3>3. שולחים הזמנה</h3>
          <p>ממלאים שם וטלפון — אנו נאשר את ההזמנה בהקדם ונתאם משלוח.</p>
        </div>
      </div>
    </section>
  );
}
