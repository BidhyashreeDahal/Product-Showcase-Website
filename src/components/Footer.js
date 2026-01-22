export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#eadfce] bg-[#3b2a22]">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 text-sm text-[#f6eee5] md:grid-cols-3">
        <div>
          <p className="text-base font-semibold">Brewline Supply</p>
          <p className="mt-2 text-[#eadfce]">
            Coffee bar essentials for calm, intentional mornings.
          </p>
        </div>
        <div>
          <p className="text-base font-semibold">Shop</p>
          <div className="mt-2 space-y-1 text-[#eadfce]">
            <p>Shop All</p>
            <p>Brew Tools</p>
            <p>Ceramics</p>
            <p>Storage</p>
          </div>
        </div>
        <div>
          <p className="text-base font-semibold">Support</p>
          <div className="mt-2 space-y-1 text-[#eadfce]">
            <p>Shipping & Returns</p>
            <p>Care Guide</p>
            <p>Contact</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#4b372d] py-4 text-center text-xs text-[#eadfce]">
        © 2025 Brewline Supply — INFT3102 Assignment 2
      </div>
    </footer>
  );
}
