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
        return res
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json({ error: response.message })
      res.cookie('access_token', response.access_token, Cookie.Options)
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
        .json({ message: Messages.USERS_MESSAGES.LOGOUT.SUCCESS })
    } catch (error) {
      next(error)
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body
      const response = await userServices.forgotPassword(email)
      if (!response.success)
        return res
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json({ message: response.message })

      res.status(HttpStatusCodes.OK).json({ message: response.message })
    } catch (error) {
      next(error)
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email, otp, newPassword } = req.body
      const response = await userServices.resetPassword(email, otp, newPassword)
      if (!response.success)
        return res
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json({ message: response.message })
      res.status(HttpStatusCodes.OK).json({ message: response.message })
    } catch (error) {
      next(error)
    }
  }

  async getAllUser(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 2
      const users = await userServices.getAllUser(page, limit)
      return res.status(HttpStatusCodes.OK).json(users)
    } catch (error) {
      next(error)
    }
  }

  async createUser(req, res, next) {
    try {
      console.log(req.body)
      const response = await userServices.createUser(req.body)
      if (!response.success)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ message: response.message })
      res
        .status(HttpStatusCodes.CREATED)
        .json({ message: response.message, user: response.user })
    } catch (error) {
      next(error)
    }
  }

  async getUserDetail(req, res, next) {
    try {
      const id = req.params.id
      const response = await userServices.getUserDetail(id)
      if (!response.success)
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: response.message })
      res.status(HttpStatusCodes.OK).json(response.user)
    } catch (error) {
      next(error)
    }
  }

  async deleteUser(req, res, next) {
    try {
      const id = req.params.id
      const response = await userServices.deleteUser(id)
      if (!response.success)
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: response.message })
      res.status(HttpStatusCodes.OK).json({ message: response.message })
    } catch (error) {
      next(error)
    }
  }

  async putUser(req, res, next) {
    try {
      const id = req.params.id
      const response = await userServices.putUser(id, req.body)
      if (!response.success)
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: response.message })
      res.status(HttpStatusCodes.OK).json({ message: response.message })
    } catch (error) {
      next(error)
    }
  }

  async patchUser(req, res, next) {
    try {
      const id = req.params.id
      const response = await userServices.patchUser(id, req.body)
      if (!response.success)
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: response.message })
      res.status(HttpStatusCodes.OK).json({ message: response.message })
    } catch (error) {
      next(error)
    }
  }

  async deleteMultipleUsers(req, res, next) {
    try {
      const { userIds } = req.body
      const response = await userServices.deleteMultipleUsers(userIds)
      if (!response.success)
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: response.message })
      res.status(HttpStatusCodes.OK).json({ message: response.message })
    } catch (error) {
      next(error)
    }
  }

  async deleteAllUsers(req, res, next) {
    try {
      const response = await userServices.deleteAllUsers()
      if (!response.success)
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: response.message })
      res.status(HttpStatusCodes.OK).json({ message: response.message })
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const userId = req.user.id
      const user = await userServices.getProfile(userId)
      res.status(HttpStatusCodes.OK).json(user)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserControllers()
