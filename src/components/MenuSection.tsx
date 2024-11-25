import React from 'react';
import FoodCard from './FoodCard';
import type { FoodItem } from '../types/food';
import { motion } from 'framer-motion';

interface MenuSectionProps {
  title: string;
  items: FoodItem[];
}

export default function MenuSection({ title, items }: MenuSectionProps) {
  if (items.length === 0) return null;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-orange-500 pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FoodCard item={item} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}