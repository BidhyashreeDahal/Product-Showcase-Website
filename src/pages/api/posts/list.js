import { getProducts } from "../../../lib/contentful";
import { getUserFromRequest } from "../../../lib/auth";

export default async function handler(req, res) {
  const user = getUserFromRequest(req);
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  const products = await getProducts();

  // ROLE RULES:
  // Admin → all
  // Author → only their own
  // Viewer → none
  let filtered = products;

  if (user.role === "author") {
    filtered = products.filter(p => p.author === user.email);
  }

  if (user.role === "viewer") {
    filtered = [];
  }

  return res.status(200).json({ products: filtered });
}
