export default function About() {
  return (
    <div className="bg-[#f7f2ea]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
          About
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[#2f241f]">
          A coffee bar story that feels lived-in.
        </h1>
        <p className="mt-4 text-lg text-[#6b5446]">
          Brewline Supply is a small-batch brand concept focused on practical
          tools for calm, intentional coffee rituals. Content is managed in
          Contentful and served through Next.js.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Curated lineup",
              text: "6–10 SKUs that cover the full pour-over routine.",
            },
            {
              title: "Warm materials",
              text: "Cream ceramics, walnut accents, and soft matte finishes.",
            },
            {
              title: "Realistic copy",
              text: "Product text grounded in everyday use and believable details.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#eadfce] bg-white p-5"
            >
              <p className="text-sm font-semibold text-[#2f241f]">{item.title}</p>
              <p className="mt-2 text-sm text-[#6b5446]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
