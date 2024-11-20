// Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardCards from '../components/DashboardCards';
import LineChart from '../components/LineChart';
import ProductList from '../components/ProductList';

const Dashboard = () => {
  const bestSelling = [
    { name: 'Máy đo huyết áp', price: '1.240.000đ' },
    { name: 'Sản phẩm 2', price: '1.500.000đ' },
  ];
  const expiringProducts = [
    { name: 'Sản phẩm hết hạn 1', price: '2.000.000đ' },
    { name: 'Sản phẩm hết hạn 2', price: '1.800.000đ' },
  ];

  return (
    <div className="flex">
      <div className="flex-1 p-4 bg-gray-100">
        <DashboardCards />
        <LineChart />
        <div className="grid grid-cols-2 gap-4">
          <ProductList title="Sản phẩm bán chạy" products={bestSelling} />
          <ProductList title="Sản phẩm sắp hết hạn" products={expiringProducts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
