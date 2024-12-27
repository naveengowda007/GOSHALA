import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../Component/SideBar";

export default function TripDetails() {
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
        `${BASEURL}/api/v1/users/data/getTrips`,
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
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-green-700">Packages</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 ml-10 w-96 border rounded-full border-black p-2"
              placeholder="Search packages"
            />
          </div>
          <section className="shadow-md m-2 p-2 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tripTypes.length > 0 ? (
                tripTypes.map((trip, index) => (
                  <div
                    key={trip.trip_id}
                    className="bg-white text-black p-4 rounded-xl shadow-xl flex flex-col gap-3 hover:scale-105 transition-all cursor-pointer"
                    onClick={() => openModal(trip)}
                  >
                    <span className="font-semibold">
                      From:{" "}
                      <span className="font-normal">{trip.trip_from}</span>
                    </span>
                    <span className="font-semibold">
                      To: <span className="font-normal">{trip.trip_to}</span>
                    </span>
                    <span className="font-semibold">
                      Intermediate Stops:{" "}
                      <span className="font-normal">
                        {trip.intermideate_stops}
                      </span>
                    </span>
                    <span className="font-semibold">
                      Start Date:{" "}
                      <span className="font-normal">
                        {trip.start_date?.slice(0, 10)}
                      </span>
                    </span>
                    <span className="font-semibold">
                      End Date:{" "}
                      <span className="font-normal">
                        {trip.end_date?.slice(0, 10)}
                      </span>
                    </span>
                    <span className="font-semibold">
                      Price: <span className="font-normal">₹{trip.price}</span>
                    </span>
                    <span className="font-semibold">
                      Days Count:{" "}
                      <span className="font-normal">{trip.days_count}</span>
                    </span>
                    <span className="font-semibold">
                      Trip Type:{" "}
                      <span className="font-normal">{trip.trip_type}</span>
                    </span>
                    <span className="font-semibold">
                      Trip Status:{" "}
                      <span className="font-normal">{trip.trip_status}</span>
                    </span>
                    <span className="font-semibold">
                      Trip Descriptions:{" "}
                      <span className="font-normal">
                        {trip.trip_descriptions}
                      </span>
                    </span>
                    <button
                      className="mt-4 bg-green-prm text-white py-2 px-4 rounded-lg w-full hover:scale-105 transition-all"
                      onClick={() => console.log("View Details", trip)}
                    >
                      View Details
                    </button>
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
