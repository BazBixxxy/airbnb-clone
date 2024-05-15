import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoMdBookmark } from "react-icons/io";
import { CiBookmarkPlus } from "react-icons/ci";
import { LuHotel } from "react-icons/lu";
import { FaListCheck } from "react-icons/fa6";

const ProfileHeader = () => {
  return (
    <>
      <nav className="w-full flex justify-center gap-24 pr-7 mt-24">
        <NavLink
          to="/account/profile"
          className={({ isActive }) =>
            isActive
              ? " bg-primary w-32 text-center text-white rounded-full flex items-center gap-1 justify-center"
              : "w-32 flex items-center gap-1 justify-center"
          }
        >
          <CiUser className="text-xl" />
          Profile
        </NavLink>
        <NavLink
          to={"/account/bookings"}
          className={({ isActive }) =>
            isActive
              ? "bg-primary w-44 text-center text-white rounded-full flex items-center gap-2 justify-center"
              : "w-44 flex items-center gap-2 justify-center"
          }
        >
          <FaListCheck className="" />
          My Bookings
        </NavLink>
        <NavLink
          to={"/account/accommodations"}
          className={({ isActive }) =>
            isActive
              ? "p-2 bg-primary w-56 text-center text-white rounded-full flex items-center gap-1 justify-center"
              : "p-2 w-56 flex items-center gap-1 justify-center"
          }
        >
          <LuHotel />
          My Accommodations
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default ProfileHeader;
