import React from 'react';

const PrescriptionDetail = ({ prescription }) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Chi Tiết Đơn Thuốc</h1>
      <div className="bg-white p-4 shadow-md rounded-md">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Đơn Thuốc</h2>
          <p>Mã đơn thuốc: {prescription.id}</p>
          <p>Họ và tên: {prescription.patientName}</p>
          <p>Số BHYT: {prescription.insuranceNumber}</p>
          <p>Ngày lưu trữ: {prescription.archivedDate}</p>
        </div>
        <table className="w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-2">Mã thuốc</th>
              <th className="p-2">Hoạt chất</th>
              <th className="p-2">Tên thuốc</th>
              <th className="p-2">DVT</th>
              <th className="p-2">Số lượng</th>
              <th className="p-2">Cách dùng</th>
            </tr>
          </thead>
          <tbody>
            {prescription.medicines?.map((medicine, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{medicine.code}</td>
                <td className="p-2">{medicine.activeIngredient}</td>
                <td className="p-2">{medicine.name}</td>
                <td className="p-2">{medicine.unit}</td>
                <td className="p-2">{medicine.quantity}</td>
                <td className="p-2">{medicine.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <p className="font-bold">Lời dặn: {prescription.note}</p>
          <p>Lịch tái khám: {prescription.followUpSchedule}</p>
        </div>
        <div className="flex space-x-4 mt-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetail;
