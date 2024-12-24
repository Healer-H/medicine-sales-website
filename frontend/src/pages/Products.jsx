import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../constants/paths";
import ProductCard from "../components/ProductCard";
import ProductRow from "../components/ProductRow";
import LoadMoreButton from "../components/LoadMoreButton";
import CrudButton from "../components/CrudButton";
import Spinner from "../components/Spinner";
import SearchBar from "../components/SearchBar"; // Import SearchBar
import { useConfirmationDialog } from "../hooks/useConfirmationDialog";
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
  searchProducts,
  importProducts,
  exportProducts,
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
  const {
    viewMode,
    products,
    selectedProducts,
    selectedCategory,
    loading,
    error,
  } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchInitialProducts());
  }, [dispatch]);

  const handleCreateProduct = () => {
    navigate(Paths.CREATE_PRODUCT);
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      dispatch(deselectProduct(productId));
    } else {
      dispatch(selectProduct(productId));
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      dispatch(fetchInitialProducts());
      return;
    }
    query = query.trim();
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      dispatch(searchProducts(query));
    }, 500);
  };
  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId))
      .unwrap()
      .catch((error) => {
        console.error("Failed to delete product: ", error);
      });
  };

    const handleDeleteSelected = async () => {
      const result = await confirm({
        title: "Xác nhận xóa",
        message: "Bạn có chắc chắn muốn xóa các sản phẩm đã chọn không?",
        confirmText: "Xóa",
        cancelText: "Hủy",
      });
      if (result) {
        const selectedProducts = invoices
          .filter((invoice) => invoice.isSelected)
          .map((invoice) => invoice.id);
        dispatch(deleteMultipleInvoices(selectedProducts));
      }
    };

    const handleImport = (event) => {
      const file = event.target.files[0];
      if (file) {
        dispatch(importProducts(file));
      }
    };
  
    const handleExport = () => {
      dispatch(exportProducts());
    };
  // Filter products based on selected category and search query
  
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Tất cả" ||
      product.category ===
        (selectedCategory === "Dược phẩm"
          ? "duoc-pham"
          : selectedCategory === "Thiết bị y tế"
            ? "thiet-bi-y-te"
            : selectedCategory === "Chăm sóc cá nhân"
              ? "cham-soc"
              : "");
    return matchesCategory;
  });

  if (loading) {
    return <Spinner size="md" color="green-500" />;
  }

  return (
    <div>
      <div className="grid grid-rows-3 py-1">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4 mb-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => dispatch(setSelectedCategory(category.name))}
                className={`px-4 py-1 rounded-md ${
                  selectedCategory === category.name
                    ? "bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between space-x-2 mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => dispatch(setViewMode("grid"))}
                className={`p-2 rounded-md ${
                  viewMode === "grid" ? "bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white" : "bg-gray-200"
                }`}
              >
                <IoGridOutline />
              </button>
              <button
                onClick={() => dispatch(setViewMode("list"))}
                className={`p-2 rounded-md ${
                  viewMode === "list" ? "bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white" : "bg-gray-200"
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
          </div>
        </div>
        <div className="mb-1">
          <div className="flex justify-between items-center mb-4">
            <div>
              <button
                onClick={() => {
                  if (selectedProducts.length === filteredProducts.length) {
                    filteredProducts.forEach((product) =>
                      dispatch(deselectProduct(product.product_id))
                    );
                  } else {
                    filteredProducts.forEach((product) =>
                      dispatch(selectProduct(product.product_id))
                    );
                  }
                }}
                className="px-4 py-1 rounded-md bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white flex items-center"
              >
                <input
                  type="checkbox"
                  className="mr-2 w-5 h-5"
                  checked={
                    selectedProducts.length !== 0 &&
                    selectedProducts.length === filteredProducts.length
                  }
                  onChange={() => {}}
                />
                {selectedProducts.length !== 0 &&
                selectedProducts.length === filteredProducts.length
                  ? "Bỏ chọn tất cả"
                  : "Chọn tất cả"}
              </button>
            </div>
            {selectedProducts.length > 0 && (
              <div>
                <button
                  onClick={() => {
                    selectedProducts.forEach((productId) =>
                      handleDeleteProduct(productId)
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
        <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleImport}
            className="mr-2 p-2 border rounded"
          />
          <button
            onClick={handleExport}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Xuất sản phẩm
          </button>
        </div>
        <div>
          <SearchBar
            placeholder="Tìm kiếm sản phẩm..."
            onSearch={handleSearch}
          />
        </div>
      </div>
      </div>

      <hr className="mb-2" />
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
