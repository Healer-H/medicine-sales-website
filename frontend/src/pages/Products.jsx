import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductRow from '../components/ProductRow';

const categories = [
  { name: 'Tất cả', value: 'all' },
  { name: 'Dược phẩm', value: 'duoc-pham' },
  { name: 'Thiết bị y tế', value: 'thiet-bi-y-te' },
  { name: 'Chăm sóc cá nhân', value: 'cham-soc' },
];

const products = [
  {
    id: 1,
    name: 'Máy đo huyết áp Omron HEM 7143T',
    category: 'Thiết bị y tế',
    price: '1.240.000đ',
    status: 'In Stock',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    name: 'Dung dịch vệ sinh Fujitsan Ion 70ml',
    category: 'Chăm sóc cá nhân',
    price: '50.000đ',
    status: 'Out of Stock',
    image: 'https://via.placeholder.com/100',
  },
  // Add more products here
];

const Products = () => {
  const [viewMode, setViewMode] = useState('list'); 
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCreateProduct = () => {
    console.log("Tạo sản phẩm mới was clicked!");
  };

  const filteredProducts =
    selectedCategory === 'all'
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
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-1 rounded-md ${
              selectedCategory === category.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
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
            onClick={() => setViewMode('grid')}
            className={`p-2 ${
              viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            <span className="material-icons">grid_view</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 ${
              viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            <span className="material-icons">view_list</span>
          </button>
        </div>
        <button className="bg-blue-500 text-white px-4 py-1 rounded-md" onClick={handleCreateProduct}>
          Tạo sản phẩm mới
        </button>
      </div>

      {/* Product Display */}
      <div
        className={`grid ${
          viewMode === 'grid' ? 'grid-cols-4 gap-4' : ''
        }`}
      >
        {filteredProducts.map((product) =>
          viewMode === 'grid' ? (
            <ProductCard key={product.id} product={product} />
          ) : (
            <ProductRow key={product.id} product={product} />
          )
        )}
      </div>

      {/* Load More Button */}
      <button className="mt-4 text-blue-500">Xem thêm</button>
    </div>
  );
};

export default Products;
