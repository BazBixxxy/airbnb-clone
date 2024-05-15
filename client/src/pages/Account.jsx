import React from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { baseURL } from "../utilities/base";
import toast from "react-hot-toast";

const Account = () => {
  const { authUser, setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      await axios.post(`/api/logout`);
      localStorage.removeItem("userInfo");
      setAuthUser(null);
      toast.success(`${authUser.name} logged out`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center mt-24">
      <div className="flex flex-col gap-4 items-center">
        <p>
          Logged in as <strong className="capitalize">{authUser.name}</strong>{" "}
        </p>
        <button
          className="w-64 bg-primary p-2 text-white rounded-full"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
