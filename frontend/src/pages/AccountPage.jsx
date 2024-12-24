import React, { useState } from 'react';
import WorkInfo from '../components/WorkInfo';
import PersonalInfo from '../components/PersonalInfo';
import { FiUser, FiPhone, FiMail, FiCalendar, FiUserCheck } from "react-icons/fi";
import { FaUserTie, FaVenusMars } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('work'); // 'work' or 'personal'

  return (
    <div className="flex p-4">
      {/* Left Section: Fixed User Information */}
      <div className="w-1/4 p-4 bg-white shadow-md rounded-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <h2 className="text-lg font-bold mb-1">NV12345678</h2>
        </div>
        <div className="border-t">
          <ProfileRow icon={<FiUser />} label="Nguyễn Trần Hương Giang" />
          <ProfileRow icon={<FaUserTie />} label="Quản trị viên" />
          <ProfileRow icon={<FiPhone />} label="012345678" />
          <ProfileRow icon={<FiMail />} label="sample@gmail.com" />
          <ProfileRow icon={<FiCalendar />} label="10/10/1990" />
          <ProfileRow icon={<FaVenusMars />} label="Nữ" />
          <ProfileRow icon={<MdOutlineDateRange />} label="Ngày vào làm: 01/01/2020" />
        </div>
      </div>

      {/* Right Section: Tabs and Forms */}
      <div className="w-3/4 p-4 bg-white shadow-md rounded-md ml-4">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveTab('work')}
            className={`px-4 py-2 rounded-md ${activeTab === 'work' ? 'bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white' : 'bg-gray-200'}`}
          >
            Thông tin làm việc
          </button>
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 rounded-md ${activeTab === 'personal' ? 'bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white' : 'bg-gray-200'}`}
          >
            Thông tin nhân viên
          </button>
        </div>

        {activeTab === 'work' && <WorkInfo />}
        {activeTab === 'personal' && <PersonalInfo />}
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

export default AccountPage;
