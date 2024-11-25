import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
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