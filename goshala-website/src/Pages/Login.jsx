import React, { useState } from "react";
import Logo from "../../src/assets/Goshala.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { login } from "../Redux/AuthSlice";
function Login() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const BASEURL = import.meta.env.VITE_REACT_APP_BASEURL;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") setUsername(value);
    if (id === "email") setEmail(value);
    if (id === "phone") setPhone(value);
    if (id === "password") setPassword(value);
    if (id === "confirm-password") setConfirmPassword(value);
  };

  // const isFormValid = email.length > 0 && password.length > 0 ;
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if(!isFormValid) {
    //   alert("Please fill all the credentials")
    // }
    if(!email || !password) {
      return
    }
    // Create the payload
    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/users/login/request`,
        {
          email: email,
          password: password,
        }
      );

      if (response) {
        const token = response.data.accessToken; // Assuming the token is returned in the response
        sessionStorage.setItem("authToken", token);
        console.log(token);

        const userDetails = response.data.user; // Assuming user details are returned in the response

        // Dispatch login action to Redux
        dispatch(
          login({
            userDetails: userDetails,
            token: token,
          })
        );
        Navigate("/UserDashboard");
      } else {
        alert("Sign in failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response?.data?.err || "An error occurred. Please try again."
      );
    }
  };
  // test
  const handleNavigate = () => {
    Navigate("/SignUp");
  };
  const handleNavigateAdmin = () => {
    Navigate("/admin/login");
  };
  return (
    <div>
      {" "}
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
                  required
                  title="Please fill your email"
                />
              </div>

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
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                    title="Please fill your password"
                  />
                  <button
                    type="submit"
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
                // disabled={!isFormValid}
                className="w-full py-2 text-white bg-emerald-700 rounded hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>
              <div className="justify-between flex">
                <span
                  onClick={handleNavigateAdmin}
                  className="underline  text-blue-700 cursor-pointer"
                >
                  Admin Login
                </span>
                <span
                  onClick={handleNavigate}
                  className="underline  text-blue-700 cursor-pointer"
                >
                  Sign-up
                </span>
              </div>
            </form>
          </aside>
        </section>
      </div>
    </div>
  );
}

export default Login;
