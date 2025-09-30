import mongoose from "mongoose";

const StateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  region: { type: String, required: true }
});

export default mongoose.model("state", StateSchema);

