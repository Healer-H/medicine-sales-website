// middleware/validators.js
const { body, query, validationResult } = require('express-validator')
const HttpStatusCodes = require('../constants/httpStatusCodes')
const Messages = require('../constants/messages')

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

const validateProperties = allowedProperties => {
  return (req, res, next) => {
    const invalidProperties = Object.keys(req.body).filter(
      key => !allowedProperties.includes(key),
    )

    if (invalidProperties.length > 0) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: `Các thuộc tính không hợp lệ: ${invalidProperties.join(', ')}`,
      })
    }

    next()
  }
}

// SPECIFIC VALIDATORS
const validateLogin = [...validateEmail]

const validateCreateUser = [...validateEmail]

const validateForgotPassword = [...validateEmail]

const validateResetPassword = [
  ...validateEmail,
  ...validatePassword('newPassword'),
  ...validateOTP,
]

// PRODUCT VALIDATION RULES
const productValidationRules = {
  name: {
    validate: value => {
      if (!value) throw new Error('Trường name là bắt buộc')
      if (!/^[\p{L}0-9 ]+$/u.test(value))
        throw new Error('Tên sản phẩm không chứa ký tự đặc biệt')
      if (value.length > 255)
        throw new Error('Tên sản phẩm không được vượt quá 255 ký tự')
      if (value.trim() !== value)
        throw new Error(
          'Tên sản phẩm không được chứa khoảng trắng ở đầu hoặc cuối',
        )
      return true
    },
  },
  price: {
    validate: value => {
      if (value === undefined || value === null)
        throw new Error('Trường price là bắt buộc')
      if (!Number.isFinite(value))
        throw new Error('Trường price phải là số hợp lệ')
      if (value <= 0) throw new Error('Giá sản phẩm phải là số dương')
      return true
    },
  },
  stock: {
    validate: value => {
      if (value === undefined || value === null)
        throw new Error('Trường stock là bắt buộc')
      if (!Number.isInteger(value))
        throw new Error('Trường stock phải là số hợp lệ')
      if (value <= 0) throw new Error('Số lượng sản phẩm phải là số dương')
      if (value > 5000)
        throw new Error('Số lượng sản phẩm không được vượt quá 5000')
      return true
    },
  },
  expiration_date: {
    validate: value => {
      const now = new Date()
      const date = new Date(value)
      if (!value) throw new Error('Trường expiration_date là bắt buộc')
      if (isNaN(date))
        throw new Error('Ngày hết hạn sản phẩm phải là ngày hợp lệ')
      if (date <= now)
        throw new Error('Ngày hết hạn sản phẩm phải sau ngày hiện tại')
      if (date > new Date('2035-12-31'))
        throw new Error('Ngày hết hạn sản phẩm không được vượt quá 2035-12-31')
      return true
    },
  },
  prescription_required: {
    validate: value => {
      if (value === undefined || value === null)
        throw new Error('Trường prescription_required là bắt buộc')
      return true
    },
  },
}

// GENERAL VALIDATOR FUNCTION
const validateProductData = data => {
  const errors = []
  Object.keys(productValidationRules).forEach(key => {
    try {
      productValidationRules[key].validate(data[key])
    } catch (error) {
      errors.push({ field: key, message: error.message })
    }
  })
  return errors
}

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

// MIDDLEWARE VALIDATOR FUNCTION
const validateProduct = [
  body('name').custom(value => productValidationRules.name.validate(value)),
  body('price').custom(value => productValidationRules.price.validate(value)),
  body('stock').custom(value => productValidationRules.stock.validate(value)),
  body('expiration_date').custom(value =>
    productValidationRules.expiration_date.validate(value),
  ),
  body('prescription_required').custom(value =>
    productValidationRules.prescription_required.validate(value),
  ),
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

const validateTopSellingDates = [
  query('startDate')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage(Messages.PRODUCTS_MESSAGES.TOP_SELLING.INVALID_DATE_FORMAT),
  query('endDate')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage(Messages.PRODUCTS_MESSAGES.TOP_SELLING.INVALID_DATE_FORMAT),
  // Ngày bắt đầu không được sau ngày kết thúc
  query('endDate').custom((endDate, { req }) => {
    const startDate = req.query.startDate
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      throw new Error(Messages.PRODUCTS_MESSAGES.TOP_SELLING.INVALID_DATE_RANGE)
    }
    return true
  }),
  // Truy vấn không được quá 1 năm
  query('endDate').custom((endDate, { req }) => {
    const startDate = req.query.startDate
    if (startDate && endDate) {
      const oneYearLater = new Date(startDate)
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1)
      if (new Date(endDate) > oneYearLater) {
        throw new Error(
          Messages.PRODUCTS_MESSAGES.TOP_SELLING.DATE_RANGE_TOO_LARGE,
        )
      }
    }
    return true
  }),
  // Ngày kết thúc không được lớn hơn ngày hiện tại
  query('endDate').custom(endDate => {
    if (endDate && new Date(endDate) > new Date()) {
      throw new Error(
        Messages.PRODUCTS_MESSAGES.TOP_SELLING.END_DATE_EXCEEDS_CURRENT,
      )
    }
    return true
  }),
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
  validateProductData,
  validateTopSellingDates,
}
