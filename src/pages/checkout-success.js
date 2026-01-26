import Head from "next/head";
import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div className="bg-[#f7f2ea] coffee-pattern">
      <Head>
        <title>Order Confirmed | Brewline Supply</title>
        <meta
          name="description"
          content="Your Brewline Supply order has been placed."
        />
      </Head>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
            Order confirmed
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-[#2f241f]">
            Thanks for your order.
          </h1>
          <p className="mt-3 text-sm text-[#6b5446]">
           Thank you so much for shopping with us!
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-full bg-[#a8703a] px-5 py-2 text-sm font-semibold text-white hover:bg-[#94612f]"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
