// src/pages/dashboard/index.js
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <p>Logged in as: {user?.email}</p>
      <p>Role: {user?.role}</p>

      {/* Author + Admin → Create new */}
      {(user?.role === "author" || user?.role === "admin") && (
        <Link href="/dashboard/create">
          <button style={{ marginTop: 10 }}>Create New Product</button>
        </Link>
      )}

      <hr style={{ margin: "20px 0" }} />

      <h2>Your Products</h2>

      {products.length === 0 && (
        <p>No products found.</p>
      )}

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 8,
          }}
        >
          <h3>{p.title}</h3>
          <p>{p.description?.substring(0, 80)}...</p>

          <Link href={`/products/${p.id}`}>
            <button style={{ marginRight: 10 }}>View</button>
          </Link>

          {/* Edit: Owner OR Admin */}
          {(user?.email === p.author || user?.role === "admin") && (
            <Link href={`/dashboard/edit/${p.id}`}>
              <button style={{ marginRight: 10 }}>Edit</button>
            </Link>
          )}

          {/* Delete: Admin ONLY */}
          {user?.role === "admin" && (
            <button
              style={{ background: "red", color: "white" }}
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
      ))}
    </div>
  );
}
