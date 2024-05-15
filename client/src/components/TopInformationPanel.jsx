import React from "react";
import { PiStarFill } from "react-icons/pi";
import { MdLocationPin } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiArrowLeftCircle } from "react-icons/fi";

const TopInformationPanel = ({ place }) => {
  return (
    <div className="w-7/12 flex justify-between mb-1">
      <div className="flex items-center justify-between w-52 mb-2">
        <div className="flex items-center">
          <PiStarFill className="mr-2" />
          4.96
        </div>
        <div className="flex items-center ml-6">
          <MdLocationPin className="mr-2 text-xl" />
          <div className="w-64">{place.address}</div>
        </div>
      </div>
      <div className="flex items-center justify-between w-52 mb-2">
        <div className="flex items-center">
          <CiShare1 className="mr-2" />
          share
        </div>
        <div className="flex items-center">
          <CiBookmark className="mr-2" />
          Save
        </div>
      </div>
    </div>
  );
};

export default TopInformationPanel;
