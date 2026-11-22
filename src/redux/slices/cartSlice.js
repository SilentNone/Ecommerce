import { createSlice } from "@reduxjs/toolkit";
import { getSavedUser, loadList } from "../../utils/storage";
import { login, register, logout } from "./authSlice";

const getMax = (product) =>
  typeof product.stockQuantity === "number" ? product.stockQuantity : Infinity;

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: loadList("cart", getSavedUser()?.id),
  },

  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      const product = payload.product || payload;
      const quantity = payload.quantity || 1;

      if (!product.inStock || !product.price) return;

      const max = getMax(product);
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + quantity, max);
      } else {
        state.items.push({
          ...product,
          quantity: Math.min(quantity, max),
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item && item.quantity < getMax(item)) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.items = loadList("cart", action.payload.id);
      })
      .addCase(register.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(logout, (state) => {
        state.items = [];
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;