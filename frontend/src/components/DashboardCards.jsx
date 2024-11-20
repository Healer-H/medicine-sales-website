// DashboardCards.jsx
import React from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const DashboardCards = () => {
  const cards = [
    {
      title: 'Tổng doanh thu',
      value: '12.345.678 đ',
      change: '+2.7%',
      icon: <AttachMoneyIcon className="text-4xl text-gray-400" />,
      color: 'text-green-500',
    },
    {
      title: 'Số đơn hàng',
      value: '304 đơn',
      change: '-3.1%',
      icon: <ShoppingCartIcon className="text-4xl text-gray-400" />,
      color: 'text-red-500',
    },
  ];

  return (
    <div className="grid grid-rows-2 gap-4 mt-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-4 shadow-md rounded-md flex justify-between items-top"
        >
          <div>
            <h3 className="text-lg font-bold">{card.title}</h3>
            <p className="text-2xl font-semibold">{card.value}</p>
            <p className={`text-sm ${card.color}`}>{card.change}</p>
          </div>
          {card.icon}
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;