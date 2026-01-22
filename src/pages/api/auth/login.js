// src/pages/api/auth/login.js

import { findUser } from "../../../lib/users";
import { signToken, setAuthCookie } from "../../../lib/auth";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = findUser(email, password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user);
  setAuthCookie(res, token);

  return res.status(200).json({
    email: user.email,
    role: user.role,
  });
}
