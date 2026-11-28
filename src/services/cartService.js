import api from "./api";

export const fetchCartByUser = async (userId) => {
  const response = await api.get("/carts", {
    params: { userId },
  });
  return response.data;
};

export const createCart = async (userId) => {
  const response = await api.post("/carts", { userId, items: [] });
  return response.data;
};

export const getOrCreateCart = async (userId) => {
  const carts = await fetchCartByUser(userId);
  if (carts.length > 0) return carts[0];
  return await createCart(userId);
};

export const saveCartItems = async (cartId, items) => {
  const response = await api.patch(`/carts/${cartId}`, { items });
  return response.data;
};
