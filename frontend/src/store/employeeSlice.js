import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/api/userService";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getAllUsers();
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loadMoreEmployees = createAsyncThunk(
  "employees/loadMoreEmployees",
  async (page, { rejectWithValue }) => {
    try {
      const response = await userService.getAllUsers(page);
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await userService.deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteMultipleEmployees = createAsyncThunk(
  "employees/deleteMultipleEmployees",
  async (ids, { rejectWithValue }) => {
    try {
      await userService.deleteMultipleUsers(ids);
      return ids;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createUser = createAsyncThunk(
  "employees/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userService.createUser(userData);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateUser = createAsyncThunk(
  "employees/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userService.patchUser(userData.id, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  employees: [],
  loading: false,
  error: null,
  numSelected: 0,
  page: 1,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    loadMoreData: (state) => {
      state.page += 1;
    },
    toggleSelectEmployee: (state, action) => {
      const employee = state.employees.find((emp) => emp.id === action.payload);
      if (employee) {
        employee.isSelected = !employee.isSelected;
        state.numSelected = state.employees.filter(
          (emp) => emp.isSelected,
        ).length;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadMoreEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = [...state.employees, ...action.payload];
      })
      .addCase(loadMoreEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload,
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteMultipleEmployees.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => !action.payload.includes(employee.id),
        );
        state.numSelected = 0;
      })
      .addCase(deleteMultipleEmployees.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload.user);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex(
          (employee) => employee.id === action.payload.id,
        );
        if (index !== -1) {
          state.employees[index] = action.payload.userData;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loadMoreData, toggleSelectEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
