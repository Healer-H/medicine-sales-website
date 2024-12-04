import React from "react";
import LoadMoreButton from "./LoadMoreButton";
import { loadMoreData } from "../store/prescriptionSlice";
import { useDispatch } from "react-redux";

const PrescriptionList = ({ prescriptions, onViewDetail, onDelete }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <table className="w-full bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-2">ID Đơn thuốc</th>
            <th className="p-2">Số BHYT</th>
            <th className="p-2">Họ và Tên</th>
            <th className="p-2">Ngày lưu trữ</th>
            <th className="p-2">Thao tác</th>
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
      <LoadMoreButton
        text={"Xem thêm"}
        onClick={() => dispatch(loadMoreData())}
      />
    </div>
  );
};

export default PrescriptionList;
