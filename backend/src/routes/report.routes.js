const Router = require('express').Router()
const Path = require('../constants/paths')
const reportControllers = require('../controllers/report.controllers')
const {
  authentication,
  authorization,
} = require('../middlewares/auth.middelwares')

/**
 * @swagger
 * /reports/get-revenue-report:
 *   get:
 *     summary: Lấy doanh thu theo ngày
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           example: daily || weekly || monthly || quarterly || yearly
 *         required: true
 *         description: Loại báo cáo doanh thu
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           example: 2021-09-01
 *         required: true
 *         description: Ngày cần xem doanh thu
 *     responses:
 *       200:
 *         description: Dữ liệu của báo cáo doanh thu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reportType:
 *                   type: string
 *                   example: daily // Loại báo cáo (daily, weekly, monthly, quarterly, yearly)
 *                 reportDate:
 *                   type: string
 *                   example: 2021-09-01 // Ngày bắt đầu muốn xem báo cáo
 *                 totalRevenue:
 *                   type: number
 *                   format: float
 *                   example: 1000000 // Tổng doanh thu
 *                 totalOrders:
 *                   type: integer
 *                   example: 100 // Tổng số đơn hàng
 *                 totalProductsSold:
 *                   type: integer
 *                   example: 200 // Tổng số sản phẩm đã bán
 *                 averageRevenuePerOrder:
 *                   type: number
 *                   format: float
 *                   example: 10000.00 // Doanh thu trung bình mỗi đơn hàng
 *                 paymentAnalysis:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       method:
 *                         type: string
 *                         example: Credit Card // Phương thức thanh toán
 *                       orderCount:
 *                         type: integer
 *                         example: 50 // Số lượng đơn hàng
 *                       total:
 *                         type: number
 *                         format: float
 *                         example: 500000 // Tổng doanh thu từ phương thức thanh toán này
 *                       percentage:
 *                         type: number
 *                         format: float
 *                         example: 50.00 // Tỷ lệ phần trăm doanh thu từ phương thức thanh toán này
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         example: 2021-09-01 // Ngày chi tiết
 *                       revenue:
 *                         type: number
 *                         format: float
 *                         example: 100000 // Doanh thu trong ngày
 *                       orders:
 *                         type: integer
 *                         example: 10 // Số lượng đơn hàng trong ngày
 *                 topSellingProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productName:
 *                         type: string
 *                         example: Product A // Tên sản phẩm bán chạy
 *                       revenue:
 *                         type: number
 *                         format: float
 *                         example: 50000 // Doanh thu từ sản phẩm này
 *                       quantitySold:
 *                         type: integer
 *                         example: 5 // Số lượng sản phẩm đã bán
 *                 previousRevenueData:
 *                   type: object
 *                   properties:
 *                     previousTotalRevenue:
 *                       type: number
 *                       format: float
 *                       example: 900000 // Tổng doanh thu trước đó
 *                     previousTotalOrders:
 *                       type: integer
 *                       example: 90 // Tổng số đơn hàng trước đó
 *                     previousTotalProductsSold:
 *                       type: integer
 *                       example: 180 // Tổng số sản phẩm đã bán trước đó
 *                 revenueGrowth:
 *                   type: number
 *                   format: float
 *                   example: 11.11 // Tăng trưởng doanh thu
 *                 orderGrowth:
 *                   type: number
 *                   format: float
 *                   example: 11.11 // Tăng trưởng số lượng đơn hàng
 *                 productGrowth:
 *                   type: number
 *                   format: float
 *                   example: 11.11 // Tăng trưởng số lượng sản phẩm đã bán
 *       401:
 *         description: Người dùng chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token chưa được cung cấp // Thông báo lỗi khi người dùng chưa đăng nhập
 *       403:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bạn không có quyền truy cập. // Thông báo lỗi khi người dùng không có quyền truy cập
 *       404:
 *         description: Không tìm thấy báo cáo doanh thu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Không có doanh thu ở khoảng thời gian này. // Thông báo lỗi khi không tìm thấy báo cáo doanh thu
 */

Router.use(authentication, authorization)
Router.get(Path.Report.GetRevenueReport, reportControllers.getRevenueReport)

module.exports = Router
