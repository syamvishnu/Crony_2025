import mongoose from "mongoose";

const userLogSchema = new mongoose.Schema({
  penno: {
    type: Number,
    required: true,
  },

  logState: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const userLogModel = mongoose.model("userlogs", userLogSchema);

export default userLogModel;
