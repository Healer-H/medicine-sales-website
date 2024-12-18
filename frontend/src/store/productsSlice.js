import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../services/api/productService";

// Async thunks
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      console.log(productData);
      const response = await productService.add(productData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchInitialProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getAll();
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await productService.delete(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product, { rejectWithValue }) => {
    try {
      await productService.update(product);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const  searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query, { rejectWithValue }) => {
    try {
      const response = await productService.search({ q: query });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
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
    deselectProduct: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (id) => id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchInitialProducts
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
      // loadMoreData
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
      })
      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p.product_id !== action.payload,
        );
        state.selectedProducts = state.selectedProducts.filter(
          (id) => id !== action.payload,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Dispatch fetchInitialProducts() to reload the product list after update
        state.products = action.payload.products;
        state.page = 1; // Reset page to 1 after initial fetch
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // searchProducts
      .addCase(searchProducts.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log('dmm', action.payload);
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add createProduct cases
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
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
} = productsSlice.actions;
export default productsSlice.reducer;
