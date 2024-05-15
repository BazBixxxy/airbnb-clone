import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AccommodationsPage = () => {
  const { authUser } = useAuthContext();

  return (
    <section className="w-full flex justify-center mt-5">
      <Navigate to={`/account/accommodations/places/${authUser.id}`} />
    </section>
  );
};

export default AccommodationsPage;
