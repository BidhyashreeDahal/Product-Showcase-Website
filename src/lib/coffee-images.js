const fallbackImages = [
  {
    match: ["kettle", "gooseneck"],
    url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=60",
  },
  {
    match: ["grinder", "burr"],
    url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=60",
  },
  {
    match: ["dripper", "pour-over", "pour over", "v60"],
    url: "https://images.unsplash.com/photo-1504630083234-14187a9f9754?auto=format&fit=crop&w=1200&q=60",
  },
  {
    match: ["mug", "ceramic", "cup"],
    url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=60",
  },
  {
    match: ["scale", "timer"],
    url: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=60",
  },
  {
    match: ["canister", "storage", "bean"],
    url: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1200&q=60",
  },
];

const defaultImage =
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=60";

export function getCoffeeImage(product) {
  if (!product) return defaultImage;
  const haystack = `${product.title || ""} ${product.category || ""}`
    .toLowerCase()
    .trim();

  const match = fallbackImages.find((item) =>
    item.match.some((keyword) => haystack.includes(keyword))
  );

  return match?.url || defaultImage;
}
