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
          <div className="flex items-center">
            <span className="text-2xl font-bold text-green-700">Packages</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 ml-10 w-96 border rounded-full border-y-2 border-black  p-2"
              placeholder="Search packages"
            />
            <div className="flex justify-end">
              <button
                onClick={handleNavigate}
                className="bg-green-800 p-2 m-2 rounded-md text-white "
              >
                Add Customer
              </button>
            </div>
          </div>
          <section className="shadow-md m-2 p-2 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip, index) => (
                  <div
                    key={index}
                    className="p-2 border-b shadow-md rounded-lg bg-green-700 text-white"
                  >
                    <p className="flex">
                      <span>User ID : </span>
                      <span className="text-white ml-1">
                        {trip.associated_user_id}
                      </span>
                    </p>
                    <p>
                      <span>Member Age : </span>
                      <span className="text-white ml-1">{trip.member_age}</span>
                    </p>
                    <p>
                      <span>Contact Number : </span>
                      <span className="text-white ml-1 w-[300px]">
                        {trip.member_contact_number}
                      </span>
                    </p>
                    <p>
                      <span>Member Id : </span>
                      <span className="text-white ml-1">{trip.member_id}</span>
                    </p>
                    <p>
                      <span>Member Name : </span>
                      <span className="text-white ml-1">
                        {trip.member_name}
                      </span>
                    </p>
                    <p>
                      <span>Gender : </span>
                      <span className="text-white ml-1">
                        {trip.memeber_gender}
                      </span>
                    </p>
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