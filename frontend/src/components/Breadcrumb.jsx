import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Paths, getVietnamesePath } from "../constants/paths"; // Adjust the import according to your project structure

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  console.log(location);
  const getBreadcrumbName = (pathname) => {
    return getVietnamesePath(pathname);
  };

  return (
    <nav className="breadcrumb text-white">
      <h2 className="text-xl font-bold">
        {getBreadcrumbName(pathnames[pathnames.length - 1] || "Dashboard")}
      </h2>
      <div className="text-sm">
        <Link to="/">VitalCare</Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <span key={to}>
              {" > "}
              <Link to={to} class="capitalize">
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
