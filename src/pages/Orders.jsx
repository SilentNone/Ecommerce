import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../redux/slices/orderSlice";

function Orders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { orders, loading } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getOrders(user.id));
  }, [dispatch, user.id]);
  const myOrders = orders.filter((order) => order.userId === user.id)
  .reverse();

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-6 pb-20 pt-28 text-white">
      <h1 className="text-3xl font-bold">My Orders</h1>

      {loading && <p className="mt-8 text-gray-400">Loading orders...</p>}

      {!loading && myOrders.length === 0 && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-900/30 p-10 text-center">
          <p className="text-gray-400">You haven't placed any orders yet.</p>
          <Link
            to="/shop"
            className="mt-5 inline-block rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3 font-medium"
          >
            Explore Products
          </Link>
        </div>
      )}

      <div className="mt-8 space-y-5">
        {myOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6"
          >
            <div className="flex flex-wrap justify-between gap-2 text-sm text-gray-400">
              <span>Order {order.id}</span>
              <span>{new Date(order.date).toLocaleDateString("en-IN")}</span>
              <span className="capitalize text-violet-400">{order.status}</span>
            </div>

            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between py-2 text-gray-300"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}

            <div className="mt-3 flex justify-between border-t border-white/10 pt-3 font-bold">
              <span>Total</span>
              <span>₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Orders;
