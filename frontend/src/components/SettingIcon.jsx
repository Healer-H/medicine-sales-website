import { React } from "react";

import { IoSettingsOutline } from "react-icons/io5";

const SettingIcon = ({ handleClick }) => {
  return (
    <div onClick={handleClick}>
      <IoSettingsOutline className="text-gray-600 cursor-pointer" size={35} />
    </div>    
  );
};

export default SettingIcon;