// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetail from "./components/ProductDetail";
import InvoiceManagement from "./pages/Invoice";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import EmployeeManagement from "./pages/EmployeeManagement";
import PrescriptionManagement from "./pages/PrescriptionManagement";
import AccountPage from "./pages/AccountPage";
import Reports from "./pages/Reports";
import SettingsPage from "./pages/SettingsPage";
import { Paths } from "./constants/paths";
import store from "./store/store";
import InvoiceDetail from "./components/InvoiceDetail";
import EmployeeDetailTabs from "./components/EmployeeDetailTabs";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <Provider store={store}>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path={Paths.LOGIN} element={<LoginPage />} />
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route element={<ProtectedRoutes />}>
                    <Route path={Paths.DASHBOARD} element={<Dashboard />} />
                    <Route path={Paths.PRODUCTS} element={<Products />} />
                    <Route
                    path={Paths.PRODUCT_DETAIL}
                    element={<ProductDetail />}
                  />
                  <Route path={Paths.INVOICES} element={<InvoiceManagement />} />
                    <Route path={Paths.INVOICE_DETAIL} element={<InvoiceDetail />} />
                    <Route path={Paths.EMPLOYEES} element={<EmployeeManagement />} />
                    <Route path={Paths.EMPLOYEE_DETAIL} element={<EmployeeDetailTabs />} />
                    <Route path={Paths.PRESCRIPTIONS} element={<PrescriptionManagement />} />
                    <Route path={Paths.ACCOUNT} element={<AccountPage />} />
                    <Route path={Paths.REPORTS} element={<Reports />} />
                    <Route path={Paths.SETTINGS} element={<SettingsPage />} />
                  </Route>
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;