import React from "react";
import { LuFilter } from "react-icons/lu";
const FilterButton = () => {
  return (
    <div className="relative inline-block text-left">
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
        >
          <span className="flex items-center">
            <LuFilter className="ml-2" />
          </span>
          <i className="fas fa-chevron-down ml-2"></i>
        </button>
    </div>
  );
};

export default FilterButton;
