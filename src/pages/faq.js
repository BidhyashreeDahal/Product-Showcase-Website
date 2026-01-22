import Head from "next/head";

const questions = [
  {
    q: "Where do you ship?",
    a: "We currently ship within Canada. Local delivery options are coming soon.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders ship in 2–4 business days. Delivery time depends on your region.",
  },
  {
    q: "Can I return an item?",
    a: "Yes. We accept returns within 30 days in original condition.",
  },
  {
    q: "Do you restock sold‑out items?",
    a: "We restock seasonal items in small batches. Join our newsletter for updates.",
  },
];

export default function FAQ() {
  return (
    <div className="bg-[#f7f2ea] coffee-pattern">
      <Head>
        <title>FAQ | Brewline Supply</title>
        <meta
          name="description"
          content="Frequently asked questions about Brewline Supply."
        />
      </Head>
      <div className="mx-auto max-w-4xl px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
          FAQ
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[#2f241f]">
          Frequently asked questions.
        </h1>
        <div className="mt-8 space-y-4">
          {questions.map((item) => (
            <div key={item.q} className="rounded-2xl border border-[#eadfce] bg-white p-5">
              <h2 className="text-lg font-semibold text-[#2f241f]">{item.q}</h2>
              <p className="mt-2 text-sm text-[#6b5446]">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
