import api from "../../services/api";

export const fetchAllOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};
