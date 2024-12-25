import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../componets/admin/Sidebar";
import { TbCarSuvFilled } from "react-icons/tb";
import { BsFillPeopleFill } from "react-icons/bs";
import { PiJeepFill } from "react-icons/pi";
import { GiNotebook } from "react-icons/gi";
import { HiMiniCurrencyRupee } from "react-icons/hi2";
import { GrAnnounce } from "react-icons/gr";
import SideBar from "../../Component/SideBar";

const UserDashboard = () => {
  let navigate = useNavigate();

  const cardData = [
    // { icon: <TbCarSuvFilled />, text: "Trip Types", link: "/admin/trip-types" },
    { icon: <BsFillPeopleFill />, text: "Members", link: "/Customer" },
    { icon: <PiJeepFill />, text: "Trips", link: "/TripsDetails" },
    { icon: <GiNotebook />, text: "Bookings", link: "/UserBookings" },
    {
      icon: <HiMiniCurrencyRupee />,
      text: "Payments",
      link: "/UserPayment",
    },
    {
      icon: <GrAnnounce />,
      text: "Announcements",
      link: "/UserAnnouncements",
    },
  ];

  return (
    <div className="flex">
      <SideBar />
      <section className="m-2 p-2 w-full">
        <div className=" flex justify-start items-center mb-6">
          <h2 className="text-xl font-bold ">Dashboard</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-green-prm text-white p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all"
              onClick={() => navigate(card.link)}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <span className="text-lg">{card.text}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
