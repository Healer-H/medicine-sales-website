import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMoreData, loadMoreEmployees, toggleSelectEmployee } from '../store/employeeSlice';
import LoadMoreButton from './LoadMoreButton';
import Spinner from './Spinner';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const { page, loading } = useSelector((state) => state.employees);

  const handleLoadMore = () => {
    dispatch(loadMoreData());
    dispatch(loadMoreEmployees(page + 1));
  };

  if (!Array.isArray(employees)) {
    return <p className="text-red-500">Dữ liệu nhân viên không hợp lệ</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-2">
              <input
                type="checkbox"
                onChange={(e) => {
                  employees.forEach((employee) => {
                    dispatch(toggleSelectEmployee(employee.id));
                  });
                }}
              />
            </th>
            <th className="p-2">Họ và Tên</th>
            <th className="p-2">Email</th>
            <th className="p-2">Chức vụ</th>
            <th className="p-2">Trạng thái</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={employee.isSelected}
                  onChange={() => dispatch(toggleSelectEmployee(employee.id))}
                />
              </td>
              <td className="p-2">{employee.username}</td>
              <td className="p-2">{employee.email}</td>
              <td className="p-2">{employee.role}</td>
              <td className={`p-2 ${
                employee.isActive == 1
                  ? "text-green-500"
                  : employee.isActive == 0
                  ? "text-yellow-500" 
                  : "text-red-500"
              }`}>
                {employee.isActive}
              </td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => onEdit(employee.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(employee.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
                >
                  Xóa  
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LoadMoreButton text="Xem thêm" onClick={handleLoadMore} />
      {loading && <Spinner />}
    </div>
  );
};

export default EmployeeList;