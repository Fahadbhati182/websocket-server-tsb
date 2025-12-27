import jwt from "jsonwebtoken";

export function authenticateSocket(req) {
  try {
    console.log("REQ.URL:", req.url);
    const token = new URL(req.url, "http://localhost").searchParams.get(
      "token"
    );
    console.log("TOKEN:", token);
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch (error) {
    console.log("❌ JWT ERROR:", error.message);
    return null;
  }
}
