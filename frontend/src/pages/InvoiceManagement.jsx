import React, { useState } from 'react';
import InvoiceList from '../components/InvoiceList';
import InvoiceDetail from '../components/InvoiceDetail';

const mockInvoices = [
  { id: 123, paymentMethod: 'ZaloPay', total: '500.000đ', createdDate: '10/10/2000', products: [] },
  { id: 124, paymentMethod: 'Momo', total: '500.000đ', createdDate: '10/10/2000', products: [] },
  { id: 125, paymentMethod: 'Momo', total: '500.000đ', createdDate: '10/10/2000', products: [] },
  { id: 126, paymentMethod: 'ZaloPay', total: '500.000đ', createdDate: '10/10/2000', products: [] },
  { id: 127, paymentMethod: 'Ngân hàng', total: '500.000đ', createdDate: '10/10/2000', products: [] },
  { id: 128, paymentMethod: 'Tiền mặt', total: '500.000đ', createdDate: '10/10/2000', products: [] },
];

const InvoiceManagement = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleEdit = (id) => {
    const invoice = mockInvoices.find((invoice) => invoice.id === id);
    setSelectedInvoice(invoice);
    setViewMode('detail');
  };

  const handleDelete = (id) => {
    console.log('Delete invoice with id:', id);
  };

  return (
    <div>
      {viewMode === 'list' ? (
        <InvoiceList invoices={mockInvoices} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <InvoiceDetail invoice={selectedInvoice} />
      )}
    </div>
  );
};

export default InvoiceManagement;
