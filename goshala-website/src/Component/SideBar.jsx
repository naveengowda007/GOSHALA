import React, { useState } from "react";
import { IoDocumentTextOutline, IoPersonOutline } from "react-icons/io5";
import Logo from "../../src/assets/Goshala_Logo.png";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function SideBar() {
  const [activeLink, setActiveLink] = useState("GetTripDetails"); // Default active link is Packages

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName); // Set the clicked link as active
  };

  return (
    <aside className="relative left-0 w-80 shadow-md h-screen">
      <div>
        <img src={Logo} alt="Logo" />
        <ul className="p-4 m-4 flex flex-col gap-4">
          <li
            className={`flex items-center gap-2 cursor-pointer ${
              activeLink === "GetTripDetails" ? "text-blue-500" : ""
            }`}
            onClick={() => handleLinkClick("GetTripDetails")}
          >
            <IoDocumentTextOutline />
            <Link to="/GetTripDetails">Packages</Link>{" "}
            {/* Link to Packages page */}
          </li>
          <li
            className={`flex items-center gap-2 cursor-pointer ${
              activeLink === "Customer" ? "text-blue-500" : ""
            }`}
            onClick={() => handleLinkClick("Customer")}
          >
            <IoPersonOutline />
            <Link to="/customer">Customer</Link> {/* Link to Customer page */}
          </li>
          <li
            className={`flex items-center gap-2 cursor-pointer ${
              activeLink === "Revenue" ? "text-blue-500" : ""
            }`}
            onClick={() => handleLinkClick("Revenue")}
          >
            <RiMoneyRupeeCircleLine />
            <Link to="/revenue">Revenue Generated</Link>{" "}
            {/* Link to Revenue page */}
          </li>
          <li
            className={`flex items-center gap-2 cursor-pointer ${
              activeLink === "PendingDues" ? "text-blue-500" : ""
            }`}
            onClick={() => handleLinkClick("PendingDues")}
          >
            <MdOutlinePendingActions />
            <Link to="/pending-dues">Pending Dues</Link>{" "}
            {/* Link to Pending Dues page */}
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
