import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import type { FoodItem } from '../types/food';

export async function getMenuItems(): Promise<FoodItem[]> {
  const menuSnapshot = await getDocs(collection(db, 'menu'));
  return menuSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as FoodItem));
}