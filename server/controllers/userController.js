import bcrypt, { genSalt } from "bcrypt";
import userModel from "../model/userModel.js";
import generateToken from "../utils/generatetoken.js";

//////////////  Signup User   ////////////////////

const signUpUser = async (req, res, next) => {
  //   console.log(req.body);
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

    const existUser = await userModel.find({ penno });
    if (existUser.length > 0) {
      return res.status(400).json("PEN Number Already Exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPasswd = await bcrypt.hash(password, salt);

    const addUser = await userModel.create({
      name,
      penno,
      password: hashedPasswd,
      admincode,
    });

    if (addUser) {
      generateToken(res, addUser._id);
      const { _id, name, penno } = addUser;
      res.status(200).json({
        message: "User Registred Succsessfully",
        _id,
        name,
        penno,
      });
    }
  } catch (error) {
    next(error);
  }
};

export { signUpUser };
