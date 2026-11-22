import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import Logo from "../assets/glide-logo.svg";
import toast from "react-hot-toast";

import {
  Search,
  Heart,
  ShoppingCart,
  UserRound,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
];

function Navbar() {
  const [mobile, setMobile] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [query, setQuery] = useState("");

  const items = useSelector((state) => state.cart.items);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlistCount = wishlistItems.length;

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out");
  };

  const handleSearch = (e) => {
    if (e.key !== "Enter" || !query.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-3">
      <nav
        className={`w-full border border-white/10 backdrop-blur-md will-change-transform transition-[max-width,padding,border-radius,background-color,box-shadow] duration-500 ease-out ${
          scroll
            ? "max-w-5xl rounded-full bg-black/60 py-2 shadow-lg shadow-violet-500/20"
            : "max-w-7xl rounded-2xl bg-white/5 py-4 shadow-2xl shadow-black/40"
        }`}
      >
        <div className="flex items-center justify-between px-6">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="GLIDE" className="h-9 w-auto" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium transition-colors duration-500
                   after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full
                   after:origin-left after:bg-gradient-to-r after:from-violet-400 after:to-fuchsia-400
                   after:transition-transform after:duration-500 after:ease-out hover:text-white hover:after:scale-x-100
                   ${isActive ? "text-white after:scale-x-100" : "text-gray-400 after:scale-x-0"}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <div className="relative hidden md:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search..."
                className="w-40 rounded-full border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-violet-500"
              />
            </div>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative rounded-xl p-3 text-gray-400 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-fuchsia-500 px-1 text-xs font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative rounded-xl p-3 text-gray-400 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-500 px-1 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="ml-2 hidden items-center gap-2 text-sm text-gray-300 hover:text-white md:flex"
                >
                  <UserRound size={18} />
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  aria-label="Logout"
                  className="ml-1 hidden rounded-xl p-3 text-gray-400 transition-colors duration-300 hover:bg-white/10 hover:text-white md:block"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  aria-label="Login"
                  className="hidden rounded-xl p-3 text-gray-400 transition-colors duration-300 hover:bg-white/10 hover:text-white md:block"
                >
                  <UserRound size={20} />
                </Link>
                <Link
                  to="/register"
                  className="ml-3 hidden rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/40 md:block"
                >
                  Sign Up
                </Link>
              </>
            )}

            <button
              onClick={() => setMobile(!mobile)}
              aria-label="Toggle menu"
              className="rounded-xl p-3 text-gray-400 hover:bg-white/10 hover:text-white md:hidden"
            >
              {mobile ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobile && (
          <div className="space-y-1 border-t border-white/10 px-6 pb-4 pt-3 md:hidden">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setMobile(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-3 transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setMobile(false)}
                  className="block rounded-lg px-3 py-3 text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  Profile
                </NavLink>
                <button
                  onClick={() => {
                    setMobile(false);
                    handleLogout();
                  }}
                  className="block w-full rounded-lg px-3 py-3 text-left text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  Logout ({user.name})
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMobile(false)}
                  className="block rounded-lg px-3 py-3 text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMobile(false)}
                  className="block rounded-lg px-3 py-3 text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
