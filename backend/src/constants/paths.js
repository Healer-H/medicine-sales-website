/**
 * Express router paths go here.
 */
const Path = {
    Empty: '/',
    Base: '/api/v1',
    Users: {
      Base: '/users',
      Signin: '/signin',
      Signout: '/signout',
      Signup: '/signup',
      Logout: '/logout',
      Order: '/ordered',
    },
    Product: {
      Base: '/book',
      Id: '/:id',
      Create: '/create',
    },
    Admin: {
      Base: '/admin',
      Create: '/create',
      Store: '/store',
    },
}

module.exports = Path