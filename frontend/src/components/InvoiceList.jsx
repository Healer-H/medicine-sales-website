import React from "react";
import LoadMoreButton from "./LoadMoreButton";
import {
  loadMoreData,
  selectInvoice,
  selectAllInvoices,
  deselectInvoice,
  deselectAllInvoices,
} from "../store/invoiceSlice";
import { useDispatch } from "react-redux";

const InvoiceList = ({ invoices, onView, onDelete }) => {
  const dispatch = useDispatch();

  const handleRowClick = (e, invoiceId) => {
    // Prevent onView from firing when clicking on the checkbox
    if (e.target.type !== "checkbox") {
      onView(invoiceId);
    }
  };

  return (
    <div>
      <table className="w-full bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            {/* Check All Checkbox */}
            <th className="p-2">
              <input
                type="checkbox"
                className="w-5 h-5"
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch(selectAllInvoices());
                  } else {
                    dispatch(deselectAllInvoices());
                  }
                }}
                checked={invoices.every((invoice) => invoice.isSelected)}
              />
            </th>
            <th className="text-center">ID</th>
            <th className="p-2">Phương thức thanh toán</th>
            <th className="p-2">Tổng tiền</th>
            <th className="p-2">Thời gian tạo</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="border-b hover:bg-gray-100"
              onClick={(e) => handleRowClick(e, invoice.id)} // Handle row click
            >
              {/* Individual Checkbox */}
              <td className="p-2 text-center">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={invoice.isSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      dispatch(selectInvoice(invoice.id));
                    } else {
                      dispatch(deselectInvoice(invoice.id));
                    }
                  }}
                  onClick={(e) => e.stopPropagation()} // Prevent row click when clicking checkbox
                />
              </td>
              <td className="text-center">{invoice.id}</td>
              <td className="p-2 text-center">
                {invoice.paymentMethod || "Không xác định"}
              </td>
              <td className="p-2 text-center">{invoice.totalAmount}</td>
              <td className="p-2 text-center">{invoice.createdAt}</td>
              <td className="p-2 text-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click when clicking delete
                    onDelete(invoice.id);
                  }}
                  className="bg-red-500 text-white px-4 py-1 rounded-md"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LoadMoreButton
        text={"Xem thêm"}
        onClick={() => dispatch(loadMoreData())}
      />
    </div>
  );
};

export default InvoiceList;
