// EmployeeList.jsx
import React from "react";
import { loadMoreData } from "../store/employeeSlice";
import LoadMoreButton from "./LoadMoreButton";
import { useDispatch } from "react-redux";


const EmployeeList = ({ employees, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Danh sách nhân viên</h1>
      <table className="w-full bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-2">Họ và Tên</th>
            <th className="p-2">Email</th>
            <th className="p-2">Chức vụ</th>
            <th className="p-2">Trạng thái</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b">
              <td className="p-2">{employee.name}</td>
              <td className="p-2">{employee.email}</td>
              <td className="p-2">{employee.position}</td>
              <td
                className={`p-2 ${
                  employee.status === "Đang hoạt động"
                    ? "text-green-500"
                    : employee.status === "Khóa tạm thời"
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
              >
                {employee.status}
              </td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => onEdit(employee.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded-md"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(employee.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LoadMoreButton text={"Xem thêm"} onClick={() => dispatch(loadMoreData())} />
    </div>
  );
};

export default EmployeeList;
