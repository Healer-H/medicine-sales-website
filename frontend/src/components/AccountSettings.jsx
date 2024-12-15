import React from 'react';

const AccountSettings = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Thông tin cá nhân</h2>
      <form className="grid grid-cols-2 gap-4">
        <div>
          <label>Họ và Tên</label>
          <input type="text" className="border w-full p-2 rounded-md" value="Nguyễn Trần Hương Giang" />
        </div>
        <div>
          <label>Phân quyền tài khoản</label>
          <select className="border w-full p-2 rounded-md">
            <option>Admin</option>
            <option>Nhân viên</option>
          </select>
        </div>
        <div>
          <label>Số điện thoại</label>
          <input type="text" className="border w-full p-2 rounded-md" value="0911111111" />
        </div>
        <div>
          <label>Bị chặn Email</label>
          <input type="email" className="border w-full p-2 rounded-md" value="uongtradaokhong@gmail.com" />
        </div>
        <div>
          <label>Tiếng người dùng</label>
          <input type="text" className="border w-full p-2 rounded-md" value="h.za_g" />
        </div>
        <div>
          <label>Địa chỉ</label>
          <textarea className="border w-full p-2 rounded-md" rows="4">Trường Đại học Công nghệ Thông tin – Đại học Quốc gia Thành phố Hồ Chí Minh...</textarea>
        </div>
        <div className="col-span-2">
          <label>Ảnh chân dung</label>
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="User Avatar"
              className="w-20 h-20 rounded-full"
            />
            <input type="file" accept=".svg, .jpg, .png" />
          </div>
        </div>
        <div className="col-span-2">
          <label>Thông báo</label>
          <div className="flex space-x-4 items-center">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" /> Bật thông báo báo cáo
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" /> Bật thông báo âm thanh
            </div>
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Lưu cài đặt</button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;