import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};
export const decodeToken = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error(error);
    return null;
  }
};
