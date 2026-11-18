import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Search,
  Heart,
  ShoppingCart,
  UserRound,
  MoreHorizontal,
} from "lucide-react";

function Navbar() {
  const [mobile, setMobile] = useState(false);

  const items = useSelector((state) => state.cart.items);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlistCount = wishlistItems.length;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="border-b border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl shadow-black/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link
            to="/"
            aria-label="GLIDE - Go to homepage"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl border border-violet-400/30 bg-violet-400/10 flex items-center justify-center transition-all duration-300 group-hover:bg-violet-400/20">
              <span className="text-xl font-bold text-violet-400"></span>
            </div>

            <span className="text-xl font-bold tracking-[0.18em] text-white group-hover:text-violet-300 transition-colors">
              GLIDE
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <Search size={20} />
            </button>

            <Link
              to="/wishlist"
              aria-label="wishlist"
              className="relative p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-violet-500 text-white text-xs font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              aria-label="Shopping Cart"
              className="relative p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <ShoppingCart size={20} />

              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-violet-500 text-white text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              aria-label="Account"
              className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <UserRound size={20} />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-violet-400 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>

          <button
            onClick={() => setMobile(!mobile)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <MoreHorizontal size={22} />
          </button>
        </div>

        {mobile && (
          <div className="md:hidden border-t border-white/10 px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobile(false)}
                className="block py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-white/10 pt-4 flex gap-3">
              <Link
                to="/login"
                onClick={() => setMobile(false)}
                className="flex-1 text-center rounded-full border border-white/20 py-2.5 text-sm text-white transition-colors hover:border-violet-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMobile(false)}
                className="flex-1 text-center rounded-full bg-white py-2.5 text-sm font-semibold text-black transition-colors hover:bg-violet-400"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
