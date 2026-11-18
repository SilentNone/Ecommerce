import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import {
  addtoWishlist,
  removefromWishlist,
} from "../redux/slices/wishlistSlice";
import { Heart } from "lucide-react";

function Shop() {
  const { category } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Default");

  const { products, loading, error } = useSelector((state) => state.products);

  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const visibleProducts = products
    .filter((product) => {
      const matchesCategory = !category || product.category === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === "low-to-high") {
        return a.price - b.price;
      }

      if (sort === "high-to-low") {
        return b.price - a.price;
      }

      return 0;
    });

  const title = category || "All Products";

  return (
    <div className="min-h-screen pt-28 px-6 text-white max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>

      {loading && <p className="mt-10 text-gray-400">Loading products...</p>}

      {error && <p className="mt-10 text-red-400">{error}</p>}

      {!loading && !error && visibleProducts.length === 0 && (
        <p className="mt-10 text-gray-400">No products found.</p>
      )}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-5 py-3 text-white outline-none transition focus:border-violet-400"
        placeholder="Search Products..."
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="mt-4 rounded-xl border border-white/10 bg-zinc-900 px-5 py-3 text-white outline-none focus:border-violet-400"
      >
        <option value="default">Default</option>
        <option value="low-to-high">Low to High</option>
        <option value="high-to-low">High to Low</option>
      </select>

      {!loading && !error && (
        <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => {
            const isWishlisted = wishlistItems.some(
              (item) => item.id === product.id,
            );

            return (
              <div
                key={product.id}
                className="group rounded-2xl border border-white/10 bg-zinc-900/50 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  <button
                    onClick={() =>
                      dispatch(
                        isWishlisted
                          ? removefromWishlist(product.id)
                          : addtoWishlist(product),
                      )
                    }
                    aria-label={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all duration-300 hover:scale-110"
                  >
                    <Heart
                      size={20}
                      className={
                        isWishlisted
                          ? "fill-violet-400 text-violet-400"
                          : "text-white"
                      }
                    />
                  </button>
                </div>

                <button
                  onClick={() => {
                    dispatch(addToCart(product));
                    navigate("/cart");
                  }}
                  disabled={product.stock === 0}
                  className="w-full h-11 mt-3 rounded-xl bg-white text-black font-medium transition-all duration-300 hover:bg-violet-400 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>

                <p className="text-xs text-violet-400 mt-4 uppercase tracking-wider">
                  {product.brand}
                </p>

                <h3 className="font-semibold mt-2">{product.name}</h3>

                <p className="text-gray-400 mt-2">₹{product.price}</p>

                <p
                  className={
                    product.stock > 0
                      ? "text-green-400 text-sm mt-3"
                      : "text-red-400 text-sm mt-3"
                  }
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Shop;
