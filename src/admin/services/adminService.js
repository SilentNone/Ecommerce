import api from "../../services/api";

export const loginAdmin = async (email, password) => {
  const response = await api.get("/users", {
    params: {
      email: email.trim().toLowerCase(),
    },
  });

  const admin = response.data[0];

  if (!admin || admin.role !== "admin") {
    throw new Error("Invalid email");
  }
  if (admin.password !== password) {
    throw new Error("invalid password");
  }
  const { password: adminPassword, ...safeAdmin } = admin;
  return safeAdmin;
};
