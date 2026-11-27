import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../redux/slices/authSlice";
import { checkUserBlocked } from "../services/authService";

function BlockedWatcher() {
  const userId = useSelector((state) => state.auth.user?.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const check = async () => {
      const blocked = await checkUserBlocked(userId);
      if (blocked) {
        dispatch(logout());
        toast.error("Your account has been blocked");
        navigate("/login");
      }
    };

    check();
    const timer = setInterval(check, 10000);

    return () => clearInterval(timer);
  }, [userId, dispatch, navigate]);

  return null;
}
export default BlockedWatcher;
