import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";
import { baseURL } from "../utilities/base";
import toast from "react-hot-toast";
import CheckboxGrid from "../components/CheckboxGrid";
import { json, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { IoTrashOutline } from "react-icons/io5";
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";

const AddPlace = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [price, setPrice] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const { authUser } = useAuthContext();

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const { data: filename } = await axios.post(`${baseURL}/upload-by-link`, {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
      setPhotoLink("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const uploadPhoto = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    await axios
      .post(`/api/upload-photo`, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: filenames } = res;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
    // console.log(addedPhotos);
  };

  const handleSubmit = async (e) => {
    axios.defaults.withCredentials = true;
    e.preventDefault();
    try {
      // const res = await axios.post(`${baseURL}/places/add`, {
      //   title,
      //   address,
      //   addedPhotos,
      //   description,
      //   perks,
      //   extraInfo,
      //   checkIn,
      //   checkOut,
      //   maxGuests,
      // });

      const res = await fetch(`/api/places/add-places`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          ownerId: authUser.id,
          title,
          address,
          addedPhotos,
          description,
          perks,
          price,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      console.log(data);

      toast.success("place added successfully");
      navigate(`/account/accommodations/places/${authUser.id}`);
    } catch (error) {
      toast.error(`Internal server error`);
      console.log(error.message);
    }
  };

  const removePhoto = (link) => {
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== link)]);
  };

  const setMainPhoto = (link) => {
    setAddedPhotos([link, ...addedPhotos.filter((photo) => photo !== link)]);
  };

  const convertBase64 = (file) => {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);

    axios.post(`${baseURL}/uploadImages`, { image: base64 }).then((res) => {
      setUrl(res.data);
      addedPhotos.push(res.data);
      console.log(res.data);
      toast.success("image uploaded to server");
    });
  };

  const addImageLink = (e) => {
    e.preventDefault();
    addedPhotos.push(photoLink);
    setPhotoLink("");
  };

  // console.log(url);
  console.log(addedPhotos);

  return (
    <div className="w-full mt-5 pb-5">
      <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          <div className="text-xl">Title*</div>
          <p className="text-sm text-gray-500">
            Title for your place, should be short and descriptive
          </p>
          <input
            type="text"
            className="border w-7/12 h-10 rounded p-2"
            placeholder="title, for example My lovely Apartment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <div className="text-xl">Address*</div>
          <p className="text-sm text-gray-500">Address to this place</p>
          <input
            type="text"
            className="border w-7/12 h-10 rounded p-2"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          <div className="text-xl">Photos*</div>
          <p className="text-sm text-gray-500">Atleast 3 photos</p>
          <input
            type="url"
            className="border w-7/12 h-10 rounded p-2"
            placeholder="add using a link...jpg/png/webp"
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
          />
          <button
            className="p-2 bg-primary text-white rounded ml-2"
            onClick={addImageLink}
          >
            Add photo
          </button>
          <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 w-full">
            {addedPhotos.length > 0 &&
              addedPhotos.map((photo, id) => (
                <div className="relative" key={photo}>
                  {photo === addedPhotos[0] && (
                    <>
                      <img
                        // src={`${baseURL}/uploads/` + photo}
                        src={photo}
                        alt=""
                        className="h-full object-cover rounded hover:brightness-50 cursor-pointer"
                      />
                      <GoStarFill className="absolute text-white bottom-2 left-2 cursor-pointer" />
                      <IoTrashOutline
                        className="absolute text-white bottom-2 right-2 cursor-pointer"
                        onClick={() => removePhoto(photo)}
                      />
                    </>
                  )}

                  {photo !== addedPhotos[0] && (
                    <>
                      <img
                        // src={`${baseURL}/uploads/` + photo}
                        src={photo}
                        alt=""
                        className="h-full object-cover rounded hover:brightness-50 cursor-pointer"
                      />
                      <GoStar
                        className="absolute text-white bottom-2 left-2 cursor-pointer"
                        onClick={() => setMainPhoto(photo)}
                      />
                      <IoTrashOutline
                        className="absolute text-white bottom-2 right-2 cursor-pointer"
                        onClick={() => removePhoto(photo)}
                      />
                    </>
                  )}
                </div>
              ))}
            <label className="p-12 text-xl text-gray-500 w-40 border rounded cursor-pointer">
              <input
                type="file"
                multiple
                className=" hidden"
                onChange={uploadImage}
              />
              <IoCloudUploadOutline /> upload from device
            </label>
          </div>
        </label>
        <label className="flex flex-col">
          <div className="text-xl">Description*</div>
          <p className="text-sm text-gray-500">Describe the place</p>
          <textarea
            type="text"
            className="border w-7/12 h-52 rounded p-1 resize-none"
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <div className="text-xl">Perks*</div>
        <p className="text-sm text-gray-500">Select perks in your place</p>
        <CheckboxGrid selected={perks} onChange={setPerks} />
        <label className="flex flex-col">
          <div className="text-xl">Price*</div>
          <p className="text-sm text-gray-500">
            What is your price per day for your airbnb
          </p>
          <input
            type="text"
            className="border w-7/12 h-10 rounded p-2"
            placeholder="400"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <div className="text-xl">Extra Information</div>
          <p className="text-sm text-gray-500">house rules, etc</p>
          <textarea
            type="text"
            className="border w-7/12 h-32 rounded p-2 resize-none"
            placeholder="Add any extra information"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          ></textarea>
        </label>
        <div className="text-xl">Check In & Check Out</div>
        <p className="text-sm text-gray-500">
          Add check in and checkout times, remember to have some time window for
          cleaning between guests
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label>
              <h3 className="mt-2">Check in</h3>
              <input
                type="date"
                className="border w-full h-10 rounded p-2"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              <h3 className="mt-2">Check out</h3>
              <input
                type="date"
                className="border w-full h-10 rounded p-2"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              <h3 className="mt-2">Max number of guests</h3>
              <input
                type="number"
                className="border w-full h-10 rounded p-2"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </label>
          </div>
        </div>
        <button className="w-full bg-primary p-2 rounded text-white mt-8">
          Add Your Place
        </button>
      </form>
    </div>
  );
};

export default AddPlace;
