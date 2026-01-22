import { createProduct } from "../../../lib/contentful";
import { getUserFromRequest } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const user = getUserFromRequest(req);
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  const { title, description, image } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const newProduct = await createProduct({
      title,
      description,
      author: user.email,
      image: image || null,
    });

    return res.status(201).json({ product: newProduct });
  } catch (err) {
    console.log("CREATE ERROR:", err);
    return res.status(500).json({ message: "Create failed" });
  }
}
