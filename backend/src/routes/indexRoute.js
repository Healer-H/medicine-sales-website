const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('../config/swaggerConfig')
const userRoute = require('./userRoute')
const errorHandler = require('../middlewares/errorHandlerMiddlewares')

const Router = (app) => {
    app.use('/auth', userRoute)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('/', (req, res) => {
        res.send('Welcome to the medicine center!')
    })
    // middleware error handler: cần để sau cùng các route để nhận các lỗi được next từ các controller
    app.use(errorHandler)
    
}

module.exports = Router
