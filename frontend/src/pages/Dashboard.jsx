// Dashboard.jsx
import React from 'react';
import DashboardCards from '../components/DashboardCards';
import LineChart from '../components/LineChart';
import ProductList from '../components/ProductList';
import Subheader from '../components/SubHeader';
import { useSelector } from 'react-redux';

import SortButton from '../components/SortButton';

const Dashboard = () => {
  const bestSelling = useSelector((state) => state.dashboard.bestSelling);
  const expiringProducts = useSelector((state) => state.dashboard.expiringProducts);

  return (

    <div className="flex">
      <div className="flex-1 p-4">
        
        <LineChart />
        <div className="grid grid-cols-2 gap-4">
          <ProductList title="Sản phẩm bán chạy" products={bestSelling} />
          <ProductList title="Sản phẩm sắp hết hạn" products={expiringProducts} />
        </div>
      </div>
      <div className="w-1/4 p-4">
        <DashboardCards />
      </div>
    </div>
  );
};

export default Dashboard;
