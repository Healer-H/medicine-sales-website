// Header.jsx
import React from "react";

const Header = ( {title} ) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h2 className="text-xl font-bold">{ title }</h2>
      <div className="flex items-center space-x-4">
        <button className="material-icons text-gray-600 cursor-pointer">
          notifications
        </button>
        <button className="material-icons text-gray-600 cursor-pointer">
          settings
        </button>
        <button className="rounded-full w-10 h-10">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="rounded-full w-10 h-10"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
