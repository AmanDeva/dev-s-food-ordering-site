import { doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebase';
import type { FoodItem, CartItem } from '../types/food';

export async function addToCart(userId: string, item: FoodItem) {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User document not found');
    }

    const userData = userDoc.data();
    const existingCartItem = userData.cart?.find((cartItem: CartItem) => cartItem.id === item.id);

    if (existingCartItem) {
      // If item exists, update its quantity
      const updatedCart = userData.cart.map((cartItem: CartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      await updateDoc(userRef, { cart: updatedCart });
    } else {
      // If item doesn't exist, add it with quantity 1
      const newCartItem: CartItem = {
        ...item,
        quantity: 1
      };
      await updateDoc(userRef, {
        cart: arrayUnion(newCartItem)
      });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}