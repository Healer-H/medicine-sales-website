import React from "react";

const LoadMoreButton = ({ onClick, text }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button
        className="text-blue-500 bg-blue border border-blue-500 rounded-md px-4 py-2 mt-4"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default LoadMoreButton 