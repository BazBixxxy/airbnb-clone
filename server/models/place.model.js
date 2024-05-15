import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // owner: {
    //   type: String
    // },
    title: {
      type: String,
    },
    address: {
      type: String,
    },
    photos: [String],
    description: {
      type: String,
    },
    perks: [String],
    price: String,
    extraInfo: {
      type: String,
    },
    checkIn: {
      type: Number,
    },
    checkOut: {
      type: Number,
    },
    maxGuests: Number,
  },
  { timestamps: true }
);

const PlaceModel = mongoose.model("Place", PlaceSchema);

export default PlaceModel;
