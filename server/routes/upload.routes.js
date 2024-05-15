import express from "express";
import cloudinary from "../utilities/cloudinary.config.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/upload-by-photo", upload.single("image"), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (error, res) => {
    if (error) return res.status(500).json(`${error}`);
    return res.status(200).json({
      success: true,
      message: "uploaded",
      data: res,
    });
  });
});



export default router;
