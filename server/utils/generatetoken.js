import jwt from "jsonwebtoken";

const generateToken = (res, userid) => {
  const token = jwt.sign({ userid }, "test123", {
    expireIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
