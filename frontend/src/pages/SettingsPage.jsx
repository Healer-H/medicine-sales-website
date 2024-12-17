import React from 'react';
import { FiUser, FiLock, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { MdImage } from 'react-icons/md';

const SettingsPage = () => {
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
          <InputField icon={<FiLock />} label="Phân quyền tài khoản" value="Admin" />

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
              defaultValue="Trường Đại học Công nghệ Thông tin - Đại học Quốc gia TP.HCM"
            />
          </div>

          {/* Ảnh chân dung */}
          <div className="col-span-1 flex flex-col justify-center items-center border-dashed border-2 p-4 rounded-md">
            <MdImage className="text-gray-500 text-4xl mb-2" />
            <p>
              <span className="text-blue-500 cursor-pointer">Nhấn vào đây</span> để tải tệp lên hoặc kéo thả.
            </p>
            <p className="text-gray-400 text-sm">Định dạng: SVG, JPG, PNG (10MB)</p>
          </div>

          {/* Mật khẩu */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2 flex items-center">
              <FiLock className="mr-2" /> Mật khẩu
            </label>
            <div className="flex items-center">
              <input
                type="password"
                className="w-full border p-2 rounded-md"
                defaultValue="********"
                readOnly
              />
              <button className="ml-4 text-blue-500 underline">Đổi mật khẩu</button>
            </div>
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
            <div className="space-y-2">
              <label>
                <input type="checkbox" className="mr-2" /> Bật thông báo báo cáo
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> Bật thông báo âm thanh
              </label>
            </div>
          </div>

          {/* Cỡ chữ */}
          <ToggleSwitch label="Cỡ chữ" options={['Bình thường', 'Lớn hơn']} />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button className="px-4 py-2 bg-gray-300 rounded-md">Hủy</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Lưu</button>
        </div>
      </div>
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
              selected === option ? 'bg-blue-500 text-white' : ''
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
