import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Username"],
    },
    roll: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    penno: {
      type: Number,
      required: [true, "Please enter Penno"],
      maxLength: [6, "Invalid PEN Number"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
    },
    admincode: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("userdata2025", userSchema);
export default userModel;
