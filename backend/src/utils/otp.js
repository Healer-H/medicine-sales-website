require('dotenv').config()
const otplib = require('otplib')
const crypto = require('crypto')

const OTP_SALT = process.env.OTP_SALT

// Cấu hình TOTP để tái sử dụng
otplib.totp.options = {
    step: 120, // Thời gian tồn tại của OTP(s)
    digits: 6, // Số chữ số của OTP
    window: 1, // Cho phép chấp nhận OTP được tạo trong khoảng thời gian trước/sau 1 step (60 giây)
}

const generateSecret = (data) => {
    return crypto
        .createHash('sha256')
        .update(OTP_SALT + data)
        .digest('hex')
}

// Hàm tạo OTP
const generateOTP = (data, customStep = 60) => {
    if (customStep !== 60) {
        otplib.totp.options.step = customStep
    }
    const secret = generateSecret(data)
    const otp = otplib.totp.generate(secret)
    return otp
}

// Hàm kiểm tra OTP
const verifyOTP = async (data, otp) => {
    const secret = generateSecret(data)
    const isValid = otplib.totp.verify({ token: otp, secret })
    return isValid
}

module.exports = {
    generateOTP,
    verifyOTP,
    
}
