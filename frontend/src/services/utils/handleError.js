// src/services/utils/handleError.js
const handleError = (error) => {
  if (error.response) {
    // Lỗi từ server trả về
    const { status, data } = error.response;
    console.error(`Error ${status}: ${data.error}`);
    return data.error || "Something went wrong!";
  }
  return error.message || "Network Error!";
};

export default handleError;
