import { createSlice } from "@reduxjs/toolkit";

type orderType = {
  priority: string | null;
};
const initialState: orderType = {
  priority: localStorage.getItem("priorityStatus"),
};
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    priorityOrder(state, action) {
      state.priority = action.payload;
      console.log(action.payload);
      localStorage.setItem("priorityStatus", action.payload);
    },
  },
});
export const { priorityOrder } = orderSlice.actions;
export default orderSlice.reducer;
