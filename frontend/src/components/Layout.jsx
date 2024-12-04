import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Paths } from "../constants/paths";
import Subheader from "./SubHeader";
const getTitle = (pathname) => {
  console.log(pathname);

  switch (pathname) {
    case Paths.DASHBOARD:
      return { title: "DASHBOARD", showSearchBar: false, showFilter: false, showSorter: false};
    case Paths.PRODUCTS:
      return { title: "SẢN PHẨM", showSearchBar: true, showFilter: true, showSorter: true };
    case Paths.INVOICES:
      return { title: "HÓA ĐƠN", showSearchBar: true, showFilter: true, showSorter: true };
    case Paths.EMPLOYEES:
      return { title: "QUẢN LÝ NHÂN VIÊN", showSearchBar: true, showFilter: true, showSorter: true };
    case Paths.REPORTS:
      return { title: "BÁO CÁO", showSearchBar: false, showFilter: false, showSorter: false };
    case Paths.PRESCRIPTIONS:
      return { title: "ĐƠN THUỐC", showSearchBar: true, showFilter: true, showSorter: true };
    case Paths.ACCOUNT:
      return { title: "TÀI KHOẢN", showSearchBar: false, showFilter: false, showSorter: false };
    case Paths.SETTINGS:
      return { title: "CÀI ĐẶT", showSearchBar: false, showFilter: false, showSorter: false };
    default:
      return { title: "VitalCare", showSearchBar: true, showFilter: true, showSorter: true };
  }
};

const Layout = ({ children }) => {
  const location = useLocation();
  const { title, showSearchBar, showFilter, showSorter } = getTitle(location.pathname);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar className="relative md:flex overflow-hidden"/>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-2 mr-2">
        {/* Header */}
        <Header />
        {/* Page content */}
        <div className="p-4 bg-white">
          <Subheader showSearchBar={showSearchBar} showFilter={showFilter} showSorter={showSorter} actions={[{label: 'Tạo sp mới'}, {label: 'Xóa sp'}]}/>
          {children}
        </div>
      </div>
    </div>
  );
};


export default Layout;
