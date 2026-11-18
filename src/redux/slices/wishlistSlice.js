import { createSlice } from "@reduxjs/toolkit";

const loadWishlist = () => {
  try {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch {
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlist(),
  },
  reducers: {
    addtoWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);
      if (!exists) {
        state.items.push(product);
      }
    },
    removefromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});
export const { addtoWishlist, removefromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
