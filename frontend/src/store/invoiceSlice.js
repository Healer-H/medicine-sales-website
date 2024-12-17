import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../services/api/orderService';

const paymentMethodMap = {
  'cash': 'Tiền mặt',
  'credit_card': 'Thẻ tín dụng',
  'e-wallet': 'Ví điện tử',
};

// Async thunks
export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderService.getAllOrders();
      response.orders.forEach(order => {
        order.paymentMethod = paymentMethodMap[order.paymentMethod] || order.paymentMethod;
      });
      response.orders.forEach(order => {
        order.totalAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount);
      });
      response.orders.forEach(order => {
        order.createdAt = new Date(order.createdAt).toLocaleString('vi-VN');
      }); 
      response.orders.forEach(order => {
        order.isSelected = false;
      });
      return response.orders;
    } catch (error) {
      console.log('error', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteInvoice = createAsyncThunk(
  'invoices/deleteInvoice',
  async (id, { rejectWithValue }) => {
    try {
      await orderService.deleteOrder(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteMultipleInvoices = createAsyncThunk(
  'invoices/deleteMultipleInvoices',
  async (ids, { rejectWithValue }) => {
    try {
      console.log(ids);
      await orderService.deleteMultipleOrders(ids);
      return ids;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadMoreData = createAsyncThunk(
  'invoices/loadMoreData',
  async (_, { getState, rejectWithValue }) => {
    const { page } = getState().invoices;
    try {
      const response = await orderService.getAllOrders({ page: page + 1 });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchInvoiceDetails = createAsyncThunk(
  'invoices/fetchInvoiceDetails',
  async (invoiceId, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrderDetails(invoiceId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  invoices: [],
  numSelected: 0,
  currentInvoiceDetails: {
    products: [],
    loading: false,
    error: null,
  },
  page: 1,
  loading: false,
  error: null,
};

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    selectInvoice(state, action) {
      const invoice = state.invoices.find(invoice => invoice.id === action.payload);
      if (invoice) {
        invoice.isSelected = true;
        state.numSelected += 1;
      }
    },
    deselectInvoice(state, action) {
      const invoice = state.invoices.find(invoice => invoice.id === action.payload);
      if (invoice) {
        invoice.isSelected = false;
        state.numSelected -= 1;
      }
    },
    selectAllInvoices(state) {
      state.invoices.forEach(invoice => invoice.isSelected = true);
      state.numSelected = state.invoices.length;
    },
    deselectAllInvoices(state) {
      state.invoices.forEach(invoice => invoice.isSelected = false);
      state.numSelected = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter(invoice => invoice.id !== action.payload);
      })
      .addCase(deleteMultipleInvoices.fulfilled, (state, action) => {
        state.numSelected = 0;
        state.invoices = state.invoices.filter(invoice => !action.payload.includes(invoice.id));
      })
      .addCase(loadMoreData.fulfilled, (state, action) => {
        state.invoices = [...state.invoices, ...action.payload];
        state.page += 1;
      })
      .addCase(fetchInvoiceDetails.pending, (state) => {
        state.currentInvoiceDetails.loading = true;
        state.currentInvoiceDetails.error = null;
      })
      .addCase(fetchInvoiceDetails.fulfilled, (state, action) => {
        state.currentInvoiceDetails.loading = false;
        state.currentInvoiceDetails.products = action.payload.orderDetails;
      })
      .addCase(fetchInvoiceDetails.rejected, (state, action) => {
        state.currentInvoiceDetails.loading = false;
        state.currentInvoiceDetails.error = action.payload?.message;
      });
  },
});
export const { selectInvoice, deselectInvoice, selectAllInvoices, deselectAllInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;