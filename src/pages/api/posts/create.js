import { createProduct } from "../../../lib/contentful";
import { getUserFromRequest } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const user = getUserFromRequest(req);
  if (!user) return res.status(401).json({ message: "Not authenticated" });

  const { title, description, image, category, price } = req.body;

  if (!title || !description || !category || price === undefined || price === null) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const parsedPrice = Number(price);
  if (Number.isNaN(parsedPrice)) {
    return res.status(400).json({ message: "Price must be a number" });
  }

  try {
    const newProduct = await createProduct({
      title,
      description,
      author: user.email,
      image: image || null,
      category,
      price: parsedPrice,
    });

    return res.status(201).json({ product: newProduct });
  } catch (err) {
    console.log("CREATE ERROR:", err);
    return res.status(500).json({ message: "Create failed" });
  }
}
