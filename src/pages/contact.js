import Head from "next/head";

export default function ContactPage() {
  return (
    <div className="bg-[#f7f2ea] coffee-pattern">
      <Head>
        <title>Contact | Brewline Supply</title>
        <meta
          name="description"
          content="Contact Brewline Supply for product and order inquiries."
        />
      </Head>
      <div className="mx-auto max-w-4xl px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9b7a63]">
          Contact
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[#2f241f]">
          We’re here to help.
        </h1>
        <p className="mt-4 text-lg text-[#6b5446]">
          For product questions, order support, or wholesale inquiries, reach out below.
        </p>

        <div className="mt-8 rounded-2xl border border-[#eadfce] bg-white p-6">
          <p className="text-sm font-semibold text-[#2f241f]">Bidhyashree Dahal</p>
          <a
            href="mailto:bidhyashreedahal37@gmail.com"
            className="mt-2 inline-flex text-sm font-semibold text-[#a8703a]"
          >
            bidhyashreedahal37@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
