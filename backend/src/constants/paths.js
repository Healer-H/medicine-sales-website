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
  },
  Product: {
    Base: '/products',
    Id: '/:id',
    Add: '/add',
    All: '/all',
    Update: '/:id',
  },
  Admin: {
    Base: '/admin',
    GetAllUser: '/users',
    CreateUser: '/users',
    DetailUser: '/user/:id',
    PutUser: '/user/:id',
    PatchUser: '/user/:id',
    DeleteUser: '/user/:id',
  },
}

module.exports = Path
