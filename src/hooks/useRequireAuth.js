import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export const useRequireAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  return (action) => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    action();
  };
};
