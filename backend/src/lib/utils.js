import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const {JWT_SECRET, NODE_ENV} = process.env;

   if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not configured");
  }
  
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // preven Xss attacks: cross-site scripting
    sameSize: "strict", // CSRF attacks
    secure: NODE_ENV === "development" ? false : true,
  });

  return token;
};
