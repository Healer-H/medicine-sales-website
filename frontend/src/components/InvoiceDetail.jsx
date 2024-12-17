import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInvoices } from '../store/invoiceSlice';
import Spinner from "../components/Spinner";



const InvoiceDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { invoices, loading } = useSelector((state) => state.invoices);

  useEffect(() => {
    if (invoices.length === 0) {
      dispatch(fetchInvoices());
    }
  }, [dispatch, invoices.length]);

  const invoice = useSelector((state) =>
    state.invoices.invoices.find((inv) => inv.id === parseInt(id))
  );
  if (loading) {  
    return <Spinner size="md" color="blue-500" /> 
  }  
  if (!invoice) {
    console.log(invoice);
    return <div>Không tìm thấy hóa đơn.</div>;
  }
  console.log(invoice);
  const products = invoice.OrderDetails;
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Page Container */}
      <div className="max-w-6xl mx-auto bg-white p-6 shadow-md rounded-md">
        {/* Invoice Header */}
        <div className="grid grid-cols-2 mb-6 text-gray-700">
          <div>
            <p className="font-semibold text-lg">Nhà thuốc VitalCare</p>
            <p>Địa chỉ: Khu phố 6, Phường Linh Trung, TP. Thủ Đức, Thành phố Hồ Chí Minh,</p>
            <p>SĐT: 0651520565</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg">
              Mã hóa đơn: {invoice.id}
            </p>
          </div>
        </div>

        {/* Centered Invoice Title */}
        <h2 className="text-center text-3xl font-bold mb-6">HÓA ĐƠN</h2>

        {/* Invoice Details */}
        <div className="mb-6 text-gray-700 flex justify-between">
          <div>
            <p>Người tạo: {invoice.employee.name}</p>
            <p>Thời gian tạo: {invoice.createdAt}</p>
            <p>Phương thức thanh toán: {invoice.paymentMethod}</p>
          </div>
        </div>

        {/* /* Product Table */}
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-blue-500 text-white text-left">
                <th className="p-2 text-center">Sản phẩm</th>
                <th className="p-2 text-center">Mô tả</th>
                <th className="p-2 text-center">Đơn giá</th>
                <th className="p-2 text-center">Số lượng</th>
                <th className="p-2 text-center">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border-b">
            <td className="p-2 text-center">{product.name}</td>
            <td className="p-2 text-center">{product.description}</td>
            <td className="p-2 text-center">{product.unitPrice}đ</td>
            <td className="p-2 text-center">{product.quantity}</td>
            <td className="p-2 text-center">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <p className="text-right font-bold">
              Tổng tiền: {invoice.totalAmount}
            </p>
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
