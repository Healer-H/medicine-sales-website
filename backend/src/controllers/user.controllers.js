const userServices = require('../services/user.services')
const EnvVars = require('../constants/envVars')
const HttpStatusCodes = require('../constants/httpStatusCodes')
const Messages = require('../constants/messages')
const Cookie = EnvVars.CookieProps

class UserControllers {
  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const response = await userServices.login(email, password)

      if (!response.success)
        return res.status(HttpStatusCodes.UNAUTHORIZED).json(response.message)

      res.cookie('access_token', response.acces_token, Cookie.Options)
      res.status(HttpStatusCodes.OK).json({
        message: response.message,
        access_token: response.access_token,
        user: response.user,
      })
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie('access_token', Cookie.Options)
      res
        .status(HttpStatusCodes.OK)
        .json(Messages.USERS_MESSAGES.LOGOUT.SUCCESS)
    } catch (error) {
      next(error)
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body
      const response = await userServices.forgotPassword(email)
      if (!response.success)
        return res.status(HttpStatusCodes.UNAUTHORIZED).json(response.message)

      res.status(HttpStatusCodes.OK).json({ message: response.message })
    } catch (error) {
      next(error)
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email, otp, newPassword } = req.body
      const response = await userServices.resetPassword(email, otp, newPassword)
      if (response.success)
        return res.status(HttpStatusCodes.UNAUTHORIZED).json(response.message)
      res.status(HttpStatusCodes.OK).json({ message: response.message })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserControllers()
