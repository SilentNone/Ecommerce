import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrCreateCart, saveCartItems } from "../../services/cartService";
import { login, register, logout } from "./authSlice";

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (userId, { rejectWithValue }) => {
    try {
      return await getOrCreateCart(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const saveCart = createAsyncThunk(
  "cart/saveCart",
  async ({ cartId, items }, { rejectWithValue }) => {
    try {
      return await saveCartItems(cartId, items);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const getMax = (product) =>
  typeof product.stockQuantity === "number" ? product.stockQuantity : Infinity;

const sameId = (a, b) => String(a) === String(b);

const initialState = {
  items: [],
  cartId: null,
  loaded: false,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      const product = payload.product || payload;
      const quantity = payload.quantity || 1;

      if (!product.inStock || !product.price) return;

      const max = getMax(product);
      const existingItem = state.items.find((item) =>
        sameId(item.productId, product.id),
      );

      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + quantity, max);
      } else {
        state.items.push({
          productId: String(product.id),
          quantity: Math.min(quantity, max),
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => !sameId(item.productId, action.payload),
      );
    },

    increaseQuantity: (state, action) => {
      const { productId, max = Infinity } = action.payload;
      const item = state.items.find((item) =>
        sameId(item.productId, productId),
      );

      if (item && item.quantity < max) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) =>
        sameId(item.productId, action.payload),
      );

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
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.cartId = action.payload.id;
        state.items = action.payload.items || [];
      })
      .addCase(getCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(login.fulfilled, (state) => {
        state.items = [];
        state.cartId = null;
        state.loaded = false;
      })
      .addCase(register.fulfilled, () => initialState)
      .addCase(logout, () => initialState);
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


