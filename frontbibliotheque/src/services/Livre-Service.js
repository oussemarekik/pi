import Axios from "../Axios/Api";
const Livre_Api = "/livres";
let user = JSON.parse(localStorage.getItem("user"));
console.log("service user", user);
const fetchLivre = async () => {
  await Axios.get(Livre_Api).then((res) => console.log(res.data));
  return await Axios.get(Livre_Api);
};
const fetchLivreById = async (livreId) => {
  return await Axios.get(Livre_Api + "/" + livreId);
};
const deleteLivre = async (livreId) => {
  return await Axios.delete(Livre_Api + "/" + livreId);
};
const addLivre = async (livre) => {
  console.log("livre :", livre);
  return await Axios.post(Livre_Api, livre);
};
const editLivre = async (livre) => {
  return await Axios.put(Livre_Api + "/" + livre._id, livre);
};
export const LivreService = {
  fetchLivre,
  editLivre,
  addLivre,
  deleteLivre,
  fetchLivreById,
};
