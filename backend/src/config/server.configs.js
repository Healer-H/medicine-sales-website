const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
// const helmet = require('helmet')
// const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const EnvVars = require('../constants/envVars')
const HttpStatusCodes = require('../constants/httpStatusCodes')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('../config/swagger.configs')

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // Giới hạn mỗi IP chỉ được gửi 100 request trong 15 phút
// })

// Cors
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: HttpStatusCodes.OK,
  methos: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders:
    'Content-Type, Authorization, Origin, X-Requested-With, Accept',
  Credentials: true,
}

const configServer = app => {
  //Thêm configuration ở đây

  // Basic middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true })) //form data
  app.use(cookieParser(EnvVars.CookieProps.Secret)) //cookie parser for cookies that will be sent to the server

  app.use(morgan())
  //http logger: Show routes called in console during development
  // if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  //     app.use(morgan('dev'));
  // }

  // // Security
  // if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  //     app.use(helmet());
  // }

  app.use(cors(corsOptions))

  // // rate limit middleware
  // app.use(limiter)

  // API documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

module.exports = configServer
