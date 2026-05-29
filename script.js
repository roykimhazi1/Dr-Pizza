'use strict';

// === PIZZA DATA ===
const pizzas = [
  {
    id: 1, name: "מגש פיצה L", category: "pizza",
    emoji: "🍕", price: 65,
    desc: "6 משולשים במגש.",
    tagLabel: "קלאסי", tagColor: "#FF3B30",
    accentColor: "#FF9500",
  },
  {
    id: 2, name: "מגש פיצה XL", category: "pizza",
    emoji: "🍕", price: 70,
    desc: "8 משולשים במגש.",
    tagLabel: "משפחתי", tagColor: "#AF52DE",
    accentColor: "#AF52DE",
  },
  {
    id: 3, name: "מבצע XL פיצה 1+1", category: "pizza",
    emoji: "🍕", price: 130,
    desc: "שני מגשי פיצה XL, בכל מגש 8 משולשים.",
    tagLabel: "מבצע", tagColor: "#FF3B30",
    accentColor: "#FF3B30",
  },
  {
    id: 4, name: "פוקאצ'ה שום", category: "special",
    emoji: "🫓", price: 20,
    desc: "מאפה חם ופריך ליד הפיצה או כנשנוש בפני עצמו.",
    tagLabel: "מאפה", tagColor: "#34C759",
    accentColor: "#34C759",
  },
  {
    id: 5, name: "זיווה עם רסק וביצה", category: "special",
    emoji: "🧀", price: 30,
    desc: "מאפה גבינות קלאסי שמגיע עם רסק וביצה.",
    tagLabel: "מיוחד", tagColor: "#007AFF",
    accentColor: "#007AFF",
  },
  {
    id: 6, name: "מלבי", category: "dessert",
    emoji: "🍮", price: 12,
    desc: "גביע אישי של פודינג עם מי ורדים ואגוזים.",
    tagLabel: "קינוח", tagColor: "#8E5E3C",
    accentColor: "#8E5E3C",
  },
  {
    id: 7, name: "מוס שוקולד", category: "dessert",
    emoji: "🍫", price: 12,
    desc: "גביע אישי של מוס שוקולד חלבי עם פירורי שוקולד.",
    tagLabel: "מתוק", tagColor: "#FF2D55",
    accentColor: "#FF2D55",
  },
  {
    id: 8, name: "שתייה 1.5 ליטר", category: "drink",
    emoji: "🥤", price: 10,
    desc: "בקבוק גדול לבחירה לצד המגש.",
    tagLabel: "שתייה", tagColor: "#FFCC00",
    accentColor: "#FF9500",
  },
];

// === CART STATE ===
let cart = [];

// === RENDER MENU ===
function renderMenu(filter = 'all') {
  const grid = document.getElementById('menuGrid');
  const items = filter === 'all' ? pizzas : pizzas.filter(p => p.category === filter);

  grid.innerHTML = items.map(p => `
    <div class="pizza-card" data-id="${p.id}">
      <div class="card-emoji">
        ${p.emoji}
        <span class="card-tag" style="background:${p.tagColor}">${p.tagLabel}</span>
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="card-footer">
          <span class="price" style="color:${p.accentColor}">₪${p.price.toFixed(0)}</span>
          <button class="add-btn" style="background:linear-gradient(135deg,${p.accentColor},${p.tagColor})" onclick="addToCart(${p.id})">+</button>
        </div>
      </div>
    </div>
  `).join('');

  // animate cards in
  const cards = grid.querySelectorAll('.pizza-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 60);
  });
}

// === CART FUNCTIONS ===
function addToCart(id) {
  const pizza = pizzas.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...pizza, qty: 1 });
  }

  updateCartUI();
  animateCartBtn();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function updateCartUI() {
  const count    = cart.reduce((s, i) => s + i.qty, 0);
  const total    = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const countEl  = document.getElementById('cartCount');
  const itemsEl  = document.getElementById('cartItems');
  const totalEl  = document.getElementById('cartTotal');
  const footerEl = document.getElementById('cartFooter');

  countEl.textContent = count;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🍕</div>
        <p>הסל ריק כרגע</p>
        <p>הוסיפו פריטים מהתפריט כדי להתחיל.</p>
      </div>`;
    footerEl.style.display = 'none';
  } else {
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <span class="ci-emoji">${item.emoji}</span>
        <div class="ci-info">
          <strong>${item.name}</strong>
          <span>₪${(item.price * item.qty).toFixed(0)}</span>
        </div>
        <div class="ci-controls">
          <button class="ci-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="ci-qty">${item.qty}</span>
          <button class="ci-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `).join('');
    footerEl.style.display = 'block';
    totalEl.textContent = `₪${total.toFixed(0)}`;
  }
}

function animateCartBtn() {
  const btn = document.getElementById('cartBtn');
  btn.style.transform = 'scale(1.2)';
  setTimeout(() => { btn.style.transform = ''; }, 200);
}

// === CART OPEN/CLOSE ===
function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}
function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

// === ORDER ===
function placeOrder() {
  closeCart();
  cart = [];
  updateCartUI();
  document.getElementById('modalOverlay').classList.add('open');
}

// === FILTER TABS ===
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderMenu(tab.dataset.filter);
  });
});

// === EVENT LISTENERS ===
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);
document.getElementById('checkoutBtn').addEventListener('click', placeOrder);
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.remove('open');
});

// === INIT ===
renderMenu();

// === NAVBAR SCROLL EFFECT ===
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.style.boxShadow = window.scrollY > 20
    ? '0 4px 20px rgba(0,0,0,0.12)'
    : 'none';
});

// === INTERSECTION OBSERVER for step/testimonial cards ===
const observerOpts = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOpts);

document.querySelectorAll('.step, .testimonial-card, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
