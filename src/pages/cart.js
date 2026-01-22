import Head from "next/head";
import Link from "next/link";
import { useCart } from "../components/CartContext";
import { formatPrice } from "../lib/formatting";
import { getCoffeeImage } from "../lib/coffee-images";

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem, clearCart } = useCart();

  return (
    <div className="bg-[#f7f2ea] coffee-pattern">
      <Head>
        <title>Your Cart | Brewline Supply</title>
      </Head>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="text-3xl font-semibold text-[#2f241f]">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-[#eadfce] bg-white p-6 text-sm text-[#6b5446]">
            Your cart is empty. Start with our coffee bar essentials.
            <div className="mt-4">
              <Link
                href="/products"
                className="inline-flex rounded-full bg-[#a8703a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#94612f]"
              >
                Shop Coffee Bar
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#eadfce] bg-white p-4"
                >
                  <img
                    src={item.image || getCoffeeImage(item)}
                    alt={item.title}
                    className="h-20 w-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#2f241f]">{item.title}</p>
                    <p className="text-xs text-[#7a5d4a]">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="h-8 w-8 rounded-full border border-[#eadfce] text-sm"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm">{item.qty}</span>
                    <button
                      className="h-8 w-8 rounded-full border border-[#eadfce] text-sm"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-xs font-semibold text-red-600"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#eadfce] bg-white p-5 text-sm text-[#6b5446]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7a63]">
                Order Summary
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold text-[#2f241f]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-2 text-xs text-[#7a5d4a]">
                Taxes and shipping calculated at checkout.
              </p>
              <button className="mt-4 w-full rounded-full bg-[#a8703a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#94612f]">
                Checkout
              </button>
              <button
                className="mt-2 w-full rounded-full border border-[#eadfce] px-4 py-2 text-sm font-semibold text-[#2f241f] hover:bg-[#f1e4d6]"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
