import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../redux/slices/adminOrderSlice";
import { getUsers } from "../redux/slices/adminUserSlice";

function AdminOrders() {
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(getAllOrders());
    }
  }, [dispatch, orders.length]);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers());
    }
  }, [dispatch, users.length]);

  const getCustomerName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };
  const newest = [...orders].reverse();

  const openOrder = orders.find((order) => order.id === openId);
  const handleView = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Orders <span className="text-sm text-gray-400">({orders.length})</span>
      </h1>

      {loading && <p className="mt-8 text-gray-400">Loading orders...</p>}

      {error && <p className="mt-8 text-red-400">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="mt-8 text-gray-400">No orders yet.</p>
      )}

      {orders.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-4 py-3 font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {newest.map((order) => (
                <tr
                  key={order.id}
                  className={`border-t border-white/10 ${
                    order.id === openId
                      ? "bg-violet-500/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  <td className="px-4 py-3 text-gray-300">
                    #{String(order.id).slice(0, 6)}
                  </td>

                  <td className="px-4 py-3 font-medium">
                    {getCustomerName(order.userId)}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {new Date(order.date).toLocaleDateString("en-IN")}
                  </td>

                  <td className="px-4 py-3">
                    ₹{Number(order.total).toLocaleString("en-IN")}
                  </td>

                  <td className="px-4 py-3 capitalize">{order.status}</td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleView(order.id)}
                      className="rounded-lg border border-white/20 px-3 py-1.5 text-xs transition-colors hover:bg-white/10"
                    >
                      {order.id === openId ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openOrder && (
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Order details</h2>

          <div className="mt-4 space-y-1 text-sm">
            <p>
              <span className="text-gray-400">Customer: </span>
              {getCustomerName(openOrder.userId)}
            </p>
            <p>
              <span className="text-gray-400">Date: </span>
              {new Date(openOrder.date).toLocaleString("en-IN")}
            </p>
            <p>
              <span className="text-gray-400">Address: </span>
              {openOrder.address || "-"}
            </p>
            <p className="capitalize">
              <span className="text-gray-400">Status: </span>
              {openOrder.status}
            </p>
          </div>

          <div className="mt-4 border-t border-white/10 pt-4">
            {openOrder.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4 py-1 text-sm"
              >
                <span className="text-gray-300">
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-between border-t border-white/10 pt-3 font-bold">
            <span>Total</span>
            <span>₹{Number(openOrder.total).toLocaleString("en-IN")}</span>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminOrders;
