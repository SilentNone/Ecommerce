import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { updateProfile } from "../redux/slices/authSlice";
import api from "../services/api";
import {
  isValidEmail,
  isValidPhone,
  getPasswordError,
} from "../utils/validators";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-violet-500";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
  });
  const [message, setMessage] = useState("");

  const [passwords, setPasswords] = useState({ current: "", next: "" });
  const [passMessage, setPassMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!isValidEmail(form.email)) {
      setMessage("Enter a valid email, like name@example.com.");
      return;
    }
    if (!isValidPhone(form.phone)) {
      setMessage("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      await dispatch(updateProfile({ id: user.id, changes: form })).unwrap();
      toast.success("Profile updated");
    } catch (error) {
      setMessage(error);
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setPassMessage("");

    const passwordError = getPasswordError(passwords.next);
    if (passwordError) {
      setPassMessage(passwordError);
      return;
    }

    try {
      const res = await api.get(`/users/${user.id}`);
      if (res.data.password !== passwords.current) {
        setPassMessage("Current password is wrong.");
        return;
      }
      await dispatch(
        updateProfile({ id: user.id, changes: { password: passwords.next } }),
      ).unwrap();
      setPasswords({ current: "", next: "" });
      toast.success("Password changed");
    } catch (error) {
      setPassMessage(error);
    }
  };

  const tabClass = ({ isActive }) =>
    `rounded-full px-5 py-2 text-sm ${
      isActive ? "bg-white text-black" : "border border-white/10 text-gray-400"
    }`;

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 pb-20 pt-28 text-white">
      <div className="mb-8 flex gap-3">
        <NavLink to="/profile" end className={tabClass}>
          Profile
        </NavLink>
        <NavLink to="/orders" className={tabClass}>
          Orders
        </NavLink>
      </div>

      <h1 className="text-3xl font-bold">My Profile</h1>

      <form onSubmit={handleSave} className="mt-6 space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full name"
          required
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className={inputClass}
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone (10 digits)"
          className={inputClass}
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          rows={3}
          className={inputClass}
        />

        {message && <p className="text-sm text-red-400">{message}</p>}

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 font-semibold"
        >
          Save Changes
        </button>
      </form>

      <h2 className="mt-12 text-xl font-semibold">Settings: Change Password</h2>

      <form onSubmit={handlePassword} className="mt-4 space-y-4">
        <input
          type="password"
          value={passwords.current}
          onChange={(e) =>
            setPasswords({ ...passwords, current: e.target.value })
          }
          placeholder="Current password"
          required
          className={inputClass}
        />
        <input
          type="password"
          value={passwords.next}
          onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
          placeholder="New password (8+, letter and number)"
          required
          minLength={8}
          className={inputClass}
        />

        {passMessage && <p className="text-sm text-red-400">{passMessage}</p>}

        <button
          type="submit"
          className="w-full rounded-xl border border-white/20 py-3 font-semibold hover:bg-white/10"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default Profile;
