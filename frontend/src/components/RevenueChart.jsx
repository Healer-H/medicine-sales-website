import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
}
from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const RevenueChart = () => {
  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Doanh Thu',
        data: [10000000, 15000000, 20000000, 18000000, 22000000, 25000000],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Biểu đồ Doanh Thu</h2>
      <Line data={data} />
    </div>
  );
};

export default RevenueChart;