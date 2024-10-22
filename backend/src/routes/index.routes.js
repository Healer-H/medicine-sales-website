const Path = require('../constants/Paths')
const ErrorHandler = require('../middlewares/errorHandler.middleware')


const Router = (app) => {
    // Import router ở đây
    
    app.get(Path.Empty, (req, res) => {
        res.send('Welcome to the medicine center!')
    })

    // middleware error handler: cần để sau cùng các route để nhận các lỗi được next từ các controller
    app.use(ErrorHandler)
    
}

module.exports = Router