import React from "react";
import { FaRegCircle } from "react-icons/fa"; // Placeholder icon, replace with appropriate icons
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { TbCarSuvFilled } from "react-icons/tb";
import { BsFillPeopleFill } from "react-icons/bs";
import { PiJeepFill } from "react-icons/pi";
import { GiNotebook } from "react-icons/gi";
import { HiMiniCurrencyRupee } from "react-icons/hi2";
import { GrAnnounce } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import images from '../../constants/images/index'
const Sidebar = ({ currentPage }) => {
  const navigate = useNavigate();

  return (
    
    <div className="w-1/4 min-h-screen bg-green-100 p-4">
      <div className="mb-8 flex items-center gap-2">
        {/* Placeholder for logo */}
        {/* <div className="h-10 w-10 bg-green-500 rounded-full mr-2"></div> */}
        <img src={images.Logo} alt="" srcset="" className="w-10"/>
        <h2 className="font-bold text-lg">Goshala Ventures</h2>
      </div>

      <ul className="space-y-4">
        <li
          className={`flex items-center p-2 rounded-lg cursor-pointer ${
            currentPage === "dashboard"
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-200"
          }`}
          onClick={() => navigate("/admin/dashboard")}
        >
          <MdDashboard className=" text-xl mr-2" />
          <span>Dashboard</span>
        </li>

        {/* <li
          className={`flex items-center p-2 rounded-lg cursor-pointer ${
            currentPage === "trip-types"
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-200"
          }`}
          onClick={() => navigate("/admin/trip-types")}
        >
          <TbCarSuvFilled className=" text-xl mr-2" />
          <span>Trip Types</span>
        </li> */}

        <li
          className={`flex items-center p-2 rounded-lg cursor-pointer ${
            currentPage === "members"
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-200"
          }`}
          onClick={() => navigate("/admin/members")}
        >
          <BsFillPeopleFill className=" text-xl mr-2" />
          <span>Members</span>
        </li>

        <li
          className={`flex items-center p-2 rounded-lg cursor-pointer ${
            currentPage === "trips"
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-200"
          }`}
          onClick={() => navigate("/admin/trips")}
        >
          <PiJeepFill className=" text-xl mr-2" />
          <span>Trips</span>
        </li>

        <li
          className={`flex items-center p-2 rounded-lg cursor-pointer ${
            currentPage === "bookings"
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-200"
          }`}
          onClick={() => navigate("/admin/bookings")}
        >
          <GiNotebook className=" text-xl mr-2" />
          <span>Bookings</span>
        </li>

        <li
          className={`flex items-center p-2 rounded-lg cursor-pointer ${
            currentPage === "payments"
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-200"
          }`}
          onClick={() => navigate("/admin/payments")}
        >
          <HiMiniCurrencyRupee className=" text-xl mr-2" />
          <span>Payments</span>
        </li>

        <li
          className={`flex items-center p-2 rounded-lg cursor-pointer ${
            currentPage === "announcements"
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-200"
          }`}
          onClick={() => navigate("/admin/announcements")}
        >
          <GrAnnounce className=" text-xl mr-2" />
          <span>Announcements</span>
        </li>

        <li
          className="flex items-center p-2 rounded-lg cursor-pointer text-gray-700 hover:bg-green-200"
          onClick={() => {
            sessionStorage.removeItem("adminAccess");
            console.log("Logot");
            navigate("/admin/login");
          }}
        >
          <FiLogOut className=" text-xl mr-2" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
