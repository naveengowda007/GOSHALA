import React from "react";
import { IoDocumentTextOutline, IoPersonOutline } from "react-icons/io5";
import Logo from "../../src/assets/Goshala_Logo.png";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";
function SideBar() {
  return (
    <aside className="relative left-0 w-80 shadow-md h-screen">
      <div>
        <img src={Logo}></img>
        <ul className=" p-4 m-4 flex flex-col gap-4">
          <li className="flex items-center gap-2">
            <IoDocumentTextOutline />
            Packages
          </li>
          <li className="flex items-center gap-2">
            <IoPersonOutline />
            Customer
          </li>
          <li className="flex items-center gap-2">
            <RiMoneyRupeeCircleLine />
            Revenue Generated
          </li>
          <li className="flex items-center gap-2">
            <MdOutlinePendingActions />
            Pending Dues
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
