import React, { useState } from 'react';
import PrescriptionList from '../components/PrescriptionList';
import PrescriptionDetail from '../components/PrescriptionDetail';

const mockPrescriptions = [
  {
    id: '25005P184831-c',
    patientName: 'Nguyễn Trần Hương Giang',
    insuranceNumber: 'HT242421652423242020',
    archivedDate: '10/10/2000',
  },
  {
    id: '25005P184831-c',
    patientName: 'Nguyễn Trần Hương Giang',
    insuranceNumber: 'None',
    archivedDate: '10/10/2000',
  },
  // more prescriptions...
];

const PrescriptionManagement = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const handleViewDetail = (id) => {
    const prescription = mockPrescriptions.find((pres) => pres.id === id);
    setSelectedPrescription(prescription);
    setViewMode('detail');
  };

  const handleDelete = (id) => {
    console.log('Delete prescription with id:', id);
  };

  return (
    <div>
      {viewMode === 'list' ? (
        <PrescriptionList
          prescriptions={mockPrescriptions}
          onViewDetail={handleViewDetail}
          onDelete={handleDelete}
        />
      ) : (
        <PrescriptionDetail prescription={selectedPrescription} />
      )}
    </div>
  );
};

export default PrescriptionManagement;