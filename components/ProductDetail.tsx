import React from 'react';
import { Product } from '../data/products';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-96 object-cover mb-4 rounded-lg" />
      <p className="text-sky-gray text-lg mb-4">{product.description}</p>
      <p className="text-2xl font-semibold mb-4">${product.price}</p>
      {/* Add more product details and an "Add to Cart" button here */}
      <button className="bg-sky-blue text-sky-dark px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
