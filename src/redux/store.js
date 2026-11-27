import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";
import adminReducer from "../admin/redux/slices/adminSlice";
import userReducer from "../admin/redux/slices/adminUserSlice";
import adminOrderReducer from "../admin/redux/slices/adminOrderSlice";
import { saveList } from "../utils/storage";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    orders: orderReducer,
    admin: adminReducer,
    users: userReducer,
    adminOrders: adminOrderReducer,
  },
});

store.subscribe(() => {
  const { auth, cart, wishlist } = store.getState();
  const userId = auth.user?.id;
  saveList("cart", userId, cart.items);
  saveList("wishlist", userId, wishlist.items);
});

export default store;
