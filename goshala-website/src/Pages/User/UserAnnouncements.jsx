import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../Component/SideBar";

export default function UserAnnouncements() {
  const [tripTypes, setTripTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = sessionStorage.getItem("authToken");

  // Replace with your actual BASEURL
  const BASEURL =
    import.meta.env.VITE_REACT_APP_BASEURL || "http://localhost:3000";

  // Fetch Announcements
  const handleSubmit = async () => {
    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }

    try {
      const response = await axios.get(
        `${BASEURL}/api/v1/users/data/getAnnouncements`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        console.log(response.data);
        setTripTypes(response.data);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  // Filter Announcements Based on Search Term
  const filteredTrips = tripTypes.filter((trip) =>
    trip.announcement_type?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <aside>
      <div className="flex">
        <SideBar />
        <section className="m-2 p-2 w-full">
          <span className="text-2xl font-bold text-green-700">Packages</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 ml-10 w-96 border rounded-full border-y-2 border-black p-2"
            placeholder="Search announcements"
          />
          <section className="shadow-md m-2 p-2 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip, index) => (
                  <div
                    key={index}
                    className="bg-white text-black p-4 rounded-2xl flex flex-col gap-1 justify-evenly flex-wrap shadow-2xl border border-gray-700 hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Announcement Type: {trip.announcement_type}</span>
                    <span>Description: {trip.announcement_description}</span>
                  </div>
                ))
              ) : (
                <p>No announcement available</p>
              )}
            </div>
          </section>
        </section>
      </div>
    </aside>
  );
}
