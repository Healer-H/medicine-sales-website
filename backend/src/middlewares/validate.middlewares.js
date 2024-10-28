// middleware/validators.js
const { body, validationResult } = require('express-validator')
const HttpStatusCodes = require('../constants/httpStatusCodes')

const validateForgotPassword = [
  body('email').isEmail().withMessage('Email không hợp lệ'),
]

const validateResetPassword = [
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP phải có 6 ký tự')
    .matches(/[0-9]/)
    .withMessage('OTP phải chỉ chứa số'),
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
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ success: false, errors: errors.array() })
  }
  next()
}

module.exports = {
  validateForgotPassword,
  validateResetPassword,
  validateRequest,
}
