const Path = require('../constants/paths')
const ErrorHandler = require('../middlewares/errorHandler.middlewares')
const userRoute = require('./user.routes')
const productRoutes = require('./product.routes'); 


const Router = app => {
  // Route user
  app.use(Path.User.Base, userRoute)
  app.use(Path.Product.Base, productRoutes);

  app.get(Path.Empty, (req, res) => {
    res.send('Welcome to the medicine center!');
  });

  // middleware error handler: cần để sau cùng các route để nhận các lỗi được next từ các controller
  app.use(ErrorHandler)
}

module.exports = Router
