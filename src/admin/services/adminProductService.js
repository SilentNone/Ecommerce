import api from "../../services/api";

export const addProducts = async (product) => {
  const response = await api.post("/products", product);
  return response.data;
};
export const updateProduct = async (id, changes) => {
  const response = await api.patch(`/products/${id}`, changes);
  return response.data;
};
export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
  return id;
};
