// EmployeeManagement.jsx
import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeDetailTabs from '../components/EmployeeDetailTabs';

const mockEmployees = [
  {
    id: 1,
    name: 'Nguyễn Trần Hương Giang',
    email: 'uongtradaokhong@gmail.com',
    position: 'Quản trị viên',
    status: 'Đang hoạt động',
  },
  {
    id: 2,
    name: 'Nguyễn Văn A',
    email: 'vana@gmail.com',
    position: 'Nhân viên',
    status: 'Khóa tạm thời',
  },
];

const EmployeeManagement = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEdit = (id) => {
    const employee = mockEmployees.find((emp) => emp.id === id);
    setSelectedEmployee(employee);
    setViewMode('detail');
  };

  const handleDelete = (id) => {
    console.log('Delete employee with id:', id);
  };

  return (
    <div>
      {viewMode === 'list' ? (
        <EmployeeList
          employees={mockEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <EmployeeDetailTabs employee={selectedEmployee} />
      )}
    </div>
  );
};

export default EmployeeManagement;
