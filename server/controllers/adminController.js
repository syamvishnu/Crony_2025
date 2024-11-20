import userModel from "../model/userModel.js";
import userLogModel from "../model/userLogModel.js";
import sdrLogModel from "../model/sdrLogModel.js";
const getUser = async (req, res, next) => {
  try {
    const fetchUsers = await userModel.find({ roll: { $ne: "admin" } });
    res.status(200).json({ users: fetchUsers });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUserLog = async (req, res, next) => {
  try {
    const userLog = await userLogModel.find({}).sort({ timestamp: -1 });

    res.status(200).json({ userLog });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getSearchLog = async (req, res, next) => {
  try {
    const sdrLog = await sdrLogModel.find({}).sort({ timestamp: -1 });

    res.status(200).json({ sdrLog });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userID = req.params.userid;

    if (!userID) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const delUser = await userModel.findByIdAndDelete(userID);

    if (delUser) {
      return res.status(200).json({ message: "User Deleted Successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { getUser, getUserLog, getSearchLog, deleteUser };
