import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuSection from '../components/MenuSection';
import SearchBar from '../components/SearchBar';
import { menuItems } from '../data/menuData';
import type { FoodItem } from '../types/food';

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    'All',
    'Starters',
    'Soups',
    'Main Course',
    'Breads',
    'Rice Varieties',
    'Snacks',
    'Desserts'
  ];

  const filteredItems = menuItems.filter(item =>
    (selectedCategory === null || selectedCategory === 'All' || item.category === selectedCategory) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const groupedItems = categories.slice(1).reduce((acc, category) => {
    acc[category] = filteredItems.filter(item => item.category === category);
    return acc;
  }, {} as Record<string, FoodItem[]>);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.h1 
        className="text-4xl font-bold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Menu
      </motion.h1>
      
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <motion.div 
        className="flex flex-wrap gap-2 justify-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category === 'All' ? null : category)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              (category === 'All' && selectedCategory === null) || category === selectedCategory
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      <AnimatePresence>
        {Object.entries(groupedItems).map(([category, items]) => (
          items.length > 0 && (
            <MenuSection
              key={category}
              title={category}
              items={items}
            />
          )
        ))}
      </AnimatePresence>

      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-8"
        >
          No items found matching your search.
        </motion.div>
      )}
    </div>
  );
}