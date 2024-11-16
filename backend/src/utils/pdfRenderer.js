const Handlebars = require('handlebars')
const pdf = require('html-pdf')
const fs = require('fs')
const path = require('path')
const helpers = require('./templates/config.template')

// Đăng ký các helpers
helpers.formatDate()
helpers.formatCurrency()
helpers.ifEquals()
helpers.ifNotEquals()

/**
 * Render PDF từ template HTML.
 * @param {String} templateName - Tên template (invoice, employeeInfo, report).
 * @param {Object} data - Dữ liệu để điền vào template.
 * @returns {Promise<Buffer>} - Trả về file PDF dưới dạng buffer.
 */
const renderPDF = (templateName, data) => {
  return new Promise((resolve, reject) => {
    const templatePath = path.join(
      __dirname,
      'templates',
      `${templateName}.template.html`,
    )
    const templateSource = fs.readFileSync(templatePath, 'utf8')

    const template = Handlebars.compile(templateSource)
    const html = template(data)

    const options = {
      width: '74mm',
      height: '160mm',
      border: {
        top: '0mm', // Không có khoảng cách
        right: '0mm', // Không có khoảng cách
        bottom: '0mm', // Không có khoảng cách
        left: '0mm', // Không có khoảng cách
      },
    }
    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) return reject(err)
      resolve(buffer)
    })
  })
}

module.exports = renderPDF
