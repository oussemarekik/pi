import express from "express";
import {
  getSpecialet,
  createSpecialet,
  getSpecialetById,
  deleteSpecialetById,
  updateSpecia,
} from "../controllers/specialet.controller.js";
const router = express.Router();
router.get("/", getSpecialet);
router.post("/", createSpecialet);
router.get("/:id", getSpecialetById);
router.put("/:id", updateSpecia);
router.delete("/:id", deleteSpecialetById);
export default router;
