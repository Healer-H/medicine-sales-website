// src/services/api/axiosClient.js
import axios from "axios";
import Cookies from "js-cookie";
import handleError from "../utils/handleError";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token"); // Lấy token từ cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response.data, // Trả về data trực tiếp nếu không có lỗi
  (error) => {
    // Sử dụng handleError để xử lý lỗi từ server
    const errorMessage = handleError(error);
    return Promise.reject(new Error(errorMessage));
  },
);

export default axiosClient;
