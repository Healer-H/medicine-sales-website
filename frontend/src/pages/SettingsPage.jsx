import React, { useState } from 'react';
import { FiUser, FiLock, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { MdImage } from 'react-icons/md';

const SettingsPage = () => {
  const [isPasswordPopupVisible, setPasswordPopupVisible] = useState(false);

  const togglePasswordPopup = () => {
    setPasswordPopupVisible(!isPasswordPopupVisible);
  };

  return (
    <div className="p-6">
      {/* Settings Form */}
      <div className="mt-6 bg-white p-6 shadow-md rounded-md">
        {/* Section: Thông tin tài khoản */}
        <h2 className="text-lg font-semibold mb-4">Thông tin tài khoản</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Họ và tên */}
          <InputField icon={<FiUser />} label="Họ và tên" value="Nguyễn Trần Hương Giang" />

          {/* Phân quyền tài khoản */}
          <div>
            <label className="block text-gray-700 mb-2 flex items-center">
              <FiLock className="mr-2" /> Phân quyền tài khoản
            </label>
            <select className="w-full border p-2 rounded-md">
              <option value="Admin">Admin</option>
              <option value="Nhân viên">Nhân viên</option>
            </select>
          </div>

          {/* Số điện thoại */}
          <InputField icon={<FiPhone />} label="Số điện thoại" value="0911 111 111" />

          {/* Địa chỉ Email */}
          <InputField icon={<FiMail />} label="Địa chỉ Email" value="uongtradaokhong@gmail.com" />

          {/* Địa chỉ */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-2 flex items-center">
              <FiMapPin className="mr-2" /> Địa chỉ
            </label>
            <textarea
              className="w-full border p-2 rounded-md"
              rows="3"
              defaultValue="Trường Đại học Công nghệ Thông tin - Đại học Quốc gia Thành phố Hồ Chí Minh, Đường Hàn Thuyên, Khu phố 6, Phường Linh Trung, Thành phố Thủ Đức, Thành phố Hồ Chí Minh."
            />
          </div>

          {/* Ảnh chân dung */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Ảnh chân dung</label>
            <div className="flex items-center border-dashed border-2 p-4 rounded-md">
              {/* Current Avatar */}
              <img
                src="https://via.placeholder.com/100"
                alt="User Avatar"
                className="w-20 h-20 rounded-full mr-4"
              />
              <div className="flex-1">
                <label className="cursor-pointer text-blue-500">
                  <input
                    type="file"
                    accept=".svg, .jpg, .png"
                    className="hidden"
                  />
                  Nhấn vào đây để tải lên ảnh mới
                </label>
                <p className="text-gray-400 text-sm">
                  Định dạng được hỗ trợ: SVG, JPG, PNG (10MB)
                </p>
              </div>
            </div>
          </div>

          {/* Mật khẩu */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2 flex items-center">
                <FiLock className="mr-2" /> Mật khẩu
            </label>
            <div className="flex items-center">
              <input
                type="password"
                className="w-1/2 border p-2 rounded-md"
                defaultValue="********"
                readOnly
              />
            </div>
            <button
              className="ml-4 text-blue-500 underline whitespace-nowrap"
              onClick={togglePasswordPopup}
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>

        {/* Section: Cài đặt hệ thống */}
        <h2 className="text-lg font-semibold mt-8 mb-4">Cài đặt hệ thống</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Chế độ hiển thị */}
          <ToggleSwitch label="Chế độ hiển thị" options={['Sáng', 'Tối']} />

          {/* Thông báo */}
          <div>
            <label className="block text-gray-700 mb-2">Thông báo</label>
            <div className="flex space-y-2 flex-col">
              <label>
                <input type="checkbox" className="mr-2" /> Bật thông báo báo cáo
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> Bật thông báo âm thanh
              </label>
            </div>
          </div>

          {/* Cỡ chữ */}
          <ToggleSwitch label="Cỡ chữ" options={['Nhỏ', 'Lớn']} />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button className="px-4 py-2 bg-gray-300 rounded-md">Hủy</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Lưu</button>
        </div>
      </div>

      {/* Password Change Popup */}
      {isPasswordPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">Đổi mật khẩu</h2>
            <input
              type="password"
              placeholder="Nhập mật khẩu hiện tại"
              className="w-full border p-2 rounded-md mb-4"
            />
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              className="w-full border p-2 rounded-md mb-4"
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              className="w-full border p-2 rounded-md mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={togglePasswordPopup}
              >
                Hủy
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Input Field Component
const InputField = ({ icon, label, value }) => (
  <div>
    <label className="block text-gray-700 mb-2 flex items-center">
      {icon} <span className="ml-2">{label}</span>
    </label>
    <input
      type="text"
      className="w-full border p-2 rounded-md"
      defaultValue={value}
      readOnly
    />
  </div>
);

// Toggle Switch Component
const ToggleSwitch = ({ label, options }) => {
  const [selected, setSelected] = React.useState(options[0]);

  return (
    <div>
      <label className="block text-gray-700 mb-2">{label}</label>
      <div className="flex items-center bg-gray-200 rounded-full w-40">
        {options.map((option) => (
          <div
            key={option}
            className={`w-1/2 text-center py-2 cursor-pointer rounded-full ${
              selected === option
                ? 'bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white'
                : ''
            }`}
            onClick={() => setSelected(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
