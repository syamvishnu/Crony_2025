import sdrModel from "../model/sdrModel.js"

const reverseSearch = async (req, res, next) => {
    console.log(req.body)
  const { key2, key1, father1, email1 } = req.body;

  

  if (!key2 && key1) {
    const data1 = await sdrModel
      .find({
        $and: [{ localaddress: { $regex: new RegExp(key1, "i") } }],
      })
      .select("subscribername localaddress tnumber addressproff dob")
      .lean()
      .limit(100);

    return res.json({
      status: 200,
      message: "Data Found",
      data1,
    });
  } else {
    const data1 = await sdrModel
      .find({
        $and: [
          { subscribername: { $regex: new RegExp(key2, "i") } },
          { localaddress: { $regex: new RegExp(key1, "i") } },
          { fatherhusname: { $regex: new RegExp(father1, "i") } },
          { email: { $regex: new RegExp(email1, "i") } },
        ],
      })
      .select(
        "subscribername localaddress tnumber addressproff dob alternative email"
      )
      .lean()
      .limit(100);

    return res.json({
      status: 200,
      message: "Data Found",
      data1,
    });
  }

};

const mutliSearch = async (req, res) => {
  const { name, father, address, email } = req.body;

  const query = [];
  if (name) query.push({ subscribername: { $regex: new RegExp(name, "i") } });
  if (father)
    query.push({ fatherhusname: { $regex: new RegExp(father, "i") } });
  if (address)
    query.push({ localaddress: { $regex: new RegExp(address, "i") } });
  if (email) query.push({ email: { $regex: new RegExp(email, "i") } });

  try {
    const data1 = await sdrModel.find({ $and: query });
    console.log(data1);
    return res.json({
      data: data1,
    });
  } catch (error) {
    console.log(error);
  }
};

export { reverseSearch, mutliSearch };
