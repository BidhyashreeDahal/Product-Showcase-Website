import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateProduct() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");   // ← NEW
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        category,     // ← NEW REQUIRED FIELD
        image: imageUrl
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Error creating product");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Product</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>

        <div style={{ marginBottom: "10px" }}>
          <label>Title</label>
          <input
            style={{ width: "100%", padding: "8px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description</label>
          <textarea
            style={{ width: "100%", padding: "8px", height: "120px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* NEW CATEGORY FIELD */}
        <div style={{ marginBottom: "10px" }}>
          <label>Category (required)</label>
          <input
            style={{ width: "100%", padding: "8px" }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Image URL (optional)</label>
          <input
            style={{ width: "100%", padding: "8px" }}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
