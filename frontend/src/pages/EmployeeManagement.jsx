import React, { useState, useEffect } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees, deleteEmployee, deleteMultipleEmployees } from '../store/employeeSlice';
import CrudButton from '../components/CrudButton';
import Spinner from '../components/Spinner';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useConfirmationDialog } from '../hooks/useConfirmationDialog';

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { employees, loading, error, numSelected } = useSelector((state) => state.employees);
  const confirm = useConfirmationDialog();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDeleteSelected = async () => {
    const result = await confirm({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa các nhân viên đã chọn không?",
      confirmText: "Xóa",
      cancelText: "Hủy",
    });
    if (result) {
      const selectedEmployeeIds = employees
        .filter((employee) => employee.isSelected)
        .map((employee) => employee.id);
      dispatch(deleteMultipleEmployees(selectedEmployeeIds));
    }
  };

  const handleDelete = async (id) => {
    const result = await confirm({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa nhân viên này không?",
      confirmText: "Xóa",
      cancelText: "Hủy",
    });
    if (result) {
      dispatch(deleteEmployee(id));
    }
  };

  const handleEdit = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý nhân viên</h1>
        <CrudButton
          type="create"
          text="Thêm nhân viên mới"
          onClick={handleAdd}
        />
      </div>
      {showForm ? (
        <EmployeeForm employee={selectedEmployee} onCancel={handleCancel} />
      ) : (
        <>
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              {numSelected > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="px-2 py-1 flex items-center rounded-md bg-red-500 text-white mb-4"
                >
                  <RiDeleteBin6Line className="mr-2 inline-block" />
                  Xóa ({numSelected})
                </button>
              )}
              <EmployeeList
                employees={employees}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeManagement;