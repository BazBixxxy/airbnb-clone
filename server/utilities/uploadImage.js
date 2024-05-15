import cloudinary from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

// module.exports = (image) => {
//   // image is in base64 format
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(image, opts, (error, result) => {
//       if (result && result.secure_url) {
//         console.log(result.secure_url);
//         return resolve(result.secure_url);
//       }
//       console.log(error.message);
//       return reject({ message: error.message });
//     });
//   });
// };

const uploadImage = async (image, opts) => {
  try {
    const result = await cloudinary.uploader.upload(image, opts);
    if (result && result.secure_url) {
      // console.log(result.secure_url);
      return result.secure_url;
    }
    console.log(error.message);
  } catch (error) {
    console.log(error.message);
  }
};

export default uploadImage;
