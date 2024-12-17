import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const InvoiceDetail = () => {
  const { id } = useParams();
  const invoice = useSelector(state =>
    state.invoices.invoices.find(inv => inv.id === parseInt(id))
  );

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  // Sample product data for display
  const sampleProducts = [
    { name: "Vitamin B6 (pyridoxine HCl)", description: "Bổ sung vitamin", unitPrice: "10.000", quantity: 4, totalPrice: "40.000" },
    { name: "Vitamin C 500mg", description: "Hỗ trợ miễn dịch", unitPrice: "15.000", quantity: 3, totalPrice: "45.000" },
    { name: "Omega 3", description: "Tăng cường sức khỏe", unitPrice: "20.000", quantity: 2, totalPrice: "40.000" },
    { name: "Vitamin D3 1000IU", description: "Hỗ trợ xương", unitPrice: "12.000", quantity: 5, totalPrice: "60.000" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Page Container */}
      <div className="max-w-6xl mx-auto bg-white p-6 shadow-md rounded-md">
        {/* Invoice Header */}
        <div className="grid grid-cols-2 mb-6 text-gray-700">
          <div>
            <p className="font-semibold text-lg">Nhà thuốc: ABCDEFGH</p>
            <p>Địa chỉ: Khu 5 TT. Thanh Thủy, H. Thanh Thủy</p>
            <p>SDT: 0651520565</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg">Mã hóa đơn: {invoice.invoiceid || "123"}</p>
          </div>
        </div>

        {/* Centered Invoice Title */}
        <h2 className="text-center text-3xl font-bold mb-6">HÓA ĐƠN</h2>

        {/* Invoice Details */}
        <div className="mb-6 text-gray-700 grid grid-cols-2 gap-4">
          <div>
            <p>Khách hàng: Ngô Thị Lễ Hội</p>
            <p>SDT Khách hàng: 0390966531</p>
          </div>
          <div>
            <p>Người lập: Vũ Minh Hiếu</p>
            <p>Ngày lập: 10/10/2024</p>
            <p>Phương thức thanh toán: ZaloPay</p>
          </div>
        </div>

        {/* Product Table */}
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-blue-500 text-white text-left">
              <th className="p-2">Sản phẩm</th>
              <th className="p-2">Mô tả</th>
              <th className="p-2">Đơn giá</th>
              <th className="p-2">Số lượng</th>
              <th className="p-2">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {sampleProducts.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.description}</td>
                <td className="p-2">{product.unitPrice}đ</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">{product.totalPrice}đ</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Amount */}
        <div className="text-right font-bold text-lg mb-4">
          Tổng tiền: 160.000đ
        </div>

        {/* Confirm Button */}
        <div className="text-right">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
