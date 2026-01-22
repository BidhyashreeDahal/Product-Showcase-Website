import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        background: "#222",
        padding: "15px 20px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Product Showcase</h2>

      <nav style={{ display: "flex", gap: "20px" }}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
