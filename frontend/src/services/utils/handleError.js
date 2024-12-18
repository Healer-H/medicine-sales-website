// src/services/utils/handleError.js
const handleError = (error) => {
  if (error.response) {
    // Lỗi từ server trả về
    const { status, data } = error.response;
    console.log(error.response);
    console.error(`Error ${status}: ${data.error}`);
    if (Array.isArray(data.errors)) {
      return (
        data.errors.map((err) => err.msg).join(", ") || "Something went wrong!"
      );
    }
    return data.error || data.message || "Something went wrong!";
  }
  return "Server lỗi trong quá trình xử lý!";
};

export default handleError;
