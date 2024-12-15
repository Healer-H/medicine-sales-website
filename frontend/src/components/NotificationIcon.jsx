import { React } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

const NotificationIcon = ( {notificationCount, handleClick} ) => {
  return (
    <div className="relative">
      <IoNotificationsOutline
        className="text-gray-600 cursor-pointer"
        size={35}
        onClick={handleClick}
      />
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {notificationCount}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;