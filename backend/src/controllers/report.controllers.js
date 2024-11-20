const HttpStatusCodes = require('../constants/httpStatusCodes')
const reportServices = require('../services/report.services')

class ReportController {
  // [GET] /reports//get-revenue-report
  async getRevenueReport(req, res, next) {
    try {
      const { type, date } = req.query
      const response = await reportServices.getRevenueReport(type, date)
      if (!response.success)
        return res.status(HttpStatusCodes.NOT_FOUND).json(response.message)
      return res.status(HttpStatusCodes.OK).json(response.prepareReportData)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ReportController()
