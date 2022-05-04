import express from "express";
const router = express.Router();
import {
  getLivre,
  getLivreByID,
  createLivre,
  updateLivre,
  deleteLivre,
} from "../controllers/livre.controller.js";
import { auth } from "../middlewares/auth.js";

/**
 * @route GET /api/auteurs
 * @desc Get All auteurs
 * @access Public
 */

router.get("/", auth, getLivre);
/**
 * @route POST /api/auteurs
 * @desc Ajouter un auteur
 * @access Public
 */
router.post("/", createLivre);
/**
 * @route GET /api/auteurs/:id
 * @desc Renvoyer un auteur
 * @access Public
 */
router.get("/:id", getLivreByID);
/**
 * @route PUT /api/auteurs/:id
 * @desc Modifier un auteur
 * @access Public
 */
router.put("/:id", updateLivre);
/**
 * @route DELETE /api/auteurs/:id
 * @desc Supprimer un auteur
 * @access Public
 */
router.delete("/:id", deleteLivre);
export default router;
