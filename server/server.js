import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";
import uploadImage from "./utilities/uploadImage.js";
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDirectory = path.join(__dirname, "uploads");

import authRoutes from "./routes/auth.routes.js";
// import uploadRoutes from "./routes/upload.routes.js";
import placeRoutes from "./routes/place.routes.js";
import getPlacesRoutes from "./routes/getPlaces.routes.js";

const app = express();

// middleware
// app.use(express.json());
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use("/api/uploads", express.static(uploadDirectory)); // middleware for displaying the images from the server
// app.use("/api/upload", express.static(__dirname + "../uploads")); // middleware for displaying the images from the server
// app.use(cors());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use("/api", authRoutes);
// app.use("/api", uploadRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/get-places/", getPlacesRoutes);

app.get("/api/test", (req, res) => {
  res.status(200).json("server running here");
});

app.post("/api/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.status(200).json(newName);
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
});

app.post("/api/uploadImages", async (req, res) => {
  try {
    const url = await uploadImage(req.body.image);
    // console.log(url);
    res.status(200).json(url);
  } catch (error) {
    console.log(error.message);
  }
});

//photos middleware
// const photosMiddleware = multer({ dest: path.join(__dirname, "uploads/") });
const photosMiddleware = multer({ dest: uploadDirectory });

app.post(
  "/api/upload-photo",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    try {
      const uploadFiles = [];
      for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);
        uploadFiles.push(
          newPath.replace("/Users/user/crashes/airbnb-clone/server/uploads", "")
        );
      }
      res.status(200).json(uploadFiles);
    } catch (error) {
      res.status(400).json({ error: `${error}` });
    }
  }
);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(5000, () => {
      console.log("server running on port 5000");
    });
  })
  .catch((error) => {
    console.log(`Internal server errror: ${error}`);
  });
