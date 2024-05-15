import React, { useEffect, useState } from "react";
import { PiStarFill } from "react-icons/pi";
import { MdLocationPin } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiArrowLeftCircle } from "react-icons/fi";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import TopInformationPanel from "../components/TopInformationPanel";
import PhotoDisplay from "../components/PhotoDisplay";
import DescriptionPanel from "../components/DescriptionPanel";
import PerksPanel from "../components/PerksPanel";
import { baseURL } from "../utilities/base";
import ExtraInfoPanel from "../components/ExtraInfoPanel";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const PlacePage = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const place = useLoaderData();
  console.log(place);

  const deletePlace = async () => {
    const confirm = window.confirm(
      `Are you sure you want to delete this place?`
    );
    if (!confirm) return;
    axios.delete(`${baseURL}/places/${place._id}`);
    toast.success(`${place.title} has been deleted`);
    navigate(`/account/accommodations/places/${authUser.id}`);
  };

  return (
    <section className="mt-2">
      <Link to={`/account/accommodations/places/${authUser.id}`}>
        <FiArrowLeftCircle className="text-3xl text-primary cursor-pointer mb-3" />
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
      </div>
      <DescriptionPanel place={place} />
      <PerksPanel place={place} />
      <ExtraInfoPanel place={place} />
      <Link to={`/account/accommodations/places/edit/${place._id}`}>
        <button className="text-white w-full bg-primary p-2 rounded-full mt-4">
          Edit Place
        </button>
      </Link>
      <button
        className="text-black w-full border border-black p-2 rounded-full mt-4 hover:bg-primary hover:text-white"
        onClick={deletePlace}
      >
        Delete Place
      </button>
    </section>
  );
};

export default PlacePage;
