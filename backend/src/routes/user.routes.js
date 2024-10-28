const Router = require('express').Router()
const Path = require('../constants/paths')
const userControllers = require('../controllers/user.controllers')

const {
  validateForgotPassword,
  validateRequest,
  validateResetPassword,
} = require('../middlewares/validate.middlewares')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login the user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /user/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               otp:
 *                 type: string
 *                 description: Password reset token
 *               newPassword:
 *                 type: string
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password successfully reset
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized or invalid token
 */

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout the user
 *     tags: [Users]
 *
 *     responses:
 *       200:
 *         description: Password successfully reset
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized or invalid token
 */

Router.post(Path.User.Login, userControllers.login)
Router.post(Path.User.Logout, userControllers.logout)
Router.post(
  Path.User.ForgotPassword,
  validateForgotPassword,
  validateRequest,
  userControllers.forgotPassword,
)
Router.post(
  Path.User.ResetPassword,
  validateResetPassword,
  validateRequest,
  userControllers.resetPassword,
)

module.exports = Router
