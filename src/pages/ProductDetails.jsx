import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../redux/slices/productSlice";

function ProductDetails() {
  const [active, setActive] = useState(0);
  const { id } = useParams();

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  const product = products.find((item) => String(item.id) === id);

  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length, loading]);

  const galleryImages = [
    { label: "Main", image: "/images/keyboards/mechanical-1.jpg" },
    { label: "Front", image: "/images/keyboards/mechanical-2.jpg" },
    { label: "Side", image: "/images/keyboards/mechanical-3.jpg" },
    { label: "Back", image: "/images/keyboards/mechanical-4.jpg" },
    { label: "Desk View", image: "/images/keyboards/mechanical-5.jpg" },
  ];

  if (loading || products.length === 0) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white pt-32 text-center">
        Loading the product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#09090B] text-red-400 pt-32 text-center">
        Something went wrong: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white pt-32 text-center">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-8">
          Home <span className="mx-2">/</span>
          Shop <span className="mx-2">/</span>
          <span className="text-violet-400">{product.name}</span>
        </p>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Gallery */}
          <div className="bg-zinc-900/70 border border-white/5 rounded-2xl p-5 md:p-8">
            {/* Gallery Heading */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs text-gray-400 uppercase tracking-[0.2em]">
                Product Gallery
              </span>

              <span className="text-xs text-gray-500">
                {active + 1} / {galleryImages.length}
              </span>
            </div>

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-xl bg-[#111113] aspect-square">
              <img
                src={galleryImages[active].image}
                alt={galleryImages[active].label}
                className="w-full h-full object-contain p-8 md:p-12 transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-5 gap-2 md:gap-3 mt-5">
              {galleryImages.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => setActive(index)}
                  className={`rounded-lg overflow-hidden border transition-all duration-300 ${
                    active === index
                      ? "border-violet-400 bg-violet-400/10"
                      : "border-white/10 bg-[#111113] hover:border-violet-400/50"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full aspect-square object-contain p-2"
                  />

                  <span className="block text-[10px] md:text-xs text-gray-400 pb-2">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center py-4 lg:py-8">
            {/* Brand */}
            <p className="text-violet-400 text-sm uppercase tracking-[0.25em]">
              {product.brand || "GLIDE COLLECTION"}
            </p>

            {/* Product Name */}
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mt-5 leading-tight">
              {product.name}
            </h1>

            {/* Short Tagline */}
            <p className="text-gray-400 text-base md:text-lg mt-5 leading-relaxed">
              Designed for precision. Built for comfort. Experience a refined
              balance of performance, quality and everyday functionality.
            </p>

            {/* Price */}
            <div className="mt-8">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                Price
              </p>

              <p className="text-3xl font-semibold text-white">
                ₹{product.price}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 my-8"></div>

            {/* Description */}
            <div>
              <h2 className="text-sm uppercase tracking-widest text-gray-300 mb-4">
                About this product
              </h2>

              <p className="text-gray-400 leading-8 text-sm md:text-base">
                {product.description ||
                  "Crafted to elevate your everyday workspace, this product combines thoughtful design with reliable performance. Every detail is designed to deliver a seamless experience, making it a refined addition to your setup."}
              </p>
            </div>

            {/* Product Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-zinc-900 border border-white/5 rounded-xl p-4">
                <p className="text-violet-400 text-xs uppercase tracking-wider">
                  Design
                </p>
                <p className="text-sm text-gray-300 mt-2">Minimal & Refined</p>
              </div>

              <div className="bg-zinc-900 border border-white/5 rounded-xl p-4">
                <p className="text-violet-400 text-xs uppercase tracking-wider">
                  Experience
                </p>
                <p className="text-sm text-gray-300 mt-2">Built for Everyday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
