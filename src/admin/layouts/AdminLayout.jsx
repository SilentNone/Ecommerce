import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminLogout } from "../redux/slices/adminSlice";
import toast from "react-hot-toast";
import Logo from "../../assets/glide-logo.svg";

import {
  LogOut,
  Package,
  Users,
  ClipboardList,
  LayoutDashboard,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    name: "Customers",
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
    toast.success("Logged out");
  }

  return (
    <div className="flex min-h-screen bg-[#09090B] text-white">
      <aside className="sticky top-0 flex h-screen w-16 shrink-0 flex-col gap-2 border-r border-white/10 bg-white/5 p-3 md:w-60 md:p-4">
        <div className="mb-4 hidden px-3 md:block">
          <img src={Logo} alt="GLIDE" className="h-9 w-auto" />
          <p className="text-lg font-bold">Admin</p>
        </div>

        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              end
              className={({ isActive }) =>
                `flex items-center justify-center gap-3 rounded-lg p-3 transition-colors md:justify-start ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span className="hidden md:inline">{link.name}</span>
            </NavLink>
          );
        })}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
          <h2 className="font-semibold text-violet-300">
            Welcome, {admin?.name}
          </h2>
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut size={20} />
          </button>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
