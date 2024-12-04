import React, { useState } from 'react';
import WorkInfo from '../components/WorkInfo';
import PersonalInfo from '../components/PersonalInfo';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('work'); // 'work' or 'personal'

  return (
    <div className="p-4">
      <div className="bg-white p-4 shadow-md rounded-md">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveTab('work')}
            className={`px-4 py-2 rounded-md ${activeTab === 'work' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Thông tin làm việc
          </button>
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 rounded-md ${activeTab === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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

export default AccountPage;
