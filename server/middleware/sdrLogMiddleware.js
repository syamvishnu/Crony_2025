import sdrLogModel from "../model/sdrLogModel.js";

const sdrSearchActivity = async (req, res, next) => {
  try {
    const addSdrLogactivity = await sdrLogModel.create({
      userId: req.body.userDetails.id,
      name: req.body.userDetails.name,
      penno: req.body.userDetails.penno,
      data: req.body.data,
      keyword1: req.body.key2,
      keyword2: req.body.key1,
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default sdrSearchActivity;
