import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInvoice } from '../store/invoiceSlice';
import { useNavigate } from 'react-router-dom';
import InvoiceList from '../components/InvoiceList';

const InvoiceManagement = () => {
  const invoices = useSelector(state => state.invoices.invoices);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleView = (id) => navigate(`/invoice/${id}`);
  const handleEdit = (id) => navigate(`/invoice/${id}/edit`);
  const handleDelete = (id) => dispatch(deleteInvoice(id));
  return (
    <div>
      <InvoiceList invoices={invoices} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default InvoiceManagement;