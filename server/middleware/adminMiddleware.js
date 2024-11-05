import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(400).json({ message: "Unauthorized: No token provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decode.userId);

    if (!user) {
      res.status(400).json({ message: "No User Found" });
    }

    if (user.roll !== "admin") {
      res.status(400).json({ message: "Unauthorized: User is not an admin" });
    }
    req.user = user;
    next();
  } catch (error) {}
};

export { isAdmin };
