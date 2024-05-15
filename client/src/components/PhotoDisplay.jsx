import React from "react";
import { baseURL } from "../utilities/base";

const PhotoDisplay = ({ place }) => {
  return (
    <div className="pic-display">
      <div className="">
        <img
          className="object-cover rounded-xl h-96 w-96"
          // src="https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg"
          src={`${place.photos[0]}`}
          alt=""
        />
      </div>
      <div className="px-2">
        <img
          className="object-cover rounded-xl h-64 w-64 mb-1"
          // src="https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg"
          src={`${place.photos[1]}`}
          alt=""
        />
        <img
          className="object-cover rounded-xl h-32 w-64"
          // src="https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg"
          src={`${place.photos[2]}`}
          alt=""
        />
      </div>
    </div>
  );
};

export default PhotoDisplay;
