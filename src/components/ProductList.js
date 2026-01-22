import Link from "next/link";

export default function ProductList({ products }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col overflow-hidden rounded-2xl border border-[#eadfce] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="h-44 w-full object-cover"
            />
          ) : (
            <div className="flex h-44 items-center justify-center bg-gradient-to-br from-[#f3e7da] to-[#fff6ec] text-4xl font-semibold text-[#b59a87]">
              {product.title?.slice(0, 1) || "C"}
            </div>
          )}
          <div className="flex-1 p-5">
            <h2 className="text-lg font-semibold text-[#2f241f]">{product.title}</h2>
            <p className="mt-1 text-sm text-[#6b5446]">By: {product.author}</p>
          </div>
          <div className="px-5 pb-5">
            <Link
              href={`/products/${product.id}`}
              className="inline-flex w-full items-center justify-center rounded-full border border-[#eadfce] bg-[#fdf8f2] px-4 py-2 text-sm font-semibold text-[#2f241f] hover:bg-[#f1e4d6]"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
