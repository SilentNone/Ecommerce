import UserLayout from "../layouts/UserLayout";
import Shop from "../pages/Shop";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import { Route, Routes } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/shop/:category" element={<Shop />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
