// Sidebar.jsx
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
    {
      name: "Hóa đơn",
      path: Paths.INVOICES,
      icon: <LiaFileInvoiceDollarSolid />,
    },
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
      window.location.href = Paths.LOGIN;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-white h-screen w-72 shadow-lg flex flex-col justify-between overflow-y-auto">
      <div className="p-4">
        <button
          onClick={() => navigate(Paths.DASHBOARD)}
          className="flex items-center mb-6"
        >
          <img
            src="/images/transparent_logo.svg"
            alt="Logo"
            className="h-30 w-40"
          />
        </button>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="my-3">
              <Link
                to={item.path}
                className={`text-black-700 hover:text-blue-500 hover:bg-blue-100 flex items-center space-x-3 p-2 rounded-md ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-500 font-semibold"
                    : ""
                }`}
              >
                <span className="text-2xl ">{item.icon}</span>
                <span className="text-lg ">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white py-3 px-4 rounded-md w-full flex items-center justify-center space-x-2"
        >
          <IoIosLogOut className="text-2xl" />
          <span className="text-lg">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;