// src/pages/products/[id].js

import { getProductById, getProducts } from "../../lib/contentful";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCoffeeImage } from "../../lib/coffee-images";

export async function getStaticPaths() {
  const products = await getProducts();

  const paths = products.map((p) => ({
    params: { id: p.id },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const product = await getProductById(params.id);

  if (!product) {
    return { notFound: true };
  }

  // FIX: avoid undefined crashing Next.js
  product.version = product.version ?? null;

  return {
    props: { product },
    revalidate: 60,
  };
}

export default function ProductDetail({ product }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Fetch logged in user
  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (data.authenticated) {
        setUser(data.user);
      }
    }
    loadUser();
  }, []);


  // --------------------------------------------
  // DELETE PRODUCT (Admins only — protected API)
  // --------------------------------------------
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch("/api/posts/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: product.id }),
    });

    if (res.ok) {
      alert("Product deleted!");
      router.push("/dashboard");
    } else {
      alert("Delete failed");
    }
  }


  // --------------------------------------------
  // UI RENDER
  // --------------------------------------------
  return (
    <div className="bg-[#f7f2ea] coffee-pattern">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <img
            src={product.image || getCoffeeImage(product)}
            alt={product.title}
            className="h-96 w-full rounded-3xl object-cover"
          />

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

            {user && (
              <div className="mt-6 flex flex-wrap gap-3">
                {(user.role === "admin" || user.email === product.author) && (
                  <Link href={`/dashboard/edit/${product.id}`}>
                    <button className="rounded-full border border-[#eadfce] bg-white px-4 py-2 text-sm font-semibold text-[#2f241f] hover:bg-[#f1e4d6]">
                      Edit
                    </button>
                  </Link>
                )}

                {user.role === "admin" && (
                  <button
                    onClick={handleDelete}
                    className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}

            <Link
              href="/products"
              className="mt-6 inline-flex text-sm font-semibold text-[#a8703a]"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
