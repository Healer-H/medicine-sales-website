import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductRow from "../components/ProductRow";
import LoadMoreButton from "../components/LoadMoreButton";
import CrudButton from "../components/CrudButton";
import Spinner from "../components/Spinner";
import Subheader from "../components/SubHeader";
import {
  fetchInitialProducts,
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
  const { viewMode, products, selectedProducts, selectedCategory, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchInitialProducts());
  }, [dispatch]);
  const handleCreateProduct = () => {
    // Redirect to the create product page
    navigate("/create-product");
  }

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
  console.log(filteredProducts);
  // Hiển thị trạng thái  
  if (loading) {  
    return <Spinner size="md" color="green-500" /> 
  }  

  if (!loading && error) {  
    return <div>Error: {error}</div>;  
  }  

  return (
    <div>
      <div className="flex justify-between">
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
        <div className="flex items-center justify-between space-x-2 mb-4">
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
            className=""
            type={"create"}
            text={"Tạo sản phẩm mới"}
            onClick={handleCreateProduct}
          />
        </div>
      </div>

      {/* Product Display */}
      <div className={`grid ${viewMode === "grid" ? "grid-cols-4 gap-4" : ""}`}>
        {filteredProducts.map((product) =>
          viewMode === "grid" ? (
            <ProductCard
              key={product.product_id}
              product={product}
              isSelected={selectedProducts.includes(product.product_id)}
              onSelect={handleSelectProduct}
            />
          ) : (
            <ProductRow
              key={product.product_id}
              product={product}
              isSelected={selectedProducts.includes(product.product_id)}
              onSelect={handleSelectProduct}
            />
          )
        )}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500">Không có sản phẩm nào</div>
      )}
      {filteredProducts.length > 0 && (
        <LoadMoreButton
          text={"Xem thêm"}
          onClick={() => dispatch(loadMoreData())}
        />
      )}
    </div>
  );
};

export default Products;
