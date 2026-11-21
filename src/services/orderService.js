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
