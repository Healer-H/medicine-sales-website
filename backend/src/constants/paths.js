/**
 * Express router paths go here.
 */
const Path = {
  Empty: '/',
  Base: '/api/v1',
  User: {
    Base: '/user',
    Login: '/login',
    Logout: '/logout',
    ForgotPassword: '/forgot-password',
    ResetPassword: '/reset-password',
    GetProfile: '/profile',
  },
  Product: {
    Base: '/products',
    Id: '/:id',
    Add: '/add',
    All: '/all',
    Update: '/:id',
    Search: '/search',
    Import: '/import',
    Export: '/export',
    TopSelling: '/top-selling',
    GetExpired: '/get-expired',
    GetLowStock: '/get-low-stock',
  },
  Admin: {
    Base: '/admin',
    GetAllUser: '/users',
    CreateUser: '/users',
    DetailUser: '/user/:id',
    PutUser: '/user/:id',
    PatchUser: '/user/:id',
    DeleteUser: '/user/:id',
    DeleteMultipleUsers: '/delete-multiple-users',
    DeleteAllUsers: '/delete-all-users',
  },
  Order: {
    Base: '/orders',
    GetOrder: '/:id',
    AddProductToOrder: '/add-product-to-order',
    CreateOrder: '/create-order',
    ExportOrder: '/export-order/:id',
    UpdateOrder: '/:id',
    GetAllOrders: '/',
    DeleteOrder: '/:id',
    DeleteMultipleOrders: '/delete-multiple-orders',
    DeleteAllOrders: '/delete-all-orders',
  },
  Report: {
    Base: '/reports',
    GetRevenueReport: '/get-revenue-report',
  },
}

module.exports = Path
