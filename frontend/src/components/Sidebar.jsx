// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Paths from '../constants/paths'; 

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: Paths.DASHBOARD },
    { name: 'Sản phẩm', path: Paths.PRODUCTS },
    { name: 'Hóa đơn', path: Paths.INVOICES },
    { name: 'Quản lý nhân viên', path: Paths.EMPLOYEES},
    { name: 'Báo cáo', path: Paths.REPORTS },
    { name: 'Đơn thuốc', path: Paths.PRESCRIPTIONS },
    { name: 'Tài khoản', path: Paths.ACCOUNT},
    { name: 'Cài đặt', path: Paths.SETTINGS },
  ];

  return (
    <div className="bg-white h-screen w-60 shadow-lg flex flex-col justify-between">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-500 mb-6">VitalCare</h1>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="my-3">
              <Link
                to={item.path}
                className="text-gray-700 hover:text-blue-500 flex items-center space-x-2"
              >
                <span className="material-icons">(icon)</span> {/* Replace icon as needed */}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
