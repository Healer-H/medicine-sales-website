export function pathMapping(path) {
  switch (path) {
    case "/":
      return "Dashboard";
    case "/products":
      return "Sản phẩm";
    case "/invoices":
      return "InvoiceManagement";
    case "/invoice-detail":
      return "InvoiceDetail";
    case "/employees":
      return "EmployeeManagement";
    case "/employee-detail":
      return "EmployeeDetailTabs";
    case "/prescriptions":
      return "PrescriptionManagement";
    case "/account":
      return "AccountPage";
    case "/reports":
      return "Reports";
    case "/settings":
      return "SettingsPage";
    default:
      return "Dashboard";
  }
}
