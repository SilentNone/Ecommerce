import api from "./api";

export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const fetchproductsbyId = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
