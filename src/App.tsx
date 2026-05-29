import React, { useState, useCallback } from 'react';
import { MenuItem, CartItem } from './types';
import { useMenu } from './hooks/useMenu';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBanner from './components/StatsBanner';
import MenuSection from './components/MenuSection';
import HowToOrder from './components/HowToOrder';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import OrderModal from './components/OrderModal';

export default function App() {
  const { items, loading } = useMenu();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const addToCart = useCallback((item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const changeQty = useCallback((id: number, delta: number) => {
    setCart(prev =>
      prev
        .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    );
  }, []);

  const placeOrder = useCallback(() => {
    setCartOpen(false);
    setCart([]);
    setModalOpen(true);
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <Hero />
      <StatsBanner />
      <MenuSection items={items} loading={loading} onAdd={addToCart} />
      <HowToOrder />
      <Testimonials />
      <Footer />
      <CartSidebar
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onCheckout={placeOrder}
      />
      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
