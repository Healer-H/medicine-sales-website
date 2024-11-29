import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  bestSelling: [
    { name: 'Máy đo huyết áp', price: '1.240.000đ', image: 'https://placehold.co/150' },
    { name: 'Sản phẩm 2', price: '1.500.000đ', image: 'https://placehold.co/150' },
  ],
  expiringProducts: [
    { name: 'Sản phẩm hết hạn 1', price: '2.000.000đ', image: 'https://placehold.co/150' },
    { name: 'Sản phẩm hết hạn 2', price: '1.800.000đ', image: 'https://placehold.co/150' },
  ],
  page: 1,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    loadMoreData: (state) => {
      console.log('Load more data');
      // Simulated data fetching
      const newData = [
        { id: state.page + 1, value: `New Data ${state.page + 1}` },
      ];
      state.data = [...state.data, ...newData];
      state.page += 1;
    },
  },
});

export const { loadMoreData } = dashboardSlice.actions;
export default dashboardSlice.reducer;