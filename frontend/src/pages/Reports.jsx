import React from 'react';
import RevenueChart from '../components/RevenueChart.jsx'; 
import ProfitChart from '../components/ProfitChart.jsx';
import TextAnalysis from '../components/TextAnalysis.jsx';
import ChatBox from '../components/ChatBox.jsx';

const Reports = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Báo Cáo Chi Tiết Nhà Thuốc</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
          <RevenueChart />
          <ProfitChart />
      </div>
      
      {/* Text Analysis Section */}
      <div className="bg-white p-4 shadow-md rounded-md mb-8">
        <TextAnalysis />
      </div>
      
      {/* Chat Box */}
      <div className="bg-white p-4 shadow-md rounded-md">
        <ChatBox />
      </div>
    </div>
  );
};

export default Reports;