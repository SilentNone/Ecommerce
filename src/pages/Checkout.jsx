import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { createOrder } from "../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const items = useSelector((state) => state.cart.items);

  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        Your cart is empty!
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlacing(true);
    try {
      await dispatch(
        createOrder({
          userId: user.id,
          items,
          total,
          address,
          date: new Date().toISOString(),
          status: "placed",
        }),
      ).unwrap();
      dispatch(clearCart());
      navigate("/orders");
    } catch {
      alert("Could not Place the order.Please try again.");
      setPlacing(false);
    }
  };
  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 pb-20 pt-28 text-white">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between py-2 text-gray-300"
          >
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
          </div>
        ))}

        <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-xl font-bold">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Shipping address"
          required
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-violet-500"
        />

        <button
          type="submit"
          disabled={placing}
          className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-4 font-semibold disabled:opacity-50"
        >
          {placing ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
export default CheckOut;
