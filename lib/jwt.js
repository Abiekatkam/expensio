import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET;

export function generateToken(payload, expiresIn = "1h") {
  return jwt.sign(payload, secretKey, { expiresIn });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return null;
  }
}
