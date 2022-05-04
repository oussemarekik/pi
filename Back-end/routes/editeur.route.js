import express from "express";
import {
  getEditeur,
  createAuteur,
  getEditeurById,
  deleteEditeurByid,
  UpdateEditeurByID,
} from "../controllers/Editeur.controller.js";
const router = express.Router();

router.get("/", getEditeur);
router.post("/", createAuteur);
router.get("/:id", getEditeurById);
router.delete("/:id", deleteEditeurByid);
router.put("/:id", UpdateEditeurByID);
export default router;
