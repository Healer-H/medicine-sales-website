import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Paths from "../constants/paths";

const Layout = ({ children }) => {
  const location = useLocation();
  const getTitle = (pathname) => {
    console.log(pathname);
    
    switch (pathname) {
      case Paths.DASHBOARD:
        return "DASHBOARD";
      case Paths.PRODUCTS:
        return "SẢN PHẨM";
      case Paths.INVOICES:
        return "HÓA ĐƠN";
      case Paths.EMPLOYEES:
        return "QUẢN LÝ NHÂN VIÊN";
      case Paths.REPORTS:
        return "BÁO CÁO";
      case Paths.PRESCRIPTIONS:
        return "ĐƠN THUỐC";
      case Paths.ACCOUNT:
        return "TÀI KHOẢN";
      case Paths.SETTINGS:
        return "CÀI ĐẶT";
      default:
        return "VitalCare";
    }
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header title={getTitle(location.pathname)} />

        {/* Page content */}
        <div className="p-4 bg-gray-100">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
