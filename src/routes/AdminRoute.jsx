import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const admin = useSelector((state) => state.admin.admin);
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}
export default AdminRoute;
