import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [
    {
      id: 1,
      name: "Nguyễn Trần Hương Giang",
      email: "uongtradaokhong@gmail.com",
      position: "Quản trị viên",
      status: "Đang hoạt động",
    },
    {
      id: 2,
      name: "Nguyễn Văn A",
      email: "vana@gmail.com",
      position: "Nhân viên",
      status: "Khóa tạm thời",
    },
  ],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    loadMoreData: (state) => {
      const newData = [
        {
          id: 3,
          name: "Huỳnh Minh Hiếu",
          email: "uit.huynhminhieu@gmail.com",
          position: "Nhân viên",
          status: "Đang hoạt động",
        },
      ];
      state.employees = [...state.employees, ...newData];
    },
    deleteEmployee: (state, action) => {
      console.log("Delete employee", action.payload);
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
  },
});

export const { loadMoreData, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
