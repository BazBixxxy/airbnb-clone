import React, { useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { PiStarFill } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";

const Card = ({ id, address, title, price, photo }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative">
      <img
        className="h-64 object-cover rounded-3xl w-full"
        // src="https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg"
        src={photo}
        alt=""
      />
      <GoHeartFill
        className={`absolute top-3 right-4 text-xl cursor-pointer ${
          liked ? "text-primary" : "text-white"
        }`}
        onClick={() => setLiked((prevState) => !prevState)}
      />
      <div className="px-3 mt-3">
        <h3 className="truncate flex items-center justify-between capitalize">
          {address}
          <div className="flex items-center">
            <PiStarFill className="text-gray-700 mr-1" />
            4.95
          </div>
        </h3>
        <Link
          to={`/place/${id}`}
          className="truncate text-primary cursor-pointer capitalize"
        >
          {title}
        </Link>
        <p className="text-gray-400">Feb 5 - 10</p>
        <p className="text-gray-400">
          <span className="text-gray-900"> $ {price}</span> per day
        </p>
      </div>
    </div>
  );
};

export default Card;
