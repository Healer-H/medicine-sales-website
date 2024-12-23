import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import productsReducer from "./productsSlice";
import invoiceReducer from "./invoiceSlice";
import employeeReducer from "./employeeSlice";
import prescriptionReducer from "./prescriptionSlice";
import headerReducer from "./headerSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    products: productsReducer,
    invoices: invoiceReducer,
    employees: employeeReducer,
    prescriptions: prescriptionReducer,
    header: headerReducer,
    user: userReducer,
  },
});

export default store;
