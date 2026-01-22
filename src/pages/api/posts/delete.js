// src/pages/api/posts/delete.js
import { getUserFromRequest } from "../../../lib/auth";
import { getProductById, deleteProduct } from "../../../lib/contentful";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const user = getUserFromRequest(req);
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Missing product ID" });

  const product = await getProductById(id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  // Only ADMIN can delete
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Only admin may delete" });
  }

  try {
    await deleteProduct(id);
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return res.status(500).json({ message: "Delete failed" });
  }
}
