import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../Component/SideBar";

export default function AddCustomer() {
  const [tripTypes, setTripTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = sessionStorage.getItem("authToken");

  // Replace with your actual BASEURL
  const BASEURL =
    import.meta.env.VITE_REACT_APP_BASEURL || "http://localhost:3000";

  // Fetch Trip Types
  const handleSubmit = async () => {
    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }

    try {
      const response = await axios.get(
        `${BASEURL}/api/v1/users/data/getTripTypes`,
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

  //   // Filter Trip Types Based on Search Term
  const filteredTrips = tripTypes.filter((trip) =>
    trip.trip_type_name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  //   console.log(first);

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
            className="h-10 ml-10 w-96 border rounded-full border-y-2 border-black  p-2"
            placeholder="Search packages"
          />
          <section className="shadow-md m-2 p-2 min-h-screen">
            <div className="flex rounded-sm ">
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip, index) => (
                  <div key={index} className="p-2 border-b shadow-md w-48">
                    <p className="flex">
                      <span>ID : </span>
                      <span className="text-red-600">{trip.trip_type_id}</span>
                    </p>
                    <p>
                      {" "}
                      <span>Type Name : </span>
                      <span className="text-red-600">
                        {" "}
                        {trip.trip_type_name}
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <p>No trip types available</p>
              )}
            </div>
          </section>
        </section>
      </div>
    </aside>
  );
}
