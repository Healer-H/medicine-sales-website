import { createSlice } from "@reduxjs/toolkit"; 


const initialState = {
    oldNotifications: [],
    newNotifications: ['test 1', 'test 2', 'test 3', 'tes 4'],
};

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        viewNotification: (state, action) => {
            // move notification from new to old
            state.oldNotifications.push(state.newNotifications);
            state.newNotifications = [];
        },
        addNotification: (state, action) => {
            state.newNotifications.push(action.payload);
        },
    },
});

export const { viewNotification, addNotification, removeNotification } = headerSlice.actions;
export default headerSlice.reducer;
