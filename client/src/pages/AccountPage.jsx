import React from "react";
import { useAuthContext } from "../context/AuthContext";
import ProfileHeader from "../layouts/ProfileHeader";
import { Navigate } from "react-router-dom";

const AccountPage = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="">
      <Navigate to={"/account/profile"} />
    </div>
  );
};

export default AccountPage;
