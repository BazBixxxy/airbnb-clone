import PlaceModel from "../models/place.model.js";
import jwt from "jsonwebtoken";
import TestPlace from "../models/test.model.js";

export const getPlaces = async (req, res) => {
  res.status(200).json("add places");
};

// ! actual code [this jam to work]
export const addPlace = async (req, res) => {
  try {
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;
    const newPlace = await PlaceModel.create({
      owner: req.user._id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });

    res.status(200).json(newPlace);
  } catch (error) {
    console.log(error);
    res.status(404).json(`${error}`);
  }
};

// * sample code here [this actually works]
export const add = async (req, res) => {
  try {
    const {
      ownerId,
      title,
      address,
      addedPhotos,
      description,
      perks,
      price,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;
    const newPlace = await TestPlace.create({
      ownerId,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      price,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.status(200).json(newPlace);
  } catch (error) {
    console.log(error);
    res.status(404).json(`${error}`);
  }
};

// ! I used this code because I was desperate
export const addPlaces = (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const newPlace = await PlaceModel.create({
      owner: userData.id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.status(200).json(newPlace);
    console.log(newPlace);
  });
};

export const updatePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await TestPlace.findByIdAndUpdate(id, req.body);
    if (!place) res.status(200).json(`place not found`);
    const updatedPlace = await TestPlace.findById(id);
    res.status(200).json(updatedPlace);
  } catch (error) {
    console.log(error);
    res.status(404).json(`Internal server error`);
  }
};

export const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await TestPlace.findByIdAndDelete(id);
    if (!place) res.status(404).json({ message: `place not found` });
    res.status(200).json("place has been deleted");
  } catch (error) {
    res.status(404).json(`Internal server error`);
  }
};
