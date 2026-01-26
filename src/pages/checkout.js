import Head from "next/head";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="bg-[#f7f2ea] coffee-pattern">
      <Head>
        <title>Checkout | Brewline Supply</title>
        <meta
          name="description"
          content="Mock checkout flow for Brewline Supply."
        />
      </Head>
      <div className="mx-auto max-w-5xl px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
          Checkout
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[#2f241f]">
          Review your order.
        </h1>
        <p className="mt-3 text-lg text-[#6b5446]">
          This is a mock checkout flow for the portfolio build.
        </p>
        <p className="mt-2 text-sm text-[#7a5d4a]">
          Payments are currently disabled. This page is for demonstration only.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-[#eadfce] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#2f241f]">
              Shipping Details
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                className="rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm"
                placeholder="First name"
              />
              <input
                className="rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm"
                placeholder="Last name"
              />
              <input
                className="sm:col-span-2 rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm"
                placeholder="Street address"
              />
              <input
                className="rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm"
                placeholder="City"
              />
              <input
                className="rounded-xl border border-[#eadfce] bg-[#fdf8f2] px-3 py-2 text-sm"
                placeholder="Postal code"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#eadfce] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#2f241f]">
              Order Summary
            </h2>
            <p className="mt-3 text-sm text-[#6b5446]">
              Taxes and shipping calculated at checkout.
            </p>
            <Link
              href="/checkout-success"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#a8703a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#94612f]"
            >
              Place order
            </Link>
            <Link
              href="/cart"
              className="mt-3 inline-flex text-sm font-semibold text-[#a8703a]"
            >
              ← Back to cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
