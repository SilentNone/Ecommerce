import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";
import { removefromWishlist } from "../redux/slices/wishlistSlice";
import { Trash2, ShoppingBag } from "lucide-react";

function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <div className="min-h-screen pt-28 px-6 text-white max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold">My Wishlist</h1>

      <p className="text-gray-400 mt-2">Your saved products.</p>

      {wishlistItems.length === 0 ? (
        <div className="mt-20 text-center">
          <ShoppingBag size={55} className="mx-auto text-gray-500" />

          <h2 className="text-2xl font-semibold mt-5">
            Your wishlist is empty
          </h2>

          <p className="text-gray-400 mt-2">
            Save products you love and find them here.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-6 bg-white text-black px-7 py-3 rounded-full hover:bg-violet-400 transition"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-white/10 bg-zinc-900/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl"
              />

              <p className="text-xs text-violet-400 mt-4 uppercase tracking-wider">
                {product.brand}
              </p>

              <h3 className="font-semibold mt-2">{product.name}</h3>

              <p className="text-gray-400 mt-2">₹{product.price}</p>

              <button
                onClick={() => dispatch(removefromWishlist(product.id))}
                className="w-full mt-4 h-11 rounded-xl border border-white/20 text-white hover:bg-red-500/10 hover:border-red-400 transition"
              >
                <Trash2 size={16} className="inline mr-2" />
                Remove
              </button>

              <button
                onClick={() => {
                  if (product.stock > 0) {
                    dispatch(addToCart(product));
                    dispatch(removefromWishlist(product.id));
                  }
                }}
                disabled={product.stock === 0}
                className="w-full mt-3 h-11 rounded-xl bg-white text-black font-medium hover:bg-violet-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={16} className="inline mr-2" />
                {product.stock === 0 ? "Out of Stock" : "Move to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
