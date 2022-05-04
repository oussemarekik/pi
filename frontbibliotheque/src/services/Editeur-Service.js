import Axios from "../Axios/Api";
const EDITEUR_API = "/editeur";
const fetchEditeurs = async () => {
  return await Axios.get(EDITEUR_API);
};
export const EditeurService = {
  fetchEditeurs,
};
