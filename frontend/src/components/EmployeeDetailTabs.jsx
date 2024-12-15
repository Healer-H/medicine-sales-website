// EmployeeDetailTabs.jsx
import React, { useState } from 'react';

const EmployeeDetailTabs = () => {
  const [activeTab, setActiveTab] = useState('working'); // 'working' or 'personal'

  const tabs = [
    { id: 'working', name: 'Thông tin làm việc' },
    { id: 'personal', name: 'Thông tin nhân viên' },
  ];

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {activeTab === 'working' && (
        <div>
          {/* Working Info Form */}
          <h2 className="text-lg font-bold mb-2">Thông tin làm việc</h2>
          <form>
            <div className="mb-4">
              <label>Mã nhân viên</label>
              <input type="text" className="border w-full p-2 rounded-md" />
            </div>
            {/* Other form fields */}
          </form>
        </div>
      )}

      {activeTab === 'personal' && (
        <div>
          {/* Personal Info Form */}
          <h2 className="text-lg font-bold mb-2">Thông tin nhân viên</h2>
          <form>
            <div className="mb-4">
              <label>Họ và Tên</label>
              <input type="text" className="border w-full p-2 rounded-md" />
            </div>
            {/* Other form fields */}
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailTabs;
