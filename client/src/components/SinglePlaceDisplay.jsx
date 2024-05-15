import React from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { baseURL } from "../utilities/base";
import { useAuthContext } from "../context/AuthContext";

const SinglePlaceDisplay = ({ places }) => {
  const { authUser } = useAuthContext();
  if (places.description.length > 900) {
    places.description = `${places.description.substring(0, 1000)}...`;
  }

  const photo = `${baseURL}/uploads/${places.photos[0]}`;

  return (
    <div className="bg-gray-100 p-3 pt-5 gap-2 h-64 flex relative mt-5">
      <img
        className="object-cover w-48 h-56 rounded shrink-0"
        // src="https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg"
        // src={photo}
        src={places.photos[0]}
        alt=""
      />

      <div className="ml-4">
        <h2 className="font-medium mb-1">{places.title}</h2>
        <p className="">{places.description}</p>
      </div>
      <Link to={`/account/accommodations/places/${authUser.id}/${places._id}`}>
        <IoArrowForwardCircleOutline className="absolute bottom-5 right-7 text-3xl text-primary rounded-sm cursor-pointer" />
      </Link>
    </div>
  );
};

export default SinglePlaceDisplay;
