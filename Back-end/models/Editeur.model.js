import mongoose from "mongoose";

const editeurSchema = mongoose.Schema({
  maisonedit: String,
  siteweb: String,
  email: String,
});

const Editeur = mongoose.model("Editeur", editeurSchema);
export default Editeur;
