import React, { useState } from "react";
import Logo from "../../src/assets/Goshala.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
function SignUp() {
  // State variables for form fields
  const Navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_REACT_APP_BASEURL;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") setUsername(value);
    if (id === "email") setEmail(value);
    if (id === "phone") setPhone(value);
    if (id === "password") setPassword(value);
    if (id === "confirm-password") setConfirmPassword(value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1((prev) => !prev);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation (optional, to ensure password and confirmPassword match)
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create the payload
    const payload = {
      username,
      email,
      phone,
      password,
    };
    console.log(username, email, phone, password);
    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/users/login/signup`,
        {
          user_name: username,
          email: email,
          password: password,
          user_mobile: phone,
        }
      );

      if (response) {
        alert("Sign up successful!");
        // Handle success (e.g., redirect to login page)
      } else {
        alert("Sign up failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleNavigate = () => {
    Navigate("/");
  };
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <section className="flex flex-col items-center justify-center w-1/2 bg-white">
        <img
          src={Logo}
          alt="Goshala Logo"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Right Section */}
      <section className="flex items-center justify-center w-1/2">
        <aside className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <p className="text-2xl font-bold text-gray-800">Sign Up</p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-xl font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-xl font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="number"
                value={phone}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-xl font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword1 ? "text" : "password"}
                    value={password}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility1}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                  >
                    {showPassword1 ? (
                      <AiFillEye size={20} />
                    ) : (
                      <AiFillEyeInvisible size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-xl font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <AiFillEye size={20} />
                  ) : (
                    <AiFillEyeInvisible size={20} />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-emerald-700 rounded hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
            <span
              onClick={handleNavigate}
              className="underline justify-end flex text-blue-700 cursor-pointer"
            >
              Back
            </span>
          </form>
        </aside>
      </section>
    </div>
  );
}

export default SignUp;