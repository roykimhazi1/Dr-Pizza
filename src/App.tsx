import React, { useState, useCallback } from 'react';
import { MenuItem, ToastMessage } from './types';
import { useMenu } from './hooks/useMenu';
import { useCart } from './hooks/useCart';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBanner from './components/StatsBanner';
import MenuSection from './components/MenuSection';
import HowToOrder from './components/HowToOrder';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import OrderModal from './components/OrderModal';
import Toast from './components/Toast';
import AdminPanel from './components/AdminPanel';

let nextToastId = 0;

export default function App() {
  const [menuVersion, setMenuVersion] = useState(0);
  const { items, allItems, loading, error } = useMenu(menuVersion);
  const { cart, addToCart: addItem, changeQty, clearCart, cartCount, cartTotal } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToCart = useCallback((item: MenuItem) => {
    addItem(item);
    setCartOpen(true);
    const id = ++nextToastId;
    setToasts(prev => [...prev, { id, text: `${item.name} נוסף לסל`, emoji: item.emoji }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500);
  }, [addItem]);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleOrderConfirm = useCallback(() => {
    clearCart();
  }, [clearCart]);

  if (adminOpen) {
    return (
      <AdminPanel
        allItems={allItems}
        onExit={() => setAdminOpen(false)}
        onSave={() => {
          setMenuVersion(v => v + 1);
          setAdminOpen(false);
        }}
      />
    );
  }

  return (
    <div>
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onAdminOpen={() => setAdminOpen(true)}
      />
      <Hero />
      <StatsBanner />
      <MenuSection items={items} loading={loading} error={error} onAdd={addToCart} />
      <HowToOrder />
      <AboutSection />
      <Testimonials />
      <Footer />
      <CartSidebar
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onCheckout={() => { setCartOpen(false); setModalOpen(true); }}
      />
      <OrderModal
        open={modalOpen}
        cart={cart}
        total={cartTotal}
        onClose={() => setModalOpen(false)}
        onConfirm={handleOrderConfirm}
      />
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
