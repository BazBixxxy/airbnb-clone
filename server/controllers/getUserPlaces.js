import TestPlace from "../models/test.model.js";

export const getUserPlaces = async (req, res) => {
  try {
    const { loggedInUser } = req.body;

    const places = await TestPlace.find({
      _id: { $ne: loggedInUser },
    });

    if (!places) return res.status(200).json("no places found");

    res.status(200).json(places);
  } catch (error) {
    console.log(error);
    res.status(404).json("Internal server error");
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    const places = await TestPlace.find();

    res.status(200).json(places);
  } catch (error) {
    console.log(error);
    res.status(404).json("Internal server error");
  }
};

export const getSinglePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await TestPlace.findById(id);
    res.status(200).json(place);
  } catch (error) {
    console.log(error);
    res.status(404).json("Internal server error");
  }
};
