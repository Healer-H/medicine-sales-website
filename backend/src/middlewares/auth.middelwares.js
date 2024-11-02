const Messages = require('../constants/messages')
const HttpStatusCodes = require('../constants/httpStatusCodes')
const { verifyToken } = require('../utils/jwt')
const { User } = require('../models/index.models')

// authentication
const authentication = async (req, res, next) => {
  // Check token header
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      message: Messages.USERS_MESSAGES.TOKEN.NOT_PROVIDED,
    })
  }

  // Verify token và decode nó để lấy user
  try {
    const decoded = await verifyToken(token)
    req.user = decoded
    next()
  } catch (error) {
    throw new Error(`Authentication error: ${error}`)
  }
}

// authorization
const authorization = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({
        message: Messages.USERS_MESSAGES.TOKEN.UNAUTHORIZED,
      })
    }
    const user = await User.findOne({ where: { email: req.user.email } })
    const role = user.getDataValue('role')
    if (role !== 'admin') {
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({
        message: Messages.USERS_MESSAGES.TOKEN.UNAUTHORIZED,
      })
    }
    next()
  } catch (error) {
    throw new Error(`Authorization error: ${error}`)
  }
}

module.exports = {
  authentication,
  authorization,
}
