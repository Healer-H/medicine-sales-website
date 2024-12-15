// ProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onSelect, isSelected }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.product_id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col items-center relative">
      <input
        type="checkbox"
        className="absolute top-2 left-2"
        checked={isSelected}
        onChange={() => onSelect(product.product_id)}
      />
      <div onClick={handleCardClick} className="cursor-pointer w-full flex flex-col items-center">
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
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default ProductCard;