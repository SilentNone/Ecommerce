import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOrdersByUser, placeOrder } from "../../services/orderService";

export const createOrder = createAsyncThunk("orders/createOrder", placeOrder);
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  fetchOrdersByUser,
);

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  },
});
export default orderSlice.reducer;
