import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { checkUserBlocked } from "../services/authService";
import toast from "react-hot-toast";
import { logout } from "../redux/slices/authSlice";

export const useRequireAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  return async (action) => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    const blocked = await checkUserBlocked(user.id);
    if (blocked) {
      dispatch(logout());
      toast.error("Your account has been blocked");
      navigate("/login");
      return;
    }
    action();
  };
};
