// src/components/Spinner.jsx
import React from "react";

const Spinner = ({ size = "md", color = "blue-500" }) => {
  // Định nghĩa các kích thước cố định
  const sizeClasses = {
    sm: "w-6 h-6 border-2",    // Spinner nhỏ
    md: "w-12 h-12 border-4",  // Spinner trung bình
    lg: "w-16 h-16 border-4",  // Spinner lớn
    xl: "w-20 h-20 border-4",  // Spinner rất lớn
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Spinner;
