import { createSlice } from "@reduxjs/toolkit";
import { login, register, logout } from "./authSlice";
import { getSavedUser, loadList } from "../../utils/storage";

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    items: loadList("wishlist", getSavedUser()?.id),
  },

  reducers: {
    addtoWishlist: (state, action) => {
      const product = action.payload;

      if (!product || product.id == null) return;

      const exists = state.items.some((item) => item.id === product.id);

      if (!exists) {
        state.items.push(product);
      }
    },

    removefromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.items = loadList("wishlist", action.payload.id);
      })
      .addCase(register.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(logout, (state) => {
        state.items = [];
      });
  },
});

export const { addtoWishlist, removefromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
