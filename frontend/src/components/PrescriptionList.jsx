import React from 'react';

const PrescriptionList = ({ prescriptions, onViewDetail, onDelete }) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Đơn Thuốc</h1>
      <table className="w-full bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-purple-500 text-white">
            <th className="p-2">ID Đơn Thuốc</th>
            <th className="p-2">Số BHYT</th>
            <th className="p-2">Họ và Tên</th>
            <th className="p-2">Ngày Lưu Trữ</th>
            <th className="p-2">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.id} className="border-b">
              <td className="p-2">{prescription.id}</td>
              <td className="p-2">{prescription.insuranceNumber}</td>
              <td className="p-2">{prescription.patientName}</td>
              <td className="p-2">{prescription.archivedDate}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => onViewDetail(prescription.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded-md"
                >
                  Xem
                </button>
                <button
                  onClick={() => onDelete(prescription.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 text-blue-500">Xem thêm</button>
    </div>
  );
};

export default PrescriptionList;