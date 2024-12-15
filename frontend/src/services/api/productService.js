// src/services/api/authService.js
import axiosClient from "./axiosClient";
import apiRoutes from "../constants/apiRoutes";

const productService = {
  getAll: (query = {}) =>
    axiosClient.get(apiRoutes.Product.All, { params: query }),
  get: (id) => axiosClient.get(apiRoutes.Product.Id.replace(":id", id)),
  add: (productData) => axiosClient.post(apiRoutes.Product.Add, productData),
  update: (id, productData) =>
    axiosClient.put(apiRoutes.Product.Update.replace(":id", id), productData),
  search: (query) =>
    axiosClient.get(apiRoutes.Product.Search, { params: query }),
  getExpired: () => axiosClient.get(apiRoutes.Product.GetExpired),
  getLowStock: () => axiosClient.get(apiRoutes.Product.GetLowStock),
};

export default productService;
