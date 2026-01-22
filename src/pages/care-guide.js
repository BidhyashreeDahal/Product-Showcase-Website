import Head from "next/head";

export default function CareGuide() {
  return (
    <div className="bg-[#f7f2ea] coffee-pattern">
      <Head>
        <title>Care Guide | Brewline Supply</title>
        <meta
          name="description"
          content="Care recommendations for Brewline Supply coffee bar essentials."
        />
      </Head>
      <div className="mx-auto max-w-4xl px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
          Care Guide
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[#2f241f]">
          Keep your coffee tools looking their best.
        </h1>
        <p className="mt-4 text-lg text-[#6b5446]">
          Simple care goes a long way. Follow these recommendations to preserve
          finishes, maintain performance, and extend the life of your Brewline
          essentials.
        </p>

        <div className="mt-8 grid gap-6">
          <div className="rounded-2xl border border-[#eadfce] bg-white p-5">
            <h2 className="text-lg font-semibold text-[#2f241f]">Ceramics</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#6b5446]">
              <li>Hand wash to preserve glaze and avoid thermal shock.</li>
              <li>Dry fully before stacking or storing.</li>
              <li>Avoid abrasive scrubbers or strong acids.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#eadfce] bg-white p-5">
            <h2 className="text-lg font-semibold text-[#2f241f]">Brew Tools</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#6b5446]">
              <li>Rinse after each use to prevent mineral buildup.</li>
              <li>Descale monthly if you brew daily.</li>
              <li>Wipe exterior with a soft cloth.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#eadfce] bg-white p-5">
            <h2 className="text-lg font-semibold text-[#2f241f]">Storage</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#6b5446]">
              <li>Keep containers sealed between uses.</li>
              <li>Store away from direct sunlight and heat.</li>
              <li>Wipe interiors with a dry cloth; avoid soap residue.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
