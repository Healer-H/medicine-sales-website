// ProductList.jsx
import React from 'react';

const ProductList = ({ title, products }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md mt-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <ul>
        {products.map((product, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b py-2"
          >
            <div className="flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/40"
                alt={product.name}
                className="w-10 h-10"
              />
              <span>{product.name}</span>
            </div>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
      <button className="mt-4 text-blue-500">Xem thêm</button>
    </div>
  );
};

export default ProductList;
