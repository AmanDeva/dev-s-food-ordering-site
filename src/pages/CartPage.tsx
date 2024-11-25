import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { CartItem } from '../types/food';

export default function CartPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const updateItemQuantity = async (itemId: string, newQuantity: number) => {
    if (!user) return;

    const updatedCart = user.cart.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0);

    await updateDoc(doc(db, 'users', user.uid), {
      cart: updatedCart
    });
  };

  const removeItem = async (itemId: string) => {
    if (!user) return;
    
    const updatedCart = user.cart.filter(item => item.id !== itemId);
    await updateDoc(doc(db, 'users', user.uid), {
      cart: updatedCart
    });
  };

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log('Proceeding to checkout...');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

        {user.cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <button
              onClick={() => navigate('/menu')}
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="divide-y divide-gray-200">
                {user.cart.map((item) => (
                  <motion.div
                    key={item.id}
                    className="p-6 flex items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{calculateTotal(user.cart)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold">₹50</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold text-orange-500">
                    ₹{calculateTotal(user.cart) + 50}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}