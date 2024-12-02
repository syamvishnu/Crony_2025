// import mongoose from "mongoose";

// const dbUpdateSchema = new mongoose.Schema({
//   tnumber: {
//     type: Number,
//   },

//   subscribername: {
//     type: String,
//   },
//   dob: {
//     type: String,
//   },

//   fatherhusname: {
//     type: String,
//   },

//   localaddress: {
//     type: String,
//   },

//   permanantaddress: {
//     type: String,
//   },
//   alternative: {
//     type: String,
//   },
//   addressproff: {
//     type: String,
//   },

//   service_provider: {
//     type: String,
//   },
//   email: {
//     type: String,
//   },

//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const dbUpadeModel = mongoose.model("sdrdb25", dbUpdateSchema);

// export default dbUpadeModel;

import mongoose from "mongoose";

const dbUpdateSchema = new mongoose.Schema({
  tnumber: { type: String, default: "" },
  subscribername: { type: String, default: "" },
  dob: { type: String, default: "" },
  fatherhusname: { type: String, default: "" },
  localaddress: { type: String, default: "" },
  permanantaddress: { type: String, default: "" },
  addressproff: { type: String, default: "" },
  service_provider: { type: String, default: "" },
  alternative: { type: String, default: "" },
  email: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now },
});

const dbUpdateModel = mongoose.model("dbUpdate", dbUpdateSchema);

export default dbUpdateModel;
