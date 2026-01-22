import React from "react";
import ProductList from "../../components/ProductList";
import { getProducts } from "../../lib/contentful";
import BeanIcon from "../../components/icons/BeanIcon";

export async function getStaticProps() {
  const products = await getProducts();
  return { props: { products } };
}

export default function ProductsPage({ products }) {
  const pageSize = 6;
  const [page, setPage] = React.useState(1);
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [query, setQuery] = React.useState("");

  const categories = React.useMemo(() => {
    const values = products
      .map((product) => product.category)
      .filter((value) => value && value.trim().length > 0);
    return ["all", ...Array.from(new Set(values))];
  }, [products]);

  const filtered = products.filter((product) => {
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesQuery =
      !query ||
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginated = filtered.slice(start, end);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  return (
    <div className="bg-[#f7f2ea] coffee-pattern">
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

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#7a5d4a]">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f3e7da] px-3 py-1">
            <BeanIcon className="h-3.5 w-3.5" />
            Beans
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f3e7da] px-3 py-1">
            <BeanIcon className="h-3.5 w-3.5" />
            Pour-over
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f3e7da] px-3 py-1">
            <BeanIcon className="h-3.5 w-3.5" />
            Ceramics
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="min-w-[180px]">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7a63]">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(event) => {
                setCategoryFilter(event.target.value);
                setPage(1);
              }}
              className="mt-2 w-full rounded-xl border border-[#eadfce] bg-white px-3 py-2 text-sm text-[#2f241f]"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All categories" : category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[220px]">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7a63]">
              Search
            </label>
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search by product name"
              className="mt-2 w-full rounded-xl border border-[#eadfce] bg-white px-3 py-2 text-sm text-[#2f241f]"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Shop the counter",
              text: "Ceramics, mugs, and serving pieces in warm tones.",
            },
            {
              title: "Shop the brew",
              text: "Kettles, drippers, and scales for precise pours.",
            },
            {
              title: "Shop the beans",
              text: "Storage tins, scoops, and freshness tools.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#eadfce] bg-white p-5"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-[#2f241f]">
                <BeanIcon className="h-4 w-4 text-[#a8703a]" />
                {item.title}
              </div>
              <p className="mt-2 text-sm text-[#6b5446]">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-[#eadfce] bg-white p-6 text-sm text-[#6b5446]">
              No products match your filters. Try a different category or search.
            </div>
          ) : (
            <ProductList products={paginated} />
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#6b5446]">
          <span>
            Showing {filtered.length} item{filtered.length === 1 ? "" : "s"}
          </span>
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
