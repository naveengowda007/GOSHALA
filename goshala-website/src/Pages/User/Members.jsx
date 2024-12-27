import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../Component/SideBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Customer() {
  const [tripTypes, setTripTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = sessionStorage.getItem("authToken");

  const userDetails = useSelector((state) => state.auth.userDetails);
  console.log(userDetails?.empid);
  const Navigate = useNavigate();

  const BASEURL =
    import.meta.env.VITE_REACT_APP_BASEURL || "http://localhost:3000";

  // Fetch Trip Types
  const handleSubmit = async () => {
    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }
    console.log(userDetails?.empid);

    try {
      const response = await axios.get(
        `${BASEURL}/api/v1/users/data/getMembersList?associated_user_id=${userDetails?.empid}`,
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
  const filteredTrips = tripTypes.filter(
    (trip) =>
      trip?.member_age?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      trip?.member_contact_number
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase()) ||
      trip?.member_name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      trip?.memeber_gender?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  //   console.log(first);
  const handleNavigate = () => {
    Navigate("/AddCustomer");
  };

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
            <div className="flex justify-end ml-auto">
              <button
                onClick={handleNavigate}
                className="bg-green-prm py-2 px-4 rounded-lg text-white hover:scale-105 transition-all"
              >
                Add Customer
              </button>
            </div>
          </div>
          <section className="shadow-md m-2 p-2 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip, index) => (
                  <div
                    key={index}
                    className="bg-white text-black p-4 rounded-lg shadow-lg hover:scale-105 transition-all"
                  >
                    <p className="text-lg font-semibold mb-2">
                      User ID:{" "}
                      <span className="font-normal">
                        {trip.associated_user_id}
                      </span>
                    </p>
                    <p className="text-lg font-semibold mb-2">
                      Member Age:{" "}
                      <span className="font-normal">{trip.member_age}</span>
                    </p>
                    <p className="text-lg font-semibold mb-2">
                      Contact Number:{" "}
                      <span className="font-normal">
                        {trip.member_contact_number}
                      </span>
                    </p>
                    <p className="text-lg font-semibold mb-2">
                      Member ID:{" "}
                      <span className="font-normal">{trip.member_id}</span>
                    </p>
                    <p className="text-lg font-semibold mb-2">
                      Member Name:{" "}
                      <span className="font-normal">{trip.member_name}</span>
                    </p>
                    <p className="text-lg font-semibold mb-4">
                      Gender:{" "}
                      <span className="font-normal">{trip.memeber_gender}</span>
                    </p>
                    <button
                      className="bg-green-prm text-white py-2 px-4 rounded-lg w-full hover:scale-105 transition-all"
                      onClick={() => console.log("View Details", trip)}
                    >
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                <p>No Customers available</p>
              )}
            </div>
          </section>
        </section>
      </div>
    </aside>
  );
}
