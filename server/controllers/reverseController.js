import sdrModel from "../model/sdrModel.js";

// Assuming you have a separate initialization script or database migration:

const reverseSearch = async (req, res, next) => {
  const { key2, key1, father1, email1 } = req.body;

  console.log("Search criteria:", { key2, key1, father1, email1 });

  // Build the query object dynamically
  const query = {};
  if (key2) query.subscribername = { $regex: `.*${key2}.*`, $options: "i" };
  if (key1) query.localaddress = { $regex: `.*${key1}.*`, $options: "i" };
  if (father1)
    query.fatherhusname = { $regex: `.*${father1}.*`, $options: "i" };
  if (email1) query.email = { $regex: `.*${email1}.*`, $options: "i" };

  try {
    const data1 = await sdrModel
      .find(query)
      .select(
        "subscribername localaddress tnumber addressproff dob alternative email fatherhusname"
      )
      .lean()
      .limit(100);

    console.log("Data found:", data1);

    if (data1.length === 0) {
      console.log("No data found matching the criteria.");
    }

    return res.json({
      status: 200,
      message: data1.length > 0 ? "Data Found" : "No Data Found",
      data1,
    });
  } catch (error) {
    console.error("Error occurred in reverseSearch:", error);
    return res.status(500).json({
      status: 500,
      message: "An error occurred while searching for data",
      error: error.message,
    });
  }
};

// if (!key2 && key1) {
//   const data1 = await sdrModel
//     .find({
//       $and: [{ localaddress: { $regex: new RegExp(key1, "i") } }],
//     })
//     .select("subscribername localaddress tnumber addressproff dob")
//     .lean()
//     .limit(100);

//   return res.json({
//     status: 200,
//     message: "Data Found",
//     data1,
//   });
// } else {
//   const data1 = await sdrModel
// .find({
//   $and: [
//     { subscribername: { $regex: new RegExp(key2, "i") } },
//     { localaddress: { $regex: new RegExp(key1, "i") } },
//     { fatherhusname: { $regex: new RegExp(father1, "i") } },
//     { email: { $regex: new RegExp(email1, "i") } },
//   ],
// })
// .select(
//   "subscribername localaddress tnumber addressproff dob alternative email"
// )
// .lean()
// .limit(100);

// return res.json({
//   status: 200,
//   message: "Data Found",
//   data1,
// });
// }

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
