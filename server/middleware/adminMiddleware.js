import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const isAdmin = async (req, res, next) => {
  console.log(req.headers);
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decode;
    try {
      decode = jwt.verify(token, "test@123");
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const user = await userModel.findById(decode.userId);

    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }

    if (user.roll !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: User is not an admin" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("isAdmin middleware error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { isAdmin };
