import React from "react";
import ProductList from "../../components/ProductList";
import { getProducts } from "../../lib/contentful";

export async function getStaticProps() {
  const products = await getProducts();
  return { props: { products } };
}

export default function ProductsPage({ products }) {
  const pageSize = 6;
  const [page, setPage] = React.useState(1);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginated = products.slice(start, end);

  const totalPages = Math.ceil(products.length / pageSize);

  return (
    <div className="bg-[#f7f2ea]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
          Coffee Bar
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[#2f241f]">
          Brewline essentials for slower mornings.
        </h1>
        <p className="mt-3 text-lg text-[#6b5446]">
          From pour-over tools to warm ceramics, each piece is designed to
          feel intentional on your counter.
        </p>

        <div className="mt-6 flex items-center gap-3 text-sm text-[#7a5d4a]">
          <span className="rounded-full bg-[#f3e7da] px-3 py-1">Beans</span>
          <span className="rounded-full bg-[#f3e7da] px-3 py-1">Pour-over</span>
          <span className="rounded-full bg-[#f3e7da] px-3 py-1">Ceramics</span>
        </div>

        <div className="mt-8">
          <ProductList products={paginated} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#6b5446]">
          <button
            className="rounded-full border border-[#eadfce] bg-white px-4 py-2 font-semibold text-[#2f241f] disabled:opacity-40"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            className="rounded-full bg-[#a8703a] px-4 py-2 font-semibold text-white disabled:opacity-40"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
