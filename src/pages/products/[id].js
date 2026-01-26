// src/pages/products/[id].js

import { getProductById, getProducts } from "../../lib/contentful";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCoffeeImage } from "../../lib/coffee-images";
import { formatPrice } from "../../lib/formatting";
import { useCart } from "../../components/CartContext";

function getHighlights(category) {
  const value = (category || "").toLowerCase();
  if (value.includes("ceramic")) {
    return [
      "Heat-safe glaze with a soft matte finish.",
      "Balanced weight for daily use on the counter.",
      "Pairs well with the Brewline pour-over lineup.",
    ];
  }
  if (value.includes("storage")) {
    return [
      "Keeps beans fresh with minimal air exposure.",
      "Clean silhouette that fits open shelving.",
      "Easy to wipe and refill between roasts.",
    ];
  }
  if (value.includes("accessories")) {
    return [
      "Lightweight tools designed for daily prep.",
      "Compact footprint for small brew stations.",
      "Complements any Brewline ceramic set.",
    ];
  }
  return [
    "Built for consistent, repeatable brews.",
    "Thoughtful details for calm morning routines.",
    "Matches the Brewline neutral palette.",
  ];
}

function getBestFor(category) {
  const value = (category || "").toLowerCase();
  if (value.includes("ceramic")) {
    return ["Morning lattes", "Shared tables", "Slow sips"];
  }
  if (value.includes("storage")) {
    return ["Fresh beans", "Tidy counters", "Small kitchens"];
  }
  if (value.includes("accessories")) {
    return ["Daily prep", "Compact setups", "Gifting"];
  }
  return ["Pour-over", "Dialed recipes", "Weekend brews"];
}

function getInBox(category) {
  const value = (category || "").toLowerCase();
  if (value.includes("ceramic")) {
    return ["1× Ceramic piece", "Care card"];
  }
  if (value.includes("storage")) {
    return ["1× Storage container", "Aroma seal guide"];
  }
  if (value.includes("accessories")) {
    return ["1× Accessory", "Quick start card"];
  }
  return ["1× Brew tool", "Quick start card"];
}

function getSizeWeight(category) {
  const value = (category || "").toLowerCase();
  if (value.includes("ceramic")) {
    return "Approx. 9cm × 9cm · 380g";
  }
  if (value.includes("storage")) {
    return "Approx. 12cm × 12cm · 420g";
  }
  if (value.includes("accessories")) {
    return "Approx. 16cm × 4cm · 120g";
  }
  return "Approx. 22cm × 12cm · 650g";
}

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
  const { addItem } = useCart();

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
      <Head>
        <title>{product.title} | Brewline Supply</title>
        <meta
          name="description"
          content={`Coffee bar essential: ${product.title}. ${product.description}`}
        />
        <meta property="og:title" content={`${product.title} | Brewline Supply`} />
        <meta
          property="og:description"
          content={`Coffee bar essential: ${product.title}.`}
        />
        <meta property="og:image" content={product.image || getCoffeeImage(product)} />
      </Head>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <img
            src={product.image || getCoffeeImage(product)}
            alt={product.title}
            className="h-72 w-full rounded-3xl object-cover"
          />

          <div className="rounded-3xl border border-[#eadfce] bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
              Product
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-[#2f241f]">
              {product.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#6b5446]">
              <span className="rounded-full bg-[#f3e7da] px-3 py-1 text-[#7a5d4a]">
                {product.category || "Coffee gear"}
              </span>
              <span className="text-[#7a5d4a]">{formatPrice(product.price)}</span>
            </div>
            <p className="mt-3 text-sm text-[#6b5446]">{product.description}</p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => addItem(product)}
                className="rounded-full bg-[#a8703a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#94612f]"
              >
                Add to Cart
              </button>
              {user && (user.role === "admin" || user.email === product.author) && (
                <Link href={`/dashboard/edit/${product.id}`}>
                  <button className="rounded-full border border-[#eadfce] bg-white px-4 py-2 text-sm font-semibold text-[#2f241f] hover:bg-[#f1e4d6]">
                    Edit
                  </button>
                </Link>
              )}
              {user?.role === "admin" && (
                <button
                  onClick={handleDelete}
                  className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>

            <div className="mt-4 grid gap-3 text-sm text-[#6b5446] lg:grid-cols-2">
              <div className="rounded-2xl border border-[#eadfce] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7a63]">
                  Highlights
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {getHighlights(product.category).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#eadfce] bg-[#fdf8f2] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7a63]">
                  Customer notes
                </p>
                <p className="mt-2 text-sm text-[#4b372d]">
                  “Feels sturdy and looks great on the counter.”
                </p>
                <p className="mt-2 text-xs text-[#6b5446]">
                  “Arrived fast and the packaging was thoughtful.”
                </p>
              </div>
              <div className="rounded-2xl border border-[#eadfce] bg-white p-4 lg:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7a63]">
                  In the box
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {getInBox(product.category).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

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
