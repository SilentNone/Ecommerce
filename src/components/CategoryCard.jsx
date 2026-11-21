import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/shop/${category.slug}`}
      className="group relative block h-96 overflow-hidden rounded-3xl border border-white/10"
    >
      <img
        src={category.image}
        alt={category.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-sm font-medium text-gray-300">{category.tagline}</p>

        <h3 className="mt-1 text-2xl font-bold text-white drop-shadow-lg">
          {category.name}
        </h3>

        <span className="mt-4 inline-flex translate-y-4 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Shop Now <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}

export default CategoryCard;
