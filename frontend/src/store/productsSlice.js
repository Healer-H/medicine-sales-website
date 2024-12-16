import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../services/api/productService";

// Async thunks
export const fetchInitialProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loadMoreData = createAsyncThunk(
  "products/loadMoreData",
  async (_, { getState, rejectWithValue }) => {
    const { page } = getState().products;
    try {
      const response = await productService.getAll({ page: page + 1 });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  products: [],
  page: 1,
  viewMode: "list",
  selectedCategory: "Tất cả",
  selectedProducts: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    selectProduct: (state, action) => {
      state.selectedProducts.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },
    deselectProduct: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (id) => id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitialProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.page = 1; // Reset page to 1 after initial fetch
      })
      .addCase(fetchInitialProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadMoreData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreData.fulfilled, (state, action) => {
        state.loading = false;
        state.page += 1;
        state.products = [
          ...state.products,
          ...(action.payload.products || []),
        ];
      })
      .addCase(loadMoreData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setViewMode,
  setSelectedCategory,
  selectProduct,
  deselectProduct,
  deleteProduct,
} = productsSlice.actions;
export default productsSlice.reducer;
