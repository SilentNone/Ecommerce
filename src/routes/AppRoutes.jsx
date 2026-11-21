import { Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import Shop from "../pages/Shop";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import ProductDetails from "../pages/ProductDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default AppRoutes;
