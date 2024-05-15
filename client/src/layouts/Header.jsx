import React from "react";
import { SiAirbnb } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Header = () => {
  const { authUser } = useAuthContext();

  return (
    <header className="flex justify-between fixed top-0 right-0 left-0 p-9 z-50 bg-white pb-1">
      <Link to={"/"} href="" className="flex gap-2 items-center">
        <SiAirbnb className="text-2xl text-primary" />
        <span className="text-primary font-bold text-xl">airbnb</span>
      </Link>
      <div className="flex gap-2 border p-1 px-5 rounded-full items-center shadow-md">
        <div className="">Anywhere</div>
        <div className="border h-5"></div>
        <div>Any week</div>
        <div className="border h-5"></div>
        <div>Add guest</div>
        <div className="border h-5"></div>
        <button className="p-2 bg-primary rounded-full">
          <FaSearch className="text-white" />
        </button>
      </div>
      <Link
        to={authUser ? "/account" : "/login"}
        className="flex gap-3 border p-2 px-3 rounded-full items-center shadow-sm"
      >
        <IoMdMenu className="text-2xl" />
        <div className="relative">
          <FaRegCircleUser className="text-2xl" />
          {authUser && (
            <div className="h-2 w-2 bg-green-500 animate-bounce rounded-full absolute top-0 right-0"></div>
          )}
        </div>
        {authUser && <p className="text-xl capitalize">{authUser.name}</p>}
      </Link>
    </header>
  );
};

export default Header;
