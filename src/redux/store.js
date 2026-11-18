import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

store.subscribe(() => {
  const cartItems = store.getState().cart.items;

  localStorage.setItem("cart", JSON.stringify(cartItems));

  const wishlistItems = store.getState().wishlist.items;
  localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
});

export default store;
