import user from "../models/userModel.js";
import bcrypt, { genSalt } from "bcrypt";
import user from "../model/userModel.js";

//////////////  Signup User   ////////////////////

const signUpUser = async (req, res) => {
  const { penno, name, password, admincode } = req.body;

  try {
    if (!penno || !name || !password || !admincode) {
      return res.status(400).json("Enter All Fields");
    }

    if (admincode != "test@123") {
      return res.status(400).json("Admin Code Missmatch");
    }

    if (penno.toString().length != 6) {
      return res.status(400).json("Invalid PEN Number");
    }

    const existUser = user.findOne({ penno });
  } catch (error) {}
};
