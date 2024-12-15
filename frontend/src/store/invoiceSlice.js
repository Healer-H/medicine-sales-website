import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [
    { id: 123, paymentMethod: 'ZaloPay', total: '500.000đ', createdDate: '10/10/2000', products: [] },
    { id: 124, paymentMethod: 'Momo', total: '500.000đ', createdDate: '10/10/2000', products: [] },
    { id: 125, paymentMethod: 'Momo', total: '500.000đ', createdDate: '10/10/2000', products: [] },
    { id: 126, paymentMethod: 'ZaloPay', total: '500.000đ', createdDate: '10/10/2000', products: [] },
    { id: 127, paymentMethod: 'Ngân hàng', total: '500.000đ', createdDate: '10/10/2000', products: [] },
    { id: 128, paymentMethod: 'Tiền mặt', total: '500.000đ', createdDate: '10/10/2000', products: [] },
  ],
};

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    loadMoreData: (state) => {
      console.log('Load more data');
      const newData = [
        { id: 129, paymentMethod: 'ZaloPay', total: '500.000đ', createdDate: '10/10/2000', products: [] },
      ];
      state.invoices = [...state.invoices, ...newData];
    },
    deleteInvoice: (state, action) => {
    console.log('Delete invoice', action.payload);
      state.invoices = state.invoices.filter(invoice => invoice.id !== action.payload);
    },
  },
});

export const { loadMoreData, deleteInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;