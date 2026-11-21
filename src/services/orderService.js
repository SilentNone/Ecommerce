import api from "./api";

export const placeOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};
export const fetchOrdersByUser = async (userId) => {
  const response = await api.get("/orders", {
    params: { userId },
  });
  return response.data;
};
export const cancelOrderById = async (id) => {
  const response = await api.patch(`/orders/${id}`, { status: "cancelled" });
  return response.data;
};
export const deleteOrderById = async (id) => {
  await api.delete(`/orders/${id}`);
  return id;
};
