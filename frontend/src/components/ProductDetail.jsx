import React, { useState } from 'react';

const ProductDetailPage = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicInformation />;
      case 'detailed':
        return <DetailedInformation />;
      case 'inventory':
        return <InventoryManagement />;
      case 'others':
        return <OtherInformation />;
      default:
        return <BasicInformation />;
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white p-4 shadow-md rounded-md">
        <div className="flex justify-between w-full space-x-4 mb-4">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-4 py-2 w-1/4 rounded-md ${activeTab === 'basic' ? 'bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white' : 'bg-gray-200'}`}
          >
            Thông tin cơ bản
          </button>
          <button
            onClick={() => setActiveTab('detailed')}
            className={`px-4 py-2 w-1/4 rounded-md ${activeTab === 'detailed' ? 'bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white' : 'bg-gray-200'}`}
          >
            Thông tin chi tiết
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 w-1/4 rounded-md ${activeTab === 'inventory' ? 'bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white' : 'bg-gray-200'}`}
          >
            Quản lý đợt nhập 
          </button>
          <button
            onClick={() => setActiveTab('others')}
            className={`px-4 py-2 w-1/4 rounded-md ${activeTab === 'others' ? 'bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white' : 'bg-gray-200'}`}
          >
            Thông tin khác
          </button>
        </div>

        {renderActiveTab()}
      </div>  
    </div>
  );
};

const BasicInformation = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label>Hình ảnh sản phẩm</label>
        <input type="file" className="border w-full p-2 rounded-md" accept="image/*" />
      </div>
      <div>
        <label>Tên sản phẩm</label>
        <input type="text" className="border w-full p-2 rounded-md" />
      </div>
      <div>
        <label>Mã sản phẩm</label>
        <input type="text" className="border w-full p-2 rounded-md" />
      </div>
      <div>
        <label>Giá gốc</label>
        <input type="number" className="border w-full p-2 rounded-md" />
      </div>
      <div>
        <label>% Giảm giá</label>
        <input type="number" className="border w-full p-2 rounded-md" />
      </div>
      <div>
        <label>Giá giảm</label>
        <input type="number" className="border w-full p-2 rounded-md" />
      </div>
      <div>
        <label>Thời hạn áp dụng</label>
        <input type="date" className="border w-full p-2 rounded-md" />
      </div>
      <div>
        <label>Danh mục</label>
        <select className="border w-full p-2 rounded-md">
          <option>Chọn danh mục</option>
          <option>Thiết bị y tế</option>
          <option>Chăm sóc cá nhân</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div>
        <label>Quy cách</label>
        <input type="text" className="border w-full p-2 rounded-md" />
      </div>
      <div className="col-span-2">
        <label>Mô tả ngắn</label>
        <textarea className="border w-full p-2 rounded-md" rows="4"></textarea>
      </div>
    </div>
  );
};

const DetailedInformation = () => {
  const [components, setComponents] = useState([{ id: 1, name: '', amount: '' }]);

  const addComponent = () => {
    setComponents([...components, { id: components.length + 1, name: '', amount: '' }]);
  };

  const handleComponentChange = (index, field, value) => {
    const newComponents = [...components];
    newComponents[index][field] = value;
    setComponents(newComponents);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <div className='flex justify-between'>
        <label>Thành phần</label>
        <button className="relative bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white px-4 py-2 rounded-md overflow-hidden">
          Tải lên file Excel
          <input
            type="file"
            accept=".xlsx, .xls"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              // Handle Excel file upload logic here
              const file = e.target.files[0];
              if (file) {
                console.log("Excel file uploaded:", file.name);
              }
            }}
          />
        </button>
        </div>
        <div className="mt-4">
          {components.map((component, index) => (
            <div key={component.id} className="mb-2">
              <input
                type="text"
                placeholder="Thành phần"
                className="border w-full p-2 rounded-md mb-2"
                value={component.name}
                onChange={(e) => handleComponentChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder="Hàm lượng"
                className="border w-full p-2 rounded-md mb-2"
                value={component.amount}
                onChange={(e) => handleComponentChange(index, 'amount', e.target.value)}
              />
            </div>
          ))}
          <button className="text-blue-500" onClick={addComponent}>Thêm thông tin thành phần mới</button>
        </div>
      </div>
      <div className="col-span-2">
        <label>Chức năng</label>
        <input type="text" className="border w-full p-2 rounded-md" />
      </div>
      <div className="col-span-2">
        <label>Hướng dẫn sử dụng</label>
        <textarea className="border w-full p-2 rounded-md" rows="4"></textarea>
      </div>
      <div>
        <label>Chống chỉ định</label>
        <input type="text" className="border w-full p-2 rounded-md" />
      </div>
      <div>
        <label>Tác dụng phụ</label>
        <input type="text" className="border w-full p-2 rounded-md" />
      </div>
      <div>
        <label>Bảo quản</label>
        <input type="text" className="border w-full p-2 rounded-md" />
      </div>
      <div>
        <label>Xuất xứ</label>
        <select className="border w-full p-2 rounded-md">
          <option>Chọn xuất xứ</option>
        </select>
      </div>
      <div>
        <label>Nước sản xuất</label>
        <select className="border w-full p-2 rounded-md">
          <option>Chọn nước sản xuất</option>
        </select>
      </div>
      <div>
        <label>Nhà cung cấp</label>
        <select className="border w-full p-2 rounded-md">
          <option>Chọn nhà cung cấp</option>
        </select>
      </div>
    </div>
  );
};

const InventoryManagement = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Quản lý kho & Đợt nhập</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Số lượng tồn kho hiện tại</label>
          <input type="number" className="border w-full p-2 rounded-md" />
        </div>
        <div>
          <label>Trạng thái</label>
          <select className="border w-full p-2 rounded-md">
            <option>Còn hàng</option>
            <option>Hết hàng</option>
            <option>Đang vận chuyển</option>
          </select>
        </div>
        <div className="col-span-2">
          <label>Danh sách đợt nhập</label>
          <button className="relative bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white px-4 py-2 rounded-md overflow-hidden ml-2">
            Tải lên file Excel
            <input
              type="file"
              accept=".xlsx, .xls"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                // Handle Excel file upload logic here
                const file = e.target.files[0];
                if (file) {
                  console.log("Excel file uploaded:", file.name);
                }
              }}
            />
          </button>
          <div className="mt-4">
            <input type="text" placeholder="Ngày nhập" className="border w-full p-2 rounded-md mb-2" />
            <input type="text" placeholder="Số lượng nhập" className="border w-full p-2 rounded-md mb-2" />
            <button className="text-blue-500">Thêm đợt nhập mới</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OtherInformation = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label>Trạng thái kinh doanh</label>
        <select className="border w-full p-2 rounded-md">
          <option>Còn hàng</option>
          <option>Sắp hết hàng</option>
          <option>Ngừng bán</option>
        </select>
      </div>
      <div flex items-center>
        <label>Chứng chỉ chất lượng</label>
        <button className="relative bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white px-4 py-2 rounded-md overflow-hidden ml-2">
          Tải lên file PDF
          <input
            type="file"
            accept=".pdf"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              // Handle PDF file upload logic here
              const file = e.target.files[0];
              if (file) {
                console.log("PDF file uploaded:", file.name);
              }
            }}
          />
        </button>
      </div>
      <div className="col-span-2">
        <label>Ghi chú nội bộ</label>
        <textarea className="border w-full p-2 rounded-md" rows="4"></textarea>
      </div>
    </div>
  );
};

export default ProductDetailPage;
