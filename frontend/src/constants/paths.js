const Paths = {
  LOGIN: "/login",
  DASHBOARD: "/",
  PRODUCTS: "/product",
  INVOICES: "/invoice",
  INVOICE_DETAIL: "/invoice/:id",
  EMPLOYEES: "/employee",
  EMPLOYEE_DETAIL: "/employee/:id",
  REPORTS: "/report",
  PRESCRIPTIONS: "/prescription",
  ACCOUNT: "/account",
  SETTINGS: "/setting",
};

const PathTranslations = {
  "login": "Đăng nhập",
  "": "Dashboard",
  "product": "Sản phẩm",
  "invoice": "Hóa đơn",
  "invoice/:id": "Chi tiết hóa đơn",
  "employee": "Nhân viên",
  "employee/:id": "Chi tiết nhân viên",
  "report": "Báo cáo",
  "prescription": "Đơn thuốc",
  "account": "Tài khoản",
  "setting": "Cài đặt",
};

function getVietnamesePath(path) {
  return PathTranslations[path] || path;
}


export { Paths, getVietnamesePath };
