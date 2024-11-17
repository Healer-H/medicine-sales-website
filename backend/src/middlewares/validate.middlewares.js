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


const validateProperties = (allowedProperties) => {
  return (req, res, next) => {
    const invalidProperties = Object.keys(req.body).filter(
      (key) => !allowedProperties.includes(key)
    );

    if (invalidProperties.length > 0) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: `Các thuộc tính không hợp lệ: ${invalidProperties.join(', ')}`,
      });
    }

    next();
  };
};


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

const validateProduct = [
  body('name')
    .notEmpty()
    .withMessage('Trường name là bắt buộc')
    .isAlphanumeric('vi-VN', { ignore: ' ' })
    .withMessage('Tên sản phẩm không chứa ký tự đặc biệt')
    .custom((value) => {
      if (value.length > 255) {
        throw new Error('Tên sản phẩm không được vượt quá 255 ký tự');
      }
      if (value.trim() !== value) {
        throw new Error('Tên sản phẩm không được chứa khoảng trắng ở đầu hoặc cuối');
      }
      return true;
    }),



    body('price')
    .notEmpty()
    .withMessage('Trường price là bắt buộc')
    .custom((value) => {
      if (!Number.isInteger(value)) {
        throw new Error('Trường price phải là số hợp lệ');
      }
      if (value <= 0) {
        throw new Error('Giá sản phẩm phải là số dương');
      }
      return true;
    }),

  body('stock')
    .notEmpty()
    .withMessage('Trường stock là bắt buộc')
    .isInt({ gt: 0 })
    .custom((value) => {
      if (!Number.isInteger(value)) {
        throw new Error('Trường stock phải là số hợp lệ');
      }
      if (value <= 0) {
        throw new Error('Số lượng sản phẩm phải là số dương');
      }
      if (value > 5000) {
        throw new Error('Số lượng sản phẩm không được vượt quá 5000');
      }
      return true;
    }),

  body('expiration_date')
    .notEmpty()
    .withMessage('Trường expiration_date là bắt buộc')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Ngày hết hạn sản phẩm phải có định dạng YYYY-MM-DD')
    .isAfter()
    .withMessage('Ngày hết hạn sản phẩm phải sau ngày hiện tại')
    .isBefore('2035-12-31')
    .withMessage('Ngày hết hạn sản phẩm không được vượt quá 2035-12-31'),

  body('prescription_required')
    .notEmpty()
    .withMessage('Trường prescription_required là bắt buộc'),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() })
    }
    next()
  },
]

module.exports = {
  validateLogin,
  validateCreateUser,
  validateForgotPassword,
  validateResetPassword,
  validateProduct,
  validateProperties,
  validateRequest,
}
