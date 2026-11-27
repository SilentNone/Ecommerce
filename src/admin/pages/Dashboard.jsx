import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/slices/productSlice";
import { getAllOrders } from "../redux/slices/adminOrderSlice";
import { getUsers } from "../redux/slices/adminUserSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.adminOrders);

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

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

  const totalProducts = products.length;

  const totalCustomers = users.filter((user) => user.role !== "admin").length;
  const totalRevenue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const cards = [
    { label: "Total Products", value: totalProducts },
    { label: "Total Customers", value: totalCustomers },
    { label: "Total Orders", value: orders.length },
    { label: "Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}` },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-sm text-gray-400">{card.label}</h3>
            <p className="mt-2 text-2xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Dashboard;
