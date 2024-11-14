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

const signinUser = async (req, res, next) => {
  const { penno, password } = req.body;
  try {
    if (!penno || !password) {
      return res.status(400).json("Enter Credentionals");
    }

    const userExist = await userModel.findOne({ penno }).select("+password");
    if (!userExist) {
      return res.status(400).json("User Not Found");
    } else
      bcrypt.compare(password, userExist.password).then((status) => {
        if (status) {
          const { name, _id, penno, roll } = userExist;
          const token = generateToken(res, _id);
          console.log(token)
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
