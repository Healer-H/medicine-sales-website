import React from "react";
import { Link } from "react-router-dom";
import { Paths } from "../constants/paths";
import { RxDashboard } from "react-icons/rx";
import { GiMedicines } from "react-icons/gi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BsPeople } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";
import { LiaHospital } from "react-icons/lia";
import { RiAccountCircleLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: Paths.DASHBOARD, icon: <RxDashboard /> },
    { name: "Sản phẩm", path: Paths.PRODUCTS, icon: <GiMedicines /> },
    { name: "Hóa đơn", path: Paths.INVOICES, icon: <LiaFileInvoiceDollarSolid /> },
    { name: "Quản lý nhân viên", path: Paths.EMPLOYEES, icon: <BsPeople /> },
    { name: "Báo cáo", path: Paths.REPORTS, icon: <BsGraphUpArrow /> },
    { name: "Đơn thuốc", path: Paths.PRESCRIPTIONS, icon: <LiaHospital /> },
    { name: "Tài khoản", path: Paths.ACCOUNT, icon: <RiAccountCircleLine /> },
    { name: "Cài đặt", path: Paths.SETTINGS, icon: <CiSettings /> },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      Cookies.remove("access_token");
      navigate(Paths.LOGIN);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-white h-screen w-72 shadow-lg flex flex-col justify-between overflow-y-auto rounded-lg">
      {/* Logo */}
      <div className="p-4">
        <button
          onClick={() => navigate(Paths.DASHBOARD)}
          className="flex items-center mb-6"
        >
          <img
            src="/images/transparent_logo.svg"
            alt="Logo"
            className="w-44"
          />
        </button>

        {/* Menu Items */}
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="my-3">
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-2 rounded-[12px] transition-all border ${
                  location.pathname === item.path
                    ? "border-[#458DFC] shadow-md bg-white"
                    : "border-transparent"
                } 
                }`}
                /*Hover effect and Active effect*/
                style={{
                  ...(location.pathname !== item.path && {
                    background: "transparent",
                  }),
                  ...(location.pathname === item.path && {
                    background: "white", // Keeps selected item's background white
                  }),
                  boxShadow:
                  location.pathname === item.path
                    ? "2px 4px 10px 0px rgba(0, 0, 0, 0.04)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.background =
                      "linear-gradient(90deg, #93C1F924, #FFFFFF33)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {/* Gradient Icon */}
                <span
                  className={`text-2xl ${
                    location.pathname === item.path ? "text-blue-500" : "text-black"
                  }`}
                  style={{
                    background: location.pathname === item.path
                      ? "linear-gradient(90deg, #6CBCFD, #468EFD)"
                      : "none",
                    WebkitBackgroundClip: location.pathname === item.path
                      ? "text"
                      : "none",
                    WebkitTextFillColor: location.pathname === item.path
                      ? "transparent"
                      : "black",
                  }}
                >
                  {item.icon}
                </span>

                {/* Gradient Text */}
                <span
                  className={`text-lg font-semibold ${
                    location.pathname === item.path ? "text-blue-500" : "text-black"
                  }`}
                  style={{
                    background: location.pathname === item.path
                      ? "linear-gradient(90deg, #6CBCFD, #468EFD)"
                      : "none",
                    WebkitBackgroundClip: location.pathname === item.path
                      ? "text"
                      : "none",
                    WebkitTextFillColor: location.pathname === item.path
                      ? "transparent"
                      : "black",
                  }}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="py-3 px-4 rounded-md w-full flex items-center justify-center space-x-2 transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(90deg, #6CBCFD, #468EFD)",
              color: "white", // Ensures text is white
            }}
          >
            <IoIosLogOut className="text-2xl" />
            <span className="text-lg">Đăng xuất</span>
          </button>
        </div>
    </div>
  );
};

export default Sidebar;
