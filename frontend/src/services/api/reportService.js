// src/services/api/authService.js
import axiosClient from "./axiosClient";
import apiRoutes from "../constants/apiRoutes";

const reportService = {
  getRevenueReport: () => axiosClient.get(apiRoutes.Report.GetRevenueReport),
};

export default reportService;
