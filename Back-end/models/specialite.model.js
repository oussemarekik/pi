import mongoose from "mongoose";
const SpecialetSchema = mongoose.Schema({
  nomspecialite: { type: String },
});

const Specialet = mongoose.model("specialet", SpecialetSchema);
export default Specialet;
