import Editeur from "../models/Editeur.model.js";
import mongoose from "mongoose";
export async function getEditeur(req, res) {
  try {
    const listEditeur = await Editeur.find();
    res.status(200).json(listEditeur);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function getEditeurById(req, res) {
  try {
    const edi = await Editeur.findById(req.params.id);
    res.json(edi);
  } catch (error) {
    res.json({ message: error.message });
  }
}
export async function createAuteur(req, res) {
  const { maisonedit, siteweb, email } = req.body;
  const newEditeur = new Editeur({
    email: email,
    maisonedit: maisonedit,
    siteweb: siteweb,
  });

  try {
    newEditeur.save();
    res.status(200).json(newEditeur);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
export async function deleteEditeurByid(req, res) {
  try {
    const id = req.params.id;
    await Editeur.findByIdAndDelete(id);
    res.json("Editeur est supprimer");
  } catch (error) {
    res.json({ message: error.message });
  }
}
export const UpdateEditeurByID = async (req, res) => {
  const { maisonedit, siteweb, email } = req.body;
  const { id } = req.params;
  try {
    const edit = new Editeur({
      _id: id,
      maisonedit: maisonedit,
      siteweb: siteweb,
      email: email,
    });

    await Editeur.findByIdAndUpdate(id, edit);
    res.json(edit);
  } catch (error) {
    res.json({ message: error.message });
  }
};
