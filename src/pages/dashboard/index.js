// src/pages/dashboard/index.js
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatPrice } from "../../lib/formatting";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function loadDashboard() {
      // Load logged-in user
      const userRes = await fetch("/api/auth/me");
      const userData = await userRes.json();

      if (!userData.authenticated) {
        router.push("/login");
        return;
      }

      setUser(userData.user);

      // ----------------------------------
      // Load correct products based on role
      // ----------------------------------

      let res;

      if (userData.user.role === "admin") {
        // Admin → load ALL products
        res = await fetch("/api/posts/all");
      } else {
        // Author → load ONLY their products
        res = await fetch("/api/posts/list");
      }

      const data = await res.json();
      setProducts(data.products || []);
    }

    loadDashboard();
  }, []);


  return (
    <div className="bg-[#f7f2ea] coffee-pattern">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
          Dashboard
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold text-[#2f241f]">Your coffee bar</h1>
          <span className="rounded-full bg-[#f3e7da] px-3 py-1 text-xs font-semibold text-[#7a5d4a]">
            {user?.email}
          </span>
          <span className="rounded-full bg-[#f3e7da] px-3 py-1 text-xs font-semibold text-[#7a5d4a]">
            {user?.role}
          </span>
        </div>

        {(user?.role === "author" || user?.role === "admin") && (
          <Link
            href="/dashboard/create"
            className="mt-6 inline-flex rounded-full bg-[#a8703a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#94612f]"
          >
            Create New Product
          </Link>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-[#2f241f]">Your Products</h2>
          {products.length === 0 && (
            <p className="mt-2 text-sm text-[#6b5446]">No products found.</p>
          )}

          <div className="mt-4 grid gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-[#eadfce] bg-white p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#2f241f]">{p.title}</h3>
                    <p className="mt-1 text-sm text-[#6b5446]">
                      {p.description?.substring(0, 80)}...
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#7a5d4a]">
                      {p.category && (
                        <span className="rounded-full bg-[#f3e7da] px-3 py-1">
                          {p.category}
                        </span>
                      )}
                      <span>{formatPrice(p.price)}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/products/${p.id}`}
                      className="rounded-full border border-[#eadfce] bg-white px-3 py-1 text-sm font-semibold text-[#2f241f] hover:bg-[#f1e4d6]"
                    >
                      View
                    </Link>
                    {(user?.email === p.author || user?.role === "admin") && (
                      <Link
                        href={`/dashboard/edit/${p.id}`}
                        className="rounded-full border border-[#eadfce] bg-white px-3 py-1 text-sm font-semibold text-[#2f241f] hover:bg-[#f1e4d6]"
                      >
                        Edit
                      </Link>
                    )}
                    {user?.role === "admin" && (
                      <button
                        className="rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700"
                        onClick={async () => {
                          if (!confirm("Delete this product?")) return;

                          const res = await fetch("/api/posts/delete", {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: p.id }),
                          });

                          if (res.ok) {
                            setProducts((prev) =>
                              prev.filter((item) => item.id !== p.id)
                            );
                          } else {
                            alert("Delete failed");
                          }
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
