import axiosClient from "./axiosClient";
import apiRoutes from "../constants/apiRoutes";

const userService = {
  login: (credentials) => axiosClient.post(apiRoutes.User.Login, credentials),
  forgotPassword: (email) =>
    axiosClient.post(apiRoutes.User.ForgotPassword, { email }),
  resetPassword: ({ email, otp, newPassword }) =>
    axiosClient.patch(apiRoutes.User.ResetPassword, {
      email,
      otp,
      newPassword,
    }),
  getAllUsers: (page = 1) =>
    axiosClient.get(apiRoutes.Admin.GetAllUser, { params: { page } }),
  createUser: (userData) =>
    axiosClient.post(apiRoutes.Admin.CreateUser, userData),
  detailUser: (id) =>
    axiosClient.get(apiRoutes.Admin.DetailUser.replace(":id", id)),
  putUser: (id, userData) =>
    axiosClient.put(apiRoutes.Admin.PutUser.replace(":id", id), userData),
  patchUser: (id, userData) =>
    axiosClient.patch(apiRoutes.Admin.PatchUser.replace(":id", id), userData),
  deleteUser: (id) =>
    axiosClient.delete(apiRoutes.Admin.DeleteUser.replace(":id", id)),
  deleteMultipleUsers: (ids) =>
    axiosClient.post(apiRoutes.Admin.DeleteMultipleUsers, { ids }),
  getProfile: () => axiosClient.get(apiRoutes.User.GetProfile),
};

export default userService;
