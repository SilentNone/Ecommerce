import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { login, clearAuthError } from "../redux/slices/authSlice";
import { isValidEmail } from "../utils/validators";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading, error } = useSelector((state) => state.auth);
  const redirectTo = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) navigate(redirectTo, { replace: true });
  }, [user, navigate, redirectTo]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!isValidEmail(email)) {
      setFormError("Enter a valid email, like name@example.com.");
      return;
    }

    try {
      const loggedIn = await dispatch(login({ email, password })).unwrap();
      toast.success(`Welcome back, ${loggedIn.name}`);
    } catch {
      // the error message is shown from Redux
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
      <h1 className="mb-6 text-2xl font-bold text-white">Login</h1>

      {(formError || error) && (
        <p className="mb-4 text-sm text-red-400">{formError || error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg bg-white/10 px-4 py-3 text-white outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-lg bg-white/10 px-4 py-3 text-white outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-400">
        New here?{" "}
        <Link to="/register" className="text-violet-400">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default Login;
