import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { getProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import {
  addtoWishlist,
  removefromWishlist,
} from "../redux/slices/wishlistSlice";
import { useRequireAuth } from "../hooks/useRequireAuth";

const IMAGE_LABELS = ["Main", "Front", "Back", "Side", "Desk View"];

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const requireAuth = useRequireAuth();

  const [active, setActive] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { products, loading, error } = useSelector((state) => state.products);

  const product = products.find((item) => String(item.id) === id);

  const isWishlisted = useSelector((state) =>
    state.wishlist.items.some((item) => String(item.id) === id),
  );

  const cartQty = useSelector(
    (state) =>
      state.cart.items.find((item) => String(item.id) === id)?.quantity || 0,
  );

  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length, loading]);

  useEffect(() => {
    setActive(0);
    setQuantity(1);
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#09090B] pt-32 text-center text-white">
        Something went wrong: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#09090B] pt-32 text-center text-white">
        {loading || products.length === 0 ? (
          <p className="text-gray-400">Loading product...</p>
        ) : (
          <>
            <p>Product not found.</p>
            <Link to="/shop" className="mt-4 inline-block text-white underline">
              Back to shop
            </Link>
          </>
        )}
      </div>
    );
  }

  const gallery = product.images?.length ? product.images : [product.image];

  const outOfStock = !product.inStock;
  const priceUnavailable = !product.price || product.price <= 0;

  const maxQty =
    typeof product.stockQuantity === "number"
      ? product.stockQuantity
      : Infinity;

  const handleAddToCart = () => {
    if (outOfStock || priceUnavailable) return;

    requireAuth(() => {
      if (cartQty + quantity > maxQty) {
        const left = Math.max(0, maxQty - cartQty);
        toast.error(
          left === 0
            ? "You already have the maximum in your cart"
            : `Only ${left} more available`,
        );
        return;
      }
      dispatch(addToCart({ product, quantity }));
      toast.success(
        quantity === 1 ? "Added to cart" : `Added ${quantity} items to cart`,
      );
    });
  };

  const handleWishlist = () => {
    requireAuth(() => {
      if (isWishlisted) {
        dispatch(removefromWishlist(product.id));
        toast.success("Removed from wishlist");
      } else {
        dispatch(addtoWishlist(product));
        toast.success("Added to wishlist");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#09090B] pb-20 pt-28 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-sm text-gray-500">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-white">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </p>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 md:p-8">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-gray-400">
                Product Gallery
              </span>

              <span className="text-xs text-gray-500">
                {active + 1} / {gallery.length}
              </span>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-xl bg-[#111113]">
              <img
                key={active}
                src={gallery[active]}
                alt={product.name}
                className="h-full w-full object-contain p-8 md:p-12"
              />
            </div>

            {gallery.length > 1 && (
              <div className="mt-5 grid grid-cols-5 gap-2 md:gap-3">
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    className={`overflow-hidden rounded-lg border transition ${
                      active === index
                        ? "border-white"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="aspect-square w-full object-contain p-2"
                    />

                    <span className="block pb-2 text-[10px] text-gray-400">
                      {IMAGE_LABELS[index] || `View ${index + 1}`}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center py-4 lg:py-8">
            <p className="text-sm uppercase tracking-widest text-gray-400">
              {product.brand || "GLIDE COLLECTION"}
            </p>

            <h1 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              {product.rating ? (
                <>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < Math.round(product.rating)
                            ? "fill-white text-white"
                            : "text-gray-600"
                        }
                      />
                    ))}
                  </div>

                  <span className="text-sm text-gray-400">
                    {product.rating} ({product.reviews || 0} reviews)
                  </span>
                </>
              ) : (
                <span className="text-sm text-gray-500">No reviews yet</span>
              )}
            </div>

            <div className="mt-8">
              <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">
                Price
              </p>

              <p className="text-3xl font-semibold">
                {priceUnavailable
                  ? "Price unavailable"
                  : `₹${product.price.toLocaleString("en-IN")}`}
              </p>

              <p className="mt-2 text-sm text-gray-400">
                {outOfStock
                  ? "Out of stock"
                  : maxQty <= 5
                    ? `Only ${maxQty} left`
                    : "In stock"}
              </p>
            </div>

            <div className="my-8 border-t border-white/10" />

            <div>
              <h2 className="mb-4 text-sm uppercase tracking-widest text-gray-300">
                About this product
              </h2>

              <p className="text-sm leading-8 text-gray-400 md:text-base">
                {product.description || "No product description available."}
              </p>
            </div>

            {(product.connectivity || product.speed) && (
              <div className="mt-8 grid grid-cols-2 gap-4">
                {product.connectivity && (
                  <div className="rounded-xl border border-white/10 bg-zinc-900 p-4">
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Connectivity
                    </p>

                    <p className="mt-2 text-sm text-gray-300">
                      {product.connectivity}
                    </p>
                  </div>
                )}

                {product.speed && (
                  <div className="rounded-xl border border-white/10 bg-zinc-900 p-4">
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Speed
                    </p>

                    <p className="mt-2 text-sm text-gray-300">
                      {product.speed}
                    </p>
                  </div>
                )}
              </div>
            )}

            {product.features?.length > 0 && (
              <ul className="mt-6 space-y-2">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {/* Quantity and Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-white/10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={outOfStock || priceUnavailable}
                  className="p-3 hover:text-gray-400 disabled:opacity-40"
                >
                  <Minus size={16} />
                </button>

                <span className="w-8 text-center font-medium">{quantity}</span>

                <button
                  onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                  disabled={
                    outOfStock || priceUnavailable || quantity >= maxQty
                  }
                  className="p-3 hover:text-gray-400 disabled:opacity-40"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={outOfStock || priceUnavailable}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-600"
              >
                <ShoppingCart size={18} />

                {outOfStock
                  ? "Out of Stock"
                  : priceUnavailable
                    ? "Price Unavailable"
                    : "Add to Cart"}
              </button>

              <button
                onClick={handleWishlist}
                aria-label="Toggle wishlist"
                className="rounded-full border border-white/10 p-4 transition hover:bg-white/10"
              >
                <Heart
                  size={20}
                  className={
                    isWishlisted ? "fill-white text-white" : "text-white"
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
