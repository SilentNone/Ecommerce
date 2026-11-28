import api from "../../services/api";

export const fetchAllOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};
export const updateOrderStatus = async (id, status) => {
  const response = await api.patch(`/orders/${id}`, { status });
  return response.data;
};
