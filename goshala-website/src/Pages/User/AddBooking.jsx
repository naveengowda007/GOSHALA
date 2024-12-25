import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select"; // Import Select from react-select
import SideBar from "../../Component/SideBar";
import { useNavigate } from "react-router-dom";

export default function Customer() {
  const [TripTypes, setTripTypes] = useState([]);
  const [Members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tripDetails, setTripDetails] = useState([]);
  const [selectedMemberid, setselectedMemberid] = useState("");
  const [selectedTriptype, setselectedTriptype] = useState("");
  const [Price, setPrice] = useState("");
  const token = sessionStorage.getItem("authToken");
  const Navigate = useNavigate();
  const BASEURL =
    import.meta.env.VITE_REACT_APP_BASEURL || "http://localhost:3000";

  const handleInitails = async () => {
    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }

    try {
      // First API call to get Trip Types
      const tripTypesResponse = await axios.get(
        `${BASEURL}/api/v1/users/data/getTripTypes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (tripTypesResponse.data) {
        console.log("Trip Types:", tripTypesResponse.data);
        setTripDetails(tripTypesResponse.data); // Correctly set trip types data
      } else {
        alert("Something went wrong while fetching trip types.");
      }

      // Second API call to get Members List
      const membersResponse = await axios.get(
        `${BASEURL}/api/v1/users/data/getMembersList`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (membersResponse.data) {
        console.log("Members:", membersResponse.data);
        setMembers(membersResponse.data); // Correctly set members data
      } else {
        alert("Something went wrong while fetching members list.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    handleInitails();
  }, []);

  const handleSubmit = async () => {
    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }
    console.log(selectedTriptype, selectedMemberid);
    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/users/data/insertUserTravelBookings`,
        {
          trip_id: selectedTriptype,
          user_id: Number(1),
          member_id: selectedMemberid,
          paid_amount: Number(Price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        console.log("Booking Response:", response.data);
      } else {
        alert("Something went wrong while submitting data.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("An error occurred. Please try again.");
    }
  };

  // Debugging Logs
  useEffect(() => {
    console.log("Members State:", Members);
    console.log("Trip Details State:", tripDetails);
  }, [Members, tripDetails]);

  const handleNavigate = () => {
    Navigate("/AddCustomer");
  };

  const handleMemberChange = (e) => {
    setselectedMemberid(e.value);
  };

  const handleTriptype = (e) => {
    setselectedTriptype(e.value);
  };

  return (
    <aside>
      <div className="flex">
        <SideBar />
        <section className="m-2 p-2 w-full">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-green-700">Trips</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 ml-10 w-96 border rounded-full border-y-2 border-black p-2"
              placeholder="Search trips"
            />
            <div className="flex justify-end">
              <button
                onClick={handleNavigate}
                className="bg-green-800 p-2 m-2 rounded-md text-white"
              >
                Add Trip
              </button>
            </div>
          </div>
          <section className="shadow-md m-2 p-2 min-h-screen">
            <div className=" gap-4">
              <div className="p-2  ">
                <div className="mb-4">
                  <span>Member ID: </span>
                  <Select
                    className="w-[200px] lg:mr-[50px] text-sm"
                    options={Members.map((member) => ({
                      value: member.member_id,
                      label: member.member_name,
                    }))}
                    value={
                      selectedMemberid
                        ? { label: selectedMemberid, value: selectedMemberid }
                        : { label: "Select Member", value: "" }
                    }
                    onChange={handleMemberChange}
                    placeholder="Select Member"
                  />
                </div>

                <div className="mb-4">
                  <span>Trip Type: </span>
                  <Select
                    className="w-[200px] lg:mr-[50px] text-sm"
                    options={tripDetails.map((tripType) => ({
                      value: tripType.trip_type_id,
                      label: tripType.trip_type_name,
                    }))}
                    value={
                      selectedTriptype
                        ? { label: selectedTriptype, value: selectedTriptype }
                        : { label: "Select Trip Type", value: "" }
                    }
                    onChange={handleTriptype}
                    placeholder="Select Trip Type"
                  />
                </div>

                <div className="mb-4">
                  <span>Paid Amount: </span>
                  <div>
                    <input
                      type="text"
                      value={Price}
                      className=" p-2 rounded border"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 rounded p-1 m-1 "
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </aside>
  );
}
