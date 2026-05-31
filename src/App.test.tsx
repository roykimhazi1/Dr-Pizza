import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StatsBanner from './components/StatsBanner';

// Mock async hooks so no fetch/localStorage runs during render
jest.mock('./hooks/useMenu', () => ({
  useMenu: () => ({ items: [], allItems: [], loading: false, error: null }),
}));
jest.mock('./hooks/useCart', () => ({
  useCart: () => ({
    cart: [], addToCart: jest.fn(), changeQty: jest.fn(),
    clearCart: jest.fn(), cartCount: 0, cartTotal: 0,
  }),
}));

// === App integration ===

test('renders the app without crashing', () => {
  render(<App />);
  const logos = screen.getAllByText(/ד"ר פיצה/i);
  expect(logos.length).toBeGreaterThan(0);
});

test('cart count shows zero on first load', () => {
  render(<App />);
  expect(screen.getByText('0')).toBeInTheDocument();
});

// === Navbar unit ===

test('Navbar renders cart button with count', () => {
  render(<Navbar cartCount={5} onCartOpen={() => {}} onAdminOpen={() => {}} />);
  expect(screen.getByText('5')).toBeInTheDocument();
});

test('Navbar renders hamburger button', () => {
  render(<Navbar cartCount={0} onCartOpen={() => {}} onAdminOpen={() => {}} />);
  expect(screen.getByRole('button', { name: /פתח תפריט ניווט/i })).toBeInTheDocument();
});

// === Static sections ===

test('Footer renders phone number', () => {
  render(<Footer />);
  expect(screen.getByText(/03-9587775/)).toBeInTheDocument();
});

test('StatsBanner renders Eazy rating', () => {
  render(<StatsBanner />);
  expect(screen.getByText('8.9')).toBeInTheDocument();
});
