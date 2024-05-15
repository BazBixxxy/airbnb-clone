import express from "express";
import {
  getPlaces,
  addPlace,
  addPlaces,
  add,
  updatePlace,
  deletePlace
} from "../controllers/place.controller.js";
import protectRoute from "../middleware/protectRoutes.js";

const router = express.Router();

router.get("/", protectRoute, getPlaces);
router.post("/add", protectRoute, addPlace);

// ! for debugging purposes
router.post("/add-place", addPlaces);

// * this kinda worked
router.post("/add-places", add);
router.put("/:id", updatePlace);
router.delete("/:id", deletePlace);

export default router;
