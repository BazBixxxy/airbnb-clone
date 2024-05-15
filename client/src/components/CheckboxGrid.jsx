import React from "react";
import { IoIosWifi } from "react-icons/io";
import { LiaTvSolid } from "react-icons/lia";
import { IoCarSportOutline } from "react-icons/io5";
import { GiWashingMachine } from "react-icons/gi";
import { LiaSwimmerSolid } from "react-icons/lia";
import { PiSecurityCamera } from "react-icons/pi";
import { PiDog } from "react-icons/pi";
import { CgGym } from "react-icons/cg";
import { TbAirConditioning } from "react-icons/tb";
import { IoCloudUploadOutline } from "react-icons/io5";

const CheckboxGrid = ({ selected, onChange }) => {
  const handleCheckbox = (e) => {
    // e.preventDefault();
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedbox) => selectedbox !== name)]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          name="wifi"
          onChange={handleCheckbox}
          className="accent-primary"
        />
        <label className="ml-1 flex items-center gap-1">
          <IoIosWifi /> Wifi Free
        </label>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          className="accent-primary"
          name="entertainment"
          onChange={handleCheckbox}
        />
        <label className="ml-1 flex items-center gap-1">
          <LiaTvSolid />
          Entertainment
        </label>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          className="accent-primary"
          name="parking-spot"
          onChange={handleCheckbox}
        />
        <label className="ml-1 flex items-center gap-1">
          <IoCarSportOutline />
          Parking Spot
        </label>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          className="accent-primary"
          name="washing-machine"
          onChange={handleCheckbox}
        />
        <label className="ml-1 flex items-center gap-1">
          <GiWashingMachine />
          Washing Machine and Dryer
        </label>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          className="accent-primary"
          name="swimming-pool"
          onChange={handleCheckbox}
        />
        <label className="ml-1 flex items-center gap-1">
          <LiaSwimmerSolid />
          Swimming Pool
        </label>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          className="accent-primary"
          name="cameras"
          onChange={handleCheckbox}
        />
        <label className="ml-1 flex items-center gap-1">
          <PiSecurityCamera />
          Security
        </label>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          className="accent-primary"
          name="pets"
          onChange={handleCheckbox}
        />
        <label className="ml-1 flex items-center gap-1">
          <PiDog />
          Pets
        </label>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          className="accent-primary"
          name="gym"
          onChange={handleCheckbox}
        />
        <label className="ml-1 flex items-center gap-1">
          <CgGym />
          Fitness Center/gym
        </label>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          className="accent-primary"
          name="air-conditioner"
          onChange={handleCheckbox}
        />
        <label className="ml-1 flex items-center gap-1">
          <TbAirConditioning />
          air conditioner
        </label>
      </div>
    </div>
  );
};

export default CheckboxGrid;
