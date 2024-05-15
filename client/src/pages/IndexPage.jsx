import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import toast from "react-hot-toast";
import { baseURL } from "../utilities/base";
import TopNav from "../components/TopNav";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch(`${baseURL}/get-places`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setPlaces(data);
      } catch (error) {
        console.log(error);
        toast.error("internal server error");
      }
    };
    fetchPlaces();
  }, []);

  // console.log(places);

  return (
    <>
      <TopNav />
      <div className="grid grid-display gap-8 mt-40">
        {places.map((place) => (
          <Card
            key={place._id}
            id={place._id}
            title={place.title}
            address={place.address}
            photo={`${place.photos[0]}`}
            price={place.price}
          />
        ))}
      </div>
    </>
  );
};

export default IndexPage;
