import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#eadfce] bg-[#3b2a22]">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 text-sm text-[#f6eee5] md:grid-cols-3">
        <div>
          <p className="text-base font-semibold">Brewline Supply</p>
          <p className="mt-2 text-[#eadfce]">
            Coffee bar essentials for calm, intentional mornings.
          </p>
        </div>
        <div>
          <p className="text-base font-semibold">Shop</p>
          <div className="mt-2 space-y-1 text-[#eadfce]">
            <Link href="/products" className="block hover:text-white">Shop All</Link>
            <Link
              href={{ pathname: "/products", query: { category: "Brew Tools" } }}
              className="block hover:text-white"
            >
              Brew Tools
            </Link>
            <Link
              href={{ pathname: "/products", query: { category: "Ceramics" } }}
              className="block hover:text-white"
            >
              Ceramics
            </Link>
            <Link
              href={{ pathname: "/products", query: { category: "Storage" } }}
              className="block hover:text-white"
            >
              Storage
            </Link>
          </div>
        </div>
        <div>
          <p className="text-base font-semibold">Support</p>
          <div className="mt-2 space-y-1 text-[#eadfce]">
            <Link href="/shipping" className="block hover:text-white">Shipping & Returns</Link>
            <Link href="/care-guide" className="block hover:text-white">Care Guide</Link>
            <Link href="/faq" className="block hover:text-white">FAQ</Link>
            <Link href="/contact" className="block hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[#4b372d] py-4 text-center text-xs text-[#eadfce]">
        © 2025 Brewline Supply. All rights reserved.
      </div>
    </footer>
  );
}
