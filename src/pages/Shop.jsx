import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { getProducts } from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";
import { categories } from "../constants/categories";
import { Search } from "lucide-react";

const PER_PAGE = 8;

function Shop() {
  const { category: urlCategory } = useParams();

  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(urlSearch);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);
  const dispatch = useDispatch();

  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState(urlCategory || "all");
  const [page, setPage] = useState(1);

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    setCategory(urlCategory || "all");
  }, [urlCategory]);

  useEffect(() => {
    setPage(1);
  }, [search, sort, category]);

  const filtered = products
    .filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === "low-to-high") {
        if (!a.price) return 1;
        if (!b.price) return -1;
        return a.price - b.price;
      }

      if (sort === "high-to-low") {
        if (!a.price) return 1;
        if (!b.price) return -1;
        return b.price - a.price;
      }

      return 0;
    });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visibleProducts = filtered.slice(start, start + PER_PAGE);

  const categoryName =
    category === "all"
      ? "All Products"
      : categories.find((item) => item.slug === category)?.name ||
        category.replaceAll("-", " ");

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-28 text-white">
      <p className="font-mono text-sm uppercase tracking-widest text-gray-400">
        Shop
      </p>

      <h1 className="mt-3 text-3xl font-bold capitalize md:text-5xl">
        {categoryName}
      </h1>

      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-12 pr-5 outline-none transition focus:border-white/50"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border border-white/10 bg-zinc-900 px-5 py-3 outline-none focus:border-white/50"
        >
          <option value="default">Sort: Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => setCategory("all")}
          className={`rounded-full border px-5 py-2 text-sm transition ${
            category === "all"
              ? "border-white bg-white text-black"
              : "border-white/10 text-gray-400 hover:border-white hover:text-white"
          }`}
        >
          All
        </button>

        {categories.map((item) => (
          <button
            key={item.slug}
            onClick={() => setCategory(item.slug)}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              category === item.slug
                ? "border-white bg-white text-black"
                : "border-white/10 text-gray-400 hover:border-white hover:text-white"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {(loading || (products.length === 0 && !error)) && (
        <p className="mt-12 text-gray-400">Loading products...</p>
      )}

      {error && <p className="mt-12 text-gray-400">{error}</p>}

      {!loading && !error && products.length > 0 && filtered.length === 0 && (
        <p className="mt-12 text-gray-400">No products found.</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <p className="mt-8 text-sm text-gray-400">
            {filtered.length} products
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

      {totalPages > 1 && (
        <div className="mt-14 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="rounded-full border border-white/10 px-5 py-2 text-sm transition hover:border-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`h-10 w-10 rounded-full text-sm transition ${
                page === num
                  ? "bg-white text-black"
                  : "border border-white/10 text-gray-400 hover:border-white hover:text-white"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="rounded-full border border-white/10 px-5 py-2 text-sm transition hover:border-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Shop;
