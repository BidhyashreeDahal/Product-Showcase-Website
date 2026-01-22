import { getProductById } from "../../../lib/contentful";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) return res.status(400).json({ message: "Missing ID" });

  const product = await getProductById(id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  return res.status(200).json({ product });
}
