import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { baseURL } from "../utilities/base";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthUser } = useAuthContext();

  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`/api/login`, {
        email,
        password,
      });
      // const data = await res.json();
      setAuthUser(data.data);
      if (data.error) throw new Error(data.error);
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      // console.log(data);
      setEmail("");
      setPassword("");
      toast.success("login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      toast.error(`invalid email or password`);
    }
  };

  return (
    <div className="h-screen flex flex-col  justify-center items-center pb-36">
      <h1 className="text-2xl text-center mb-8">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="your@email.com"
          className="border p-2 w-80 rounded"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password here"
          className="border p-2 w-80 rounded"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-primary p-2 rounded text-white">
          Login
        </button>
      </form>
      <div className="text-gray-500 mt-3">
        Don't have an account?{" "}
        <Link to={"/signup"} className="text-primary hover:underline">
          Register Here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
