import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getUsers, blockUser } from "../redux/slices/adminUserSlice";

function AdminUsers() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const customers = users.filter((u) => u.role !== "admin");

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers());
    }
  }, [dispatch, users.length]);

  const handleBlock = async (user) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await dispatch(
        blockUser({ id: user.id, changes: { blocked: !user.blocked } }),
      ).unwrap();
      toast.success("User updated");
    } catch {
      toast.error("Could not update the user");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-sm text-gray-400">{customers.length} customers</p>
      </div>

      {loading && <p className="mt-8 text-gray-400">Loading customers...</p>}

      {error && <p className="mt-8 text-red-400">{error}</p>}

      {!loading && !error && customers.length === 0 && (
        <p className="mt-8 text-gray-400">No customers yet.</p>
      )}

      {customers.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3 text-gray-300">{user.email}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {user.phone || "-"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        user.blocked
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {user.blocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleBlock(user)}
                      className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                        user.blocked
                          ? "border-green-400/40 text-green-400 hover:bg-green-500/10"
                          : "border-red-400/40 text-red-400 hover:bg-red-500/10"
                      }`}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default AdminUsers;
