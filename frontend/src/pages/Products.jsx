import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductRow from "../components/ProductRow";
import LoadMoreButton from "../components/LoadMoreButton";
import CrudButton from "../components/CrudButton";
import {
  loadMoreData,
  setViewMode,
  setSelectedCategory,
  selectProduct,
  deselectProduct,
} from "../store/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const categories = [
  { name: "Tất cả", value: "all" },
  { name: "Dược phẩm", value: "duoc-pham" },
  { name: "Thiết bị y tế", value: "thiet-bi-y-te" },
  { name: "Chăm sóc cá nhân", value: "cham-soc" },
];

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewMode = useSelector((state) => state.products.viewMode);
  const products = useSelector((state) => state.products.products);
  const selectedProducts = useSelector(
    (state) => state.products.selectedProducts
  );
  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory
  );

  const handleCreateProduct = () => {
    // Redirect to the create product page
    navigate("/create-product");
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      dispatch(deselectProduct(productId));
    } else {
      dispatch(selectProduct(productId));
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">THIẾT BỊ Y TẾ</h1>

      {/* Category Selection */}
      <div className="flex items-center space-x-4 mb-4">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => dispatch(setSelectedCategory(category.value))}
            className={`px-4 py-1 rounded-md ${
              selectedCategory === category.value
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* View Mode Switch */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => dispatch(setViewMode("grid"))}
            className={`p-2 ${
              viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            <span className="material-icons">grid_view</span>
          </button>
          <button
            onClick={() => dispatch(setViewMode("list"))}
            className={`p-2 ${
              viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            <span className="material-icons">view_list</span>
          </button>
        </div>
        <CrudButton
          type={"create"}
          text={"Tạo sản phẩm mới"}
          onClick={handleCreateProduct}
        />
      </div>

      {/* Product Display */}
      <div className={`grid ${viewMode === "grid" ? "grid-cols-4 gap-4" : ""}`}>
        {filteredProducts.map((product) =>
          viewMode === "grid" ? (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onSelect={handleSelectProduct}
            />
          ) : (
            <ProductRow
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onSelect={handleSelectProduct}
            />
          )
        )}
      </div>

      <LoadMoreButton
        text={"Xem thêm"}
        onClick={() => dispatch(loadMoreData())}
      />
    </div>
  );
};

export default Products;
