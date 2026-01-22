import { updateProduct, getProductById } from "../../../lib/contentful";
import { getUserFromRequest } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const user = getUserFromRequest(req);
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  const { id, title, description, category, price } = req.body;

  if (!id || !title || !description || !category || price === undefined || price === null) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const parsedPrice = Number(price);
  if (Number.isNaN(parsedPrice)) {
    return res.status(400).json({ message: "Price must be a number" });
  }

  // Load the product to check ownership
  const existing = await getProductById(id);
  if (!existing) {
    return res.status(404).json({ message: "Product not found" });
  }

  // 🛑 STOP: RBAC ENFORCEMENT
  const isOwner = existing.author === user.email;
  const isAdmin = user.role === "admin";

  if (!isAdmin && !isOwner) {
    return res.status(403).json({ message: "Not allowed to edit this product" });
  }

  try {
    const updated = await updateProduct(id, {
      title,
      description,
      author: existing.author, // keep original author
      category,
      price: parsedPrice,
    });

    return res.status(200).json({ product: updated });
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    return res.status(500).json({ message: "Update failed" });
  }
}
