
import api from "./api";


export const registerUser = async (userData) => {
  const email = userData.email.trim().toLowerCase();

  const response = await api.get("/users", {
    params: { email },
  });

  if (response.data.length > 0) {
    throw new Error("Email already registered");
  }

  const newUser = {
    name: userData.name,
    email,
    password: userData.password,
    phone: userData.phone || "",
  };

  const result = await api.post("/users", newUser);

  const { password, ...safeUser } = result.data;

  return safeUser;
};


export const loginUser = async (email, password) => {
  const response = await api.get("/users", {
    params: {
      email: email.trim().toLowerCase(),
    },
  });

  const user = response.data[0];

  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }

  const { password: userPassword, ...safeUser } = user;

  return safeUser;
};
