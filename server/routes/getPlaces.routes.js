import express from "express";
import {
  getUserPlaces,
  getAllPlaces,
  getSinglePlace,
} from "../controllers/getUserPlaces.js";

const router = express.Router();

router.get("/", getAllPlaces);
router.get("/:id", getSinglePlace);
router.post("/:id", getUserPlaces);

export default router;
