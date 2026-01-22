import Link from "next/link";
import Head from "next/head";
import BeanIcon from "../components/icons/BeanIcon";

export default function Home() {
  return (
    <div className="bg-[#f7f2ea] coffee-pattern">
      <Head>
        <title>Brewline Supply | Coffee Bar Essentials</title>
        <meta
          name="description"
          content="Brewline Supply offers curated coffee bar essentials: kettles, grinders, ceramics, and storage."
        />
        <meta property="og:title" content="Brewline Supply | Coffee Bar Essentials" />
        <meta
          property="og:description"
          content="Curated tools and ceramics for a calm, intentional coffee ritual."
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=1200&q=60"
        />
      </Head>
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
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f3e7da] px-3 py-1">
              <BeanIcon className="h-3.5 w-3.5" />
              Small batch
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f3e7da] px-3 py-1">
              <BeanIcon className="h-3.5 w-3.5" />
              Matte ceramic
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f3e7da] px-3 py-1">
              <BeanIcon className="h-3.5 w-3.5" />
              Slow brew
            </span>
          </div>
        </div>
        <div className="rounded-3xl border border-[#eadfce] bg-white p-4 shadow-[0_24px_60px_rgba(94,63,45,0.12)]">
          <img
            className="h-64 w-full rounded-2xl object-cover"
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=60"
            alt="Gooseneck kettle"
          />
          <div className="mt-4 rounded-2xl bg-[#fdf8f2] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b7a63]">
              Featured
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[#2f241f]">
              Linea Gooseneck Kettle
            </h2>
            <p className="mt-2 text-sm text-[#6b5446]">
              Precision pour control with a warm matte finish and steady heat retention.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-6 rounded-3xl border border-[#eadfce] bg-white px-6 py-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2f241f]">
              <BeanIcon className="h-4 w-4 text-[#a8703a]" />
              Beans & storage
            </div>
            <p className="mt-2 text-sm text-[#6b5446]">
              Airtight canisters and simple labels keep your beans aromatic.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2f241f]">
              <BeanIcon className="h-4 w-4 text-[#a8703a]" />
              Precision tools
            </div>
            <p className="mt-2 text-sm text-[#6b5446]">
              Scales, grinders, and kettles tuned for repeatable pours.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2f241f]">
              <BeanIcon className="h-4 w-4 text-[#a8703a]" />
              Warm ceramics
            </div>
            <p className="mt-2 text-sm text-[#6b5446]">
              Cream and clay tones that feel grounded on any counter.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid items-center gap-8 rounded-3xl border border-[#eadfce] bg-white p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
              Brand Story
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#2f241f]">
              Brewline is a small-batch studio for calm morning rituals.
            </h2>
            <p className="mt-4 text-sm text-[#6b5446]">
              We build a tight lineup of coffee bar essentials that feel warm,
              durable, and intentional. Each piece is designed to look great on
              your counter and work reliably every day.
            </p>
          </div>
          <img
            className="h-64 w-full rounded-2xl object-cover"
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=60"
            alt="Coffee bar workspace"
          />
        </div>
      </section>
    </div>
  );
}
