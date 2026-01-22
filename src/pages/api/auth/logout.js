// src/pages/api/auth/logout.js

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Clear the JWT cookie properly
  res.setHeader("Set-Cookie", [
    "token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0",
  ]);

  return res.status(200).json({ message: "Logged out" });
}
