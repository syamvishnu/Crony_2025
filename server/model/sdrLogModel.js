import mongoose from "mongoose";

const sdrLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  penno: {
    type: Number,
    required: true,
  },

  data: {
    type: Number,
  },

  keyword1: {
    type: String,
  },

  keyword2: {
    type: String,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const sdrLogModel = mongoose.model("sdrlog", sdrLogSchema);

export default sdrLogModel;
