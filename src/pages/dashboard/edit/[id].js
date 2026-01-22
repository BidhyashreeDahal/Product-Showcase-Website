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

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit Product</h1>

      <p>
        <strong>ID:</strong> {id}
      </p>
      <p>
        <strong>Author:</strong> {product.author}
      </p>

      <div style={{ marginTop: 20 }}>
        <label>Title</label>
        <input
          style={{ display: "block", width: 300, padding: 8 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label>Description</label>
        <textarea
          style={{ display: "block", width: 300, padding: 8 }}
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button
        style={{ marginTop: 20, padding: "10px 20px" }}
        onClick={handleSave}
      >
        Save
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
