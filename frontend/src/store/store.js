import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from './dashboardSlice'

const store = configureStore({
  reducer: {
    products: dashboardReducer,
  },
})

export default store