import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../componets/admin/Sidebar";
import { BsFillPeopleFill } from "react-icons/bs";
import { PiJeepFill } from "react-icons/pi";
import { GiNotebook } from "react-icons/gi";
import { HiMiniCurrencyRupee } from "react-icons/hi2";
import { GrAnnounce } from "react-icons/gr";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const overviewData = [
    {
      label: "Total Bookings",
      value: "1,200",
      change: "+3.50%",
      bgColor: "bg-green-100",
      icon: <PiJeepFill />,
    },
    {
      label: "New Customers",
      value: "390",
      change: "-2.50%",
      bgColor: "bg-red-100",
      icon: <PiJeepFill />,
    },
    {
      label: "This Month Revenue",
      value: "390,000",
      bgColor: "bg-blue-100",
      icon: <GiNotebook />,
    },
    {
      label: "Pending Payments",
      value: "120,000",
      bgColor: "bg-yellow-100",
      icon: <PiJeepFill />,
    },
    {
      label: "Avg. Income per Tourist",
      value: "4,000",
      bgColor: "bg-teal-100",
      icon: <PiJeepFill />,
    },
    {
      label: "Total Revenue",
      value: "13,90,000",
      change: "-1.50%",
      bgColor: "bg-gray-100",
      icon: <GiNotebook />,
    },
  ];

  const cardData = [
    { icon: <BsFillPeopleFill />, text: "Members", link: "/admin/members" },
    { icon: <PiJeepFill />, text: "Trips", link: "/admin/trips" },
    { icon: <GiNotebook />, text: "Bookings", link: "/admin/bookings" },
    {
      icon: <HiMiniCurrencyRupee />,
      text: "Payments",
      link: "/admin/payments",
    },
    {
      icon: <GrAnnounce />,
      text: "Announcements",
      link: "/admin/announcements",
    },
  ];

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (in L)",
        data: [2, 8, 6, 7, 10, 4],
        backgroundColor: "#2EB67D",
      },
    ],
  };

  const pieData = {
    labels: ["Tokyo, Japan", "Madrid, Spain", "Rome, Italy"],
    datasets: [
      {
        data: [1276, 1126, 1026],
        backgroundColor: ["#4CAF50", "#FF9800", "#03A9F4"],
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar currentPage="dashboard" />
      <div className="flex-1 p-4 sm:p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Dashboard
        </h2>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {overviewData.map((data, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md ${data.bgColor} flex  gap-7  items-center`}
            >
              <div className="text-2xl sm:text-3xl mb-2">{data.icon}</div>
              <div className=" flex flex-col items-start ">
                <h3 className="text-sm sm:text-lg font-semibold mb-1">
                  {data.label}
                </h3>
                <p className="text-lg sm:text-2xl font-bold">{data.value}</p>
              </div>
              {data.change && (
                <span
                  className={`text-sm font-medium ${
                    data.change.startsWith("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {data.change}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Revenue and Destinations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-sm sm:text-lg font-semibold mb-4">
              Revenue Overview
            </h3>
            <div className="h-40 sm:h-60">
              <Bar
                data={barData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-sm sm:text-lg font-semibold mb-4">
              Top Destinations
            </h3>
            <div className="h-40 sm:h-60">
              <Doughnut
                data={pieData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-green-500 text-white p-4 sm:p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate(card.link)}
            >
              <div className="text-2xl sm:text-3xl mb-2">{card.icon}</div>
              <span className="text-sm sm:text-lg font-medium">
                {card.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
