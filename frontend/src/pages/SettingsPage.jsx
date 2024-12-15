import React from 'react';
import AccountSettings from '../components/AccountSettings';
import SystemPreferences from '../components/SystemPreferences';
import DataManagement from '../components/DataManagement';
import SecuritySettings from '../components/SecuritySettings';
import SupportAndHelp from '../components/SupportAndHelp';

const SettingsPage = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Cài Đặt</h1>
      <div className="bg-white p-4 shadow-md rounded-md">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-4">
          <button className="px-4 py-2 rounded-md bg-blue-500 text-white">Quản lý tài khoản</button>
          <button className="px-4 py-2 rounded-md bg-gray-200">Tùy chỉnh hệ thống</button>
          <button className="px-4 py-2 rounded-md bg-gray-200">Quản lý dữ liệu</button>
          <button className="px-4 py-2 rounded-md bg-gray-200">Bảo mật</button>
          <button className="px-4 py-2 rounded-md bg-gray-200">Hỗ trợ và trợ giúp</button>
        </div>
        
        {/* Default Settings Tab */}
        <AccountSettings />
      </div>
    </div>
  );
};

export default SettingsPage;
