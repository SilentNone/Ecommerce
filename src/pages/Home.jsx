import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../redux/slices/productSlice";
import heroImage from "../assets/Heroimg.jpeg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../constants/categories";

function Home() {
  
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <section className="min-h-screen relative flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#09090B] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-24">
          <p className="font-mono uppercase tracking-[0.25em] text-xs md:text-sm text-violet-400 animate-pulse">
            KEYBOARDS · MOUSE · WORKSPACE ESSENTIALS
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mt-8 max-w-3xl">
            Elevate Your Everyday{" "}
            <span className="italic font-medium text-violet-400">Setup.</span>
          </h1>
          <p className="text-gray-400 text-lg mt-8 max-w-xl leading-relaxed">
            Technology meets personal expression. Discover accessories designed
            around your workspace.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <button className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-violet-400 hover:text-black">
              Explore Collection{" "}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button className="border border-white/20 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:border-violet-400">
              Build Your Setup
            </button>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <p className="font-mono uppercase tracking-[0.25em] text-sm text-violet-400">
          Collections
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mt-4">
          Shop by category
        </h2>

        <div className="grid gap-6 mt-12 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
