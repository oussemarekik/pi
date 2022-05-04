import mongoose from "mongoose";
var auteurSchema = mongoose.Schema({
  isbn: String,
  titre: String,
  annedition: String,
  couvertire: String,
  prix: String,

  editeur: { type: mongoose.Schema.Types.ObjectId, ref: "Editeur" },
  specialte: { type: mongoose.Schema.Types.ObjectId, ref: "specialet" },
  auteurs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Auteur" }],
});
const Livre = mongoose.model("Livre", auteurSchema);
export default Livre;
