import { getUserFromRequest } from "../../../lib/auth";
import { createClient } from "contentful-management";

const contentfulClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // 1) Check authentication
  const user = getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // 2) RBAC
  if (user.role !== "admin" && user.role !== "author") {
    return res.status(403).json({ message: "Not allowed" });
  }

  // 3) Extract fields
  const { title, description, image, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // 4) Connect to Contentful
    const space = await contentfulClient.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment("master");

    // 5) Create entry
    const entry = await env.createEntry("product", {
      fields: {
        title: { "en-US": title },
        description: { "en-US": description },
        author: { "en-US": user.email },
        category: { "en-US": category },

        // Store image URL directly
        image: image
          ? { "en-US": image }
          : undefined
      }
    });

    // 6) Publish entry
    const published = await entry.publish();

    return res.status(200).json({
      message: "Product created",
      id: published.sys.id
    });

  } catch (err) {
    console.error("Contentful Create Error:", err);
    return res.status(500).json({
      message: "Contentful error",
      error: err.message
    });
  }
}
