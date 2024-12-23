import React from "react";

const CrudButton = ({ type, text, onClick }) => {
  const getClassNames = (type) => {
    switch (type) {
      case "edit":
        return "bg-blue-500 text-blue-500 bg-blue border border-blue-500 rounded-md px-4 py-2 mt-4";
      case "delete":
        return "text-red-500 bg-red border border-red-500 rounded-md px-4 py-2 mt-4";
      case "create":
        return "bg-gradient-to-r from-[#6CBCFD] to-[#468EFD] text-white px-4 py-1 rounded-md";
      default:
        return "text-gray-500 bg-gray border border-gray-500 rounded-md px-4 py-2 mt-4";
    }
  };

  return (
    <div>
        <button className={getClassNames(type)} onClick={onClick}>
            {text}
        </button>
    </div>
  );
};

export default CrudButton;
