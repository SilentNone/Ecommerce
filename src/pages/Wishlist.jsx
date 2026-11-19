import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";
import { removefromWishlist } from "../redux/slices/wishlistSlice";
import { Heart, ArrowLeft, Trash2, ShoppingBag } from "lucide-react";

function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);

  const moveToCart = (product) => {
    if (product.stock > 0) {
      dispatch(addToCart(product));
      dispatch(removefromWishlist(product.id));
    }
  };

  return (
    <div className="animate-fade-up mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-28 text-white">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-violet-400">
            Saved for later
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">My Wishlist</h1>
          <p className="mt-3 text-gray-400">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        <Link
          to="/shop"
          className="group flex items-center gap-2 text-gray-400 transition hover:text-violet-400"
        >
          <ArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Continue Shopping
        </Link>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="mt-12 flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-zinc-900/30 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <Heart size={40} className="text-fuchsia-500" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            Your wishlist is empty
          </h2>

          <p className="mt-3 text-gray-400">
            Save products you love and find them here.
          </p>

          <Link
            to="/shop"
            className="mt-7 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3 font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/40"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {wishlistItems.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 80}ms` }}
              className="animate-fade-up group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 transition-all duration-500 hover:-translate-y-2 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/20"
            >
              <div className="relative aspect-square overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>

                {product.stock === 0 && (
                  <span className="absolute left-3 top-3 rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold">
                    Sold out
                  </span>
                )}
              </div>

              <div className="p-4">
                <p className="text-xs uppercase tracking-wider text-violet-400">
                  {product.brand}
                </p>

                <Link to={`/product/${product.id}`}>
                  <h3 className="mt-2 truncate font-semibold transition-colors hover:text-violet-300">
                    {product.name}
                  </h3>
                </Link>

                <p className="mt-2 text-lg font-bold">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>

                <button
                  onClick={() => moveToCart(product)}
                  disabled={product.stock === 0}
                  className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white font-medium text-black transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ShoppingBag size={16} />
                  {product.stock === 0 ? "Out of Stock" : "Move to Cart"}
                </button>

                <button
                  onClick={() => dispatch(removefromWishlist(product.id))}
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/20 transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
