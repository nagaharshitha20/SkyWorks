import React from 'react';
import { products } from '../data/products';
import { ShopCard } from './ShopCard';

const Shop: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ShopCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
