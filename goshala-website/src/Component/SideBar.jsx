import React, { useState } from "react";
import { IoDocumentTextOutline, IoPersonOutline } from "react-icons/io5";
import Logo from "../../src/assets/Goshala_Logo_bg.png";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { HiMiniCurrencyRupee } from "react-icons/hi2";
import { GrAnnounce } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
function SideBar() {
  const [activeLink, setActiveLink] = useState("UserDashboard"); // Default active link is Packages

  const handleLinkClick = (linkName) => {
    console.log(linkName);
    setActiveLink(linkName); // Set the clicked link as active
  };

  return (
    <aside className="relative left-0 w-80 shadow-md min-h-screen bg-green-100">
      <div className="flex justify-center flex-col align-middle items-center mt-2">
        <img src={Logo} alt="Logo" className="w-20" />
        <h2 className="font-bold text-lg">Goshala</h2>
      </div>
      <ul className="p-4 m-4 flex flex-col justify-center gap-2">
        <li
          className={`flex items-center p-2 rounded-lg cursor-pointer ${
            activeLink === "Userdashboard"
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-200"
          }`}
          onClick={() => handleLinkClick("UserDashboard")}
        >
          <MdDashboard className=" text-xl mr-2" />
          <Link to="/UserDashboard">Dashboard</Link>
        </li>
        <li
          className={`flex items-center gap-2  p-1  cursor-pointer ${
            activeLink === "Customer"
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-200"
          }`}
          onClick={() => handleLinkClick("Customer")}
        >
          <IoPersonOutline />
          <Link to="/customer">Member</Link> {/* Link to Customer page */}
        </li>
        <li
          className={`flex items-center gap-2  p-1 cursor-pointer ${
            activeLink === "TripsDetails"
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-200"
          }`}
          onClick={() => handleLinkClick("TripsDetails")}
        >
          <RiMoneyRupeeCircleLine />
          <Link to="/TripsDetails">Trips Details</Link>{" "}
          {/* Link to Revenue page */}
        </li>
        <li
          className={`flex items-center gap-2 p-1 cursor-pointer ${
            activeLink === "UserBookings"
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-200"
          }`}
          onClick={() => handleLinkClick("UserBookings")}
        >
          <MdOutlinePendingActions />
          <Link to="/UserBookings">bookings</Link>{" "}
          {/* Link to Pending Dues page */}
        </li>
        <li
          className={`flex items-center gap-2 p-1 cursor-pointer ${
            activeLink === "UserPayment"
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-200"
          }`}
          onClick={() => handleLinkClick("UserPayment")}
        >
          <HiMiniCurrencyRupee />
          <Link to="/UserPayment">Payments</Link>{" "}
          {/* Link to Pending Dues page */}
        </li>
        <li
          className={`flex items-center gap-2 p-1 cursor-pointer ${
            activeLink === "UserAnnouncements"
              ? "bg-green-500 text-white"
              : "text-gray-700 hover:bg-green-200"
          }`}
          onClick={() => handleLinkClick("UserAnnouncements")}
        >
          <GrAnnounce />
          <Link to="/UserAnnouncements">Announcements</Link>{" "}
          {/* Link to Pending Dues page */}
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
