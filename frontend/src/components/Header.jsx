// Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationIcon from "./NotificationIcon";
import SettingIcon from "./SettingIcon";
import UserAva from "./UserAva";
import { viewNotification } from "../store/headerSlice";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "./Breadcrumb";
import { Paths } from "../constants/paths";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notificationCount = useSelector(
    (state) => state.header.newNotifications.length
  );

  const handleNotificationClick = () => {
    dispatch(viewNotification());
    // Hiển thị thông báo (có thể là một modal hoặc dropdown)
  };

  const handleSettingsClick = () => {
    navigate(Paths.SETTINGS);
  };

  const handleUserAvaClick = () => {
    navigate(Paths.ACCOUNT);
  };

  return (
    
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex-grow"></div>
      <div className="flex items-end space-x-4">
        <NotificationIcon
          notificationCount={notificationCount}
          handleClick={handleNotificationClick}
        />
        <SettingIcon handleClick={handleSettingsClick} />
        <UserAva src={"https://placehold.co/20"} handleClick={handleUserAvaClick} />
      </div>
    </div>
  );
};

export default Header;