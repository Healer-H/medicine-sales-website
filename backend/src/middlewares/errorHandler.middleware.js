const HttpStatusCodes = require('../constants/httpStatusCodes')
const Messages = require('../constants/messages')
const errorHandler = (err, req, res, next) => {
    console.error(err) // Log lỗi cho server
    const statusCode = err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR // Mặc định 500 nếu không có statusCode
    const message = err.message || Messages.SERVERS_MESSAGES.INTERNAL_SERVER_ERROR
    res.status(statusCode).json({ success: false, message })
}

module.exports = errorHandler