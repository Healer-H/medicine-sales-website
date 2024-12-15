// src/services/api/authService.js
import axiosClient from "./axiosClient";
import apiRoutes from "../constants/apiRoutes";

const orderService = {
  addProductToOrder: (orderData) =>
    axiosClient.post(apiRoutes.Order.AddProductToOrder, orderData),
  createOrder: (orderData) =>
    axiosClient.post(apiRoutes.Order.CreateOrder, orderData),
  exportOrder: (id) =>
    axiosClient.get(apiRoutes.Order.ExportOrder.replace(":id", id)),
  updateOrder: (id, orderData) =>
    axiosClient.put(apiRoutes.Order.UpdateOrder.replace(":id", id), orderData),
  getAllOrders: () => axiosClient.get(apiRoutes.Order.GetAllOrders),
  deleteOrder: (id) =>
    axiosClient.delete(apiRoutes.Order.DeleteOrder.replace(":id", id)),
  deleteMultipleOrders: (orderIds) =>
    axiosClient.delete(apiRoutes.Order.DeleteMultipleOrders, {
      data: orderIds,
    }),
  deleteAllOrders: () => axiosClient.delete(apiRoutes.Order.DeleteAllOrders),
};

export default orderService;
