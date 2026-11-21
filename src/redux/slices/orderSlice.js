import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchOrdersByUser,
  placeOrder,
  cancelOrderById,
  deleteOrderById,
} from "../../services/orderService";

export const createOrder = createAsyncThunk("orders/createOrder", placeOrder);
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  fetchOrdersByUser,
);
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  cancelOrderById,
);
export const removeOrder = createAsyncThunk(
  "orders/removeOrder",
  deleteOrderById,
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
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((o) => o.id !== action.payload);
      });
  },
});
export default orderSlice.reducer;
