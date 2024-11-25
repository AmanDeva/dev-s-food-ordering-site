import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ShoppingCart, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <UtensilsCrossed size={32} />
            <span className="text-2xl font-bold">Dev's Paradise</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/menu" className="hover:text-orange-200 transition">Menu</Link>
            <Link to="/about" className="hover:text-orange-200 transition">About</Link>
            <Link to="/contact" className="hover:text-orange-200 transition">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative hover:text-orange-200 transition">
              <ShoppingCart size={24} />
              {user?.cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {user.cart.length}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="hover:text-orange-200 transition">
                  <User size={24} />
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-1 hover:text-orange-200 transition"
                >
                  <LogOut size={24} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 hover:text-orange-200 transition"
              >
                <LogIn size={24} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}