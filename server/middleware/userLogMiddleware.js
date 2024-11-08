import userLogModel from "../model/userLogModel.js";
import userModel from "../model/userModel.js";

const userLoginActivity = async (req, res, next) => {
  const penno = req.body.penno;
  console.log(req.body)
  var logState;
  try {
    const userExist = await userModel.findOne({ penno });
    if (userExist) {
      logState = "Authorized";
    } else {
      logState = "Unauthorized";
    }
    const addLoginCativity = await userLogModel.create({
      penno,
      logState,
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default userLoginActivity;
