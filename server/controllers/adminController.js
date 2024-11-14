import userModel from "../model/userModel.js";

const getUser = async (req, res, next) => {
  try {
    const fetchUsers = await userModel.find({});

    res.status(200).json({ users: fetchUsers });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { getUser };
