// src/services/api/authService.js
import axiosClient from "./axiosClient";
import apiRoutes from "../constants/apiRoutes";

const userService = {
  login: (credentials) => axiosClient.post(apiRoutes.User.Login, credentials),
  forgotPassword: (email) =>
    axiosClient.post(apiRoutes.User.ForgotPassword, email),
  resetPassword: (token, newPassword) =>
    axiosClient.put(apiRoutes.User.ResetPassword, { token, newPassword }),
  getAllUsers: () => axiosClient.get(apiRoutes.Admin.GetAllUser),
  createUser: (userData) =>
    axiosClient.post(apiRoutes.Admin.CreateUser, userData),
  detailUser: (userData) =>
    axiosClient.post(apiRoutes.Admin.DetailUser, userData),
  putUser: (id, userData) =>
    axiosClient.put(apiRoutes.Admin.PutUser.replace(":id", id), userData),
  patchUser: (id, userData) =>
    axiosClient.patch(apiRoutes.Admin.PatchUser.replace(":id", id), userData),
  deleteUser: (id) =>
    axiosClient.delete(apiRoutes.Admin.DeleteUser.replace(":id", id)),
};

export default userService;
