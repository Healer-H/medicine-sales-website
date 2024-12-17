// ProductList.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadMoreData } from '../store/productsSlice';
import LoadMoreButton from '../components/LoadMoreButton';

const ProductList = ({ title, products, onSelect }) => {
  console.log(products)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

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
                src={product.image}
                alt={product.name}
                className="w-10 h-10"
              />
              <span
                onClick={() => handleProductClick(product.id)}
                className="cursor-pointer"
              >
                {product.name}
              </span>
            </div>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
      <LoadMoreButton text="Xem thêm" onClick={() => dispatch(loadMoreData())} />
    </div>
  );
};

export default ProductList;