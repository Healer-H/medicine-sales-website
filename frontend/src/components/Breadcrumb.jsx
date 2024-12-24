import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getVietnamesePath } from "../constants/paths"; // Adjust the import according to your project structure

const breadcrumbPatterns = [
  { pattern: /^\/$/, name: "Dashboard" },
  { pattern: /^\/product$/, name: "Sản phẩm" },
  { pattern: /^\/product\/create$/, name: "Tạo sản phẩm" },
  { pattern: /^\/product\/\d+$/, name: "Chi tiết sản phẩm" },
  { pattern: /^\/invoice$/, name: "Hóa đơn" },
  { pattern: /^\/invoice\/\d+$/, name: "Chi tiết hóa đơn" },
  { pattern: /^\/invoice\/\d+\/edit$/, name: "Sửa hóa đơn" },
  { pattern: /^\/employee$/, name: "Quản lý nhân viên" },
  { pattern: /^\/employee\/\d+$/, name: "Chi tiết nhân viên" },
  { pattern: /^\/report$/, name: "Báo cáo" },
  { pattern: /^\/prescription$/, name: "Đơn thuốc" },
  { pattern: /^\/account$/, name: "Tài khoản" },
  { pattern: /^\/setting$/, name: "Cài đặt" },
];

const getBreadcrumbName = (pathname) => {
  for (const { pattern, name } of breadcrumbPatterns) {
    if (pattern.test(pathname)) {
      return name;
    }
  }
  return getVietnamesePath(pathname);
};

const Breadcrumb = ( {title} ) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <nav className="breadcrumb text-white"> 
      <h2 className="text-xl font-bold">
        {getBreadcrumbName(location.pathname || "Dashboard")}
      </h2>
      <div className="text-sm">
        <Link to="/">VitalCare</Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <span key={to}>
              {" > "}
              <Link to={to}>
                {getBreadcrumbName(value)}
              </Link>
            </span>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;
