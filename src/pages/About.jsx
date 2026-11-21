import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Headphones,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Hand-picked gear",
    text: "Every keyboard, mouse and accessory is chosen for build quality and real-world feel, not just a spec sheet.",
  },
  {
    icon: ShieldCheck,
    title: "100% genuine products",
    text: "We list only authentic products from trusted brands, so what you order is exactly what you get.",
  },
  {
    icon: Truck,
    title: "Free shipping",
    text: "No hidden delivery charges. The price you see in your cart is the price you pay.",
  },
  {
    icon: RotateCcw,
    title: "Easy order control",
    text: "Changed your mind? Cancel a placed order in one click from your Orders page.",
  },
  {
    icon: Headphones,
    title: "Built for your desk",
    text: "From gaming to work, we help you build a setup that fits the way you actually use it.",
  },
  {
    icon: Sparkles,
    title: "Premium experience",
    text: "A fast, clean store with a personal cart, wishlist and order history that stay yours.",
  },
];

const brands = ["Keychron", "AULA", "Razer", "Logitech", "Kreo", "GravaStar"];

function About() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <section className="relative overflow-hidden px-6 pb-20 pt-40 text-center">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/30 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-violet-400">
            About GLIDE
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
            Gear that makes every day at your desk{" "}
            <span className="font-medium italic text-violet-400">better.</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-400">
            GLIDE is a store for people who care about how their setup feels:
            the click of a keyboard, the glide of a mouse, the details that turn
            a desk into a workspace.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 md:p-12">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-violet-400">
            Our story
          </p>

          <h2 className="mt-4 text-2xl font-bold md:text-4xl">
            Built by people who love their setup
          </h2>

          <p className="mt-6 leading-8 text-gray-400">
            We started GLIDE because finding good keyboards, mice and desk
            accessories was harder than it should be. Too many options, too
            little honest information. So we built a store that keeps it simple:
            quality products, clear prices and a smooth experience from the
            first click to the doorstep.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="text-center">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-violet-400">
            Why choose us
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Six reasons to shop with GLIDE
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group rounded-2xl border border-white/10 bg-zinc-900/50 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                <Icon size={22} />
              </div>

              <h3 className="mt-5 text-lg font-semibold">{title}</h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <p className="text-center font-mono text-sm uppercase tracking-[0.25em] text-gray-500">
          Brands we carry
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {brands.map((brand) => (
            <span
              key={brand}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-gray-300"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-28">
        <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 p-10 text-center md:p-14">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to upgrade your setup?
          </h2>

          <p className="mt-4 text-gray-400">
            Explore the collection and find the gear that fits you.
          </p>

          <Link
            to="/shop"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-medium text-black transition-all duration-300 hover:bg-violet-400"
          >
            Shop Now
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
