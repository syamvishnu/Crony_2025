import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const secretKey = "test@321"; // Replace with your actual secret key
  const algorithm = "HS256"; // Consider using a more secure algorithm if needed

  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: "30d",
    algorithm,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
