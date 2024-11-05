import sdrModel from "../model/sdrModel.js";

const sdrSearch = async (req, res, next) => {
  const { data, option, userData } = req.body;
  const Num = Number(data);

  if (option == "Number") {
    if (!Num) {
      return res.status(400).json("Please Enter Number");
    }

    if (Num.toString().length != 10) {
      return res.status(400).json("Please check the number");
    }

    const numberFound = await sdrModel.findOne({ tumber: Num }).lean();

    if (numberFound) {
      return res.status(200).json({
        message: "Data found successfully",
        status: 200,
        data: numberFound,
      });
    } else {
      return res.status(400).json("No Data Found");
    }
  }

  if (option == "ID") {
    if (!Num) {
      return res.status(400).json("Please Enter Input");
    }

    const numberFound = await sdrModel
      .find({
        $or: [
          { addressproff: { $regex: data, $options: "i" } },
          { aadhaar: Num },
        ],
      })
      .select(
        "tnumber subscribername fatherhusname aadhaar addressproff alternative dob activationdate ad2 ad3 ad5"
      )
      .lean()
      .limit(100);

    if (numberFound && numberFound.length > 0) {
      // Check if numberFound is not empty
      return res.json({
        status: 200,
        message: "Data Found",
        numberFound,
      });
    } else {
      return res.status(400).json({
        message: "No Data Found",
      });
    }
  }
};

export default sdrSearch;
