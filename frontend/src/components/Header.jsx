// Header.jsx
import React from "react";
import NotificationIcon from "./NotificationIcon";
import SettingIcon from "./SettingIcon";
import UserAva from "./UserAva";
import { viewNotification } from "../store/headerSlice";
import { useSelector, useDispatch } from "react-redux";

const Header = ({ title }) => {
  const dispatch = useDispatch();
  const notificationCount = useSelector(
    (state) => state.header.newNotifications.length
  );
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex items-center space-x-4">
        <NotificationIcon
          notificationCount={notificationCount}
          handleClick={() => dispatch(viewNotification())}
        />
        <SettingIcon />
        <UserAva src={"https://placehold.co/20"} />
      </div>
    </div>
  );
};

export default Header;
