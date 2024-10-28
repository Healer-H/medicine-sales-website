const Messages = require('../constants/messages')
const HttpStatusCodes = require('../constants/httpStatusCodes')
const { verifyToken } = require('../utils/jwt')

// authentication
const authentication = async (req, res, next) => {
  // Check token header
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      message: Messages.USERS_MESSAGES.TOKEN.NOT_PROVIDED,
    })
  }

  // Verify token và decode nó  để lấy user
  try {
    const decoded = await verifyToken(token)
    req.user = decoded
    next()
  } catch (error) {
    throw new Error(`Authentication error: ${error}`)
  }
}

// authorization
const authorization = (req, res, next) => {
  if (!req.user || !req.user.role || req.user.role !== 'admin') {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      message: Messages.USERS_MESSAGES.TOKEN.UNAUTHORIZED,
    })
  }
  next()
}

module.exports = {
  authentication,
  authorization,
}
