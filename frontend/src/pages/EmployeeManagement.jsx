// EmployeeManagement.jsx
import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeDetailTabs from '../components/EmployeeDetailTabs';
import { useSelector } from 'react-redux';
import { useNavigate

 } from 'react-router-dom';
const EmployeeManagement = () => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    console.log('Delete employee with id:', id);
  };

  const handleEdit = (id) => {  
    navigate(`/employee/${id}/edit`);
  }

  const employees = useSelector((state) => state.employees.employees);

  return (
    <div>
        <EmployeeList
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
    </div>
  );
};

export default EmployeeManagement;
