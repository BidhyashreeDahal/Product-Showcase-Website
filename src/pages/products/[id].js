// src/pages/products/[id].js

import { getProductById, getProducts } from "../../lib/contentful";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
    <div style={{ padding: 20 }}>
      <h1>{product.title}</h1>

      <p><strong>Author:</strong> {product.author}</p>
      <p style={{ maxWidth: 500 }}>{product.description}</p>

      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          style={{ width: 300, borderRadius: 10, marginTop: 20 }}
        />
      )}

      <hr style={{ margin: "30px 0" }} />

      {user && (
        <div>

          {/* ✅ EDIT allowed only for Admin OR product owner */}
          {(user.role === "admin" || user.email === product.author) && (
            <Link href={`/dashboard/edit/${product.id}`}>
              <button style={{ marginRight: 10 }}>Edit</button>
            </Link>
          )}

          {/* ✅ DELETE allowed only for Admin */}
          {user.role === "admin" && (
            <button
              onClick={handleDelete}
              style={{
                background: "red",
                color: "white",
                padding: "8px 15px",
                border: "none",
                borderRadius: 5,
              }}
            >
              Delete
            </button>
          )}

        </div>
      )}

      <br />
      <Link href="/products">← Back to Products</Link>
    </div>
  );
}
