import mongoose from "mongoose";
import Livre from "../models/Livre.model.js";
export const getLivre = async (req, res) => {
  try {
    const cat = await Livre.find()
      .populate("auteurs")
      .populate("editeur")
      .populate("specialte");
    res.status(200).json(cat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getLivreByID = async (req, res) => {
  try {
    const cat = await Livre.findById(req.params.id)
      .populate("auteurs")
      .populate("editeur")
      .populate("specialte");
    res.status(200).json(cat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createLivre = async (req, res) => {
  const {
    isbn,
    titre,
    annedition,
    couvertire,
    prix,
    auteurs,
    editeur,
    specialte,
  } = req.body;
  const newLivrer = new Livre({
    isbn: isbn,
    titre: titre,
    annedition: annedition,
    couvertire: couvertire,
    prix: prix,
    auteurs: auteurs,
    editeur: editeur,
    specialte: specialte,
  });
  try {
    await newLivrer.save();
    res.status(201).json(newLivrer);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updateLivre = async (req, res) => {
  const { id } = req.params;
  const {
    isbn,
    titre,
    annedition,
    couvertire,
    prix,
    editeur,
    auteurs,
    specialte,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`pas 
    de Livre avec un id: ${id}`);
  const liv1 = {
    isbn: isbn,
    titre: titre,
    annedition: annedition,
    couvertire: couvertire,
    prix: prix,
    auteurs: auteurs,
    editeur: editeur,
    specialte: specialte,
    _id: id,
  };
  await Livre.findByIdAndUpdate(id, liv1);
  res.json(liv1);
};
export const deleteLivre = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`pas 
    de auteur avec l'ID: ${id}`);
  await Livre.findByIdAndDelete(id);
  res.json({ message: "Livre  supprimé avec succès." });
};
