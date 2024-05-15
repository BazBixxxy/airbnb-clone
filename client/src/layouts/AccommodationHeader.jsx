import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { LuHotel } from "react-icons/lu";
import { useAuthContext } from "../context/AuthContext";

const AccommodationHeader = () => {
  const { authUser } = useAuthContext();
  return (
    <>
      <nav className="flex items-center justify-center gap-20 mt-5">
        <NavLink
          to={`/account/accommodations/places/${authUser.id}`}
          className={({ isActive }) =>
            isActive
              ? "bg-primary p-2 w-44 text-center text-white rounded-full flex items-center gap-2 justify-center"
              : "w-44 flex items-center p-2 gap-2 justify-center"
          }
        >
          <LuHotel />
          My places
        </NavLink>
        <NavLink
          to={"/account/accommodations/add"}
          className={({ isActive }) =>
            isActive
              ? "bg-primary p-2 w-44 text-center text-white rounded-full flex items-center gap-2 justify-center"
              : "w-44 p-2 flex items-center gap-2 justify-center"
          }
        >
          <GoPlus className="text-xl" />
          Add new place
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default AccommodationHeader;
