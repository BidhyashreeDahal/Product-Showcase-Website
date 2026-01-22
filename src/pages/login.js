// src/pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@blog.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed");
        return;
      }

      // Login success → go home
      router.push("/");
    } catch (err) {
      setError("Something went wrong");
    }
  }

  return (
    <div className="bg-[#f7f2ea] coffee-pattern">
      <div className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
            Account
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#2f241f]">Login</h1>
          <p className="mt-2 text-sm text-[#6b5446]">
            Use one of: admin@blog.com / author@blog.com / viewer@blog.com
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#2f241f]">Email</label>
              <input
                className="mt-2 w-full rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm text-[#2f241f] focus:outline-none focus:ring-2 focus:ring-[#d1a374]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#2f241f]">Password</label>
              <input
                className="mt-2 w-full rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm text-[#2f241f] focus:outline-none focus:ring-2 focus:ring-[#d1a374]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-full bg-[#a8703a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#94612f]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
