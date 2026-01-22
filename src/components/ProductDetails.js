export default function ProductDetail({ product }) {
  if (!product) {
    return <p className="text-[#6b5446]">Product not found.</p>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-72 w-full rounded-3xl object-cover"
          />
        ) : (
          <div className="flex h-72 items-center justify-center rounded-3xl bg-gradient-to-br from-[#f3e7da] to-[#fff6ec] text-4xl font-semibold text-[#b59a87]">
            {product.title?.slice(0, 1) || "C"}
          </div>
        )}
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
            Product
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#2f241f]">
            {product.title}
          </h1>
          <p className="mt-2 text-sm font-semibold text-[#6b5446]">
            Author: {product.author}
          </p>
          <p className="mt-4 text-sm text-[#6b5446]">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
