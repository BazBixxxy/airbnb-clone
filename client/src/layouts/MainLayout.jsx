import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <>
      <div className="p-7 px-12">
        <Header />
        <Toaster />
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
