import mongoose from "mongoose";


const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true }
});

export default mongoose.model("City", CitySchema);
