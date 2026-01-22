import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#f7f2ea]">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
            Brewline Supply
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#2f241f] sm:text-5xl">
            Coffee bar essentials that feel like a ritual.
          </h1>
          <p className="mt-4 text-lg text-[#6b5446]">
            A warm, curated lineup for pour-over mornings: tactile ceramics,
            precise tools, and storage that keeps beans fresh.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-[#a8703a] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#94612f]"
            >
              Browse Coffee Bar
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-[#e2d2c1] bg-white px-5 py-2 text-sm font-semibold text-[#2f241f] hover:bg-[#f1e4d6]"
            >
              Our Story
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-[#7a5d4a]">
            <span className="rounded-full bg-[#f3e7da] px-3 py-1">Small batch</span>
            <span className="rounded-full bg-[#f3e7da] px-3 py-1">Matte ceramic</span>
            <span className="rounded-full bg-[#f3e7da] px-3 py-1">Slow brew</span>
          </div>
        </div>
        <div className="rounded-3xl border border-[#eadfce] bg-white p-4 shadow-[0_24px_60px_rgba(94,63,45,0.12)]">
          <img
            className="h-64 w-full rounded-2xl object-cover"
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=60"
            alt="Coffee beans and brewing tools"
          />
          <div className="mt-4 rounded-2xl bg-[#fdf8f2] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b7a63]">
              Featured
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[#2f241f]">
              Linea Gooseneck Kettle
            </h2>
            <p className="mt-2 text-sm text-[#6b5446]">
              Balanced pour control with a warm matte finish and fast heat-up.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 rounded-3xl border border-[#eadfce] bg-white px-6 py-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-[#2f241f]">Beans & storage</p>
            <p className="mt-2 text-sm text-[#6b5446]">
              Airtight canisters and simple labels keep your beans aromatic.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2f241f]">Precision tools</p>
            <p className="mt-2 text-sm text-[#6b5446]">
              Scales, grinders, and kettles tuned for repeatable pours.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2f241f]">Warm ceramics</p>
            <p className="mt-2 text-sm text-[#6b5446]">
              Cream and clay tones that feel grounded on any counter.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
