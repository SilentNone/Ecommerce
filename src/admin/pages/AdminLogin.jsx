import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { isValidEmail } from "../../utils/validators";
import { adminLogin, clearAdminError } from "../redux/slices/adminSlice";
function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, loading, error } = useSelector((state) => state.admin);

  const [adminemail, setAdminemail] = useState("");
  const [adminpass, setAdminpass] = useState("");
  const [formerror, setFormerror] = useState("");

  useEffect(() => {
    if (admin) {
      navigate("/admin", { replace: true });
    }
  }, [admin, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearAdminError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormerror("");

    if (!isValidEmail(adminemail)) {
      setFormerror("Enter a valid email, like example@gmail.com");
      return;
    }

    try {
      await dispatch(
        adminLogin({ email: adminemail, password: adminpass }),
      ).unwrap();
      toast.success("Welcome Back,admin");
    } catch {}
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
      <h1 className="mb-6 text-2xl font-bold text-white">Admin Login</h1>

      {(formerror || error) && (
        <p className="mb-4 text-sm text-red-400">{formerror || error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={adminemail}
          onChange={(e) => setAdminemail(e.target.value)}
          placeholder="Enter a valid Email"
          required
          className=" w-full rounded-lg bg-white/10 px-4 py-3 text-white outline-none"
        />
        <input
          type="password"
          value={adminpass}
          onChange={(e) => setAdminpass(e.target.value)}
          placeholder="Enter the valid password"
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
    </div>
  );
}
export default AdminLogin;
