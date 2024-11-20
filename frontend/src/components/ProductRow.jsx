// ProductRow.jsx
import React from 'react';

const ProductRow = ({ product }) => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-md p-4 mb-2">
      <img src={product.image} alt={product.name} className="w-16 h-16 mr-4" />
      <div className="flex-1">
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.category}</p>
      </div>
      <p className="text-blue-500 font-bold mr-4">{product.price}</p>
      <button
        className={`px-4 py-1 text-white rounded-md ${
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

export default ProductRow;
