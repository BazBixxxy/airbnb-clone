import React from "react";
import { TbBeachOff } from "react-icons/tb";
import { PiCityLight } from "react-icons/pi";
import { PiSwimmingPoolLight } from "react-icons/pi";
import { CiHome } from "react-icons/ci";
import { GiCampingTent } from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";

const TopNav = () => {
  return (
    <>
      <div className="fixed right-0 left-0 px-2 bg-white z-20">
        <div className="border mt-20 w-full"></div>
        <div className="flex gap-28 justify-center flex-wrap mt-3">
          <div className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-gray-800">
            <CiHome className="text-2xl" />
            Vacations
          </div>
          <div className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-gray-800">
            <TbBeachOff className="text-2xl" />
            beach
          </div>
          <div className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-gray-800">
            <PiCityLight className="text-2xl" />
            city
          </div>
          <div className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-gray-800">
            <PiSwimmingPoolLight className="text-2xl" />
            Amazing Pools
          </div>
          <div className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-gray-800">
            <GiCampingTent className="text-2xl" />
            Camping
          </div>
          <div className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-gray-800">
            <FaSkiing className="text-2xl" />
            Skiing
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
