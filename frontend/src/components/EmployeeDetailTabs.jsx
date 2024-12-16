// EmployeeDetailTabs.jsx
import React, { useState } from 'react';
import { FiUser, FiPhone, FiMail, FiCalendar, FiMapPin, FiUserCheck } from "react-icons/fi";
import { FaUserTie, FaVenusMars } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

const EmployeeDetailTabs = () => {
  const [activeTab, setActiveTab] = useState('working'); // 'working' or 'personal'

  const tabs = [
    { id: 'working', name: 'Thông tin làm việc' },
    { id: 'personal', name: 'Thông tin nhân viên' },
  ];

  return (
    <div className="flex">
    {/* Left Section: Employee Profile */}
    <div className="w-1/4 p-6 bg-white shadow-md rounded-md">
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://via.placeholder.com/150" // Replace with actual image URL
          alt="Employee"
          className="w-32 h-32 rounded-full mb-4 object-cover"
        />
        <h2 className="text-lg font-bold mb-1">NV12345678</h2>
      </div>
      <div className="border-t">
        <ProfileRow icon={<FiUser />} label="N.T.H.Giang" />
          <ProfileRow icon={<FaUserTie />} label="Quản trị viên" />
          <ProfileRow icon={<FiPhone />} label="012345678" />
          <ProfileRow icon={<FiMail />} label="sample@gmail.com" />
          <ProfileRow icon={<FiCalendar />} label="10/10/2000" />
          <ProfileRow icon={<FaVenusMars />} label="Nữ" />
          <ProfileRow icon={<MdOutlineDateRange />} label="Ngày vào làm: 10/10/1020" />
      </div>
    </div>

    {/* Right Section: Tabs and Forms */}
    <div className="w-3/4 p-6 bg-white shadow-md rounded-md ml-6">
      {/* Tabs */}
      <div className="flex mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 mr-2 text-lg font-semibold rounded-md ${
              activeTab === tab.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
        {activeTab === "working" && <WorkingInfoForm />}
        {activeTab === "personal" && <PersonalInfoForm />}
      </div>
    </div>
  );
};

// Reusable Profile Row Component
const ProfileRow = ({ icon, label }) => {
  return (
    <div className="flex items-center py-2 border-b last:border-b-0">
      <div className="text-gray-500 mr-4">{icon}</div>
      <p className="text-gray-700">{label}</p>
    </div>
  );
};

{/*Form for "Thông tin làm việc"*/}
const WorkingInfoForm = () => {
  return (
    <form className="grid grid-cols-2 gap-6">
      <div>
        <label className="block mb-2 font-medium text-gray-700">Mã nhân viên</label>
        <input type="text" className="w-full border p-2 rounded-md" value="NV12345678" readOnly />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Bộ phận</label>
        <select className="w-full border p-2 rounded-md">
          <option>Chọn bộ phận</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Ngày vào làm việc</label>
        <input type="date" className="w-full border p-2 rounded-md" />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Trạng thái</label>
        <div className="flex items-center space-x-4">
          <label>
            <input type="radio" name="status" className="mr-2" defaultChecked /> Đang hoạt động
          </label>
          <label>
            <input type="radio" name="status" className="mr-2" /> Khóa tạm thời
          </label>
          <label>
            <input type="radio" name="status" className="mr-2" /> Khóa vĩnh viễn
          </label>
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Chức vụ</label>
        <div className="flex items-center space-x-4">
          <label>
            <input type="radio" name="position" className="mr-2" defaultChecked /> Nhân viên
          </label>
          <label>
            <input type="radio" name="position" className="mr-2" /> Quản trị viên
          </label>
        </div>
      </div>

      {/* Submission Buttons */}
      <div className="col-span-2 flex justify-end space-x-4 mt-4">
        <button type="button" className="px-4 py-2 bg-gray-300 rounded-md">
          Hủy
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Lưu
        </button>
      </div>
    </form>
  );
};

// Form for "Thông tin nhân viên"
const PersonalInfoForm = () => {
  return (
    <form className="space-y-8">
      {/* Thông tin cá nhân */}
      <Section title="Thông tin cá nhân">
        <InputField label="Họ và tên" />
        <InputField label="Số CCCD" />
        <InputField label="Ngày cấp" type="date" />
        <InputField label="Ngày sinh" type="date" />
      </Section>

      {/* Thông tin ngân hàng */}
      <Section title="Thông tin ngân hàng">
        <InputField label="Tên ngân hàng" />
        <InputField label="Số tài khoản" />
        <InputField label="Chủ tài khoản" />
        <InputField label="Chi nhánh ngân hàng" />
      </Section>

      {/* Thông tin hồ sơ */}
      <Section title="Thông tin hồ sơ">
        <InputField label="Hồ sơ lý lịch" />
        <InputField label="Mô tả công việc" />
      </Section>

      {/* Submission Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Lưu
        </button>
      </div>
    </form>
  );
};

// Reusable Section Component for Titles and Grouping Fields
const Section = ({ title, children }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 border-b pb-2">{title}</h3>
      <div className="grid grid-cols-2 gap-6">{children}</div>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, type = "text" }) => {
  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">{label}</label>
      <input
        type={type}
        className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default EmployeeDetailTabs;
