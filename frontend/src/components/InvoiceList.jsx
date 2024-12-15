import React from 'react';
import PropTypes from 'prop-types';
import LoadMoreButton from './LoadMoreButton';
import { loadMoreData } from '../store/invoiceSlice';
import { useDispatch } from 'react-redux';


const InvoiceList = ({ invoices, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  return (
    <div>
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
      <LoadMoreButton text={"Xem thêm"} onClick={() => dispatch(loadMoreData())} />
    </div> 
  );
};
InvoiceList.propTypes = {
  invoices: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default InvoiceList;