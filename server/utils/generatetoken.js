import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const secretKey = "test@123";

  // Generate the token
  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: "30d", // Token validity: 30 days
  });

  // Set the token as an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents client-side JavaScript access
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // CSRF protection
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });

  return token; // Return the token for use elsewhere, if needed
};

export default generateToken;
