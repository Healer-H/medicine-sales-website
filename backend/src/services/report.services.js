const Messages = require('../constants/messages')
const {
  getStartAndEndDates,
  getPreviousStartAndEndDates,
} = require('../utils/date')
const reportQuery = require('../utils/querys/report.query')

class ReportService {
  async getRevenueReport(type, date) {
    try {
      // xử lý và lấy ngày bắt đầu và kết thúc muốn xem
      const { start, end, timeFormat } = getStartAndEndDates(type, date)

      // Truy vấn tổng quan doanh thu, đơn hàng và sản phẩm
      const revenueData = await reportQuery.getRevenueData(start, end)

      // Kiểm tra xem có doanh thu nào hay không
      if (revenueData[0].totalOrders === 0) {
        return {
          success: false,
          message: Messages.REPORTS_MESSAGES.REPORTS_REVENUE.NOT_REVENUE,
        }
      }

      // Truy vấn dữ liệu về phương thức thanh toán và sản phẩm bán chạy nhất
      const paymentMethodData = await reportQuery.getPaymentMethodData(
        start,
        end,
      )
      const topSellingProducts = await reportQuery.getTopSellingProducts(
        start,
        end,
      )

      // Truy vấn dữ liệu chi tiết về khoảng thời gian
      // + nếu daily -> khung giờ
      // + nếu weekly -> ngày
      // + nếu monthly -> tuần
      // + nếu yearly -> tháng
      // + nếu quarterly -> tháng
      const detailedTimeBreakdown = await reportQuery.getDetailedTimeBreakdown(
        start,
        end,
        timeFormat,
      )

      // Truy vấn kỳ trước để so sánh
      const { previousStart, previousEnd } = getPreviousStartAndEndDates(
        type,
        start,
        end,
      )
      const previousRevenueData = await reportQuery.getRevenueData(
        previousStart,
        previousEnd,
      )

      // Xử lý dữ liệu từ database
      const prepareReportData = {
        reportType: type,
        reportDate: date,
        totalRevenue: revenueData[0].totalRevenue,
        totalOrders: revenueData[0].totalOrders,
        totalProductsSold: revenueData[0].totalProductsSold,
        averageRevenuePerOrder: (
          revenueData[0].totalRevenue / revenueData[0].totalOrders
        ).toFixed(2),
        paymentAnalysis: paymentMethodData.map(item => ({
          method: item.paymentMethod,
          orderCount: item.ordersByPaymentMethod,
          total: item.revenueByPaymentMethod,
          percentage: (
            (item.revenueByPaymentMethod / revenueData[0].totalRevenue) *
            100
          ).toFixed(2),
        })),
        details: detailedTimeBreakdown.map(item => ({
          date: item.date,
          revenue: item.revenue,
          orders: item.orders,
        })),
        topSellingProducts: topSellingProducts.map(product => ({
          productName: product.productName,
          revenue: product.productRevenue,
          quantitySold: product.quantitySold,
        })),
        previousRevenueData: {
          previousTotalRevenue: previousRevenueData[0].totalRevenue,
          previousTotalOrders: previousRevenueData[0].totalOrders,
          previousTotalProductsSold: previousRevenueData[0].totalProductsSold,
        },
        revenueGrowRate: (
          ((revenueData[0].totalRevenue - previousRevenueData[0].totalRevenue) /
            previousRevenueData[0].totalRevenue) *
          100
        ).toFixed(2),
        orderGrowRate: (
          ((revenueData[0].totalOrders - previousRevenueData[0].totalOrders) /
            previousRevenueData[0].totalOrders) *
          100
        ).toFixed(2),
        productGrowRate: (
          ((revenueData[0].totalProductsSold -
            previousRevenueData[0].totalProductsSold) /
            previousRevenueData[0].totalProductsSold) *
          100
        ).toFixed(2),
      }

      return {
        success: true,
        prepareReportData,
      }
    } catch (error) {
      throw new Error(`Get revenue report service error: ${error}`)
    }
  }
}

module.exports = new ReportService()
