import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Trash2, Minus, Plus } from "lucide-react";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#09090B] text-white pt-28 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-violet-400 text-sm uppercase tracking-[0.2em]">
              Your Collection
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">
              Shopping Cart
            </h1>

            <p className="text-gray-400 mt-3">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <Link
            to="/shop"
            className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center border border-white/10 rounded-3xl bg-zinc-900/30">
            <ShoppingBag size={55} className="text-gray-600 mb-5" />

            <h2 className="text-2xl font-semibold">Your cart is empty</h2>

            <p className="text-gray-400 mt-3">
              Looks like you haven't added anything yet.
            </p>

            <Link
              to="/shop"
              className="mt-7 bg-white text-black px-7 py-3 rounded-full font-medium hover:bg-violet-400 transition"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-5 p-5 rounded-2xl border border-white/10 bg-zinc-900/50 hover:border-violet-500/30 transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-36 h-36 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <p className="text-xs text-violet-400 uppercase tracking-wider">
                      {item.brand}
                    </p>

                    <h2 className="text-lg font-semibold mt-2">{item.name}</h2>

                    <p className="text-gray-400 mt-2">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    <div className="flex items-center gap-4 mt-5">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        disabled={item.quantity <= 1}
                        className="w-9 h-9 flex items-center justify-center border border-white/20 rounded-lg hover:bg-white hover:text-black transition disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Minus size={15} />
                      </button>

                      <span className="font-medium w-5 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        disabled={item.quantity >= item.stock}
                        className="w-9 h-9 flex items-center justify-center border border-white/20 rounded-lg hover:bg-white hover:text-black transition disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="flex sm:flex-col justify-between items-center sm:items-end">
                    <p className="font-semibold text-lg">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit p-6 rounded-2xl border border-white/10 bg-zinc-900/70">
              <h2 className="text-xl font-semibold mb-7">Order Summary</h2>

              <div className="flex justify-between text-gray-400 mb-4">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between text-gray-400 mb-4">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-gray-400 mb-6">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>

              <div className="border-t border-white/10 pt-5 flex justify-between items-center">
                <span className="font-medium">Total</span>

                <span className="text-2xl font-bold text-violet-400">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <button className="w-full mt-7 bg-white text-black py-4 rounded-xl font-semibold hover:bg-violet-400 transition">
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
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
