import Head from "next/head";

export default function ShippingPolicy() {
  return (
    <div className="bg-[#f7f2ea] coffee-pattern">
      <Head>
        <title>Shipping & Returns | Brewline Supply</title>
        <meta
          name="description"
          content="Shipping and returns policy for Brewline Supply."
        />
      </Head>
      <div className="mx-auto max-w-4xl px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
          Shipping & Returns
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[#2f241f]">
          Transparent shipping, simple returns.
        </h1>
        <p className="mt-4 text-lg text-[#6b5446]">
          We ship from Canada and package each order with care. If something
          isn’t right, we’ll make it right.
        </p>

        <div className="mt-8 grid gap-6">
          <div className="rounded-2xl border border-[#eadfce] bg-white p-5">
            <h2 className="text-lg font-semibold text-[#2f241f]">Shipping</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#6b5446]">
              <li>Orders ship in 2–4 business days.</li>
              <li>Free shipping over $75 CAD.</li>
              <li>Flat $8 CAD shipping under $75.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#eadfce] bg-white p-5">
            <h2 className="text-lg font-semibold text-[#2f241f]">Returns</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#6b5446]">
              <li>30‑day returns in original condition.</li>
              <li>Free exchanges for damaged items.</li>
              <li>Contact support for a prepaid label.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
