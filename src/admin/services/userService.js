import api from "../../services/api";

export const fetchUsers = async () => {
  const response = await api.get("/users");
  return response.data.map((user) => {
    const { password: userPassword, ...safeUser } = user;
    return safeUser;
  });
};
export const updateUser = async (id, changes) => {
  const response = await api.patch(`/users/${id}`, changes);
  const { password: userPassword, ...safeUser } = response.data;
  return safeUser;
};
