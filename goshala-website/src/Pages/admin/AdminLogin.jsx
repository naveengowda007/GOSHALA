import React, { useState } from "react";
import images from "../../constants/images";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [call, setCall] = useState(false);
  let navigate = useNavigate();
  const onChange = (e) => {
    setCred((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  const handleLogin = async () => {
    setCall(true);
    if (cred.email.length === 0 || cred.password.length === 0) {
      alert("Please provide required input fields");
      setCall(false);
      return;
    }
    try {
      const response = await axios.post(import.meta.env.VITE_ADMIN_LOGIN, cred);
      if (response.status === 200) {
        sessionStorage.setItem("adminAccess", response.data.accessToken);
        alert("Logged in successfully");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      alert("Error occured while logging in");
      console.log(error);
    } finally {
      setCall(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10">
        <img
          src={images.AdminLogin}
          alt="Admin Illustration"
          className="w-[70%] object-contain shadow-xl"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10">
        {/* Logo */}
        <div className="mb-8">
          <img
            src={images.AdminLogo}
            alt="Admin Logo"
            className="w-32 h-auto"
          />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              disabled={call}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                disabled={call}
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                onChange={onChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {show ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          <div>
            <button
              className="w-full bg-green-prm text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
              onClick={handleLogin}
            >
              {call ? "Loggin..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
