// src/services/utils/handleError.js
const handleError = (error) => {
  if (error.response) {
    // Lỗi từ server trả về
    const { status, data } = error.response;
    console.log(error.response);
    console.error(`Error ${status}: ${data.error}`);
    return data.error || data.message || "Lỗi logic ở frontend hoặc backend";
  }
  return "Server lỗi trong quá trình xử lý!";
};

export default handleError;
