import React, { useState } from 'react';
import { Plus, Heart } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { addToCart } from '../lib/cart';
import type { FoodItem } from '../types/food';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface FoodCardProps {
  item: FoodItem;
}

export default function FoodCard({ item }: FoodCardProps) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setIsAdding(true);
      await addToCart(user.uid, item);

      // Subscribe to real-time updates for the user's cart
      const userRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          // The AuthContext will automatically update with the new cart data
        }
      });

      // Cleanup subscription after 2 seconds
      setTimeout(() => {
        unsubscribe();
      }, 2000);

    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
        >
          <Heart
            size={20}
            className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-orange-600">₹{item.price}</span>
          <motion.button
            onClick={handleAddToCart}
            className={`bg-orange-500 text-white px-4 py-2 rounded-full flex items-center space-x-1 hover:bg-orange-600 transition-colors duration-300 ${
              isAdding ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            whileTap={{ scale: 0.95 }}
            disabled={isAdding}
          >
            <Plus size={20} />
            <span>{isAdding ? 'Adding...' : 'Add'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}