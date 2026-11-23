import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { getProducts } from "../redux/slices/productSlice";
import heroImage from "../assets/Heroimg.jpeg";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { categories } from "../constants/categories";

function Home() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length, loading]);

  const featured = products
    .filter((product) => product.price > 0 && product.inStock)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#09090B] to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
          <p className="animate-pulse font-mono text-xs uppercase tracking-[0.25em] text-violet-400 md:text-sm">
            KEYBOARDS · MICE · ACCESSORIES
          </p>

          <h1 className="mt-8 max-w-3xl text-5xl font-bold leading-[1.05] md:text-7xl">
            Elevate Your Everyday{" "}
            <span className="font-medium italic text-violet-400">Setup.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-400">
            Technology meets personal expression. Discover accessories designed
            around your workspace.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 font-medium text-black transition-all duration-300 hover:bg-violet-400"
            >
              Explore Collection
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/shop/accessories"
              className="rounded-full border border-white/20 px-8 py-4 font-medium transition-all duration-300 hover:border-violet-400 hover:text-violet-300"
            >
              Build Your Setup
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-violet-400">
          Collections
        </p>

        <h2 className="mt-4 text-3xl font-bold md:text-5xl">
          Shop by category
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-violet-400">
              Featured
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Trending right now
            </h2>
          </div>

          <Link
            to="/shop"
            className="group hidden items-center gap-2 text-gray-400 transition-colors hover:text-white md:flex"
          >
            View all
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {loading ? (
          <p className="mt-12 text-gray-400">Loading products...</p>
        ) : error ? (
          <p className="mt-12 text-gray-400">
            Unable to load products. Please try again.
          </p>
        ) : featured.length === 0 ? (
          <p className="mt-12 text-gray-400">No products available yet.</p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
