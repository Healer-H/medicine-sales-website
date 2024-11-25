// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import InvoiceManagement from "./pages/InvoiceManagement";
import Layout from "./components/Layout";
import { Provider } from 'react-redux';
import EmployeeManagement from "./pages/EmployeeManagement";
import PrescriptionManagement from "./pages/PrescriptionManagement";
import AccountPage from "./pages/AccountPage";
import Reports from "./pages/Reports";
import SettingsPage from "./pages/SettingsPage";
import Paths from "./constants/paths";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path={Paths.DASHBOARD} element={<Dashboard />} />
            <Route path={Paths.PRODUCTS} element={<Products />} />
            <Route path={Paths.INVOICES} element={<InvoiceManagement />} />
            <Route path={Paths.EMPLOYEES} element={<EmployeeManagement />} />
            <Route
              path={Paths.PRESCRIPTIONS}
              element={<PrescriptionManagement />}
            />
            <Route path={Paths.ACCOUNT} element={<AccountPage />} />
            <Route path={Paths.REPORTS} element={<Reports />} />
            <Route path={Paths.SETTINGS} element={<SettingsPage />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
