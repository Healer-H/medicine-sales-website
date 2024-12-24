// ProductRow.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatData"
const ProductRow = ({ product, isSelected, onSelect }) => {
  const navigate = useNavigate();

  const handleRowClick = (e) => {
    if (e.target.type !== "checkbox") {
      navigate(`/product/${product.product_id}`);
    }
  };

  return (
    <div className="flex items-center bg-white shadow-md rounded-md p-4 mb-2 hover:bg-blue-100"
      onClick={handleRowClick}>
        <button>
        <input
        type="checkbox"
        className="mr-4 w-5 h-5"
        checked={isSelected}
        onChange={() => onSelect(product.product_id)}
      />
          </button>
      <img src={product.imageUrl} alt={product.name} className="w-16 h-16 mr-4" />
      <div className="flex-1">
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.category}</p>
      </div>
      <p className="text-red-600 font-bold mr-4">{formatPrice(product.price)}</p>
      <button
        className={`px-4 py-1 rounded-md font-bold ${
          product.status === "in_stock"
            ? "text-green-500"
            : product.status === "out_of_stock"
              ? "text-red-500"
              : "bg-gray-500"
        }`}
      >
        {product.status === "in_stock" ? "Còn hàng" : "Hết hàng"}
      </button>
    </div>
  );
};

export default ProductRow;
