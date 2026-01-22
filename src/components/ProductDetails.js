import { getCoffeeImage } from "../lib/coffee-images";
import { formatPrice } from "../lib/formatting";

function getHighlights(category) {
  const value = (category || "").toLowerCase();
  if (value.includes("ceramic")) {
    return [
      "Heat-safe glaze with a soft matte finish.",
      "Balanced weight for daily use on the counter.",
      "Pairs well with the Brewline pour-over lineup.",
    ];
  }
  if (value.includes("storage")) {
    return [
      "Keeps beans fresh with minimal air exposure.",
      "Clean silhouette that fits open shelving.",
      "Easy to wipe and refill between roasts.",
    ];
  }
  if (value.includes("accessories")) {
    return [
      "Lightweight tools designed for daily prep.",
      "Compact footprint for small brew stations.",
      "Complements any Brewline ceramic set.",
    ];
  }
  return [
    "Built for consistent, repeatable brews.",
    "Thoughtful details for calm morning routines.",
    "Matches the Brewline neutral palette.",
  ];
}

export default function ProductDetail({ product }) {
  if (!product) {
    return <p className="text-[#6b5446]">Product not found.</p>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <img
          src={product.image || getCoffeeImage(product)}
          alt={product.title}
          className="h-72 w-full rounded-3xl object-cover"
        />
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
            Product
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#2f241f]">
            {product.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#6b5446]">
            <span className="rounded-full bg-[#f3e7da] px-3 py-1 text-[#7a5d4a]">
              {product.category || "Coffee gear"}
            </span>
            <span className="text-[#7a5d4a]">{formatPrice(product.price)}</span>
          </div>
          <p className="mt-4 text-sm text-[#6b5446]">{product.description}</p>

          <div className="mt-5 rounded-2xl border border-[#eadfce] bg-white p-4 text-sm text-[#6b5446]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7a63]">
              Highlights
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {getHighlights(product.category).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
