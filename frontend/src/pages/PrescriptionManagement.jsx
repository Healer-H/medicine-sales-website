import React from 'react';
import PrescriptionList from '../components/PrescriptionList';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const PrescriptionManagement = () => {
  const prescriptions = useSelector((state) => state.prescriptions.prescriptions);
  return (
    <div>
        <PrescriptionList
          prescriptions={prescriptions}
          // onViewDetail={handleViewDetail}
          // onDelete={handleDelete}
        />
    </div>
  );
};

export default PrescriptionManagement;