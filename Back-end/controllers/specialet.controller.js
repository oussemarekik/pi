import Specialet from "../models/specialite.model.js";
export const getSpecialet = async (req, res) => {
  const spec = await Specialet.find();
  res.json(spec);
};
export const createSpecialet = async (req, res) => {
  const { nomspecialite } = req.body;
  const newSpec = new Specialet({
    nomspecialite: nomspecialite,
  });
  newSpec.save();
  res.json(newSpec);
};
export const getSpecialetById = async (req, res) => {
  const { id } = req.params;
  try {
    const Spec = await Specialet.findById(id);
    res.json(Spec);
  } catch (r) {
    res.json({ message: r.message });
  }
};
export const deleteSpecialetById = async (req, res) => {
  const { id } = req.params;
  try {
    await Specialet.findByIdAndDelete(id);
    res.json("Specialet est supprimé");
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const updateSpecia = async (req, res) => {
  const { id } = req.params;
  try {
    const { nomspecialite } = req.body;
    const spec = new Specialet({ _id: id, nomspecialite: nomspecialite });
    await Specialet.findByIdAndUpdate(id, spec);
    res.json(spec);
  } catch (err) {
    res.json({ message: err.message });
  }
};
