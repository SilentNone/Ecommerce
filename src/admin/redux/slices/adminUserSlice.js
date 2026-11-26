import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, updateUser } from "../../services/userService";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  return await fetchUsers();
});

export const blockUser = createAsyncThunk(
  "users/blockUser",
  async ({id, changes}) => {
    return await updateUser(id, changes);
  },
);
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load Users";
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const uid = state.users.findIndex((u) => u.id === action.payload.id);

        if (uid !== -1) {
          state.users[uid] = action.payload;
        }
      });
  },
});
export default userSlice.reducer;
