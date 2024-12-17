import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../store/productsSlice';
import Spinner from '../components/Spinner';
import { Paths } from '../constants/paths'

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    description: '',
    price: 0,
    stock: 0,
    expiration_date: '',
    discount: 0,
    category: '',
    status: 'in_stock',
    prescription_required: false,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(createProduct(formData)).unwrap();
      navigate(Paths.PRODUCTS);
    } catch (err) {
      console.error('Failed to create product:', err);
    }
  };

  if (loading) {
    return <Spinner size="md" color="green-500" />;
  }

  return (
    <div className="p-4">
      <div className="bg-white p-4 shadow-md rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Tạo sản phẩm mới</h1>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Lưu sản phẩm
          </button>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="grid grid-cols-2 gap-4">
        <div>
    <label className="block mb-2">Tên sản phẩm</label>
    <input
      type="text"
      value={formData.name}
      onChange={(e) => handleInputChange('name', e.target.value)}
      className="border w-full p-2 rounded-md"
      maxLength={255}
      required
    />
  </div>

          <div>
            <label className="block mb-2">Hình ảnh sản phẩm</label>
            <input 
              type="file" 
              className="border w-full p-2 rounded-md"
              accept="image/*"
              onChange={(e) => handleInputChange('imageUrl', e.target.files[0])}
              required
            />
          </div>

          <div>
            <label className="block mb-2">Giá</label>
            <input
      type="number"
      value={formData.price}
      onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
      className="border w-full p-2 rounded-md"
      min="0"
      step="1000"
      required
    />
          </div>

          <div>
            <label className="block mb-2">Số lượng nhập kho</label>
            <input
      type="number"
      value={formData.stock}
      onChange={(e) => handleInputChange('stock', parseInt(e.target.value))}
      className="border w-full p-2 rounded-md"
      min="1"
      max="5000"
      step="1"
      required
    />
          </div>

          <div>
            <label className="block mb-2">Ngày hết hạn</label>
            <input
      type="date"
      value={formData.expiration_date}
      onChange={(e) => handleInputChange('expiration_date', e.target.value)}
      className="border w-full p-2 rounded-md"
      min={new Date().toISOString().split('T')[0]}
      max="2035-12-31"
      required
    />
          </div>

          <div>
            <label className="block mb-2">Giảm giá (%)</label>
            <input
              type="float"
              value={formData.discount}
              onChange={(e) => handleInputChange('discount', e.target.value)}
              className="border w-full p-2 rounded-md"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block mb-2">Danh mục</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="border w-full p-2 rounded-md"
              required
            >
              <option value="">Chọn danh mục</option>
              <option value="thiet-bi-y-te">Thiết bị y tế</option>
              <option value="cham-soc">Chăm sóc cá nhân</option>
              <option value="duoc-pham">Dược phẩm</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Trạng thái</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="border w-full p-2 rounded-md"
              required
            >
              <option value="in_stock">Còn hàng</option>
              <option value="out_of_stock">Hết hàng</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Yêu cầu đơn thuốc</label>
            <input
              type="checkbox"
              checked={formData.prescription_required}
              onChange={(e) => handleInputChange('prescription_required', e.target.checked)}
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-2">Mô tả</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="border w-full p-2 rounded-md"
              rows="4"
              required
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;