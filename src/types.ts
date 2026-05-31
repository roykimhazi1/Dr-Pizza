export interface MenuItem {
  id: number;
  name: string;
  category: 'pizza' | 'special' | 'dessert' | 'drink';
  emoji: string;
  price: number;
  desc: string;
  tagLabel: string;
  tagColor: string;
  accentColor: string;
  hidden?: boolean;
}

export interface CartItem extends MenuItem {
  qty: number;
}

export type FilterCategory = 'all' | 'pizza' | 'special' | 'dessert' | 'drink';

export interface ToastMessage {
  id: number;
  text: string;
  emoji: string;
}

export interface AdminOverride {
  price?: number;
  hidden?: boolean;
}
