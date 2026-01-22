import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Product Showcase</h1>
      <p>This project uses Contentful + Next.js for dynamic product loading.</p>

      <Link href="/products">
        <button style={{ marginTop: "20px" }}>View Products</button>
      </Link>
    </div>
  );
}
