import bcrypt, { genSalt } from "bcrypt";
import userModel from "../model/userModel.js";
import generateToken from "../utils/generatetoken.js";

//////////////  Signup User   ////////////////////

const signUpUser = async (req, res, next) => {
  //   console.log(req.body);
  const { penno, name, password, admincode } = req.body;

  try {
    if (!penno || !name || !password || !admincode) {
      return res.status(400).json({ message: "Enter All Fields" });
    }

    if (admincode != "test@123") {
      return res.status(400).json({ message: "Admin Code Missmatch" });
    }

    if (password.length != 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 digits long" });
    }

    if (penno.toString().length != 6) {
      return res.status(400).json({ message: "Invalid PEN Number" });
    }

    const existUser = await userModel.find({ penno });
    if (existUser.length > 0) {
      return res.status(400).json({ message: "PEN Number Already Exists" });
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
      const { _id, name, penno } = addUser;
      const token = generateToken(res, _id);
      res.status(200).json({
        message: "User Registred Succsessfully",
        _id,
        name,
        penno,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

const signinUser = async (req, res, next) => {
  const { penno, password } = req.body;
  try {
    if (!penno || !password) {
      return res.status(400).json("Enter Credentionals");
    }

    const userExist = await userModel.findOne({ penno }).select("+password");
    if (!userExist) {
      return res.status(400).json({ message: "User Not Found" });
    } else
      bcrypt.compare(password, userExist.password).then((status) => {
        if (status) {
          const { name, _id, penno, roll } = userExist;
          const token = generateToken(res, _id);
          return res.status(200).json({
            name,
            id: _id,
            penno,
            roll,
            token,
            message: "Login successfully",
          });
        } else {
          return res.status(400).json({
            message: "Invalid User Credentionals",
          });
        }
      });
  } catch (error) {
    next(error);
  }
};

// Logout User
const logoutUser = async (req, res, next) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("token");
    res.status(200).json({
      status: 200,
      message: "Logout Successful",
    });
  } catch (error) {
    next(error);
  }
};

export { signUpUser, signinUser, logoutUser };
