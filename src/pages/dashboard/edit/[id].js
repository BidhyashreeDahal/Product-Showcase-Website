// src/pages/dashboard/edit/[id].js

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [version, setVersion] = useState(null);
  const [error, setError] = useState("");

  // Load product from API
  useEffect(() => {
    if (!id) return;

    async function loadProduct() {
      try {
        const res = await fetch(`/api/posts/get?id=${id}`);
        const data = await res.json();

        if (!data.product) {
          setError("Product not found");
        } else {
          setProduct(data.product);
          setTitle(data.product.title);
          setDescription(data.product.description);
          setCategory(data.product.category || "");
          setPrice(
            data.product.price === null || data.product.price === undefined
              ? ""
              : String(data.product.price)
          );
          setVersion(data.product.version);
        }
      } catch (err) {
        setError("Failed to load product");
      }

      setLoading(false);
    }

    loadProduct();
  }, [id]);

  async function handleSave() {
  setError("");

  const res = await fetch("/api/posts/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      title,
      description,
      category,
      price,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    setError(data.message || "Update failed");
    return;
  }

  alert("Product updated successfully!");

  // Redirect to product detail page
  router.push("/dashboard");

}

  if (loading) return <p className="px-6 py-10 text-[#6b5446]">Loading...</p>;
  if (error) return <p className="px-6 py-10 text-red-600">{error}</p>;

  return (
    <div className="bg-[#f7f2ea] coffee-pattern">
      <div className="mx-auto max-w-2xl px-6 py-14">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#2f241f]">
            Edit Product
          </h1>

          <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-[#7a5d4a]">
            <span className="rounded-full bg-[#f3e7da] px-3 py-1">ID: {id}</span>
            <span className="rounded-full bg-[#f3e7da] px-3 py-1">
              Author: {product.author}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#2f241f]">Title</label>
              <input
                className="mt-2 w-full rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#2f241f]">Description</label>
              <textarea
                className="mt-2 h-32 w-full rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#2f241f]">Category</label>
              <input
                className="mt-2 w-full rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#2f241f]">Price</label>
              <input
                className="mt-2 w-full rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                step="0.01"
                min="0"
              />
            </div>

            <button
              className="rounded-full bg-[#a8703a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#94612f]"
              onClick={handleSave}
            >
              Save
            </button>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
