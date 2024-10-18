require('dotenv').config()
const { User, Token } = require('../models/indexModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/sendMail')
const OTP = require('../utils/otp')
const JWT_SECRET = process.env.JWT_SECRET
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const MAX_ATTEMPTS = process.env.MAX_ATTEMPTS
const otpAttempsCache = new Map()

// Tạo JWT token
const createToken = (email, password) => {
    return jwt.sign({ email, password }, JWT_SECRET, { expiresIn: '1h' })
}

// Login Service
const login = async (email, password) => {
    try {
        //Find user
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return {
                success: false,
                message: 'Người dùng không tồn tại',
            }
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Email/Password không hợp lệ',
            }
        }
        const token = createToken(email, password)
        return {
            success: true,
            message: 'Đăng nhập thành công',
            acces_token: `Bearer ${token}`,
            user: {
                email: user.email,
                role: user.role,
            },
        }
    } catch (error) {
        console.log(`Error in login service: ${error}`)
        return null
    }
}

// Forgot Password Service
const forgotPassword = async (email) => {
    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return {
                success: false,
                message: 'Email không tồn tại!',
            }
        }

        // Generate OTP
        const secret = email
        const otp = OTP.generateOTP(secret, 60) //tạo otp với thời gian sống 1 phút
        // Send OTP to mail
        await sendMail({
            to: user.email,
            subject: 'RESET PASSWORD',
            title: 'Reset password',
            message: 'Đây là mail reset mật khẩu',
            otp,
        })

        return {
            success: true,
            message: `Mã OTP đã được gửi đến email ${user.email}`,
        }
    } catch (error) {
        console.log(`Error in forgot password service: ${error}`)
        return null
    }
}

// Resets password service
const resetPassword = async (email, otp, newPassword) => {
    try {
        // Kiểm tra OTP
        const validOTP = await OTP.verifyOTP(email, otp)

        if (!validOTP) {
            // Lấy số lần nhập sai hiện tại từ cache
            const attempts = otpAttempsCache.get(email) || 0

            // Kiểm tra số lần nhập sai hiện tại
            if (attempts >= MAX_ATTEMPTS) {
                otpAttempsCache.set(email, 0) // Reset số lần nhập sai
                // Reset OTP và gửi lại qua mail
                const secret = email
                const otp = OTP.generateOTP(secret, 60) //tạo otp với thời gian sống 1 phút
                // Send OTP to mail
                await sendMail({
                    to: email,
                    subject: 'RESET PASSWORD',
                    title: 'Reset password',
                    message: 'Đây là mail reset mật khẩu',
                    otp,
                })
                return {
                    success: false,
                    message:
                        'Bạn đã nhập sai quá nhiều lần. OTP mới đã được gửi.',
                }
            }

            otpAttempsCache.set(email, attempts + 1) // Tăng số lần nhập sai
            const attemptsLeft = MAX_ATTEMPTS - otpAttempsCache.get(email)
            return {
                success: false,
                message: `OTP không đúng. Bạn còn ${attemptsLeft} lần thử.`,
            }
        }

        // // Cập nhật password
        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS)
        await User.update({ password: hashedPassword }, { where: { email } })

        return {
            success: true,
            message: 'Mật khẩu đã được cập nhật thành công.',
        }
    } catch (error) {
        console.log(`Error in reset password service: ${error}`)
        return null
    }
}

module.exports = {
    login,
    forgotPassword,
    resetPassword,
}
