import Link from "next/link";
import { getCoffeeImage } from "../lib/coffee-images";
import { formatPrice } from "../lib/formatting";
import { useCart } from "./CartContext";

export default function ProductList({ products }) {
  const { addItem } = useCart();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col overflow-hidden rounded-2xl border border-[#eadfce] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <img
            src={product.image || getCoffeeImage(product)}
            alt={product.title}
            className="h-44 w-full object-cover"
          />
          <div className="flex-1 p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-[#2f241f]">{product.title}</h2>
              <span className="text-sm font-semibold text-[#7a5d4a]">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.category && (
              <span className="mt-2 inline-flex rounded-full bg-[#f3e7da] px-3 py-1 text-xs font-semibold text-[#7a5d4a]">
                {product.category}
              </span>
            )}
          </div>
          <div className="px-5 pb-5 space-y-2">
            <Link
              href={`/products/${product.id}`}
              className="inline-flex w-full items-center justify-center rounded-full border border-[#eadfce] bg-[#fdf8f2] px-4 py-2 text-sm font-semibold text-[#2f241f] hover:bg-[#f1e4d6]"
            >
              View Details
            </Link>
            <button
              onClick={() => addItem(product)}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#a8703a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#94612f]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
