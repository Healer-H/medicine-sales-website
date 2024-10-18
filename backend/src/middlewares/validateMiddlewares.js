// middleware/validators.js
const { body, validationResult } = require('express-validator')

const validateForgotPassword = [
    body('email').isEmail().withMessage('Email không hợp lệ'),
]

const validateResetPassword = [
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
        .matches(/[A-Z]/)
        .withMessage('Mật khẩu phải chứa ít nhất một chữ hoa')
        .matches(/[a-z]/)
        .withMessage('Mật khẩu phải chứa ít nhất một chữ thường')
        .matches(/\d/)
        .withMessage('Mật khẩu phải chứa ít nhất một số')
        .matches(/[@$!%*?&#]/)
        .withMessage('Mật khẩu phải chứa ít nhất một ký tự đặc biệt'),
]

const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }
    next()
}

module.exports = {
    validateForgotPassword,
    validateResetPassword,
    validateRequest,
}
