require('dotenv').config()
const jwt = require('jsonwebtoken')

// authentication
const tokenValid = (req, res, next) => {
    // Check token header
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token)
        return res.status(401).json({
            message:
                'Bạn chưa truyền Access Token ở header hoặc token bị hết hạn',
        })

    // Verify token  và decode nó  để lấy user
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res
                .status(401)
                .json({ message: 'Access Token bị hết hạn/hoặc không hợp lệ' })
        req.user = decoded
        // verify token thành công chuyển đến middleware tiếp theo
        next()
    })
}

// authorization
const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.role || req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Bạn không có quyền truy cập vào tài nguyên này',
        })
    }
    next()
}

module.exports = {
    tokenValid,
    isAdmin,
    
}
