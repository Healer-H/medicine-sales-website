import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  products: [
    {
      id: 1,
      name: "Máy đo huyết áp Omron HEM 7143T",
      category: "Thiết bị y tế",
      price: "1.240.000đ",
      status: "In Stock",
      image: "https://placehold.co/300",
    },
    {
      id: 2,
      name: "Dung dịch vệ sinh Fujitsan Ion 70ml",
      category: "Chăm sóc cá nhân",
      price: "50.000đ",
      status: "Out of Stock",
      image: "https://placehold.co/300",
    },
  ],
  page: 1,
  viewMode: "list",
  selectedCategory: "all",
  selectedProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadMoreData: (state) => {
      console.log("Load more data");
      const newData = [
        {
          id: 3,
          name: "Máy đo đường huyết Gluco Dr Super Sensor",
          category: "Thiết bị y tế",
          price: "1.200.000đ",
          status: "In Stock",
          image: "https://placehold.co/300",
        }
      ];
      state.products = [...state.products, ...newData];
    },
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
        (id) => id !== action.payload
      );
    },
  },
});

export const { loadMoreData, setViewMode, setSelectedCategory, selectProduct, deselectProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
