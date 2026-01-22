// src/lib/contentful.js

import { createClient } from "contentful";
import { createClient as createManagementClient } from "contentful-management";

// DELIVERY CLIENT → READ published content (A2 + A3)
const deliveryClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
});

// MANAGEMENT CLIENT → UPDATE + DELETE content (A3)
const managementClient = createManagementClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});


function formatProduct(entry) {
  if (!entry) return null;

  const imageField = entry.fields.image;

  return {
    id: entry.sys.id,
    version: entry.sys.version ?? null,
    title: entry.fields.title || "",
    description: entry.fields.description || "",
    author: entry.fields.author || "",
    image: imageField && imageField.fields && imageField.fields.file
      ? "https:" + imageField.fields.file.url
      : null,  // <-- SAFE FALLBACK FOR NO IMAGE
  };
}


// GET ALL PRODUCTS
export async function getProducts() {
  const res = await deliveryClient.getEntries({
    content_type: "product",
    limit: 1000,
  });

  return res.items.map(formatProduct);
}

// GET SINGLE PRODUCT
export async function getProductById(id) {
  try {
    const entry = await deliveryClient.getEntry(id);
    const formatted = formatProduct(entry);
    formatted.version = formatted.version ?? null;
    return formatted;

  } catch (err) {
    return null;
  }
}

export async function updateProduct(id, data) {
  const env = await managementClient
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment("master"));

  // ⭐ ALWAYS fetch fresh entry (fresh version)
  const entry = await env.getEntry(id);

  // Update fields
  entry.fields.title["en-US"] = data.title;
  entry.fields.description["en-US"] = data.description;
  entry.fields.author["en-US"] = data.author;

  // ⭐ Update entry (Contentful manages version automatically)
  const updatedEntry = await entry.update();

  // Publish updated entry
  await updatedEntry.publish();

  return formatProduct(updatedEntry);
}


// DELETE PRODUCT (A3 ONLY)
export async function deleteProduct(id) {
  const env = await managementClient
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment("master"));

  const entry = await env.getEntry(id);

  await entry.unpublish().catch(() => null);
  await entry.delete();

  return true;
}
 export async function createProduct(data) {
  const env = await managementClient
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment("master"));

  const entry = await env.createEntry("product", {
    fields: {
      title: { "en-US": data.title },
      description: { "en-US": data.description },
      author: { "en-US": data.author },
      image: { "en-US": data.image || null },
    },
  });

  const published = await entry.publish();
  return formatProduct(published);
}

