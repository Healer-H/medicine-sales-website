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
  },
}

module.exports = Path
