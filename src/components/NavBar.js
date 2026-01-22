// src/components/Navbar.js
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "./CartContext";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { itemCount } = useCart();

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
    <nav className="sticky top-0 z-20 border-b border-[#eadfce] bg-[#3b2a22]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="text-lg">☕</span>
          <span className="text-base font-semibold tracking-wide">Brewline Supply</span>
        </Link>

        <div className="flex items-center gap-4 text-sm text-[#f6eee5]">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/products" className="hover:text-white">Shop</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/faq" className="hover:text-white">FAQ</Link>
          {user && (user.role === "admin" || user.role === "author") && (
            <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3 text-xs text-[#eadfce]">
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full border border-[#5a4235] px-3 py-1 text-sm font-semibold text-[#f6eee5] hover:border-[#d1a374]"
          >
            Cart
            <span className="rounded-full bg-[#d1a374] px-2 py-0.5 text-xs font-semibold text-[#3b2a22]">
              {itemCount}
            </span>
          </Link>
          {user ? (
            <>
              <span className="hidden sm:block">{user.email} ({user.role})</span>
              <button
                onClick={handleLogout}
                className="rounded-full bg-[#d1a374] px-3 py-1 text-sm font-semibold text-[#3b2a22] hover:bg-[#c39263]"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-[#d1a374] px-3 py-1 text-sm font-semibold text-[#3b2a22] hover:bg-[#c39263]"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
