import React from "react";
import { FaBell } from "react-icons/fa";
import { FaCog } from "react-icons/fa"; // Solid Settings Icon
import { useSelector, useDispatch } from "react-redux";
import { viewNotification } from "../store/headerSlice";

const Header = () => {
  const dispatch = useDispatch();
  const notificationCount = useSelector(
    (state) => state.header.newNotifications.length
  );

  return (
    <div className="flex items-center justify-end px-6 py-2 bg-white shadow-md">
      {/* User Avatar and Username */}
      <div className="flex items-center space-x-3 mr-5 cursor-pointer">
        <img
          src="https://placehold.co/40x40" // Replace with real avatar
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
        <span
          className="font-semibold text-transparent bg-clip-text cursor-pointer"
          style={{
            fontSize: "18px",
            background: "linear-gradient(90deg, #6CBCFD, #468EFD)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Hương Giang
        </span>
      </div>

      {/* Notification Icon */}
      <div className="relative mr-4">
        <svg width="30" height="30" viewBox="0 0 15 16">
          <defs>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6CBCFD" />
              <stop offset="100%" stopColor="#468EFD" />
            </linearGradient>
          </defs>
          <FaBell
            className="cursor-pointer"
            style={{
              fill: "url(#iconGradient)", // Apply the gradient
            }}
          />
        </svg>
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 cursor-pointer">
            {notificationCount}
          </span>
        )}
      </div>
      {/* Settings Icon */}
      <div>
      <svg width="30" height="30" viewBox="0 0 15 16">
          <defs>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6CBCFD" />
              <stop offset="100%" stopColor="#468EFD" />
            </linearGradient>
          </defs>
          <FaCog
            className="cursor-pointer"
            style={{
              fill: "url(#iconGradient)", // Apply the gradient
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default Header;