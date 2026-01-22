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
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>
      <p>Use one of: admin@blog.com / author@blog.com / viewer@blog.com</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: 320 }}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <input
            style={{ display: "block", width: "100%", padding: "0.5rem" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label>
          <input
            style={{ display: "block", width: "100%", padding: "0.5rem" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>

        {error && (
          <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
