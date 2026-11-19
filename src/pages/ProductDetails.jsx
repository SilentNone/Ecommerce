import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Minus, Plus } from "lucide-react";
import { getProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import {
  addtoWishlist,
  removefromWishlist,
} from "../redux/slices/wishlistSlice";

const IMAGE_LABELS = ["Main", "Front", "Back", "Side", "Desk View"];

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [active, setActive] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { products, loading, error } = useSelector((state) => state.products);

  const product = products.find((item) => String(item.id) === id);

  const isWishlisted = useSelector((state) =>
    state.wishlist.items.some((item) => String(item.id) === id),
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

  const gallery = product?.images?.length ? product.images : [product?.image];
  const outOfStock = product?.stock === 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  const handleWishlist = () => {
    dispatch(
      isWishlisted ? removefromWishlist(product.id) : addtoWishlist(product),
    );
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#09090B] pt-32 text-center text-red-400">
        Something went wrong: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#09090B] pt-32 text-center text-white">
        {loading || products.length === 0 ? (
          <p className="text-gray-400">Loading the product...</p>
        ) : (
          <>
            <p>Product not found.</p>
            <Link to="/shop" className="mt-4 inline-block text-violet-400">
              Back to shop
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="animate-fade-up min-h-screen bg-[#09090B] pb-20 pt-28 text-white">
      <div className="mx-auto max-w-7xl px-6">
        
        <p className="mb-8 text-sm text-gray-500">
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="transition-colors hover:text-white">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-violet-400">{product.name}</span>
        </p>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
         
          <div className="rounded-2xl border border-white/5 bg-zinc-900/70 p-5 md:p-8">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
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
                alt={IMAGE_LABELS[active] || product.name}
                className="animate-fade-up h-full w-full object-contain p-8 transition-transform duration-700 hover:scale-105 md:p-12"
              />
            </div>

            <div className="mt-5 grid grid-cols-5 gap-2 md:gap-3">
              {gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`overflow-hidden rounded-lg border transition-all duration-300 ${
                    active === index
                      ? "border-violet-400 bg-violet-400/10 shadow-lg shadow-violet-500/20"
                      : "border-white/10 bg-[#111113] opacity-70 hover:border-violet-400/50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={IMAGE_LABELS[index]}
                    className="aspect-square w-full object-contain p-2"
                  />
                  <span className="block pb-2 text-[10px] text-gray-400 md:text-xs">
                    {IMAGE_LABELS[index]}
                  </span>
                </button>
              ))}
            </div>
          </div>

         
          <div className="flex flex-col justify-center py-4 lg:py-8">
            <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
              {product.brand || "GLIDE COLLECTION"}
            </p>

            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {product.name}
            </h1>

           
            <div className="mt-4 flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.round(product.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {product.rating || 0} ({product.reviews || 0} reviews)
              </span>
            </div>

           
            <div className="mt-8">
              <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">
                Price
              </p>
              <p className="text-3xl font-semibold">₹{product.price}</p>
              <p
                className={`mt-2 text-sm ${
                  outOfStock ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {outOfStock ? "Out of stock" : `${product.stock} in stock`}
              </p>
            </div>

            <div className="my-8 border-t border-white/10" />

           
            <div>
              <h2 className="mb-4 text-sm uppercase tracking-widest text-gray-300">
                About this product
              </h2>
              <p className="text-sm leading-8 text-gray-400 md:text-base">
                {product.description ||
                  "Crafted to elevate your everyday workspace, this product combines thoughtful design with reliable performance."}
              </p>
            </div>

           
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/5 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-wider text-violet-400">
                  Connectivity
                </p>
                <p className="mt-2 text-sm text-gray-300">
                  {product.connectivity || "Not specified"}
                </p>
              </div>
              <div className="rounded-xl border border-white/5 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-wider text-violet-400">
                  Speed
                </p>
                <p className="mt-2 text-sm text-gray-300">
                  {product.speed || "Not specified"}
                </p>
              </div>
            </div>

           
            {product.features?.length > 0 && (
              <ul className="mt-6 space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

           
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-white/10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={outOfStock}
                  className="p-3 transition-colors hover:text-violet-400 disabled:opacity-40"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  disabled={outOfStock}
                  className="p-3 transition-colors hover:text-violet-400 disabled:opacity-40"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={outOfStock}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                <ShoppingCart size={18} />
                {outOfStock ? "Out of Stock" : "Add to Cart"}
              </button>

              <button
                onClick={handleWishlist}
                aria-label="Toggle wishlist"
                className="rounded-full border border-white/10 p-4 transition-transform duration-300 hover:scale-110 active:scale-90"
              >
                <Heart
                  size={20}
                  className={
                    isWishlisted
                      ? "fill-fuchsia-500 text-fuchsia-500"
                      : "text-white"
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
