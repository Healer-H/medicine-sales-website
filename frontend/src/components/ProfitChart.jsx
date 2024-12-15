import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";


ChartJS.register(BarController, BarElement, CategoryScale, LinearScale);

const ProfitChart = () => {
  const data = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    datasets: [
      {
        label: "Lợi Nhuận",
        data: [3000000, 5000000, 7000000, 6000000, 8000000, 10000000],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Biểu đồ Lợi Nhuận</h2>
      <Bar data={data} />
    </div>
  );
};

export default ProfitChart;
