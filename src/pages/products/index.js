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
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
      <ProductList products={paginated} />

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span>Page {page} of {totalPages}</span>

        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
