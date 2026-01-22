import { getUserFromRequest } from "../../../lib/auth.js";

export default function handler(req, res) {
  const user = getUserFromRequest(req);

  if (!user) {
    return res.status(200).json({
      authenticated: false,
      user: null,
    });
  }

  return res.status(200).json({
    authenticated: true,
    user: {
      email: user.email,
      role: user.role
    }
  });
}
