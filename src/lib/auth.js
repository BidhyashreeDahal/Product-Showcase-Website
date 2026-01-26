import jwt from "jsonwebtoken";

// 1) Secret used to sign JWTs
const SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

// 2) Sign a JWT for the user
export function signToken(user) {
  return jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    SECRET,
    { expiresIn: "2h" }
  );
}

// 3) Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET); // returns { email, role, iat, exp }
  } catch (err) {
    return null;
  }
}

// 4) Set httpOnly cookie

// 5) Clear cookie on logout



export function setAuthCookie(res, token) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader("Set-Cookie",
    `token=${token}; HttpOnly; Path=/; SameSite=Lax${secure}`
  );
}

export function clearAuthCookie(res) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader("Set-Cookie",
    `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secure}`
  );
}
export function getUserFromRequest(req) {
  const cookie = req.headers.cookie || "";
  const token = cookie
    .split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    return verifyToken(token);
  } catch (err) {
    return null;
  }
}
