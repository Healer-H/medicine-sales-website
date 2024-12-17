import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductRow from "../components/ProductRow";
import LoadMoreButton from "../components/LoadMoreButton";
import CrudButton from "../components/CrudButton";
import Spinner from "../components/Spinner";
import { IoGridOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  fetchInitialProducts,
  loadMoreData,
  setViewMode,
  setSelectedCategory,
  selectProduct,
  deselectProduct,
  deleteProduct,
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
    selectedCategory === "Tất cả"
      ? products
      : products.filter((product) => product.category === selectedCategory);
  // console.log(filteredProducts);
  // Hiển thị trạng thái  
  if (loading) {  
    return <Spinner size="md" color="blue-500" /> 
  }  

  if (!loading && error) {  
    return <div>Error: {error}</div>;  
  }  

  return (
    <div>
      <div className="grid grid-rows-2 py-1">
        <div className="flex justify-between">
          {/* Category Selection */}
          <div className="flex items-center space-x-4 mb-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => dispatch(setSelectedCategory(category.name))}
                className={`px-4 py-1 rounded-md ${
                  selectedCategory === category.name
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* View Mode Switch */}
          <divk className="flex items-center justify-between space-x-2 mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => dispatch(setViewMode("grid"))}
                className={`p-2 rounded-md ${
                  viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <IoGridOutline />
              </button>
              <button
                onClick={() => dispatch(setViewMode("list"))}
                className={`p-2 rounded-md ${
                  viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <FaList />
              </button>
            </div>
            <CrudButton
              className=""
              type={"create"}
              text={"Tạo sản phẩm mới"}
              onClick={handleCreateProduct}
            />
          </divk>
        </div>
        <div className="mb-1">
          <div className="flex justify-between items-center mb-4">
            <div>
              <button
                onClick={() => {
                  if (selectedProducts.length === filteredProducts.length) {
                    filteredProducts.forEach((product) =>
                      dispatch(deselectProduct(product.id))
                    );
                  } else {
                    filteredProducts.forEach((product) =>
                      dispatch(selectProduct(product.id))
                    );
                  }
                }}
                className="px-4 py-1 rounded-md bg-blue-500 text-white flex items-center"
              >
                <input
                  type="checkbox"
                  className="mr-2 w-5 h-5"
                  checked={selectedProducts.length !== 0 && selectedProducts.length === filteredProducts.length}
                  onChange={() => {}}
                />
                {selectedProducts.length !== 0 && selectedProducts.length === filteredProducts.length
                  ? "Bỏ chọn tất cả"
                  : "Chọn tất cả"}
              </button>
            </div>
            {selectedProducts.length > 0 && (
              <div>
                <button
                  onClick={() => {
                    selectedProducts.forEach((productId) =>
                      dispatch(deleteProduct(productId))
                    );
                  }}
                  className="px-2 py-1 flex items-center rounded-md bg-red-500 text-white"
                >
                  <RiDeleteBin6Line className="mr-2 inline-block" />
                  Xóa ({selectedProducts.length})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="mb-2" />
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
