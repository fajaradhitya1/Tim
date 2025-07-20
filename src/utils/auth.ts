// utils/auth.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}

export function generateToken(user: { id: number; role: string }) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}
