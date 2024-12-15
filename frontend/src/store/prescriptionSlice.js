import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prescriptions: [
    {
      id: "25005P184831-c",
      patientName: "Nguyễn Trần Hương Giang",
      insuranceNumber: "HT242421652423242020",
      archivedDate: "10/10/2000",
    },
    {
      id: "25005P18saf31-c",
      patientName: "Nguyễn Trần Hương Giang",
      insuranceNumber: "None",
      archivedDate: "10/10/2000",
    },
  ],
};

const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    loadMoreData: (state) => {
      const newData = [
        {
          id: "245-c",
          patientName: "Huỳnh Minh Hiếu",
          insuranceNumber: "HT2424216sdf423242020",
          archivedDate: "10/10/2024",
        },
      ];
      state.prescriptions = [...state.prescriptions, ...newData];
    },
    deletePrescription: (state, action) => {
      console.log("Delete prescription", action.payload);
      state.prescriptions = state.prescriptions.filter(
        (prescription) => prescription.id !== action.payload
      );
    },
  },
});


export const { loadMoreData, deletePrescription } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;