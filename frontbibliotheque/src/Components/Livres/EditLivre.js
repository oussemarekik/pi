import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadSinglelivre, updatelivre } from "../../Redux/Actions/livresAction";
import { loadSpecialites } from "../../Redux/Actions/specialitesAction";
import { loadEditeurs } from "../../Redux/Actions/editeursAction";
import { loadAuteurs } from "../../Redux/Actions/auteursAction";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const EditLivre = () => {
  const [state, setState] = useState({
    isbn: "",
    titre: "",
    annedition: "",
    prix: "",
    qtestock: "",
    specialte: "",
    editeur: "",
    auteurs: [],
  });

  const [aut, setAut] = useState([]);
  const [files, setFiles] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const _id = params._id;
  useEffect(() => {
    dispatch(loadSinglelivre(_id));
    dispatch(loadSpecialites());
    dispatch(loadEditeurs());
    dispatch(loadAuteurs());
    setFiles("");
  }, [_id, dispatch]);

  const livre = useSelector((state) => state.alllivres.livre);
  const specialites = useSelector((state) => state.allspecialites.specialites);
  const editeurs = useSelector((state) => state.allediteurs.editeurs);
  const listeauteurs = useSelector((state) => state.allauteurs.auteurs);
  useEffect(() => {
    setState(livre);
    setFiles(livre.couvertire);
  }, [livre]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(aut);
    const liv = {
      _id: _id,
      isbn: state.isbn,
      titre: state.titre,
      annedition: state.annedition,
      prix: state.prix,
      couvertire: files[0].file.name,
      specialte: state.specialite,
      editeur: state.editeur,
      auteurs: aut.length > 0 ? aut : state.auteurs,
    };
    dispatch(updatelivre(liv));
    navigate("/livres");
  };
  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const labelmaised = () => {
    if (state.editeur) {
      if (state.editeur.maisonedit)
        return "Editeur : " + state.editeur.maisonedit;
    } else return null;
  };
  const labelspecialite = () => {
    if (state.specialte) {
      if (state.specialte.nomspecialite)
        return "Sp??cialit?? : " + state.specialte.nomspecialite;
    } else return null;
  };
  const labelauteur = () => {
    if (state.auteurs) {
      let ch = "";
      state.auteurs.map((aut) => {
        if (aut.nomauteur) ch = ch + aut.nomauteur;
      });
      return ch;
    } else return null;
  };
  const handleAuteurs = (event) => {
    setState({ ...state, auteurs: [] });

    setAut(event.target.value);
  };
  return (
    <div className="container">
      <form style={{ marginLeft: 8 }}>
        <div>
          <Button
            color="secondary"
            variant="contained"
            onClick={(event) => handleSubmit(event)}
          >
            Modifier
          </Button>
        </div>
        <FormControl>
          <TextField
            name="isbn"
            variant="outlined"
            label="ISBN"
            value={state.isbn}
            onChange={handelInputChange}
            required
            style={{ margin: 10 }}
          />
          <TextField
            name="titre"
            variant="outlined"
            label="Titre"
            value={state.titre}
            onChange={handelInputChange}
            required
            style={{ margin: 10 }}
          />
          <TextField
            name="annedition"
            variant="outlined"
            type="Number"
            label="Ann??e"
            value={state.annedition}
            onChange={handelInputChange}
            style={{ margin: 10 }}
          />
          <TextField
            name="prix"
            variant="outlined"
            type="Number"
            label="Prix"
            value={state.prix}
            onChange={handelInputChange}
            style={{ margin: 10 }}
          />

          <TextField
            name="specialite"
            variant="outlined"
            select
            label={labelspecialite()}
            value={state.specialite}
            onChange={handelInputChange}
            style={{ margin: 10 }}
          >
            {specialites
              ? specialites.map((spec) => (
                  <MenuItem key={spec._id} value={spec._id}>
                    {spec.nomspecialite}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <TextField
            name="maised"
            variant="outlined"
            select
            label={labelmaised()}
            value={state.maised}
            onChange={handelInputChange}
            style={{ margin: 10 }}
          >
            {editeurs
              ? editeurs.map((edi) => (
                  <MenuItem key={edi._id} value={edi._id}>
                    {edi.maisonedit}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <TextField
            name="auteurs"
            variant="outlined"
            select
            label={labelauteur()}
            SelectProps={{ multiple: true }}
            value={aut ? aut : state.auteurs}
            helperText="S??lectionner des auteurs"
            onChange={(event) => handleAuteurs(event)}
          >
            {listeauteurs
              ? listeauteurs.map((aut) => (
                  <MenuItem key={aut._id} value={aut._id}>
                    {aut.nomauteur}
                  </MenuItem>
                ))
              : null}
          </TextField>
        </FormControl>
      </form>

      <h4>T??l??charger Image</h4>
      <FormControl>
        <div style={{ width: 300, height: 50 }}>
          <FilePond
            files={files}
            allowMultiple={false}
            onupdatefiles={setFiles}
            labelIdle='<span class="filepond--label-action">Browse 
One</span>'
          />
        </div>
      </FormControl>
    </div>
  );
};
export default EditLivre;
