import axiosClient from "./axiosClient";
import apiRoutes from "../constants/apiRoutes";

const productService = {
  getAll: (query = {}) =>
    axiosClient.get(apiRoutes.Product.All, { params: query }),
  get: (id) => axiosClient.get(apiRoutes.Product.Id.replace(":id", id)),
  add: (productData) => axiosClient.post(apiRoutes.Product.Add, productData),
  update: (id, productData) =>
    axiosClient.put(apiRoutes.Product.Update.replace(":id", id), productData),
  delete: (id) =>
    axiosClient.delete(apiRoutes.Product.Delete.replace(":id", id)),
  search: (q) => axiosClient.get(apiRoutes.Product.Search, { params: q }),
  getExpired: () => axiosClient.get(apiRoutes.Product.GetExpired),
  getLowStock: () => axiosClient.get(apiRoutes.Product.GetLowStock),
  importProducts: (formData) =>
    axiosClient.post(apiRoutes.Product.Import, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  exportProducts: () =>
    axiosClient.get(apiRoutes.Product.Export, {
      responseType: "blob",
    }),
};

export default productService;
