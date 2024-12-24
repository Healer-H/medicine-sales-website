import React from "react";

const PersonalInfo = () => {
  return (
    <div>
      {/* Personal Information Section */}
      <Section title="Thông tin cá nhân">
        <InputField label="Họ và tên" value="Nguyễn Trần Hương Giang" readOnly />
        <InputField label="Ngày sinh" value="10/10/2000" />
        <DropdownField label="Giới tính" options={["Nam", "Nữ"]} />
        <InputField label="Số CCCD" value="123456789" />
        <InputField label="Ngày cấp" value="01/01/2020" />
        <InputField label="Nơi cấp" value="Hà Nội" />
      </Section>

      {/* Bank Information Section */}
      <Section title="Thông tin ngân hàng">
        <InputField label="Tên ngân hàng" />
        <InputField label="Số tài khoản" />
        <InputField label="Chủ tài khoản" />
        <InputField label="Chi nhánh ngân hàng" />
      </Section>

      {/* Employee Role Section */}
      <Section title="Vai trò nhân viên">
        <DropdownField label="Vị trí" options={["Quản trị viên", "Nhân viên"]} />
        <InputField label="Thời gian đảm nhận" />
        <TextAreaField
          label="Mô tả công việc"
          placeholder="Quản lý, kiểm tra và xử lý,..."
        />
      </Section>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-2 gap-4">{children}</div>
  </div>
);

// Reusable Input Field Component
const InputField = ({ label, value, readOnly }) => (
  <div>
    <label className="block text-gray-700 mb-2">{label}</label>
    <input
      type="text"
      className="border w-full p-2 rounded-md"
      defaultValue={value}
      readOnly={readOnly}
    />
  </div>
);

// Reusable Dropdown Component
const DropdownField = ({ label, options }) => (
  <div>
    <label className="block text-gray-700 mb-2">{label}</label>
    <select className="border w-full p-2 rounded-md">
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </div>
);

// Reusable Text Area Component
const TextAreaField = ({ label, placeholder }) => (
  <div className="col-span-2">
    <label className="block text-gray-700 mb-2">{label}</label>
    <textarea
      className="border w-full p-2 rounded-md"
      rows="4"
      placeholder={placeholder}
    ></textarea>
  </div>
);

export default PersonalInfo;
