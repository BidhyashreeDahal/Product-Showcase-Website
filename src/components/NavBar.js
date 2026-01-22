// src/components/Navbar.js
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load user function
  async function loadUser() {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    if (data.authenticated) setUser(data.user);
    else setUser(null);
  }

  // Load user on first render
  useEffect(() => {
    loadUser();
  }, []);

  // ⬅️ The FIX: Re-run when the route changes
  useEffect(() => {
    const handleRouteChange = () => loadUser();
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    loadUser();
    router.push("/");
  }

  return (
    <nav
      style={{
        padding: "16px",
        background: "#131212ff",
        borderBottom: "1px solid #0a0a0aff",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link href="/">Home</Link>
      <Link href="/products">Products</Link>
      <Link href="/about">About</Link>

      {/* Dashboard (admin + author only) */}
      {user && (user.role === "admin" || user.role === "author") && (
        <Link href="/dashboard">Dashboard</Link>
      )}

      {/* Right side */}
      {user ? (
        <>
          <span style={{ marginLeft: "auto", opacity: 0.8 }}>
            {user.email} ({user.role})
          </span>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "10px",
              padding: "4px 10px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <Link href="/login" style={{ marginLeft: "auto" }}>
          Login
        </Link>
      )}
    </nav>
  );
}
