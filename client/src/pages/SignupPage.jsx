import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../utilities/base";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return toast.error(`passwords don't match`);

    try {
      await axios.post(`${baseURL}/register`, {
        name,
        email,
        password,
      });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      toast.success("Registered successfully, Login now");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };



  return (
    <div className="h-screen flex flex-col  justify-center items-center pb-36">
      <h1 className="text-2xl text-center mb-8">Register</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="name"
          placeholder="username"
          className="border p-2 w-80 rounded"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          minLength={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm password"
          className="border p-2 w-80 rounded"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="w-full bg-primary p-2 rounded text-white">
          Register
        </button>
      </form>
      <div className="text-gray-500 mt-3">
        Already have an account?{" "}
        <Link to={"/login"} className="text-primary hover:underline">
          Login Here
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
