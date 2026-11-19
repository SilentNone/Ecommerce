import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import { addToCart } from "../redux/slices/cartSlice";
import {
  addtoWishlist,
  removefromWishlist,
} from "../redux/slices/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const outOfStock = product.stock === 0;

  const isWishlisted = useSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id),
  );

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/40 hover:shadow-2xl hover:shadow-violet-500/20">
      <div className="relative aspect-square overflow-hidden bg-white/5">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <button
          onClick={() =>
            dispatch(
              isWishlisted
                ? removefromWishlist(product.id)
                : addtoWishlist(product),
            )
          }
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-md transition-transform duration-300 hover:scale-110 active:scale-90"
        >
          <Heart
            size={18}
            className={
              isWishlisted ? "fill-fuchsia-500 text-fuchsia-500" : "text-white"
            }
          />
        </button>

        {outOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold">
            Sold out
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-2 p-3 transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={() => dispatch(addToCart(product))}
            disabled={outOfStock}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-2.5 text-sm font-semibold text-black transition-colors hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart size={16} />
            Add
          </button>

          <Link
            to={`/product/${product.id}`}
            className="flex items-center justify-center gap-2 rounded-full border border-white/30 bg-black/50 px-4 py-2.5 text-sm text-white backdrop-blur transition-colors hover:border-violet-400"
          >
            <Eye size={16} />
            View
          </Link>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-violet-400">
          {product.brand}
        </p>
        <h3 className="mt-1 truncate font-semibold">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold">₹{product.price}</span>
          <span
            className={`text-xs ${outOfStock ? "text-red-400" : "text-emerald-400"}`}
          >
            {outOfStock ? "Out of stock" : `${product.stock} in stock`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
