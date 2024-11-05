import mongoose from "mongoose";

const sdrSchema = mongoose.Schema({
  number: {
    type: Number,
    required: [true, "Enter Number"],
  },
  subscribername: {
    type: String,
  },
  fatherhusname: {
    type: String,
  },
  localaddress: {
    type: String,
  },
  permanantaddress: {
    type: String,
  },
  addressproff: {
    type: String,
  },
});

const sdrModel = mongoose.model("sdrData", sdrSchema);
export default sdrModel;
