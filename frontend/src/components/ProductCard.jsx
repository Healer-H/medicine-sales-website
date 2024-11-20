// ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col items-center">
      <img src={product.image} alt={product.name} className="w-32 h-32 mb-4" />
      <h3 className="text-sm font-bold text-center">{product.name}</h3>
      <p className="text-gray-500 text-xs text-center">{product.category}</p>
      <p className="text-blue-500 font-bold text-sm">{product.price}</p>
      <button
        className={`mt-2 px-4 py-1 text-white rounded-md ${
          product.status === 'In Stock'
            ? 'bg-blue-500'
            : product.status === 'Out of Stock'
            ? 'bg-red-500'
            : 'bg-gray-500'
        }`}
      >
        {product.status}
      </button>
    </div>
  );
};

export default ProductCard;
