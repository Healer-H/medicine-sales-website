const multer = require('multer')

// Cấu hình Multer chỉ lưu file trong bộ nhớ
const storage = multer.memoryStorage()

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Kiểm tra định dạng file (chỉ cho phép file Excel)
    const filetypes = /\.(xlsx|xls)$/
    if (filetypes.test(file.originalname)) {
      cb(null, true)
    } else {
      cb(new Error('Only Excel files are allowed (xlsx, xls).'), false)
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024, // Giới hạn file 2MB
  },
})

module.exports = upload
