const jwt = require('jsonwebtoken')
const EnvVars = require('../constants/envVars')
const JWT_SECRET = EnvVars.Jwt.Secret
const EXPIRED_TOKEN = EnvVars.Jwt.Exp

const generateToken = (email, id) => {
  return jwt.sign({ email, id }, JWT_SECRET, { expiresIn: EXPIRED_TOKEN })
}

const verifyToken = token => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error(`Failed to verify token: ${error}`)
  }
}

module.exports = {
  generateToken,
  verifyToken,
}
