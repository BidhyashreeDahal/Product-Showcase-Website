import { getProducts } from "../../../lib/contentful";

export default async function handler(req, res) {
  const products = await getProducts();
  return res.status(200).json({ products });
}
