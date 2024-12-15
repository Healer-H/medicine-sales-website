import React from 'react';

const WorkInfo = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label>Mã nhân viên</label>
        <input type="text" className="border w-full p-2 rounded-md" value="NV12345678" readOnly />
      </div>
      <div>
        <label>Bộ phận</label>
        <input type="text" className="border w-full p-2 rounded-md" value="Chọn bộ phận" />
      </div>
      <div>
        <label>Ngày vào làm việc</label>
        <input type="date" className="border w-full p-2 rounded-md" />
      </div>
      <div>
        <label>Trạng thái</label>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input type="radio" name="status" value="active" className="mr-2" /> Đang hoạt động
          </div>
          <div className="flex items-center">
            <input type="radio" name="status" value="temporary" className="mr-2" /> Khóa tạm thời
          </div>
          <div className="flex items-center">
            <input type="radio" name="status" value="permanent" className="mr-2" /> Khóa vĩnh viễn
          </div>
        </div>
      </div>
      <div>
        <label>Chức vụ</label>
        <select className="border w-full p-2 rounded-md">
          <option>Quản trị viên</option>
          <option>Nhân viên</option>
        </select>
      </div>
    </div>
  );
};

export default WorkInfo;