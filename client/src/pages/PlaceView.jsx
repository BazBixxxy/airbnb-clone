import React, { useEffect, useState } from "react";
import { PiStarFill } from "react-icons/pi";
import { MdLocationPin } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiArrowLeftCircle } from "react-icons/fi";
import { Link, useLoaderData, useParams } from "react-router-dom";
import TopInformationPanel from "../components/TopInformationPanel";
import PhotoDisplay from "../components/PhotoDisplay";
import DescriptionPanel from "../components/DescriptionPanel";
import PerksPanel from "../components/PerksPanel";
import { baseURL } from "../utilities/base";
import ExtraInfoPanel from "../components/ExtraInfoPanel";

const PlaceView = () => {
  const { id } = useParams();
  const place = useLoaderData();

  // console.log(place);

  return (
    <section className="mt-20">
      <Link to={"/"}>
        <FiArrowLeftCircle className="text-3xl text-primary cursor-pointer" />
      </Link>
      <h3 className="capitalize text-2xl mb-3">{place.title}</h3>
      <TopInformationPanel place={place} />
      <PhotoDisplay place={place} />
      <h4 className="mt-5">
        Hosted by <span className="font-bold">Airbnb</span>
      </h4>
      <div className="flex gap-5 mt-3 mb-3">
        <div>{place.maxGuests} guests</div>
        <div className="flex items-center gap-2">
          <CiCalendar />
          Available {place.checkIn}
        </div>
        <div className="flex items-center gap-2">
          <strong>$ {place.price}</strong>
          per day/night
        </div>
      </div>
      <DescriptionPanel place={place} />
      <PerksPanel place={place} />
      <ExtraInfoPanel place={place} />
      <button className="text-white w-full bg-primary p-2 rounded-full mt-4">
        Book Place
      </button>
    </section>
  );
};

const placeLoader = async ({ params }) => {
  const res = await fetch(`${baseURL}/get-places/${params.id}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
};

// export default PlaceView;
export { PlaceView as default, placeLoader };
