import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminLogout } from "../redux/slices/adminSlice";
import toast from "react-hot-toast";
import { LogOut, Package, Users, ClipboardList } from "lucide-react";

const links = [
  {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ClipboardList,
  },
];

function AdminLayout() {
  const admin = useSelector((state) => state.admin.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(adminLogout());
    navigate("/admin/login");
    toast.success("Logged Out SuccessFully.");
  }

  return (
    <div className="flex gap-2 min-h-screen">
      <aside className="w-60 border bg-gray-900 text-white p-4 flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <div key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-3 rounded-lg bg-purple-600 text-white"
                    : "flex items-center gap-3 p-3 rounded-lg hover:text-gray-400 hover:bg-gray-800"
                }
              >
                <Icon size={20} />
                <h3>{link.name}</h3>
              </NavLink>
            </div>
          );
        })}
      </aside>
      <main className="flex-1 bg-gray-50">
        <header className="flex justify-between items-center p-5 bg-white border-b">
          <h2 className="font-bold text-purple-400">Welcome ,{admin?.name}</h2>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
export default AdminLayout;
