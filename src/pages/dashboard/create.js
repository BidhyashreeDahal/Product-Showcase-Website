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
    <div className="bg-[#f7f2ea] coffee-pattern">
      <div className="mx-auto max-w-2xl px-6 py-14">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#2f241f]">
            Create Product
          </h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#2f241f]">Title</label>
              <input
                className="mt-2 w-full rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#2f241f]">Description</label>
              <textarea
                className="mt-2 h-32 w-full rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#2f241f]">
                Category (required)
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#2f241f]">
                Image URL (optional)
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="rounded-full bg-[#a8703a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#94612f]"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
