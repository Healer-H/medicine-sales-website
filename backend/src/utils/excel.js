const ExcelJS = require('exceljs')

/**
 * Đọc dữ liệu từ file Excel với cấu hình cột động
 * @param {Buffer} buffer - Buffer của file Excel
 * @param {Array<string>} columnMapping - Tên cột tương ứng với dữ liệu cần lấy
 * @returns {Promise<Array<Object>>} - Mảng chứa dữ liệu đã đọc
 */
const readExcelFile = async (buffer, columnMapping) => {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(buffer)

  const worksheet = workbook.worksheets[0]
  const rows = []

  worksheet.eachRow((row, rowIndex) => {
    if (rowIndex === 1) return // Bỏ qua tiêu đề
    const rowData = {}

    columnMapping.forEach((key, colIndex) => {
      rowData[key] = row.getCell(colIndex + 1).value
    })

    rows.push(rowData)
  })

  return rows
}

/**
 * Ghi dữ liệu ra file Excel
 * @param {Array<Object>} data - Dữ liệu cần ghi
 * @param {Array<Object>} columns - Định nghĩa cột [{ header, key, width }]
 * @returns {Promise<ExcelJS.Workbook>} - Workbook ExcelJS
 */
const createExcelFile = (data, columns) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Data')

  // Thêm tiêu đề
  worksheet.addRow(columns.map(col => col.header))

  // Thêm dữ liệu
  data.forEach(row => {
    worksheet.addRow(columns.map(col => row[col.key]))
  })

  // Xuất file thành buffer
  return workbook.xlsx.writeBuffer()
}

module.exports = { readExcelFile, createExcelFile }
