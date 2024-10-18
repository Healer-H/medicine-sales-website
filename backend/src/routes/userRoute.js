const express = require('express')
const userController = require('../controllers/userController')
const authMiddlewares = require('../middlewares/authMiddelwares')
const {
    validateForgotPassword,
    validateRequest,
    validateResetPassword,
} = require('../middlewares/validateMiddlewares')
const Router = express.Router()

Router.post('/login', userController.login)
Router.post(
    '/forgot-password',
    validateForgotPassword,
    validateRequest,
    userController.forgotPassword,
)
Router.post(
    '/reset-password',
    validateResetPassword,
    validateRequest,
    userController.resetPassword,
)

module.exports = Router
