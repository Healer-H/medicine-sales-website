// Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardCards from '../components/DashboardCards';
import LineChart from '../components/LineChart';
import ProductList from '../components/ProductList';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const bestSelling = useSelector((state) => state.dashboard.bestSelling);
  const expiringProducts = useSelector((state) => state.dashboard.expiringProducts);

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
