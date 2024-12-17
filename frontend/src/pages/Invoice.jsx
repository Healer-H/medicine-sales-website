import { React, useEffect } from "react";
import {
  fetchInvoices,
  deleteInvoice,
  deleteMultipleInvoices,
} from "../store/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InvoiceList from "../components/InvoiceList";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useConfirmationDialog } from "../hooks/useConfirmationDialog";
import CrudButton from "../components/CrudButton";

const InvoiceManagement = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices);
  const numSelected = useSelector((state) => state.invoices.numSelected);
  const confirm = useConfirmationDialog();
  const handleDeleteSelected = async () => {
    const result = await confirm({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa các hóa đơn đã chọn không?",
      confirmText: "Xóa",
      cancelText: "Hủy",
    });
    if (result) {
      const selectedInvoiceIds = invoices
        .filter((invoice) => invoice.isSelected)
        .map((invoice) => invoice.id);
      dispatch(deleteMultipleInvoices(selectedInvoiceIds));
    }
  };
  const handleDelete = async (id) => {
    const result = await confirm({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa hóa đơn này không?",
      confirmText: "Xóa",
      cancelText: "Hủy",
    });
    if (result) {
      dispatch(deleteInvoice(id));
    }
  };
  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleView = (id) => navigate(`/invoice/${id}`);
  return (
    <div>
      <div className="p-2 flex justify-between items-center">
        <div>
          {numSelected > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="px-2 py-1 flex items-center rounded-md bg-red-500 text-white"
            >
              <RiDeleteBin6Line className="mr-2 inline-block" />
              Xóa ({numSelected})
            </button>
          )}
        </div>
        <CrudButton
          className=""
          type={"create"}
          text={"Tạo hóa đơn mới"}
          onClick={() => navigate("/invoice/create")}
        />
      </div>
      <InvoiceList
        invoices={invoices}
        onView={handleView}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default InvoiceManagement;
