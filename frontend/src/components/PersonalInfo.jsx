import React from 'react';

const PersonalInfo = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label>Họ và tên nhân viên</label>
        <input type="text" className="border w-full p-2 rounded-md" value="Nguyễn Trần Hương Giang" readOnly />
      </div>
      <div>
        <label>Số CCCD</label>
        <input type="text" className="border w-full p-2 rounded-md" value="123456789" />
      </div>
      <div>
        <label>Ngày cấp / Nơi cấp</label>
        <input type="text" className="border w-full p-2 rounded-md" value="01/01/2020 / Hà Nội" />
      </div>
      <div>
        <label>Ngày sinh / Giới tính</label>
        <input type="text" className="border w-full p-2 rounded-md" value="10/10/1990 / Nữ" />
      </div>
      <div>
        <label>Địa chỉ cụ thể</label>
        <textarea className="border w-full p-2 rounded-md" rows="4" value="12 Phố Chùa Láng, Hai Bà Trưng, Hà Nội"></textarea>
      </div>
      <div>
        <label>SDT / Mail</label>
        <input type="text" className="border w-full p-2 rounded-md" value="012345678 / sample@gmail.com" />
      </div>
      <div>
        <label>Số BHXH/Thuế</label>
        <input type="text" className="border w-full p-2 rounded-md" value="123456789" />
      </div>
    </div>
  );
};

export default PersonalInfo;
