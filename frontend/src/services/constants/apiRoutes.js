// src/services/constants/apiRoutes.js
const apiRoutes = {
  User: {
    Login: "user/login",
    ForgotPassword: "user/forgot-password",
    ResetPassword: "user/reset-password",
  },
  Product: {
    Id: "/products/:id",
    Add: "/products/add",
    All: "/products/all",
    Update: "/products/:id",
    Delete: "/products/:id",
    Search: "/products/search",
    GetExpired: "/products/get-expired",
    GetLowStock: "/products/get-low-stock",
    Import: "/products/import",
    Export: "/products/export",
  },
  Admin: {
    GetAllUser: "/admin/users",
    CreateUser: "/admin/users",
    DetailUser: "/admin/user/:id",
    PutUser: "/admin/user/:id",
    PatchUser: "/admin/user/:id",
    DeleteUser: "/admin/user/:id",
    DeleteMultipleUsers: "/admin/users/delete-multiple-users",
  },
  Order: {
    AddProductToOrder: "/orders/add-product-to-order",
    CreateOrder: "/orders/create-order",
    ExportOrder: "/orders/export-order/:id",
    UpdateOrder: "/orders/:id",
    GetOrder: "/orders/:id",
    GetAllOrders: "/orders/",
    DeleteOrder: "/orders/:id",
    DeleteMultipleOrders: "/orders/delete-multiple-orders",
    DeleteAllOrders: "/orders/delete-all-orders",
  },
  Report: {
    GetRevenueReport: "/reports/get-revenue-report",
  },
};

export default apiRoutes;
