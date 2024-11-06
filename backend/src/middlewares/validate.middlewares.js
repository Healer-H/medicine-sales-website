// middleware/validators.js
const { body, validationResult } = require('express-validator')
const HttpStatusCodes = require('../constants/httpStatusCodes')

// BASE VALIDATORS
const validateEmail = [
  body('email').isEmail().withMessage('Email không hợp lệ'),
]

const validatePassword = (passwordField = 'password') => [
  body(passwordField)
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

const validateOTP = [body('otp').isNumeric().withMessage('OTP phải là số')]

// SPECIFIC VALIDATORS
const validateLogin = [...validateEmail]

const validateCreateUser = [...validateEmail, ...validatePassword()]

const validateForgotPassword = [...validateEmail]

const validateResetPassword = [
  ...validateEmail,
  ...validatePassword('newPassword'),
  ...validateOTP,
]

// REQUEST VALIDATOR
const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() })
  }
  next()
}

module.exports = {
  validateLogin,
  validateCreateUser,
  validateForgotPassword,
  validateResetPassword,
  validateRequest,
}
