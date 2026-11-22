import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../assets/glide-logo.svg";
import { categories } from "../constants/categories";

const linkClass = "text-sm text-gray-400 transition-colors hover:text-white";

function Footer() {
  const user = useSelector((state) => state.auth.user);

  return (
    <footer className="border-t border-white/10 bg-[#09090B] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-block">
              <img src={Logo} alt="GLIDE" className="h-9 w-auto" />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-gray-400">
              Keyboards, mice and desk accessories for people who care how their
              setup feels.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-300">
              Shop
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link to="/shop" className={linkClass}>
                  All Products
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link to={`/shop/${category.slug}`} className={linkClass}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-300">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link to="/" className={linkClass}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={linkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about" className={linkClass}>
                  Why Choose Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-300">
              Account
            </h3>

            <ul className="mt-5 space-y-3">
              {user ? (
                <>
                  <li>
                    <Link to="/profile" className={linkClass}>
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className={linkClass}>
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist" className={linkClass}>
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className={linkClass}>
                      Cart
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className={linkClass}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className={linkClass}>
                      Create Account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} GLIDE. All rights reserved.</p>
          <p>Free shipping on every order</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
