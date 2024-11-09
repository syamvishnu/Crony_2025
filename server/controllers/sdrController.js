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

    console.log(Num);

    const numberFound = await sdrModel.findOne({ tnumber: Num }).lean();

    if (numberFound) {
      return res.status(200).json({
        numberFound,
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
        "tnumber subscribername fatherhusname aadhaar addressproff alternative dob localaddress service_provider"
      )
      .lean()
      .limit(100);

    if (numberFound && numberFound.length > 0) {
      // Check if numberFound is not empty
      return res.status(200).json({
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
