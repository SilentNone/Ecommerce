import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../services/productService";
import {
  addProducts,
  updateProduct,
  deleteProduct,
} from "../../admin/services/adminProductService";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    return await fetchProducts();
  },
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => await addProducts(product),
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, changes }) => await updateProduct(id, changes),
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id) => await deleteProduct(id),
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
      })

      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id,
        );

        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
