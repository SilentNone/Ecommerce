import { loginAdmin } from "../../services/adminService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const loadAdmin = () => {
  try {
    return JSON.parse(localStorage.getItem("adminUser")) || null;
  } catch {
    return null;
  }
};

export const adminLogin = createAsyncThunk(
  "admin/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await loginAdmin(email, password);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const adminSlice = createSlice({
  name: "admin",

  initialState: {
    admin: loadAdmin(),
    loading: false,
    error: null,
  },
  reducers: {
    adminLogout: (state) => {
      state.admin = null;
      state.error = null;
      localStorage.removeItem("adminUser");
    },
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;

        localStorage.setItem("adminUser", JSON.stringify(action.payload));
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { adminLogout, clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
