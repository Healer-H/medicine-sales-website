import React from 'react';

const InvoiceList = ({ invoices, onEdit, onDelete }) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Danh sách hóa đơn</h1>
      <table className="w-full bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-2">ID Hóa Đơn</th>
            <th className="p-2">Phương Thức Thanh Toán</th>
            <th className="p-2">Tổng Tiền</th>
            <th className="p-2">Ngày Tạo</th>
            <th className="p-2">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b">
              <td className="p-2">{invoice.id}</td>
              <td className="p-2">{invoice.paymentMethod}</td>
              <td className="p-2">{invoice.total}</td>
              <td className="p-2">{invoice.createdDate}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => onEdit(invoice.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded-md"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(invoice.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 text-blue-500">Xem thêm</button>
    </div>
  );
};

export default InvoiceList;
