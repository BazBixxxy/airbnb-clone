import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseURL } from "../utilities/base";
import { useParams } from "react-router-dom";
import { AuthContext, useAuthContext } from "../context/AuthContext";
import SinglePlaceDisplay from "../components/SinglePlaceDisplay";

const MyPlaces = () => {
  const { authUser } = useAuthContext();
  const userId = authUser.id;

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        // const re = await axios.post(`${baseURL}/api/get-place/${userId}`, {
        //   loggedInUser: authUser,
        // });
        // console.log(re);
        const res = await fetch(`${baseURL}/get-places/${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({
            loggedInUser: userId,
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setPlaces(data);
      } catch (error) {
        console.log(error);
        toast.error("internal server error");
      }
    };

    fetchUserPlaces();
  }, []);

  // console.log(places);

  return (
    <section className="mt-5">
      {places.map((place) => (
        <SinglePlaceDisplay key={place._id} places={place} />
      ))}
    </section>
  );
};

export default MyPlaces;
