const userService = require('../services/userService')

// [POST] /auth/login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const response = await userService.login(email, password)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

// [POST] /auth/forgot-password
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const response = await userService.forgotPassword(email)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

// [POST] /auth/reset-password
const resetPassword = async (req, res, next) => {
    try {
        const { email, otp, newPassword } = req.body
        const response = await userService.resetPassword(
            email,
            otp,
            newPassword,
        )
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
    forgotPassword,
    resetPassword,
    
}
