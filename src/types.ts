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
}

export interface CartItem extends MenuItem {
  qty: number;
}

export type FilterCategory = 'all' | 'pizza' | 'special' | 'dessert' | 'drink';
