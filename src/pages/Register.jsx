import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/slices/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await dispatch(
        register({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      ).unwrap();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090909] px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111] p-8">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="mt-2 text-sm text-gray-400">
          Join GLIDE and upgrade your desk setup.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-white/10 bg-[#1b1b1b] px-4 py-3 outline-none focus:border-violet-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-white/10 bg-[#1b1b1b] px-4 py-3 outline-none focus:border-violet-500"
          />

          <input
            name="phone"
            type="tel"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-[#1b1b1b] px-4 py-3 outline-none focus:border-violet-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full rounded-lg border border-white/10 bg-[#1b1b1b] px-4 py-3 outline-none focus:border-violet-500"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full rounded-lg border border-white/10 bg-[#1b1b1b] px-4 py-3 outline-none focus:border-violet-500"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold transition hover:bg-violet-500 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-400 hover:text-violet-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
