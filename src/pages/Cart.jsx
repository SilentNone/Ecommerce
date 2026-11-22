import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0,
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const canCheckout = items.every((item) => item.inStock && item.price > 0);

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
    toast.success("Removed from cart");
  };

  const handleClear = () => {
    if (!window.confirm("Remove all items from your cart?")) return;
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  return (
    <div className="animate-fade-up min-h-screen bg-[#09090B] px-6 pb-20 pt-28 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-violet-400">
              Your Collection
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              Shopping Cart
            </h1>

            <p className="mt-3 text-gray-400">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
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

        {items.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-zinc-900/30 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <ShoppingBag size={40} className="text-violet-400" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>

            <p className="mt-3 text-gray-400">
              Looks like you haven't added anything yet.
            </p>

            <Link
              to="/shop"
              className="mt-7 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3 font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/40"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-2">
              {items.map((item, index) => {
                const maxStockReached =
                  typeof item.stockQuantity === "number" &&
                  item.quantity >= item.stockQuantity;

                return (
                  <div
                    key={item.id}
                    style={{ animationDelay: `${index * 80}ms` }}
                    className="animate-fade-up flex flex-col gap-5 rounded-2xl border border-white/10 bg-zinc-900/50 p-5 transition-all duration-300 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10 sm:flex-row"
                  >
                    <Link to={`/product/${item.id}`} className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-36 w-full rounded-xl bg-[#111113] object-cover sm:w-36"
                      />
                    </Link>

                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wider text-violet-400">
                        {item.brand}
                      </p>

                      <Link to={`/product/${item.id}`}>
                        <h2 className="mt-2 text-lg font-semibold transition-colors hover:text-violet-300">
                          {item.name}
                        </h2>
                      </Link>

                      <p className="mt-2 text-gray-400">
                        {item.price > 0
                          ? `₹${item.price.toLocaleString("en-IN")}`
                          : "Price unavailable"}
                      </p>

                      <div className="mt-5 flex items-center gap-4">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          disabled={item.quantity <= 1}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="w-5 text-center font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          disabled={!item.inStock || maxStockReached}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Plus size={15} />
                        </button>

                        {maxStockReached && (
                          <span className="text-xs text-amber-400">
                            Max stock reached
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end">
                      <p className="text-lg font-semibold">
                        ₹
                        {((item.price || 0) * item.quantity).toLocaleString(
                          "en-IN",
                        )}
                      </p>

                      <button
                        onClick={() => handleRemove(item)}
                        className="flex items-center gap-2 text-sm text-red-400 transition hover:text-red-300"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={handleClear}
                className="text-sm text-gray-500 transition hover:text-red-400"
              >
                Clear cart
              </button>
            </div>

            <div className="h-fit rounded-2xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur lg:sticky lg:top-28">
              <h2 className="mb-7 text-xl font-semibold">Order Summary</h2>

              <div className="mb-4 flex justify-between text-gray-400">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="mb-4 flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              <div className="mb-6 flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-5">
                <span className="font-medium">Total</span>

                <span className="text-2xl font-bold text-violet-400">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <Link
                to="/checkout"
                aria-disabled={!canCheckout}
                onClick={(event) => {
                  if (!canCheckout) event.preventDefault();
                }}
                className={`group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-4 font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40 ${
                  !canCheckout ? "pointer-events-none opacity-40" : ""
                }`}
              >
                Proceed to Checkout
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {!canCheckout && (
                <p className="mt-3 text-center text-xs text-amber-400">
                  Remove unavailable or out-of-stock products before checkout.
                </p>
              )}

              <p className="mt-4 text-center text-xs text-gray-500">
                Shipping and final charges are subject to checkout.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
