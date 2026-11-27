import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, Pencil, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { getProducts, removeProduct } from "../../redux/slices/productSlice";
import ProductForm from "../components/ProductForm";

const PER_PAGE = 10;

function AdminProducts() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  const totalPages = Math.max(1, Math.ceil(products.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const visibleProducts = products.slice(start, start + PER_PAGE);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setFormOpen(true);
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"?`)) return;

    try {
      await dispatch(removeProduct(product.id)).unwrap();
      toast.success("Product deleted");
    } catch {
      toast.error("Could not delete the product");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-gray-400">{products.length} products</p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {loading && <p className="mt-8 text-gray-400">Loading products...</p>}

      {error && <p className="mt-8 text-red-400">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="mt-8 text-gray-400">No products found.</p>
      )}

      {products.length > 0 && (
        <>
          <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-white/5 text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Image</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-white/10 hover:bg-white/5"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg bg-white/5 object-cover"
                      />
                    </td>

                    <td className="max-w-xs px-4 py-3">
                      <p className="truncate font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </td>

                    <td className="px-4 py-3 capitalize text-gray-300">
                      {product.category}
                    </td>

                    <td className="px-4 py-3">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-3">
                      {product.inStock ? (
                        <span className="text-gray-300">
                          {product.stockQuantity}
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-400">
                          Out of stock
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          aria-label="Edit product"
                          className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-white/10"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
                          aria-label="Delete product"
                          className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/10"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>

              <span className="px-3 text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {formOpen && (
        <ProductForm product={editing} onClose={() => setFormOpen(false)} />
      )}
    </div>
  );
}
export default AdminProducts;
