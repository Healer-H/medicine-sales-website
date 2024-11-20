import React from 'react';

const InvoiceDetail = ({ invoice }) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Chi Tiết Hóa Đơn</h1>
      <div className="bg-white p-4 shadow-md rounded-md">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Hóa Đơn</h2>
          <p>Mã hóa đơn: {invoice.id}</p>
          <p>Phương thức thanh toán: {invoice.paymentMethod}</p>
          <p>Tổng tiền: {invoice.total}</p>
          <p>Ngày lập: {invoice.createdDate}</p>
        </div>
        <table className="w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-2">Sản phẩm</th>
              <th className="p-2">Mô tả</th>
              <th className="p-2">Đơn giá</th>
              <th className="p-2">Số lượng</th>
              <th className="p-2">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products?.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.description}</td>
                <td className="p-2">{product.unitPrice}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">{product.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <p className="text-right font-bold">Tổng tiền: {invoice.total}</p>
        </div>
        <div className="flex space-x-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Xuất hóa đơn
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
