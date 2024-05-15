import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
    },
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
      type: String,
    },
    checkOut: {
      type: String,
    },
    maxGuests: Number,
  },
  { timestamps: true }
);

const TestPlace = mongoose.model("test", PlaceSchema);

export default TestPlace;
