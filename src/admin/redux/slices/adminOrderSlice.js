import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllOrders } from "../../services/adminOrderService";

export const getAllOrders = createAsyncThunk(
  "adminOrders/getAllOrders",
  async () => {
    return await fetchAllOrders();
  },
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load Orders";
      });
  },
});
export default adminOrderSlice.reducer;
