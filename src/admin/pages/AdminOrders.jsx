import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../redux/slices/adminOrderSlice";
import { getUsers } from "../redux/slices/adminUserSlice";

function AdminOrders() {
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

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
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="px-4 py-3 text-gray-300">{order.id}</td>

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default AdminOrders;
