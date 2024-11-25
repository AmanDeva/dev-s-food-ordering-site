export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  cart: CartItem[];
}