import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addProduct, editProduct } from "../../redux/slices/productSlice";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500";

function ProductForm({ product, onClose }) {
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: product?.name ?? "",
    brand: product?.brand ?? "",
    category: product?.category ?? "keyboards",
    price: product?.price ?? "",
    originalPrice: product?.originalPrice ?? "",
    stockQuantity: product?.stockQuantity ?? "",
    image: product?.image ?? "",
    description: product?.description ?? "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const price = Number(form.price);
    const originalPrice = Number(form.originalPrice) || price;
    const stockQuantity = Number(form.stockQuantity);

    if (!form.name.trim() || !form.image.trim()) {
      toast.error("Name and image are required");
      return;
    }
    if (!(price > 0)) {
      toast.error("Price must be more than 0");
      return;
    }
    if (form.stockQuantity === "" || stockQuantity < 0) {
      toast.error("Enter a stock quantity of 0 or more");
      return;
    }

    const discount =
      originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    const data = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      category: form.category,
      price,
      originalPrice,
      discount,
      stockQuantity,
      inStock: stockQuantity > 0,
      image: form.image.trim(),
      description: form.description.trim(),
    };

    setSaving(true);

    try {
      if (product) {
        await dispatch(editProduct({ id: product.id, changes: data })).unwrap();
        toast.success("Product updated");
      } else {
        await dispatch(
          addProduct({
            ...data,
            sku: "",
            subCategory: "",
            rating: null,
            reviews: null,
            images: [],
            switches: [],
            colors: [],
          }),
        ).unwrap();
        toast.success("Product added");
      }
      onClose();
    } catch {
      toast.error("Could not save the product");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#111] p-6 text-white">
        <h2 className="text-xl font-bold">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            className={inputClass}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Brand"
              className={inputClass}
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="keyboards" className="bg-zinc-900">
                Keyboards
              </option>
              <option value="mice" className="bg-zinc-900">
                Mice
              </option>
              <option value="accessories" className="bg-zinc-900">
                Accessories
              </option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className={inputClass}
            />
            <input
              name="originalPrice"
              type="number"
              min="0"
              value={form.originalPrice}
              onChange={handleChange}
              placeholder="Original"
              className={inputClass}
            />
            <input
              name="stockQuantity"
              type="number"
              min="0"
              value={form.stockQuantity}
              onChange={handleChange}
              placeholder="Stock"
              className={inputClass}
            />
          </div>

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image path, e.g. /images/keychron-k2.jpg"
            className={inputClass}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className={inputClass}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/20 px-5 py-2.5 text-sm hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
